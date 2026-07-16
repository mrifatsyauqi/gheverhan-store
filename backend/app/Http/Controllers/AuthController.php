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
        $data = $this->authService->registerUser($request->validated());

        return $this->success($data, 'User registered successfully.', 201);
    }

    public function login(LoginRequest $request): JsonResponse
    {
        $data = $this->authService->authenticateUser($request->validated());

        return $this->success($data, 'Login successful.');
    }

    public function logout(Request $request): JsonResponse
    {
        $this->authService->logoutUser();

        return $this->success(null, 'Logged out successfully.');
    }
}
