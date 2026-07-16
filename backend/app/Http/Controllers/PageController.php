<?php

namespace App\Http\Controllers;

use App\Domain\CMS\Services\PageService;
use App\Traits\ApiResponse;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class PageController extends Controller
{
    use ApiResponse;

    protected PageService $pageService;

    public function __construct(PageService $pageService)
    {
        $this->pageService = $pageService;
    }

    public function index(): JsonResponse
    {
        $pages = $this->pageService->getAllPages();
        return $this->success($pages, 'Pages retrieved successfully.');
    }

    public function show(string $slug): JsonResponse
    {
        $page = $this->pageService->getPageBySlug($slug);
        
        if (!$page) {
            return $this->error('Page not found.', 404);
        }

        return $this->success($page, 'Page retrieved successfully.');
    }

    public function store(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'slug' => 'required|string|unique:pages,slug',
            'summary' => 'nullable|string',
            'body' => 'nullable|string',
            'featured_image' => 'nullable|string',
            'seo_metadata' => 'nullable|array',
            'status' => 'required|string',
            'type' => 'required|string',
            'configuration' => 'nullable|array',
        ]);

        $page = $this->pageService->createPage($validated);
        return $this->success($page, 'Page created successfully.', 201);
    }
}
