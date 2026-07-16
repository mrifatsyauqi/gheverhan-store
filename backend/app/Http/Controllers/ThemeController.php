<?php

namespace App\Http\Controllers;

use App\Domain\WebsiteBuilder\Services\ThemeService;
use App\Traits\ApiResponse;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class ThemeController extends Controller
{
    use ApiResponse;

    protected ThemeService $themeService;

    public function __construct(ThemeService $themeService)
    {
        $this->themeService = $themeService;
    }

    public function getActive(): JsonResponse
    {
        $theme = $this->themeService->getActiveTheme();
        
        if (!$theme) {
            return $this->error('No active theme found.', 404);
        }

        return $this->success($theme, 'Active theme retrieved successfully.');
    }

    public function store(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'name' => 'required|string',
            'settings' => 'required|array',
            'is_active' => 'boolean',
        ]);

        $theme = $this->themeService->saveTheme(
            $validated['name'],
            $validated['settings'],
            $validated['is_active'] ?? true
        );

        return $this->success($theme, 'Theme saved successfully.', 201);
    }
}
