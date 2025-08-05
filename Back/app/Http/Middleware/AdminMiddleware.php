<?php
namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

   class AdminMiddleware
   {
       public function handle(Request $request, Closure $next)
       {
           \Log::info('AdminMiddleware: Checking admin role', [
               'user_id' => Auth::id(),
               'user' => Auth::user(),
               'has_roles' => Auth::user()?->roles()->count(),
               'url' => $request->url(),
               'method' => $request->method(),
           ]);

           $user = Auth::user();

           if (!$user) {
               \Log::warning('AdminMiddleware: No authenticated user');
               return response()->json(['error' => 'Unauthorized: Authentication required'], 401)
                   ->header('Access-Control-Allow-Origin', 'http://localhost:5173')
                   ->header('Access-Control-Allow-Credentials', 'true')
                   ->header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
                   ->header('Access-Control-Allow-Headers', 'Authorization, Content-Type, X-XSRF-TOKEN');
           }

           if (!$user->roles()->where('name', 'admin')->exists()) {
               \Log::warning('AdminMiddleware: User does not have admin role', [
                   'user_id' => $user->id,
                   'user_roles' => $user->roles()->pluck('name'),
               ]);
               return response()->json(['error' => 'Unauthorized: Admin access required'], 403)
                   ->header('Access-Control-Allow-Origin', 'http://localhost:5173')
                   ->header('Access-Control-Allow-Credentials', 'true')
                   ->header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
                   ->header('Access-Control-Allow-Headers', 'Authorization, Content-Type, X-XSRF-TOKEN');
           }

           \Log::info('AdminMiddleware: Admin access granted', ['user_id' => $user->id]);
           return $next($request)
               ->header('Access-Control-Allow-Origin', 'http://localhost:5173')
               ->header('Access-Control-Allow-Credentials', 'true')
               ->header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
               ->header('Access-Control-Allow-Headers', 'Authorization, Content-Type, X-XSRF-TOKEN');
       }
   }
