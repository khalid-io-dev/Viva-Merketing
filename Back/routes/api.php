<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\CartController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\Admin\AdminProductController;
use App\Http\Controllers\Admin\AdminOrderController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application.
| These routes are loaded by the RouteServiceProvider within a group 
| which is assigned the "api" middleware group. Enjoy building your API!
|
*/

// Public routes
Route::post('register', [AuthController::class, 'register']);
Route::post('login',    [AuthController::class, 'login']);
Route::get('categories', [CategoryController::class, 'index']);
Route::get('products',   [ProductController::class, 'index']);
Route::get('products/{id}', [ProductController::class, 'show']);

// Protected routes - need authentication via Sanctum
Route::middleware('auth:sanctum')->group(function () {

    // Auth
    Route::post('logout', [AuthController::class, 'logout']);
    Route::get('me',      [UserController::class, 'profile']);
    Route::put('me',      [UserController::class, 'updateProfile']);

    // Cart
    Route::get('cart',         [CartController::class, 'show']);
    Route::post('cart/add',    [CartController::class, 'addItem']);
    Route::post('cart/remove', [CartController::class, 'removeItem']);
    Route::post('cart/clear',  [CartController::class, 'clear']);

    // Orders
    Route::post('orders',        [OrderController::class, 'store']);  // place order
    Route::get('orders',         [OrderController::class, 'index']);  // user orders
    Route::get('orders/{id}',    [OrderController::class, 'show']);   // single order details

    // Admin-only routes (middleware to restrict)
    Route::middleware('can:isAdmin')->group(function () {
        Route::apiResource('admin/products', AdminProductController::class);
        Route::apiResource('admin/orders', AdminOrderController::class);
    });
});
