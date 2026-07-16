<?php

namespace App\Domain\CMS\Services;

use App\Domain\CMS\Models\Menu;
use Illuminate\Database\Eloquent\Collection;

class MenuService
{
    /**
     * Get all menus.
     */
    public function getAllMenus(): Collection
    {
        return Menu::all();
    }

    /**
     * Get menu by location.
     */
    public function getMenuByLocation(string $location): ?Menu
    {
        return Menu::where('location', $location)->first();
    }

    /**
     * Create or update a menu by location.
     */
    public function saveMenu(string $location, array $items, ?string $name = null): Menu
    {
        $menu = Menu::firstOrNew(['location' => $location]);
        if ($name) {
            $menu->name = $name;
        }
        $menu->items = $items;
        $menu->save();

        return $menu;
    }
}
