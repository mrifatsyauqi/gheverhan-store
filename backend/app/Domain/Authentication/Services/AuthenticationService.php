<?php

namespace App\Domain\Authentication\Services;

use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\ValidationException;

class AuthenticationService
{
    /**
     * Register a new user.
     *
     * @param array $data
     * @return User
     */
    public function registerUser(array $data): User
    {
        return User::create([
            'name' => $data['name'],
            'email' => $data['email'],
            'password' => Hash::make($data['password']),
        ]);
    }

    /**
     * Authenticate a user with email and password.
     *
     * @param array $credentials
     * @return User
     * @throws ValidationException
     */
    public function authenticateUser(array $credentials): User
    {
        if (!Auth::attempt($credentials)) {
            throw ValidationException::withMessages([
                'email' => ['Invalid credentials.'],
            ]);
        }

        /** @var User $user */
        $user = Auth::user();
        
        return $user;
    }

    /**
     * Logout the currently authenticated user.
     *
     * @return void
     */
    public function logoutUser(): void
    {
        Auth::guard('web')->logout();
    }
}
