import { useEffect, useState } from "react";
import { axiosInstance } from "../../axios/axiosInstance";
import {
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../../services/productServices";

const AdminDashboard = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [form, setForm] = useState({
    title: "",
    price: "",
    category: "",
    image: null,
  });

  /* ================= FETCH PRODUCTS ================= */
  const fetchProducts = async () => {
    try {
      const data = await getProducts();
      setProducts(data.products);
    } catch (err) {
      setError("Failed to load products");
    } finally {
      setLoading(false);
    }
  };

  /* ================= FETCH CATEGORIES ================= */
  const fetchCategories = async () => {
    try {
      const res = await axiosInstance.get("/category");
      setCategories(res.data.categories);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);

  /* ================= HANDLE INPUT ================= */
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleImageChange = (e) => {
    setForm({ ...form, image: e.target.files[0] });
  };

  /* ================= ADD / UPDATE ================= */
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    if (
      !form.title ||
      !form.price ||
      !form.category ||
      (!editingProduct && !form.image)
    ) {
      return setError("All fields including image & category are required");
    }

    try {
      const formData = new FormData();
      formData.append("title", form.title);
      formData.append("price", Number(form.price));
      formData.append("category", form.category);

      if (form.image) {
        formData.append("image", form.image);
      }

      if (editingProduct) {
        await updateProduct(editingProduct._id, formData);
      } else {
        await createProduct(formData);
      }

      setForm({ title: "", price: "", category: "", image: null });
      setEditingProduct(null);
      fetchProducts();
    } catch (err) {
      setError(err?.response?.data?.message || "Operation failed");
    }
  };

  /* ================= EDIT ================= */
  const handleEdit = (product) => {
    setEditingProduct(product);
    setForm({
      title: product.title,
      price: product.price,
      category: product.category?._id,
      image: null,
    });
  };

  /* ================= DELETE ================= */
  const handleDelete = async (id) => {
    if (!confirm("Delete product?")) return;
    try {
      await deleteProduct(id);
      fetchProducts();
    } catch {
      setError("Delete failed");
    }
  };

  /* ================= UI ================= */
  return (
    <>
      <h2 className="text-2xl font-bold mb-6 text-gray-800">
        Product Management
      </h2>

      {error && <p className="mb-4 text-red-600 font-medium">{error}</p>}

      {/* ================= FORM ================= */}
      <form
        onSubmit={handleSubmit}
        className="bg-gray-200 p-4 sm:p-6 rounded-lg shadow mb-8 
                   grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-amber-600"
      >
        <input
          name="title"
          placeholder="Product Title"
          value={form.title}
          onChange={handleChange}
          className="border p-2 rounded"
          required
        />

        <input
          name="price"
          type="number"
          placeholder="Price"
          value={form.price}
          onChange={handleChange}
          className="border p-2 rounded"
          required
        />

        <select
          name="category"
          value={form.category}
          onChange={handleChange}
          className="border p-2 rounded"
          required
        >
          <option value="">Select Category</option>
          {categories.map((cat) => (
            <option key={cat._id} value={cat._id}>
              {cat.name}
            </option>
          ))}
        </select>

        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="border p-2 rounded"
        />

        <button
          type="submit"
          className="col-span-1 sm:col-span-2 lg:col-span-4 
                     bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          {editingProduct ? "Update Product" : "Add Product"}
        </button>
      </form>

 {/* ================= MOBILE VIEW ================= */}
      <div className="md:hidden space-y-4">
        {products.map((p) => (
          <div key={p._id} className="bg-cyan-800 rounded-lg p-4 text-white">
            <div className="flex gap-4">
              <img
                src={p.image}
                alt={p.title}
                className="h-14 w-14 rounded object-cover"
              />
              <div className="flex-1">
                <h3 className="font-bold">{p.title}</h3>
                <p className="text-sm">{p.category?.name}</p>
                <p className="font-semibold">₹{p.price}</p>
              </div>
            </div>
            <div className="flex gap-3 mt-3">
              <button
                onClick={() => handleEdit(p)}
                className="flex-1 bg-blue-600 rounded py-1"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(p._id)}
                className="flex-1 bg-red-600 rounded py-1"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* ================= TABLE VIEW ================= */}
      {!loading && (
        <div className="hidden md:block overflow-x-auto bg-cyan-800 rounded-lg">
          <table className="min-w-[700px] w-full text-white">
            <thead className="bg-gray-300 text-gray-800">
              <tr>
                <th className="p-3">Title</th>
                <th className="p-3">Price</th>
                <th className="p-3">Category</th>
                <th className="p-3">Image</th>
                <th className="p-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((p) => (
                <tr key={p._id} className="border-t">
                  <td className="p-3">{p.title}</td>
                  <td className="p-3">₹{p.price}</td>
                  <td className="p-3">{p.category?.name}</td>
                  <td className="p-3">
                    <img
                      src={p.image}
                      alt={p.title}
                      className="h-12 w-12 rounded object-cover"
                    />
                  </td>
                  <td className="p-3 flex gap-3">
                    <button
                      onClick={() => handleEdit(p)}
                      className="text-blue-300"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(p._id)}
                      className="text-red-300"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
};

export default AdminDashboard;