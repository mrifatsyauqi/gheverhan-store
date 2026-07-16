<?php

namespace App\Http\Controllers;

use App\Domain\Authentication\Requests\LoginRequest;
use App\Domain\Authentication\Requests\RegisterRequest;
use App\Domain\Authentication\Services\AuthenticationService;
use App\Traits\ApiResponse;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class AuthController extends Controller
{
    use ApiResponse;

    protected AuthenticationService $authService;

    public function __construct(AuthenticationService $authService)
    {
        $this->authService = $authService;
    }

    public function register(RegisterRequest $request): JsonResponse
    {
        $user = $this->authService->registerUser($request->validated());

        return $this->success($user, 'User registered successfully.', 201);
    }

    public function login(LoginRequest $request): JsonResponse
    {
        $user = $this->authService->authenticateUser($request->validated());

        $request->session()->regenerate();

        return $this->success($user, 'Login successful.');
    }

    public function logout(Request $request): JsonResponse
    {
        $this->authService->logoutUser();

        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return $this->success(null, 'Logged out successfully.');
    }
}
