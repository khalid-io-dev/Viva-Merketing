<?php

namespace App\Http\Controllers;

use App\Models\Order;
use App\Models\OrderItem;
use Illuminate\Routing\Controller;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class OrderController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:api');
    }

    public function index(Request $request)
    {
        $user = $request->user();
        $orders = $user->orders()->with(['items.product'])->get();

        return response()->json($orders);
    }

    public function show($id)
    {
        $order = Order::with(['user', 'items.product'])->findOrFail($id);
        $this->authorize('view', $order);
        return response()->json($order);
    }

    public function store(Request $request)
    {
        $user = $request->user();
        $cart = $user->cart()->with('items.product')->firstOrFail();

        if ($cart->items->isEmpty()) {
            return response()->json(['error' => 'Cart is empty'], 400);
        }

        $totalPrice = $cart->items->sum(function ($item) {
            return $item->quantity * $item->product->price;
        });

        DB::beginTransaction();
        try {
            $order = Order::create([
                'user_id' => $user->id,
                'total_price' => $totalPrice,
                'status' => 'pending',
            ]);

            foreach ($cart->items as $item) {
                OrderItem::create([
                    'order_id' => $order->id,
                    'product_id' => $item->product_id,
                    'quantity' => $item->quantity,
                    'price_at_time' => $item->product->price,
                ]);

                $product = Product::find($item->product_id);
                $product->decrement('stock', $item->quantity);
            }

            $cart->items()->delete();
            DB::commit();
            return response()->json($order->load('items.product'), 201);
        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json(['error' => 'Order creation failed'], 500);
        }
    }
    public function update(Request $request, $id)
    {
        //$this->authorize('update', Order::class);
        $order = Order::findOrFail($id);

        if ($request->has('status')) {
            $order->status = $request->input('status');
            $order->save();
        }

        if ($request->has('items')) {
            foreach ($request->input('items') as $itemData) {
                $item = OrderItem::find($itemData['id']);
                if ($item && $item->order_id == $order->id) {
                    $item->quantity = $itemData['quantity'];
                    $item->save();
                }
            }
        }

        return response()->json(['message' => 'Order updated successfully']);
    }


    public function destroy($id)
    {
        $this->authorize('delete', Order::class);
        $order = Order::findOrFail($id);
        DB::beginTransaction();
        try {
            $order->items()->delete();
            $order->delete();
            DB::commit();
            return response()->json(['message' => 'Order deleted successfully']);
        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json(['error' => 'Order deletion failed'], 500);
        }
    }
}
