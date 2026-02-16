"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { adminApi, Product, getAuthToken, removeAuthToken } from "@/lib/api";

export default function AdminPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [formData, setFormData] = useState({
    productName: "",
    price: "",
    description: "",
    colors: [] as string[],
    type: "car" as "car" | "bike" | "f1",
    discountPercentage: "0",
  });
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [colorInput, setColorInput] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const token = getAuthToken();
    if (!token) {
      router.push("/admin/login");
      return;
    }
    fetchProducts();
  }, [router]);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const token = getAuthToken();
      if (!token) return;

      const response = await adminApi.getProducts(token);
      if (response.success) {
        setProducts(response.data);
      } else {
        setError("Failed to fetch products");
      }
    } catch (err) {
      console.error('Error fetching products:', err);
      if (err instanceof TypeError && err.message === 'Failed to fetch') {
        setError("Could not connect to the server. Please ensure the backend is running on port 5000.");
      } else {
        setError("Error fetching products. Please try again later.");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    removeAuthToken();
    router.push("/admin/login");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const token = getAuthToken();
      if (!token) return;

      const formDataObj = new FormData();
      formDataObj.append("productName", formData.productName);
      formDataObj.append("price", formData.price);
      formDataObj.append("description", formData.description);
      formDataObj.append("colors", JSON.stringify(formData.colors));
      formDataObj.append("type", formData.type);
      formDataObj.append("discountPercentage", formData.discountPercentage);

      imageFiles.forEach((file) => {
        formDataObj.append("productImages", file);
      });

      let response;
      if (editingProduct) {
        response = await adminApi.updateProduct(token, editingProduct._id, formDataObj);
      } else {
        response = await adminApi.createProduct(token, formDataObj);
      }

      if (response.success) {
        await fetchProducts();
        resetForm();
        setShowAddForm(false);
        setEditingProduct(null);
      } else {
        setError(response.message || "Failed to save product");
      }
    } catch (err) {
      console.error('Error saving product:', err);
      setError("Error saving product");
    } finally {
      setSubmitting(false);
    }
  };

  const handleEdit = (product: Product) => {
    setEditingProduct(product);
    setFormData({
      productName: product.productName,
      price: product.price.toString(),
      description: product.description,
      colors: Array.isArray(product.color) ? product.color : [product.color],
      type: product.type,
      discountPercentage: product.discountPercentage.toString(),
    });
    setImageFiles([]);
    setShowAddForm(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this product?")) return;

    try {
      const token = getAuthToken();
      if (!token) return;

      const response = await adminApi.deleteProduct(token, id);
      if (response.success) {
        await fetchProducts();
      } else {
        setError(response.message || "Failed to delete product");
      }
    } catch (err) {
      console.error('Error deleting product:', err);
      setError("Error deleting product");
    }
  };

  const addColor = () => {
    if (colorInput.trim() && !formData.colors.includes(colorInput.trim())) {
      setFormData({ ...formData, colors: [...formData.colors, colorInput.trim()] });
      setColorInput("");
    }
  };

  const removeColor = (colorToRemove: string) => {
    setFormData({ ...formData, colors: formData.colors.filter(color => color !== colorToRemove) });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setImageFiles(Array.from(e.target.files));
    }
  };

  const resetForm = () => {
    setFormData({
      productName: "",
      price: "",
      description: "",
      colors: [],
      type: "car",
      discountPercentage: "0",
    });
    setImageFiles([]);
    setColorInput("");
    setEditingProduct(null);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white p-4 sm:p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold">Admin Dashboard</h1>
          <div className="flex w-full sm:w-auto gap-3 sm:gap-4">
            <button
              onClick={() => setShowAddForm(true)}
              className="flex-1 sm:flex-none bg-primary text-black px-4 py-2 rounded-lg font-semibold hover:bg-primary/80 transition-colors"
            >
              Add Product
            </button>
            <button
              onClick={handleLogout}
              className="flex-1 sm:flex-none bg-red-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-red-700 transition-colors"
            >
              Logout
            </button>
          </div>
        </div>

        {error && (
          <div className="bg-red-600 text-white p-4 rounded-lg mb-6">
            {error}
            <button onClick={() => setError(null)} className="ml-4 underline">
              Dismiss
            </button>
          </div>
        )}

        {/* Add/Edit Product Form */}
        {showAddForm && (
          <div className="bg-gray-900 p-6 rounded-lg mb-8">
            <h2 className="text-xl font-bold mb-4">
              {editingProduct ? "Edit Product" : "Add New Product"}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Product Name</label>
                  <input
                    type="text"
                    required
                    value={formData.productName}
                    onChange={(e) => setFormData({ ...formData, productName: e.target.value })}
                    className="w-full p-2 bg-gray-800 rounded border border-gray-700 focus:border-primary focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Price</label>
                  <input
                    type="number"
                    required
                    step="0.01"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    className="w-full p-2 bg-gray-800 rounded border border-gray-700 focus:border-primary focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Colors</label>
                  <div className="flex gap-2 mb-2">
                    <input
                      type="text"
                      value={colorInput}
                      onChange={(e) => setColorInput(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addColor())}
                      className="flex-1 p-2 bg-gray-800 rounded border border-gray-700 focus:border-primary focus:outline-none"
                      placeholder="Add color"
                    />
                    <button
                      type="button"
                      onClick={addColor}
                      className="bg-primary text-black px-4 py-2 rounded hover:bg-primary/80"
                    >
                      Add
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {formData.colors.map((color) => (
                      <span
                        key={color}
                        className="bg-gray-700 px-3 py-1 rounded-full text-sm flex items-center gap-2"
                      >
                        {color}
                        <button
                          type="button"
                          onClick={() => removeColor(color)}
                          className="text-red-400 hover:text-red-300"
                        >
                          ×
                        </button>
                      </span>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Type</label>
                  <select
                    value={formData.type}
                    onChange={(e) => setFormData({ ...formData, type: e.target.value as "car" | "bike" | "f1" })}
                    className="w-full p-2 bg-gray-800 rounded border border-gray-700 focus:border-primary focus:outline-none"
                  >
                    <option value="car">Car</option>
                    <option value="bike">Bike</option>
                    <option value="f1">F1</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Discount Percentage</label>
                  <input
                    type="number"
                    min="0"
                    max="100"
                    value={formData.discountPercentage}
                    onChange={(e) => setFormData({ ...formData, discountPercentage: e.target.value })}
                    className="w-full p-2 bg-gray-800 rounded border border-gray-700 focus:border-primary focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Product Images (Optional)</label>
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handleImageChange}
                    className="w-full p-2 bg-gray-800 rounded border border-gray-700 focus:border-primary focus:outline-none"
                  />
                  <div className="text-sm text-gray-400 mt-1">
                    {imageFiles.length > 0 && `${imageFiles.length} file(s) selected`}
                    {imageFiles.length === 0 && "No images selected - placeholder will be used"}
                    {editingProduct && imageFiles.length === 0 && "Leave empty to keep current images"}
                  </div>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Description</label>
                <textarea
                  required
                  rows={3}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full p-2 bg-gray-800 rounded border border-gray-700 focus:border-primary focus:outline-none"
                />
              </div>
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-2">
                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full sm:w-auto bg-primary text-black px-8 py-3 rounded-lg font-bold hover:bg-primary/80 disabled:opacity-50 transition-all active:scale-95"
                >
                  {submitting ? "Saving..." : editingProduct ? "Update Product" : "Add Product"}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowAddForm(false);
                    resetForm();
                  }}
                  className="w-full sm:w-auto bg-gray-800 text-white px-8 py-3 rounded-lg font-semibold hover:bg-gray-700 transition-all border border-gray-700"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Products List */}
        <div className="bg-gray-900 rounded-lg overflow-hidden border border-gray-800">
          {/* Desktop Table View */}
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-800">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-400 uppercase tracking-wider">
                    Product
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-400 uppercase tracking-wider">
                    Price
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-400 uppercase tracking-wider">
                    Type
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-400 uppercase tracking-wider">
                    Discount
                  </th>
                  <th className="px-6 py-4 text-right text-xs font-bold text-gray-400 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-800">
                {products.map((product) => (
                  <tr key={product._id} className="hover:bg-gray-800/50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="relative h-12 w-12 mr-4">
                          <Image
                            src={Array.isArray(product.productImage) ? product.productImage[0] : product.productImage}
                            alt={product.productName}
                            fill
                            className="rounded object-cover"
                            unoptimized
                          />
                        </div>
                        <div>
                          <div className="text-sm font-semibold text-white">
                            {product.productName}
                          </div>
                          <div className="text-xs text-gray-400">
                            {Array.isArray(product.color) ? product.color.join(", ") : product.color}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-white">
                        ${product.discountedPrice?.toFixed(2) || product.price.toFixed(2)}
                      </div>
                      {product.discountPercentage > 0 && (
                        <div className="text-xs text-gray-500 line-through">
                          ${product.price.toFixed(2)}
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2.5 py-0.5 inline-flex text-xs font-bold rounded-full bg-primary/10 text-primary border border-primary/20">
                        {product.type.toUpperCase()}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">
                      {product.discountPercentage > 0 ? (
                        <span className="text-green-500 font-medium">{product.discountPercentage}% OFF</span>
                      ) : (
                        "-"
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button
                        onClick={() => handleEdit(product)}
                        className="text-primary hover:text-white transition-colors mr-4"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(product._id)}
                        className="text-red-500 hover:text-red-400 transition-colors"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile Card View */}
          <div className="md:hidden divide-y divide-gray-800">
            {products.map((product) => (
              <div key={product._id} className="p-4 space-y-4">
                <div className="flex items-center gap-4">
                  <div className="relative h-16 w-16 flex-shrink-0">
                    <Image
                      src={Array.isArray(product.productImage) ? product.productImage[0] : product.productImage}
                      alt={product.productName}
                      fill
                      className="rounded-lg object-cover"
                      unoptimized
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-base font-bold text-white truncate">{product.productName}</h3>
                    <p className="text-xs text-gray-400 truncate">
                      {Array.isArray(product.color) ? product.color.join(", ") : product.color}
                    </p>
                    <div className="mt-1 flex items-center gap-2">
                      <span className="text-sm font-bold text-primary">
                        ${product.discountedPrice?.toFixed(2) || product.price.toFixed(2)}
                      </span>
                      {product.discountPercentage > 0 && (
                        <span className="text-xs text-gray-500 line-through">
                          ${product.price.toFixed(2)}
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="flex-shrink-0">
                    <span className="px-2 py-0.5 text-[10px] font-bold rounded-full bg-primary/10 text-primary border border-primary/20">
                      {product.type.toUpperCase()}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-3 pt-2">
                  <button
                    onClick={() => handleEdit(product)}
                    className="flex-1 bg-gray-800 text-primary py-2 rounded-lg text-sm font-bold border border-primary/20 active:scale-95 transition-all"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(product._id)}
                    className="flex-1 bg-red-900/20 text-red-500 py-2 rounded-lg text-sm font-bold border border-red-900/30 active:scale-95 transition-all"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>

          {products.length === 0 && (
            <div className="text-center py-16 text-gray-500 bg-gray-900">
              <div className="mb-4 text-4xl">📦</div>
              <p className="text-lg font-medium">No products found</p>
              <button
                onClick={() => setShowAddForm(true)}
                className="mt-4 text-primary font-bold underline"
              >
                Add your first product
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
