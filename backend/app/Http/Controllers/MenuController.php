<?php

namespace App\Http\Controllers;

use App\Domain\CMS\Services\MenuService;
use App\Traits\ApiResponse;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class MenuController extends Controller
{
    use ApiResponse;

    protected MenuService $menuService;

    public function __construct(MenuService $menuService)
    {
        $this->menuService = $menuService;
    }

    public function index(): JsonResponse
    {
        $menus = $this->menuService->getAllMenus();
        return $this->success($menus, 'Menus retrieved successfully.');
    }

    public function show(string $location): JsonResponse
    {
        $menu = $this->menuService->getMenuByLocation($location);
        
        if (!$menu) {
            return $this->error('Menu not found.', 404);
        }

        return $this->success($menu, 'Menu retrieved successfully.');
    }

    public function store(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'name' => 'nullable|string',
            'location' => 'required|string',
            'items' => 'required|array',
        ]);

        $menu = $this->menuService->saveMenu(
            $validated['location'],
            $validated['items'],
            $validated['name'] ?? null
        );

        return $this->success($menu, 'Menu saved successfully.', 201);
    }
}
