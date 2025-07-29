import { useState, useEffect } from "react";
import { authService } from "../../services/AuthService";

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  stock: number;
  image: string | null;
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
  image: File | null;
  category_id: string;
}

interface PaginatedResponse {
  data: Product[];
  current_page: number;
  last_page: number;
}

const API_URL = "http://localhost:8000/api";

export default function ProductsPage() {
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
    image: null,
    category_id: "",
  });
  const [errors, setErrors] = useState<Record<string, string | string[]>>({});
  const [loading, setLoading] = useState(false);

  // Make authenticated requests with proper headers
 const makeAuthenticatedRequest = async (url: string, options: RequestInitschm = {}) => {
    try {
        const token = authService.getToken();
        if (!token) {
            throw new Error("No authentication token found");
        }

        const headers: HeadersInit = {
            Accept: "application/json",
            "X-Requested-With": "XMLHttpRequest",
            Authorization: `Bearer ${token}`,
        };

        if (!(options.body instanceof FormData)) {
            headers["Content-Type"] = "application/json";
        }

        const config: RequestInit = {
            ...options,
            headers: { ...headers, ...options.headers },
            credentials: "include", // Send cookies (e.g., Sanctum session)
        };

        console.log('🔍 Making request to:', url, 'with config:', config);
        const response = await fetch(url, config);
        const text = await response.text();
        console.log('🔍 Response status:', response.status, 'Response text:', text);

        if (!response.ok) {
            let errorMessage = `HTTP ${response.status}`;
            try {
                const errorData = JSON.parse(text);
                errorMessage = errorData.message || errorData.error || errorMessage;
            } catch {
                errorMessage = text || errorMessage;
            }
            throw new Error(errorMessage);
        }

        return JSON.parse(text);
    } catch (error) {
        console.error('Fetch error:', error);
        throw error;
    }
};

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
      if (formData.image) data.append("image", formData.image);
      
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
      setFormData({ name: "", description: "", price: "", stock: "", image: null, category_id: "" });
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
    const file = e.target.files?.[0] || null;
    setFormData({ ...formData, image: file });
    setErrors({ ...errors, image: "" });
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Products Management</h1>

      {/* Error Message */}
      {errors.general && (
        <div className="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded-md">
          {Array.isArray(errors.general) ? errors.general[0] : errors.general}
        </div>
      )}

      {/* Filters */}
      {authService.isAdmin() && (
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <input
            type="text"
            placeholder="Search by name or description"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setCurrentPage(1);
            }}
            className="w-full md:w-1/3 rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-400 focus:border-emerald-600 focus:outline-none focus:ring-1 focus:ring-emerald-600"
            disabled={loading}
          />
          <select
            value={categoryFilter}
            onChange={(e) => {
              setCategoryFilter(e.target.value);
              setCurrentPage(1);
            }}
            className="w-full md:w-1/3 rounded-md border border-gray-300 px-3 py-2 text-gray-900 focus:border-emerald-600 focus:outline-none focus:ring-1 focus:ring-emerald-600"
            disabled={loading}
          >
            <option value="">All Categories</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name} ({category.products_count})
              </option>
            ))}
          </select>
          <button
            onClick={openAddModal}
            className="w-full md:w-auto px-4 py-2 bg-emerald-600 text-white rounded-md hover:bg-emerald-500 disabled:bg-emerald-400"
            disabled={loading}
          >
            Add Product
          </button>
        </div>
      )}

      {/* Products Table */}
      {authService.isAdmin() && (
        <div className="overflow-x-auto bg-white rounded-md shadow">
          {loading && (
            <div className="p-4 text-center text-gray-600">
              Loading...
            </div>
          )}
          <table className="min-w-full">
            <thead>
              <tr className="bg-gray-100">
                <th className="py-3 px-4 border-b text-left text-sm font-medium text-gray-900">Image</th>
                <th className="py-3 px-4 border-b text-left text-sm font-medium text-gray-900">Name</th>
                <th className="py-3 px-4 border-b text-left text-sm font-medium text-gray-900">Category</th>
                <th className="py-3 px-4 border-b text-left text-sm font-medium text-gray-900">Price</th>
                <th className="py-3 px-4 border-b text-left text-sm font-medium text-gray-900">Stock</th>
                <th className="py-3 px-4 border-b text-left text-sm font-medium text-gray-900">Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.length === 0 && !loading ? (
                <tr>
                  <td colSpan={6} className="py-8 px-4 text-center text-gray-600">
                    No products found
                  </td>
                </tr>
              ) : (
                products.map((product) => (
                  <tr key={product.id} className="hover:bg-gray-50">
                    <td className="py-3 px-4 border-b">
                      {product.image ? (
                        <img
                          src={`http://localhost:8000/storage/${product.image}`}
                          alt={product.name}
                          className="w-16 h-16 object-cover rounded"
                        />
                      ) : (
                        <div className="w-16 h-16 bg-gray-200 rounded flex items-center justify-center">
                          <span className="text-gray-500 text-xs">No Image</span>
                        </div>
                      )}
                    </td>
                    <td className="py-3 px-4 border-b font-medium">{product.name}</td>
                    <td className="py-3 px-4 border-b">{product.category.name}</td>
                    <td className="py-3 px-4 border-b">${Number(product.price).toFixed(2)}</td>
                    <td className="py-3 px-4 border-b">{product.stock}</td>
                    <td className="py-3 px-4 border-b">
                      <button
                        onClick={() => openEditModal(product)}
                        className="text-blue-600 hover:text-blue-800 mr-3 font-medium"
                        disabled={loading}
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(product.id)}
                        className="text-red-600 hover:text-red-800 font-medium"
                        disabled={loading}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}

      {/* Pagination */}
      {authService.isAdmin() && totalPages > 1 && (
        <div className="mt-6 flex justify-between items-center">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1 || loading}
            className="px-4 py-2 bg-white border border-gray-300 rounded-md disabled:bg-gray-100 text-gray-900 hover:bg-gray-50"
          >
            Previous
          </button>
          <span className="text-gray-700 font-medium">
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages || loading}
            className="px-4 py-2 bg-white border border-gray-300 rounded-md disabled:bg-gray-100 text-gray-900 hover:bg-gray-50"
          >
            Next
          </button>
        </div>
      )}

      {/* Modal */}
      {modalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-md w-full max-w-lg shadow-lg max-h-[90vh] overflow-y-auto">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              {editProduct ? "Edit Product" : "Add Product"}
            </h2>
            <form onSubmit={handleAddEdit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-1">Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-400 focus:border-emerald-600 focus:outline-none focus:ring-1 focus:ring-emerald-600"
                  required
                  disabled={loading}
                />
                {errors.name && (
                  <div className="mt-1 text-red-600 text-sm">
                    {Array.isArray(errors.name) ? errors.name[0] : errors.name}
                  </div>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-900 mb-1">Description</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  rows={3}
                  className="w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-400 focus:border-emerald-600 focus:outline-none focus:ring-1 focus:ring-emerald-600"
                  required
                  disabled={loading}
                />
                {errors.description && (
                  <div className="mt-1 text-red-600 text-sm">
                    {Array.isArray(errors.description) ? errors.description[0] : errors.description}
                  </div>
                )}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-900 mb-1">Price</label>
                  <input
                    type="number"
                    name="price"
                    value={formData.price}
                    onChange={handleInputChange}
                    className="w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-400 focus:border-emerald-600 focus:outline-none focus:ring-1 focus:ring-emerald-600"
                    min="0"
                    step="0.01"
                    required
                    disabled={loading}
                  />
                  {errors.price && (
                    <div className="mt-1 text-red-600 text-sm">
                      {Array.isArray(errors.price) ? errors.price[0] : errors.price}
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-900 mb-1">Stock</label>
                  <input
                    type="number"
                    name="stock"
                    value={formData.stock}
                    onChange={handleInputChange}
                    className="w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-400 focus:border-emerald-600 focus:outline-none focus:ring-1 focus:ring-emerald-600"
                    min="0"
                    required
                    disabled={loading}
                  />
                  {errors.stock && (
                    <div className="mt-1 text-red-600 text-sm">
                      {Array.isArray(errors.stock) ? errors.stock[0] : errors.stock}
                    </div>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-900 mb-1">Category</label>
                <select
                  name="category_id"
                  value={formData.category_id}
                  onChange={handleInputChange}
                  className="w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 focus:border-emerald-600 focus:outline-none focus:ring-1 focus:ring-emerald-600"
                  required
                  disabled={loading}
                >
                  <option value="">Select Category</option>
                  {categories.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
                {errors.category_id && (
                  <div className="mt-1 text-red-600 text-sm">
                    {Array.isArray(errors.category_id) ? errors.category_id[0] : errors.category_id}
                  </div>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-900 mb-1">Image (Optional)</label>
                <input
                  type="file"
                  name="image"
                  accept="image/jpeg,image/png,image/jpg"
                  onChange={handleFileChange}
                  className="w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900"
                  disabled={loading}
                />
                {editProduct && editProduct.image && (
                  <div className="mt-2">
                    <p className="text-sm text-gray-600 mb-1">Current image:</p>
                    <img
                      src={`http://localhost:8000/storage/${editProduct.image}`}
                      alt="Current"
                      className="w-24 h-24 object-cover rounded border"
                    />
                  </div>
                )}
                {errors.image && (
                  <div className="mt-1 text-red-600 text-sm">
                    {Array.isArray(errors.image) ? errors.image[0] : errors.image}
                  </div>
                )}
              </div>

              <div className="flex justify-end gap-4 pt-4 border-t">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-4 py-2 bg-gray-200 rounded-md text-gray-900 hover:bg-gray-300"
                  disabled={loading}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="px-4 py-2 bg-emerald-600 text-white rounded-md hover:bg-emerald-500 disabled:bg-emerald-400"
                >
                  {loading ? "Saving..." : editProduct ? "Update" : "Add"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}