import {useEffect, useState} from "react";
import {authService} from "../../services/AuthService.tsx";
import {API_URL, makeAuthenticatedRequest} from "../../services/Requests.tsx";

interface product {
    id: number;
    name: string;
    description: string;
    price: number;
    stock: number;
    category_id: number;
}
interface item{
    id: number;
    order_id: number;
    product_id: string;
    quantity: number;
    price_at_time: number;
    product: product;
}
interface Order {
    id: number;
    user_id: number;
    total_price: number;
    created_at: string;
    status: string;
    items: item[];
}

export default function OrdersManagement(){
    const [orders, setOrders] = useState<Order[]>([])
    const [errors, setErrors] = useState<Record<string, string | string[]>>({});
    const [loading, setLoading] = useState(false);
    const [modal, setModalOpen] = useState(false);
    const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
    const admin = authService.isAdmin();
    const [editOrder, setEditOrder] = useState(false);

    const handleDeleteOrder = async (id: number) => {
        if (!confirm("Do you really want to delete this order ?")) return;
        if (!admin) return;
        try {
            setLoading(true);
            await makeAuthenticatedRequest(`${API_URL}/admin/orders/` + id, { method: "DELETE" });
            await fetchOrders();
            alert("Order deleted !");
        } catch (error: any) {
            console.error("Failed to delete order:", error);
            setErrors({ general: error.message || "Failed to delete order" });
        } finally {
            setLoading(false);
        }
    }

    const fetchOrders = async () => {
        try {
            let FetchUrl = authService.isAdmin() ? "/admin/orders" : "/orders";
            setLoading(true);
            const data = await makeAuthenticatedRequest(`${API_URL}` + FetchUrl);
            setOrders(authService.isAdmin() ? data.data : data);
        } catch (error) {
            console.error("Failed to fetch orders:", error);
            setErrors({ general: "Failed to load orders" });
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchOrders()
    }, []);

    return (
        <section className="antialiased  p-12 w-full h-full">
            {loading && (
                <div className="text-center">
                    <div className="inline-flex items-center space-x-3">
                        <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
                        <span className="text-slate-600 font-medium">Loading orders...</span>
                    </div>
                </div>
            )}

            {!loading && orders.length === 0 && (
                <div className="text-center text-gray-600">No order found.</div>
            )}

            {!loading && orders.length > 0 && (
                <div className="mx-auto max-w-5xl">
                    <div className="pb-10">
                        <h1 className="text-4xl font-bold bg-gradient-to-r  from-slate-800 text-gray-50 mb-2">
                            {admin ? "ORDERS MANAGEMENT" : "My orders"}
                        </h1>
                        <p className="text-slate-600 text-lg">Manage all the orders in this page.</p>
                    </div>

                    <table className="w-full text-sm text-left text-gray-700 border border-gray-300 rounded-xl">
                        <thead className="text-xs text-gray-600 uppercase bg-gray-100 border-b">
                        <tr>
                            <th className="px-4 py-3">Order ID</th>
                            <th className="px-4 py-3">Date</th>
                            <th className="px-4 py-3">Price</th>
                            <th className="px-4 py-3">Status</th>
                            <th className="px-4 py-3">Actions</th>
                        </tr>
                        </thead>
                        <tbody>
                        {orders.map((order) => (
                            <tr key={order.id} className="border-b">
                                <td className="px-4 py-2">{order.id}</td>
                                <td className="px-4 py-2">{order.created_at}</td>
                                <td className="px-4 py-2">{order.total_price}</td>
                                <td className="px-4 py-2">{order.status}</td>
                                <td className="px-4 py-2 space-x-2">
                                    {admin && (
                                        <button
                                            onClick={() => handleDeleteOrder(order.id)}
                                            className="px-3 py-1 border border-red-700 text-red-700 rounded hover:bg-red-700 hover:text-white"
                                        >
                                            Cancel
                                        </button>
                                    )}
                                    <button
                                        onClick={() => {
                                            setSelectedOrder(order);
                                            setModalOpen(true);
                                        }}
                                        className="px-3 py-1 border border-gray-400 text-gray-700 rounded hover:bg-gray-100"
                                    >
                                        View
                                    </button>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            )}

            {modal && selectedOrder && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center z-50 p-4">
                    <div className="bg-white rounded-2xl w-full max-w-2xl shadow-lg border border-white/20 max-h-[90vh] overflow-y-auto">
                        <div className="p-8">
                            <div className="flex items-center justify-between mb-6">
                                <h2 className="text-2xl font-bold text-gray-800">Order Details</h2>
                                <button onClick={() => setModalOpen(false)} className="text-gray-500 hover:text-gray-700">
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </div>
                            <table className="w-full text-sm text-left text-gray-700 border border-gray-300 rounded-xl mb-6">
                                <thead className="text-xs text-gray-600 uppercase bg-gray-100 border-b">
                                <tr>
                                    <th className="px-4 py-3">Order ID</th>
                                    <th className="px-4 py-3">Date</th>
                                    <th className="px-4 py-3">Price</th>
                                    <th className="px-4 py-3">Status</th>
                                </tr>
                                </thead>
                                <tbody>
                                <tr>
                                    <td className="px-4 py-2">{selectedOrder.id}</td>
                                    <td className="px-4 py-2">{selectedOrder.created_at}</td>
                                    <td className="px-4 py-2">{selectedOrder.total_price}</td>
                                    <td className="px-4 py-2">{selectedOrder.status}</td>
                                </tr>
                                </tbody>
                            </table>
                            <div className="text-gray-700">
                                <label className="block text-sm font-medium text-gray-700 mb-1">Order products</label>
                                <table className="w-full text-sm text-left text-gray-700 border border-gray-300 rounded-xl">
                                    <thead className="text-xs text-gray-600 uppercase bg-gray-100 border-b">
                                    <tr>
                                        <th className="px-4 py-3">ID</th>
                                        <th className="px-4 py-3">Name</th>
                                        <th className="px-4 py-3">Price</th>
                                        <th className="px-4 py-3">Quantity</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {selectedOrder.items.map((productItem, index) => (
                                        <tr key={index} className="border-b hover:bg-gray-50">
                                            <td className="px-4 py-2">{productItem.product.id}</td>
                                            <td className="px-4 py-2">{productItem.product.name}</td>
                                            <td className="px-4 py-2">{productItem.product.price} €</td>
                                            <td className="px-4 py-2">{productItem.quantity}</td>
                                        </tr>
                                    ))}
                                    </tbody>
                                </table>
                            </div>
                            <div className="flex justify-end space-x-3 pt-6 border-t border-gray-200">
                                <button onClick={() => setModalOpen(false)} className="px-5 py-2 border rounded-xl text-gray-600 hover:bg-gray-100">
                                    Edit
                                </button>
                                <button onClick={() => setEditOrder(true)} className="px-5 py-2 border rounded-xl text-gray-600 hover:bg-gray-100">
                                    Close
                                </button>
                            </div>

                        </div>
                    </div>
                </div>
            )}
        </section>
    );
}
