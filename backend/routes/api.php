<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\HealthCheckController;

Route::get('/health', [HealthCheckController::class, 'index']);

Route::post('/register', [\App\Http\Controllers\AuthController::class, 'register']);
Route::post('/login', [\App\Http\Controllers\AuthController::class, 'login']);
Route::post('/forgot-password', [\App\Http\Controllers\PasswordResetController::class, 'sendResetLinkEmail']);
Route::post('/reset-password', [\App\Http\Controllers\PasswordResetController::class, 'reset']);

// Public CMS & Builder Routes
Route::prefix('v1/cms')->group(function () {
    Route::get('/pages', [\App\Http\Controllers\PageController::class, 'index']);
    Route::get('/pages/{slug}', [\App\Http\Controllers\PageController::class, 'show']);
    Route::get('/menus', [\App\Http\Controllers\MenuController::class, 'index']);
    Route::get('/menus/{location}', [\App\Http\Controllers\MenuController::class, 'show']);
});

Route::prefix('v1/builder')->group(function () {
    Route::get('/theme/active', [\App\Http\Controllers\ThemeController::class, 'getActive']);
});

// Public Commerce Routes
Route::prefix('v1/commerce')->group(function () {
    Route::get('/products', [\App\Http\Controllers\ProductController::class, 'index']);
    Route::get('/products/{slug}', [\App\Http\Controllers\ProductController::class, 'show']);
    Route::post('/cart/validate', [\App\Http\Controllers\CartController::class, 'validateCart']);
    Route::post('/checkout', [\App\Http\Controllers\OrderController::class, 'checkout']);
});

Route::middleware(['auth:sanctum'])->group(function () {
    Route::get('/user', function (Request $request) {
        return response()->json([
            'success' => true,
            'message' => 'User fetched successfully.',
            'data' => $request->user(),
            'errors' => null,
        ]);
    });
    
    Route::post('/logout', [\App\Http\Controllers\AuthController::class, 'logout']);
    
    Route::post('/email/verification-notification', [\App\Http\Controllers\EmailVerificationController::class, 'resend'])
        ->name('verification.send');
    Route::get('/email/verify/{id}/{hash}', [\App\Http\Controllers\EmailVerificationController::class, 'verify'])
        ->name('verification.verify');

    // Admin CMS & Builder Routes
    Route::prefix('v1/cms')->group(function () {
        Route::post('/pages', [\App\Http\Controllers\PageController::class, 'store']);
        Route::post('/menus', [\App\Http\Controllers\MenuController::class, 'store']);
    });

    Route::prefix('v1/builder')->group(function () {
        Route::post('/theme', [\App\Http\Controllers\ThemeController::class, 'store']);
    });

    // Admin Commerce Routes
    Route::prefix('v1/commerce/admin')->group(function () {
        Route::post('/products', [\App\Http\Controllers\ProductController::class, 'store']);
    });
});
