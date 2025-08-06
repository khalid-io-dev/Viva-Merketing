<?php

namespace App\Providers;

use App\Models\OrderItem;
use App\Models\User;
use App\Policies\UserPolicy;
use App\Policies\OrderItemPolicy;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{

    protected $policies = [
        User::class => UserPolicy::class,
        OrderItem::class => OrderItemPolicy::class,
    ];
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        //
    }
}
