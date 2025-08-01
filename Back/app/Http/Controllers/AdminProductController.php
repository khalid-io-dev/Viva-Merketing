<?php
namespace App\Http\Controllers;

use App\Models\Image;
use App\Models\Product;
use App\Models\Category;
use App\Models\Role;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;
use Illuminate\Validation\Rule;
use Illuminate\Routing\Controller;

class AdminProductController extends Controller
{
    //    public function __construct()
    //    {
    //        $this->middleware(['auth:sanctum', 'role.admin']);
    //    }

    public function index(Request $request)
    {
        Log::info('Fetching admin products', ['params' => $request->all()]);
        try {
            $query = Product::with('category', 'image');
            if ($request->has('category_id')) {
                $query->where('category_id', $request->category_id);
            }
            if ($request->has('search')) {
                $query->where('name', 'like', '%' . $request->search . '%')
                    ->orWhere('description', 'like', '%' . $request->search . '%');
            }
            $products = $query->paginate(20);
            return response()->json($products);
        } catch (\Exception $e) {
            Log::error('Failed to fetch products', [
                'error' => $e->getMessage(),
                'trace' => $e->getTraceAsString(),
            ]);
            return response()->json(['error' => 'Failed to fetch products'], 500);
        }
    }

    public function store(Request $request)
    {
        Log::info('Store product request', ['input' => $request->all(), 'files' => $request->hasFile('image')]);
        try {
            $validated = $request->validate([
                'name' => 'required|string|max:255',
                'description' => 'required|string',
                'price' => 'required|numeric|min:0',
                'stock' => 'required|integer|min:0',
                'image' => 'nullable|image|mimes:jpeg,png,jpg,webp|max:2048',
                'category_id' => 'required|exists:categories,id',
            ]);


            if ($request->hasFile('image')) {
                $validated['image'] = $request->file('image')->store('product_images', 'public');
                Log::info('Image stored', ['path' => $validated['image']]);
            }

            $product = Product::create(['name' => $validated['name'],
            'description' => $validated['description'],
            'price' => $validated['price'],
            'stock' => $validated['stock'],
            'category_id' => $validated['category_id']]);

            $product->image()->create(['name'=> $validated['image']]);

            Log::info('Product created', ['id' => $product->id]);
            return response()->json($product, 201);
        } catch (\Exception $e) {
            Log::error('Failed to store product', [
                'error' => $e->getMessage(),
                'trace' => $e->getTraceAsString(),
            ]);
            return response()->json(['error' => 'Failed to create product'], 500);
        }
    }

    public function update(Request $request, $id)
    {
        Log::info('Update product request', ['id' => $id, 'input' => $request->all()]);
        try {
            $product = Product::findOrFail($id);
            $validated = $request->validate([
                'name' => 'string|max:255',
                'description' => 'string',
                'price' => 'numeric|min:0',
                'stock' => 'integer|min:0',
                'image' => 'nullable|image|mimes:jpeg,png,jpg|max:2048',
                'category_id' => 'exists:categories,id',
            ]);

            if ($request->hasFile('image')) {
                if ($product->image) {
                    Storage::disk('public')->delete($product->image->name);
                    Log::info('Old image deleted', ['path' => $product->image->name]);
                }
                $validated['image'] = $request->file('image')->store('product_images', 'public');
                Log::info('New image stored', ['path' => $validated['image']]);
            }

            $product->update($validated);
            $product->image()->update(['name'=> $validated['image']]);
            Log::info('Product updated', ['id' => $product->id]);
            return response()->json($product);
        } catch (\Exception $e) {
            Log::error('Failed to update product', [
                'error' => $e->getMessage(),
                'trace' => $e->getTraceAsString(),
            ]);
            return response()->json(['error' => 'Failed to update product'], 500);
        }
    }

    public function destroy($id)
    {
        Log::info('Delete product request', ['id' => $id]);
        try {
            $product = Product::findOrFail($id);
            if ($product->image) {
                $path = $product->image;
                Storage::disk('public')->delete($product->image->name);
                Log::info('Image deleted', ['path' => $product->image]);
            }
            $product->delete();
            Log::info('Product deleted', ['id' => $id]);
            return response()->json(['message' => 'Product deleted successfully']);
        } catch (\Exception $e) {
            Log::error('Failed to delete product', [
                'error' => $e->getMessage(),
                'trace' => $e->getTraceAsString(),
            ]);
            return response()->json(['error' => 'Failed to delete product'], 500);
        }
    }

    public function imageDisplay($id){
        try {
            $images = Image::where('product_id', $id)->get();
            Log::info('Image displayed', ['id' => $id]);
            return response()->json($images);
        } catch (\Exception $e) {
            Log::error('Failed to delete product', [
                'error' => $e->getMessage(),
                'trace' => $e->getTraceAsString(),
            ]);
            return response()->json(['error' => 'Failed to display image'], 500);
        }
    }
}
