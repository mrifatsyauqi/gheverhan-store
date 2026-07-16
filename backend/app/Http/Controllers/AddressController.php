<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Domain\Commerce\Models\Address;

class AddressController extends Controller
{
    public function index(Request $request)
    {
        $addresses = Address::where('user_id', $request->user()->id)->get();

        return response()->json([
            'success' => true,
            'message' => 'Addresses fetched successfully',
            'data' => $addresses,
            'errors' => null,
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'recipient_name' => 'required|string|max:255',
            'phone_number' => 'required|string|max:20',
            'full_address' => 'required|string',
            'city' => 'required|string|max:255',
            'postal_code' => 'required|string|max:20',
            'is_primary' => 'boolean',
        ]);

        if ($request->is_primary) {
            Address::where('user_id', $request->user()->id)->update(['is_primary' => false]);
        }

        $address = Address::create([
            ...$validated,
            'user_id' => $request->user()->id,
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Address created successfully',
            'data' => $address,
            'errors' => null,
        ]);
    }

    public function destroy(Request $request, $id)
    {
        $address = Address::where('user_id', $request->user()->id)->where('id', $id)->first();
        
        if ($address) {
            $address->delete();
        }

        return response()->json([
            'success' => true,
            'message' => 'Address deleted successfully',
            'data' => null,
            'errors' => null,
        ]);
    }
}
