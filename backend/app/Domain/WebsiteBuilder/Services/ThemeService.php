<?php

namespace App\Domain\WebsiteBuilder\Services;

use App\Domain\WebsiteBuilder\Models\Theme;

class ThemeService
{
    /**
     * Get the active theme.
     */
    public function getActiveTheme(): ?Theme
    {
        return Theme::where('is_active', true)->first();
    }

    /**
     * Save theme settings.
     */
    public function saveTheme(string $name, array $settings, bool $isActive = true): Theme
    {
        $theme = Theme::firstOrNew(['name' => $name]);
        $theme->settings = $settings;
        
        if ($isActive) {
            // Deactivate all others
            Theme::where('id', '!=', $theme->id)->update(['is_active' => false]);
            $theme->is_active = true;
        }

        $theme->save();

        return $theme;
    }
}
