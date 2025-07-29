<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Routing\Controller;

class ProductController extends Controller
{
    public function index(Request $request)
    {
        \Log::info('Fetching public products', ['params' => $request->all()]);
        $query = Product::with('category');
        if ($request->has('category_id')) {
            $query->where('category_id', $request->category_id);
        }
        if ($request->has('search')) {
            $query->where('name', 'like', '%' . $request->search . '%')
                  ->orWhere('description', 'like', '%' . $request->search . '%');
        }
        $products = $query->paginate(20);
        return response()->json($products);
    }

    public function show($id)
    {
        \Log::info('Fetching product', ['id' => $id]);
        $product = Product::with('category')->findOrFail($id);
        return response()->json($product);
    }
}
