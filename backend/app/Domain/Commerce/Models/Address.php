<?php

namespace App\Domain\Commerce\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\User;

class Address extends Model
{
    protected $fillable = [
        'user_id', 'recipient_name', 'phone_number', 'full_address', 
        'city', 'postal_code', 'is_primary'
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
