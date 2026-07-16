<?php

namespace App\Domain\CMS\Services;

use App\Domain\CMS\Models\Page;
use Illuminate\Database\Eloquent\Collection;

class PageService
{
    /**
     * Get all pages.
     */
    public function getAllPages(): Collection
    {
        return Page::all();
    }

    /**
     * Get page by slug.
     */
    public function getPageBySlug(string $slug): ?Page
    {
        return Page::where('slug', $slug)->first();
    }

    /**
     * Create a new page.
     */
    public function createPage(array $data): Page
    {
        return Page::create($data);
    }

    /**
     * Update an existing page.
     */
    public function updatePage(Page $page, array $data): Page
    {
        $page->update($data);
        return $page;
    }

    /**
     * Delete a page.
     */
    public function deletePage(Page $page): void
    {
        $page->delete();
    }
}
