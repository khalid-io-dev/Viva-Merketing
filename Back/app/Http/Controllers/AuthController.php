<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Symfony\Component\HttpFoundation\Cookie;

class AuthController extends Controller
{
    public function showLoginForm()
    {
        return view('auth.login');
    }

    public function login(Request $request)
    {
        $credentials = $request->validate([
            'email' => ['required', 'email'],
            'password' => ['required'],
        ]);

        if (Auth::attempt($credentials)) {
            $request->session()->regenerate();

            // Création d'un cookie personnalisé "user_auth"
            $cookie = cookie(
                'user_auth',
                encrypt(Auth::user()->id), // exemple : stocke l'id utilisateur encrypté
                60, // durée en minutes (1h)
                null,
                null,
                true,   // secure (HTTPS uniquement)
                true    // httpOnly
            );

            // Redirige avec le cookie attaché
            return redirect()->intended('/')->withCookie($cookie);
        }

        return back()->withErrors([
            'email' => 'Les informations d\'identification sont incorrectes.',
        ])->onlyInput('email');
    }

    public function logout(Request $request)
    {
        Auth::logout();

        $request->session()->invalidate();
        $request->session()->regenerateToken();

        // Suppression du cookie "user_auth" en le mettant à expire dans le passé
        $cookie = cookie()->forget('user_auth');

        return redirect('/login')->withCookie($cookie);
    }
}
