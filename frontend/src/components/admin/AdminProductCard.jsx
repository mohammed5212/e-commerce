import { useState } from "react";
import { updateProduct,deleteProduct } from "../../services/productServices";

const AdminProductCard = ({ product, categories, onUpdated }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [form, setForm] = useState({
    title: product.title,
    price: product.price,
    category: product.category?._id,
    image: null,
  });

  const handleUpdate = async () => {
    const formData = new FormData();
    formData.append("title", form.title);
    formData.append("price", form.price);
    formData.append("category", form.category);
    if (form.image) formData.append("image", form.image);

    await updateProduct(product._id, formData);

    setIsEditing(false);
    onUpdated(); // refetch or update state
  };
     const handleDelete = async () => {
    if (!window.confirm(`Delete "${product.title}"?`)) return;

    try {
      await deleteProduct(product._id);
      onUpdated();
    } catch {
      alert("Delete failed");
    }
  };

  return (
    <div className="bg-yellow-800 p-4 rounded-lg">
      {isEditing ? (
        <>
          <input
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
          />

          <input
            type="number"
            value={form.price}
            onChange={(e) => setForm({ ...form, price: e.target.value })}
          />

          <select
            value={form.category}
            onChange={(e) => setForm({ ...form, category: e.target.value })}
          >
            {categories.map((c) => (
              <option key={c._id} value={c._id}>
                {c.name}
              </option>
            ))}
          </select>

          <input
            type="file"
            onChange={(e) =>
              setForm({ ...form, image: e.target.files[0] })
            }
          />

          <div className="flex gap-2 mt-3">
            <button
              onClick={handleUpdate}
              className="bg-green-600 text-white flex-1"
            >
              Save
            </button>
            <button
              onClick={() => setIsEditing(false)}
              className="bg-gray-500 flex-1"
            >
              Cancel
            </button>
          </div>
        </>
      ) : (
        <>
          <img src={product.image} className="h-40 w-full object-cover rounded" />
          <h3 className="font-bold">{product.title}</h3>
          <p>₹{product.price}</p>
          <p className="text-sm">{product.category?.name}</p>

        <div className="flex gap-2 mt-3">
            <button
            onClick={() => setIsEditing(true)}
            className="bg-blue-600 text-white mt-3 w-full"
          >
            Edit
          </button>
           <button
            onClick={handleDelete}
            className="bg-red-600 text-white mt-3 w-full"
          >
            Delete
          </button>
        </div>

        </>
      )}
    </div>
  );
};

export default AdminProductCard;
