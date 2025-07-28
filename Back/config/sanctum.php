<?php

return [
    'stateful' => explode(',', env('SANCTUM_STATEFUL_DOMAINS', 'localhost,127.0.0.1,::1')),
    'guard' => ['api'],
    'expiration' => null,
    'token_prefix' => 'auth_token',
    'middleware' => [
        'verify_csrf_token' => \Laravel\Sanctum\Http\Middleware\EnsureFrontendRequestsAreStateful::class,
        'authenticate_session' => \Laravel\Sanctum\Http\Middleware\AuthenticateSession::class,
    ],
];
