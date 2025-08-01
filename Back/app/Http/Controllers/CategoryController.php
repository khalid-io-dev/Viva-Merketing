<?php

namespace App\Http\Controllers;

use App\Models\Category;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Illuminate\Routing\Controller; // Explicitly import

class CategoryController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:sanctum')->except(['index', 'show']);
        $this->middleware('role:admin')->only(['store', 'update', 'destroy']);
    }

    public function index()
    {
        \Log::info('Fetching categories');
        $categories = Category::withCount('products')->get();
        return response()->json($categories);
    }

    public function show($id)
    {
        $category = Category::with('products')->findOrFail($id);
        return response()->json($category);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255|unique:categories',
        ]);

        $validated['slug'] = Str::slug($validated['name']);
        $category = Category::create($validated);
        return response()->json($category, 201);
    }

    public function update(Request $request, $id)
    {
        $category = Category::findOrFail($id);
        $validated = $request->validate([
            'name' => 'string|max:255|unique:categories,name,' . $id,
        ]);

        if (isset($validated['name'])) {
            $validated['slug'] = Str::slug($validated['name']);
        }

        $category->update($validated);
        return response()->json($category);
    }

    public function destroy($id)
    {
        $category = Category::findOrFail($id);
        if ($category->products()->count() > 0) {
            return response()->json(['error' => 'Cannot delete category with products'], 400);
        }
        $category->delete();
        return response()->json(['message' => 'Category deleted successfully']);
    }



}
