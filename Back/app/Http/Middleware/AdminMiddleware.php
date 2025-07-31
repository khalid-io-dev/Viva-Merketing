<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AdminMiddleware
{
    public function handle(Request $request, Closure $next)
    {
        if (!Auth::check()) {
            return response()->json(['error' => 'Unauthorized'], 401);
        }

        $user = Auth::user();
        if (!$user->roles()->where('name', 'admin')->exists()) {
            return response()->json(['error' => 'Forbidden: Admin access required'], 403);
        }

        return $next($request);
    }
}
