import { useState } from "react";
import { createProduct } from "../../services/productServices";

const AddProductForm = ({ categories, onSuccess }) => {
  const [form, setForm] = useState({
    title: "",
    price: "",
    category: "",
    image: null,
  });
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleImageChange = (e) => {
    setForm({ ...form, image: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    if (!form.title || !form.price || !form.category || !form.image) {
      return setError("All fields including image & category are required");
    }

    try {
      const formData = new FormData();
      formData.append("title", form.title);
      formData.append("price", Number(form.price));
      formData.append("category", form.category);
      formData.append("image", form.image);

      await createProduct(formData);

      setForm({ title: "", price: "", category: "", image: null });
      onSuccess(); // refresh products
    } catch (err) {
      setError(err?.response?.data?.message || "Add product failed");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-gray-200 p-4 sm:p-6 rounded-lg shadow mb-8
                 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-amber-600"
    >
      <h3 className="col-span-full text-xl font-bold">Add Product</h3>

      {error && (
        <p className="col-span-full text-red-600 font-medium">{error}</p>
      )}

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
        required
      />

      <button
        type="submit"
        className="col-span-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
      >
        Add Product
      </button>
    </form>
  );
};

export default AddProductForm;
