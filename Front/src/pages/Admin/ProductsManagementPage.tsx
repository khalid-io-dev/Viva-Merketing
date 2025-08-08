import { useState, useEffect } from "react";
import { authService } from "../../services/AuthService";
import {makeAuthenticatedRequest, API_URL} from "../../services/Requests.tsx";

interface Product {
    id: number;
    name: string;
    description: string;
    price: number;
    stock: number;
    image: { id: number; name: string }[];
    category_id: number;
    category: { id: number; name: string };
}

interface Category {
    id: number;
    name: string;
    products_count: number;
}

interface FormData {
    name: string;
    description: string;
    price: string;
    stock: string;
    image: File[] | null;
    category_id: string;
}

interface PaginatedResponse {
    data: Product[];
    current_page: number;
    last_page: number;
}


export default function ProductsManagementPage() {
    const [products, setProducts] = useState<Product[]>([]);
    const [categories, setCategories] = useState<Category[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [search, setSearch] = useState("");
    const [categoryFilter, setCategoryFilter] = useState("");
    const [modalOpen, setModalOpen] = useState(false);
    const [editProduct, setEditProduct] = useState<Product | null>(null);
    const [formData, setFormData] = useState<FormData>({
        name: "",
        description: "",
        price: "",
        stock: "",
        image: [],
        category_id: "",
    });
    const [errors, setErrors] = useState<Record<string, string | string[]>>({});
    const [loading, setLoading] = useState(false);

    // Check admin access
    useEffect(() => {
        if (!authService.isAuthenticated()) {
            setErrors({ general: "Please log in to access this page" });
        } else if (!authService.isAdmin()) {
            setErrors({ general: "Unauthorized: Admin access required" });
        }
    }, []);

    // Fetch categories
    useEffect(() => {
        const fetchCategories = async () => {
            try {
                console.log("🔍 Fetching categories from:", `${API_URL}/categories`);
                const response = await fetch(`${API_URL}/categories`, {
                    headers: { Accept: "application/json" },
                });
                if (!response.ok) {
                    throw new Error(`HTTP ${response.status}: ${response.statusText}`);
                }
                const data = await response.json();
                setCategories(data);
            } catch (error) {
                console.error("Failed to fetch categories:", error);
                setErrors({ general: "Failed to load categories" });
            }
        };
        fetchCategories();
    }, []);

    // Fetch products
    const fetchProducts = async () => {
        try {
            setLoading(true);
            const data = await makeAuthenticatedRequest(`${API_URL}/admin/products?page=1`);
            setProducts(data.data); // Adjust based on your pagination response
        } catch (error) {
            console.error("Failed to fetch products:", error);
            setErrors({ general: "Failed to load products" });
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (authService.isAuthenticated() && authService.isAdmin()) {
            fetchProducts();
        } else {
            setErrors({ general: "Please log in as admin" });
        }
    }, []);

    const handleAddEdit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!authService.isAdmin()) {
            setErrors({ general: "Unauthorized: Admin access required" });
            return;
        }
        setErrors({});
        setLoading(true);

        try {
            const data = new FormData();
            data.append("name", formData.name);
            data.append("description", formData.description);
            data.append("price", formData.price);
            data.append("stock", formData.stock);
            data.append("category_id", formData.category_id);

            if (formData.image) {
                formData.image.forEach((file) => {
                    data.append("image[]", file);
                });
            }

            // For Laravel, we need to add _method for PUT requests
            if (editProduct) {
                data.append("_method", "PUT");
            }

            const url = editProduct ? `${API_URL}/admin/products/${editProduct.id}` : `${API_URL}/admin/products`;
            console.log("🔍 Submitting to:", url);

            const result = await makeAuthenticatedRequest(url, {
                method: "POST", // Always POST, Laravel will handle _method
                body: data,
            });

            console.log("🔍 Submit response:", result);
            fetchProducts(currentPage);
            setModalOpen(false);
            setFormData({ name: "", description: "", price: "", stock: "", image: [], category_id: "" });
            setEditProduct(null);
        } catch (error: any) {
            console.error("Failed to save product:", error);
            try {
                const errorData = JSON.parse(error.message);
                setErrors(errorData);
            } catch {
                setErrors({ general: error.message || "Failed to save product" });
            }
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id: number) => {
        if (!confirm("Are you sure you want to delete this product?")) return;
        if (!authService.isAdmin()) {
            setErrors({ general: "Unauthorized: Admin access required" });
            return;
        }
        setLoading(true);
        try {
            console.log("🔍 Deleting product:", `${API_URL}/admin/products/${id}`);
            const result = await makeAuthenticatedRequest(`${API_URL}/admin/products/${id}`, {
                method: "DELETE",
            });
            console.log("🔍 Delete response:", result);
            fetchProducts(currentPage);
        } catch (error: any) {
            console.error("Failed to delete product:", error);
            setErrors({ general: error.message || "Failed to delete product" });
        } finally {
            setLoading(false);
        }
    };

    const openAddModal = () => {
        setEditProduct(null);
        setFormData({ name: "", description: "", price: "", stock: "", image: null, category_id: "" });
        setErrors({});
        setModalOpen(true);
    };

    const openEditModal = (product: Product) => {
        setEditProduct(product);
        setFormData({
            name: product.name,
            description: product.description,
            price: product.price.toString(),
            stock: product.stock.toString(),
            image: null,
            category_id: product.category_id.toString(),
        });
        setErrors({});
        setModalOpen(true);
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        setErrors({ ...errors, [name]: "" });
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files ? Array.from(e.target.files) : null;
        setFormData({ ...formData, image: file });
        setErrors({ ...errors, image: "" });
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
            <div className="max-w-7xl mx-auto p-6">
                {/* Header Section */}
                <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-8 mb-8">
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-4xl font-bold bg-gradient-to-r from-slate-800 via-blue-800 to-indigo-800 bg-clip-text text-transparent mb-2">
                                Products Management
                            </h1>
                            <p className="text-slate-600 text-lg">Manage your inventory with style and precision</p>
                        </div>
                        <div className="hidden md:flex items-center space-x-4">
                            <div className="bg-gradient-to-r from-blue-500 to-indigo-600 p-3 rounded-full">
                                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                                </svg>
                            </div>
                        </div>
                    </div>
                </div>

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

                {/* Filters Section */}
                {authService.isAdmin() && (
                    <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-6 mb-8">
                        <div className="flex flex-col lg:flex-row gap-4">
                            <div className="flex-1 relative">
                                <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                </svg>
                                <input
                                    type="text"
                                    placeholder="Search products by name or description..."
                                    value={search}
                                    onChange={(e) => {
                                        setSearch(e.target.value);
                                        setCurrentPage(1);
                                    }}
                                    className="w-full pl-10 pr-4 py-3 bg-white/60 backdrop-blur-sm border border-slate-200/50 rounded-xl text-slate-700 placeholder-slate-400 focus:border-blue-400 focus:outline-none focus:ring-4 focus:ring-blue-100 transition-all duration-200"
                                    disabled={loading}
                                />
                            </div>

                            <div className="lg:w-64 relative">
                                <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14-4l-3 4 3 4M9 7l-3 4 3 4" />
                                </svg>
                                <select
                                    value={categoryFilter}
                                    onChange={(e) => {
                                        setCategoryFilter(e.target.value);
                                        setCurrentPage(1);
                                    }}
                                    className="w-full pl-10 pr-4 py-3 bg-white/60 backdrop-blur-sm border border-slate-200/50 rounded-xl text-slate-700 focus:border-blue-400 focus:outline-none focus:ring-4 focus:ring-blue-100 transition-all duration-200 appearance-none"
                                    disabled={loading}
                                >
                                    <option value="">All Categories</option>
                                    {categories.map((category) => (
                                        <option key={category.id} value={category.id}>
                                            {category.name} ({category.products_count})
                                        </option>
                                    ))}
                                </select>
                                <svg className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                </svg>
                            </div>

                            <button
                                onClick={openAddModal}
                                className="lg:w-auto px-6 py-3 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white rounded-xl hover:from-blue-700 hover:via-indigo-700 hover:to-purple-700 disabled:from-slate-400 disabled:to-slate-500 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 flex items-center justify-center space-x-2 font-medium"
                                disabled={loading}
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                                </svg>
                                <span>Add Product</span>
                            </button>
                        </div>
                    </div>
                )}

                {/* Products Grid/Table */}
                {authService.isAdmin() && (
                    <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 overflow-hidden">
                        {loading && (
                            <div className="p-8 text-center">
                                <div className="inline-flex items-center space-x-3">
                                    <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
                                    <span className="text-slate-600 font-medium">Loading products...</span>
                                </div>
                            </div>
                        )}

                        <div className="overflow-x-auto">
                            <table className="min-w-full">
                                <thead>
                                <tr className="bg-gradient-to-r from-slate-50 to-blue-50 backdrop-blur-sm">
                                    <th className="py-4 px-6 text-left text-sm font-semibold text-slate-700 uppercase tracking-wider">Image</th>
                                    <th className="py-4 px-6 text-left text-sm font-semibold text-slate-700 uppercase tracking-wider">Product</th>
                                    <th className="py-4 px-6 text-left text-sm font-semibold text-slate-700 uppercase tracking-wider">Category</th>
                                    <th className="py-4 px-6 text-left text-sm font-semibold text-slate-700 uppercase tracking-wider">Price</th>
                                    <th className="py-4 px-6 text-left text-sm font-semibold text-slate-700 uppercase tracking-wider">Stock</th>
                                    <th className="py-4 px-6 text-left text-sm font-semibold text-slate-700 uppercase tracking-wider">Actions</th>
                                </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100">
                                {products.length === 0 && !loading ? (
                                    <tr>
                                        <td colSpan={6} className="py-12 px-6 text-center">
                                            <div className="flex flex-col items-center space-y-3">
                                                <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center">
                                                    <svg className="w-8 h-8 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                                                    </svg>
                                                </div>
                                                <div className="text-slate-500 font-medium">No products found</div>
                                                <div className="text-slate-400 text-sm">Try adjusting your search or filters</div>
                                            </div>
                                        </td>
                                    </tr>
                                ) : (
                                    products.map((product) => (
                                        <tr key={product.id} className="hover:bg-blue-50/50 transition-colors duration-150">
                                            <td className="py-4 px-6">
                                                <div className="relative">
                                                    {product.image ?  (
                                                        <img
                                                            src={"http://localhost:8000/storage/" + product.image[0].name}
                                                            alt={product.name}
                                                            className="w-16 h-16 object-cover rounded-xl shadow-md ring-2 ring-white"
                                                        />
                                                    ) : (
                                                        <div className="w-16 h-16 bg-gradient-to-br from-slate-100 to-slate-200 rounded-xl flex items-center justify-center shadow-md ring-2 ring-white">
                                                            <svg className="w-6 h-6 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                                            </svg>
                                                        </div>
                                                    )}
                                                </div>
                                            </td>
                                            <td className="py-4 px-6">
                                                <div>
                                                    <div className="font-semibold text-slate-800">{product.name}</div>
                                                    <div className="text-sm text-slate-500 line-clamp-2">{product.description}</div>
                                                </div>
                                            </td>
                                            <td className="py-4 px-6">
                          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                            {product.category.name}
                          </span>
                                            </td>
                                            <td className="py-4 px-6">
                                                <span className="font-bold text-slate-800">${Number(product.price).toFixed(2)}</span>
                                            </td>
                                            <td className="py-4 px-6">
                          <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                              product.stock > 10
                                  ? 'bg-green-100 text-green-800'
                                  : product.stock > 0
                                      ? 'bg-yellow-100 text-yellow-800'
                                      : 'bg-red-100 text-red-800'
                          }`}>
                            {product.stock} units
                          </span>
                                            </td>
                                            <td className="py-4 px-6">
                                                <div className="flex items-center space-x-3">
                                                    <button
                                                        onClick={() => openEditModal(product)}
                                                        className="inline-flex items-center px-3 py-1.5 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors duration-150 text-sm font-medium"
                                                        disabled={loading}
                                                    >
                                                        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                                        </svg>
                                                        Edit
                                                    </button>
                                                    <button
                                                        onClick={() => handleDelete(product.id)}
                                                        className="inline-flex items-center px-3 py-1.5 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors duration-150 text-sm font-medium"
                                                        disabled={loading}
                                                    >
                                                        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                        </svg>
                                                        Delete
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}

                {/* Pagination */}
                {authService.isAdmin() && totalPages > 1 && (
                    <div className="mt-8 bg-white/70 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-6">
                        <div className="flex justify-between items-center">
                            <button
                                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                                disabled={currentPage === 1 || loading}
                                className="inline-flex items-center px-4 py-2 bg-white/60 border border-slate-200/50 rounded-lg disabled:bg-slate-100 disabled:text-slate-400 text-slate-700 hover:bg-white transition-all duration-150 shadow-sm"
                            >
                                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                                </svg>
                                Previous
                            </button>

                            <div className="flex items-center space-x-2">
                <span className="text-slate-600 font-medium">
                  Page {currentPage} of {totalPages}
                </span>
                            </div>

                            <button
                                onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                                disabled={currentPage === totalPages || loading}
                                className="inline-flex items-center px-4 py-2 bg-white/60 border border-slate-200/50 rounded-lg disabled:bg-slate-100 disabled:text-slate-400 text-slate-700 hover:bg-white transition-all duration-150 shadow-sm"
                            >
                                Next
                                <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                </svg>
                            </button>
                        </div>
                    </div>
                )}

                {/* Modal */}
                {modalOpen && (
                    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center z-50 p-4">
                        <div className="bg-white/95 backdrop-blur-sm rounded-2xl w-full max-w-2xl shadow-2xl border border-white/20 max-h-[90vh] overflow-y-auto">
                            <div className="p-8">
                                <div className="flex items-center justify-between mb-6">
                                    <h2 className="text-3xl font-bold text-slate-800">
                                        {editProduct ? "Edit Product" : "Add New Product"}
                                    </h2>
                                    <button
                                        onClick={() => setModalOpen(false)}
                                        className="p-2 hover:bg-slate-100 rounded-lg transition-colors duration-150"
                                        disabled={loading}
                                    >
                                        <svg className="w-6 h-6 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                        </svg>
                                    </button>
                                </div>

                                <form onSubmit={handleAddEdit} className="space-y-6">
                                    <div>
                                        <label className="block text-sm font-semibold text-slate-700 mb-2">Product Name</label>
                                        <input
                                            type="text"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleInputChange}
                                            className="w-full px-4 py-3 bg-white/60 backdrop-blur-sm border border-slate-200/50 rounded-xl text-slate-700 placeholder-slate-400 focus:border-blue-400 focus:outline-none focus:ring-4 focus:ring-blue-100 transition-all duration-200"
                                            placeholder="Enter product name..."
                                            required
                                            disabled={loading}
                                        />
                                        {errors.name && (
                                            <div className="mt-2 text-red-600 text-sm flex items-center">
                                                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                </svg>
                                                {Array.isArray(errors.name) ? errors.name[0] : errors.name}
                                            </div>
                                        )}
                                    </div>

                                    <div>
                                        <label className="block text-sm font-semibold text-slate-700 mb-2">Description</label>
                                        <textarea
                                            name="description"
                                            value={formData.description}
                                            onChange={handleInputChange}
                                            rows={4}
                                            className="w-full px-4 py-3 bg-white/60 backdrop-blur-sm border border-slate-200/50 rounded-xl text-slate-700 placeholder-slate-400 focus:border-blue-400 focus:outline-none focus:ring-4 focus:ring-blue-100 transition-all duration-200 resize-none"
                                            placeholder="Describe your product..."
                                            required
                                            disabled={loading}
                                        />
                                        {errors.description && (
                                            <div className="mt-2 text-red-600 text-sm flex items-center">
                                                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                </svg>
                                                {Array.isArray(errors.description) ? errors.description[0] : errors.description}
                                            </div>
                                        )}
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div>
                                            <label className="block text-sm font-semibold text-slate-700 mb-2">Price ($)</label>
                                            <div className="relative">
                                                <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-500 font-medium">$</span>
                                                <input
                                                    type="number"
                                                    name="price"
                                                    value={formData.price}
                                                    onChange={handleInputChange}
                                                    step="0.01"
                                                    min="0"
                                                    className="w-full pl-8 pr-4 py-3 bg-white/60 backdrop-blur-sm border border-slate-200/50 rounded-xl text-slate-700 placeholder-slate-400 focus:border-blue-400 focus:outline-none focus:ring-4 focus:ring-blue-100 transition-all duration-200"
                                                    placeholder="0.00"
                                                    required
                                                    disabled={loading}
                                                />
                                            </div>
                                            {errors.price && (
                                                <div className="mt-2 text-red-600 text-sm flex items-center">
                                                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                    </svg>
                                                    {Array.isArray(errors.price) ? errors.price[0] : errors.price}
                                                </div>
                                            )}
                                        </div>

                                        <div>
                                            <label className="block text-sm font-semibold text-slate-700 mb-2">Stock Quantity</label>
                                            <input
                                                type="number"
                                                name="stock"
                                                value={formData.stock}
                                                onChange={handleInputChange}
                                                min="0"
                                                className="w-full px-4 py-3 bg-white/60 backdrop-blur-sm border border-slate-200/50 rounded-xl text-slate-700 placeholder-slate-400 focus:border-blue-400 focus:outline-none focus:ring-4 focus:ring-blue-100 transition-all duration-200"
                                                placeholder="Enter stock quantity..."
                                                required
                                                disabled={loading}
                                            />
                                            {errors.stock && (
                                                <div className="mt-2 text-red-600 text-sm flex items-center">
                                                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                    </svg>
                                                    {Array.isArray(errors.stock) ? errors.stock[0] : errors.stock}
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-semibold text-slate-700 mb-2">Category</label>
                                        <div className="relative">
                                            <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14-4l-3 4 3 4M9 7l-3 4 3 4" />
                                            </svg>
                                            <select
                                                name="category_id"
                                                value={formData.category_id}
                                                onChange={handleInputChange}
                                                className="w-full pl-10 pr-4 py-3 bg-white/60 backdrop-blur-sm border border-slate-200/50 rounded-xl text-slate-700 focus:border-blue-400 focus:outline-none focus:ring-4 focus:ring-blue-100 transition-all duration-200 appearance-none"
                                                required
                                                disabled={loading}
                                            >
                                                <option value="">Select a category...</option>
                                                {categories.map((category) => (
                                                    <option key={category.id} value={category.id}>
                                                        {category.name}
                                                    </option>
                                                ))}
                                            </select>
                                            <svg className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                            </svg>
                                        </div>
                                        {errors.category_id && (
                                            <div className="mt-2 text-red-600 text-sm flex items-center">
                                                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                </svg>
                                                {Array.isArray(errors.category_id) ? errors.category_id[0] : errors.category_id}
                                            </div>
                                        )}
                                    </div>

                                    <div>
                                        <label className="block text-sm font-semibold text-slate-700 mb-2">Product Image</label>
                                        <div className="relative">
                                            <input
                                                type="file"
                                                name="image"
                                                onChange={handleFileChange}
                                                accept="image/*"
                                                className="w-full px-4 py-3 bg-white/60 backdrop-blur-sm border border-slate-200/50 rounded-xl text-slate-700 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 focus:border-blue-400 focus:outline-none focus:ring-4 focus:ring-blue-100 transition-all duration-200"
                                                disabled={loading}
                                                multiple
                                            />
                                            <div className="mt-2 text-xs text-slate-500">
                                                Supported formats: JPG, PNG, GIF. Max size: 2MB
                                            </div>
                                        </div>
                                        {errors.image && (
                                            <div className="mt-2 text-red-600 text-sm flex items-center">
                                                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                </svg>
                                                {Array.isArray(errors.image) ? errors.image[0] : errors.image}
                                            </div>
                                        )}
                                    </div>

                                    <div className="flex items-center justify-end space-x-4 pt-6 border-t border-slate-200/50">
                                        <button
                                            type="button"
                                            onClick={() => setModalOpen(false)}
                                            className="px-6 py-3 border border-slate-300 text-slate-700 rounded-xl hover:bg-slate-50 focus:outline-none focus:ring-4 focus:ring-slate-100 transition-all duration-200 font-medium"
                                            disabled={loading}
                                        >
                                            Cancel
                                        </button>
                                        <button
                                            type="submit"
                                            className="px-6 py-3 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white rounded-xl hover:from-blue-700 hover:via-indigo-700 hover:to-purple-700 disabled:from-slate-400 disabled:to-slate-500 focus:outline-none focus:ring-4 focus:ring-blue-100 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 flex items-center space-x-2 font-medium"
                                            disabled={loading}
                                        >
                                            {loading ? (
                                                <>
                                                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                                                    <span>Saving...</span>
                                                </>
                                            ) : (
                                                <>
                                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                                    </svg>
                                                    <span>{editProduct ? "Update Product" : "Create Product"}</span>
                                                </>
                                            )}
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

