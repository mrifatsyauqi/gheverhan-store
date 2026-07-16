<?php

namespace App\Domain\CMS\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use App\Models\User;

class Page extends Model
{
    protected $fillable = [
        'title',
        'slug',
        'summary',
        'body',
        'featured_image',
        'seo_metadata',
        'status',
        'type',
        'configuration',
        'author_id',
        'published_at',
    ];

    protected $casts = [
        'seo_metadata' => 'array',
        'configuration' => 'array',
        'published_at' => 'datetime',
    ];

    /**
     * Get the author of the page.
     */
    public function author(): BelongsTo
    {
        return $this->belongsTo(User::class, 'author_id');
    }
}
