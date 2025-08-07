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
interface item {
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

export default function OrdersManagement() {
    const [orders, setOrders] = useState<Order[]>([]);
    const [updated, setUpdated] = useState(false);
    const [errors, setErrors] = useState<Record<string, string | string[]>>({});
    const [loading, setLoading] = useState(false);
    const [modal, setModalOpen] = useState(false);
    const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
    const admin = authService.isAdmin();

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
    };

    const fetchOrders = async () => {
        try {
            const FetchUrl = admin ? "/admin/orders" : "/orders";
            setLoading(true);
            const data = await makeAuthenticatedRequest(`${API_URL}` + FetchUrl);
            setOrders(admin ? data.data : data);
        } catch (error) {
            console.error("Failed to fetch orders:", error);
            setErrors({ general: "Failed to load orders" });
        } finally {
            setLoading(false);
        }
    };

    const validateInputs = (quantity: number | null): Record<string, string> => {
        const errors: Record<string, string> = {};
        if (quantity === null || quantity <= 0) {
            errors.quantity = "Quantity must be at least 1.";
        }
        return errors;
    };

    useEffect(() => {
        fetchOrders();
    }, []);

    const handleQuantityChange = (itemId: number, newQuantity: number) => {
        if (!selectedOrder) return;

        const updatedItems = selectedOrder.items.map(item =>
            item.id === itemId && item.product.stock >= newQuantity
                ? { ...item, quantity: newQuantity }
                : item
        );

        const newErrors = validateInputs(newQuantity);
        setErrors(newErrors);

        setSelectedOrder(prevOrder => {
            if (!prevOrder) return null;
            return {
                ...prevOrder,
                items: updatedItems
            };
        });
    };

    const handleStatusChange = (newStatus: string) => {
        setSelectedOrder(prevState => {
            if (!prevState) return null;
            return {
                ...prevState,
                status: newStatus
            };
        });
    };

    const handleSave = async () => {
        if (!selectedOrder) return;

        let hasError = false;
        const collectedErrors: Record<string, string> = {};

        for (const item of selectedOrder.items) {
            const validationErrors = validateInputs(item.quantity);
            if (Object.keys(validationErrors).length > 0) {
                hasError = true;
                collectedErrors[item.id.toString()] = validationErrors.quantity;
            }
        }

        if (hasError) {
            setErrors(collectedErrors);
            console.warn("Validation errors found");
            return;
        }

        try {
            const data = {
                status: selectedOrder.status,
                items: selectedOrder.items
            };

            setLoading(true);
            const result = await makeAuthenticatedRequest(`${API_URL}/orders/` + selectedOrder.id, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            });

            await fetchOrders();
            setErrors({});
            setModalOpen(false);
            console.log("Order updated:", result);
            setUpdated(true);
        } catch (error: any) {
            console.error("Failed to update order:", error);
            try {
                const errorData = JSON.parse(error.message);
                setErrors(errorData);
            } catch {
                setErrors({ general: error.message || "Failed to update order" });
            }
        } finally {
            setLoading(false);
            setTimeout(() => setUpdated(false), 3000);
        }
    };



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

            {updated && !loading && (
                <div className="pb-6 w-auto rounded-3xl justify-center h-auto ">
                    <div className="mb-6 p-4 bg-gradient-to-r from-emerald-50 to-emerald-50 border border-emerald-200/50 text-emerald-700 rounded-xl shadow-lg backdrop-blur-sm">
                        <div className="flex items-center">
                            <svg
                                className="w-5 h-5 mr-3 text-emerald-500"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <p className="text-center">Order updated.</p>
                        </div>
                    </div>
                </div>
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
                                    {admin ? (
                                        <button
                                        onClick={() => {
                                            setSelectedOrder(order);
                                            setModalOpen(true);
                                        }}
                                        className="px-3 py-1 border border-gray-400 text-gray-700 rounded hover:bg-gray-100"
                                    >
                                        Edit
                                    </button>
                                        ) :
                                        <button
                                            onClick={() => {
                                                setSelectedOrder(order);
                                                setModalOpen(true);
                                            }}
                                            className="px-3 py-1 border border-gray-400 text-gray-700 rounded hover:bg-gray-100"
                                        >
                                            Details
                                        </button>}
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            )}


            {/* Error Message */}
            {errors.general && (
                <div className="mb-6 p-4 bg-gradient-to-r from-red-50 to-pink-50 border border-red-200/50 text-red-700 rounded-xl shadow-lg backdrop-blur-sm">
                    <div className="flex items-center">
                        <svg className="w-5 h-5 mr-3 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        {Array.isArray(errors.general) ? errors.general[0] : errors.general}
                    </div>
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
                                    <th className="px-4 py-3">Status</th>
                                </tr>
                                </thead>
                                <tbody>
                                <tr>
                                    <td className="px-4 py-2">{selectedOrder.id}</td>
                                    <td className="px-4 py-2">{selectedOrder.created_at}</td>
                                    <td className="px-4 py-2">
                                        <select className="bg-white" defaultValue={selectedOrder.status}
                                                id="status"
                                                onChange={((e) => {
                                                    handleStatusChange(e.target.value)
                                                })}
                                                disabled={!admin}
                                                >
                                            <option value="pending" id="statusOP">pending</option>
                                            <option value="paid" id="statusOP">paid</option>
                                            <option value="shipped" id="statusOP">shipped</option>
                                        </select>
                                    </td>
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

                                    {!loading && selectedOrder.items.length === 0 && (
                                        <div className="text-center text-gray-600">No items found.</div>
                                    )}

                                    {selectedOrder.items.map((productItem, index) => (
                                        <tr key={index} className="border-b hover:bg-gray-50">
                                            <td className="px-4 py-2">{productItem.product.id}</td>
                                            <td className="px-4 py-2">{productItem.product.name}</td>
                                            <td className="px-4 py-2">{productItem.product.price} €</td>
                                            <td className="px-4 py-2">
                                                <input
                                                    type="number"
                                                    min={0}
                                                    max={productItem.product.stock}
                                                    className="w-16 bg-white border rounded px-2 py-1 text-center"
                                                    value={productItem.quantity}
                                                    onChange={(e) => handleQuantityChange(productItem.id, parseInt(e.target.value))}
                                                    disabled={!admin}
                                                />
                                            </td>

                                        </tr>
                                    ))}

                                    </tbody>
                                </table>
                            </div>
                            {errors.quantity && modal && (
                                <div className="flex items-center text-red-700">
                                    <svg className="w-5 h-5 mr-3 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                    {Array.isArray(errors.quantity) ? errors.quantity[0] : errors.quantity}
                                </div>
                            )}


                            <div className="flex flex-row items-center justify-center pt-8">
                                <table className="w-full text-sm text-center text-gray-700 border border-gray-300 rounded-xl mb-6 w-48">
                                    <thead className="text-xs text-gray-600 uppercase bg-gray-100 border-b">
                                    <tr>
                                        <th>Total price</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    <tr>
                                        <td>
                                            {selectedOrder.total_price}
                                        </td>
                                    </tr>
                                    </tbody>
                                </table>
                            </div>
                            <div className="flex justify-end space-x-3 pt-6 border-t border-gray-200">
                                <button onClick={() => {
                                    setModalOpen(false);
                                    setErrors({})
                                }} className="px-5 py-2 border rounded-xl text-gray-600 hover:bg-gray-100">
                                    Close
                                </button>
                                {admin && (<button onClick={()=> {
                                    if (!errors.quantity){
                                        handleSave()
                                        setModalOpen(false)
                                    }

                                }} className="px-5 py-2 border rounded-xl text-gray-600 hover:bg-gray-100">
                                    Save
                                </button>)}

                            </div>

                        </div>
                    </div>
                </div>
            )}
        </section>
    );
}
