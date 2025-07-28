<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Symfony\Component\HttpFoundation\Response;

class AdminMiddleware
{
    public function handle(Request $request, Closure $next): Response
    {
        $user = Auth::user();
        if (!$user || !$user->roles()->where('name', 'admin')->exists()) {
            return response()->json(['error' => 'Unauthorized'], 403);
        }
        return $next($request);
    }
}