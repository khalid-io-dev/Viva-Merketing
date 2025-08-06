<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Role;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Foundation\Bus\DispatchesJobs;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Auth; // ADD THIS LINE
use Illuminate\Validation\Rule;
use Illuminate\Validation\ValidationException;
use Illuminate\Routing\Controller;

class UserController extends Controller
{
    use AuthorizesRequests;
    public function __construct()
    {
        $this->middleware('auth:sanctum', ['except' => ['register', 'login']]);
    }

    public function register(Request $request)
    {
        \Log::info('Register request received', $request->all());

        try {
            $validated = $request->validate([
                'name' => 'required|string|max:255',
                'email' => 'required|string|email|unique:users,email',
                'phone' => 'required|string|max:20',
                'password' => 'required|string|min:8|confirmed',
                'image' => 'nullable|image|mimes:jpeg,png,jpg|max:2048',
            ]);

            \Log::info('Validation passed', $validated);

            $customerRole = Role::where('name', 'customer')->first();
            if (!$customerRole) {
                \Log::error('Customer role not found');
                return response()->json([
                    'message' => 'Customer role not found. Please seed the roles table.',
                ], 500);
            }

            $userData = [
                'name' => $validated['name'],
                'email' => $validated['email'],
                'phone' => $validated['phone'],
                'password' => Hash::make($validated['password']),
            ];

            if ($request->hasFile('image')) {
                $userData['image'] = $request->file('image')->store('user_images', 'public');
                \Log::info('Image uploaded', ['image' => $userData['image']]);
            }

            $user = User::create($userData);
            \Log::info('User created', ['user_id' => $user->id]);

            $user->roles()->attach($customerRole->id);
            \Log::info('Role attached', ['user_id' => $user->id, 'role_id' => $customerRole->id]);

            $token = $user->createToken('auth_token')->plainTextToken;
            \Log::info('Token generated', ['user_id' => $user->id]);

            return response()->json([
                'user' => $user->load('roles'),
                'token' => $token,
                'message' => 'Registration successful',
            ], 201);
        } catch (ValidationException $e) {
            \Log::info('Validation errors', $e->errors());
            return response()->json([
                'message' => 'Validation failed',
                'errors' => $e->errors(),
            ], 422);
        } catch (\Exception $e) {
            \Log::error('Registration error: ' . $e->getMessage(), ['trace' => $e->getTraceAsString()]);
            return response()->json([
                'message' => 'Server error during registration',
                'error' => $e->getMessage(),
            ], 500);
        }
    }

    public function login(Request $request)
    {
        try {
            $credentials = $request->validate([
                'email' => 'required|email',
                'password' => 'required',
            ]);

            if (Auth::attempt($credentials)) {
                $user = Auth::user();
                $token = $user->createToken('auth_token')->plainTextToken;
                return response()->json([
                    'user' => $user->load('roles'),
                    'token' => $token,
                ], 200);
            }

            return response()->json(['message' => 'Invalid credentials'], 401);
        } catch (ValidationException $e) {
            return response()->json([
                'message' => 'Validation failed',
                'errors' => $e->errors(),
            ], 422);
        } catch (\Exception $e) {
            \Log::error('Login error: ' . $e->getMessage());
            return response()->json([
                'message' => 'Server error during login',
            ], 500);
        }
    }

    public function profile(Request $request)
    {
        return response()->json([
            'user' => $request->user()->load('roles')
        ]);
    }

    public function update(Request $request)
    {
        try {
            $user = $request->user();
            $validated = $request->validate([
                'name' => 'string|max:255',
                'email' => ['string', 'email', Rule::unique('users')->ignore($user->id)],
                'phone' => 'string|max:20',
                'image' => 'nullable|image|mimes:jpeg,png,jpg|max:2048',
            ]);

            if ($request->hasFile('image')) {
                if ($user->image) {
                    Storage::disk('public')->delete($user->image);
                }
                $validated['image'] = $request->file('image')->store('user_images', 'public');
            }

            $user->update($validated);
            return response()->json([
                'user' => $user->load('roles')
            ]);
        } catch (ValidationException $e) {
            return response()->json([
                'message' => 'Validation failed',
                'errors' => $e->errors(),
            ], 422);
        } catch (\Exception $e) {
            \Log::error('Update error: ' . $e->getMessage());
            return response()->json([
                'message' => 'Server error during update',
            ], 500);
        }
    }

    public function logout(Request $request)
    {
        try {
            $request->user()->currentAccessToken()->delete();
            return response()->json(['message' => 'Logged out successfully']);
        } catch (\Exception $e) {
            \Log::error('Logout error: ' . $e->getMessage());
            return response()->json([
                'message' => 'Server error during logout',
            ], 500);
        }
    }

    public function index()
    {
        try {
            $this->authorize('viewAny', User::class);
            $users = User::with('roles')->get();
            return response()->json(['trico' => $users]);
        } catch (\Exception $e) {
            \Log::error('Index error: ' . $e->getMessage());
            return response()->json([
                'message' => 'Server error',
            ], 500);
        }
    }

    public function show($id)
    {
        try {
            $user = User::with('roles')->findOrFail($id);
            $this->authorize('view', $user);
            return response()->json(['user' => $user]);
        } catch (\Exception $e) {
            \Log::error('Show error: ' . $e->getMessage());
            return response()->json([
                'message' => 'Server error',
            ], 500);
        }
    }

    public function destroy($id)
    {
        try {
            $user = User::findOrFail($id);
            $this->authorize('delete', $user);
            if ($user->image) {
                Storage::disk('public')->delete($user->image);
            }
            $user->delete();
            return response()->json(['message' => 'User deleted successfully']);
        } catch (\Exception $e) {
            \Log::error('Delete error: ' . $e->getMessage());
            return response()->json([
                'message' => 'Server error during deletion',
            ], 500);
        }
    }
}
