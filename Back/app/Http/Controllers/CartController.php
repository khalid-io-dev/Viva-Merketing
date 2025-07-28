<?php

namespace App\Http\Controllers;

use App\Models\Cart;
use App\Models\CartItem;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class CartController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:api');
    }

    public function index(Request $request)
    {
        $cart = $request->user()->cart()->with('items.product')->first();
        if (!$cart) {
            $cart = Cart::create(['user_id' => $request->user()->id]);
        }
        return response()->json($cart);
    }

    public function addItem(Request $request)
    {
        $validated = $request->validate([
            'product_id' => 'required|exists:products,id',
            'quantity' => 'required|integer|min:1',
        ]);

        $product = Product::findOrFail($validated['product_id']);
        if ($product->stock < $validated['quantity']) {
            return response()->json(['error' => 'Insufficient stock'], 400);
        }

        $cart = $request->user()->cart()->firstOrCreate(['user_id' => $request->user()->id]);

        $cartItem = $cart->items()->updateOrCreate(
            ['product_id' => $validated['product_id']],
            ['quantity' => $validated['quantity'], 'price_at_time' => $product->price]
        );

        return response()->json($cart->load('items.product'), 201);
    }

    public function updateItem(Request $request, $itemId)
    {
        $validated = $request->validate([
            'quantity' => 'required|integer|min:1',
        ]);

        $cartItem = CartItem::where('cart_id', $request->user()->cart->id)
            ->where('id', $itemId)
            ->firstOrFail();

        $product = Product::findOrFail($cartItem->product_id);
        if ($product->stock < $validated['quantity']) {
            return response()->json(['error' => 'Insufficient stock'], 400);
        }

        $cartItem->update(['quantity' => $validated['quantity']]);
        return response()->json($cartItem->cart->load('items.product'));
    }

    public function removeItem($itemId)
    {
        $cartItem = CartItem::where('cart_id', Auth::user()->cart->id)
            ->where('id', $itemId)
            ->firstOrFail();
        $cartItem->delete();
        return response()->json(['message' => 'Item removed from cart']);
    }

    public function clear(Request $request)
    {
        $cart = $request->user()->cart()->firstOrFail();
        $cart->items()->delete();
        return response()->json(['message' => 'Cart cleared']);
    }
}