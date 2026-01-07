// pages/admin/CategoryManagement.jsx
import { useEffect, useState } from "react";
import {
  getCategories,
  createCategory,
  updateCategory,
  deleteCategory,
} from "@/services/categoryServices";

const CategoryManagement = () => {
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [editingId, setEditingId] = useState(null);

  const loadCategories = async () => {
    const res = await getCategories();
    setCategories(res.data.categories);
  };

  useEffect(() => {
    loadCategories();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (editingId) {
      await updateCategory(editingId, { name });
    } else {
      await createCategory({ name });
    }

    setName("");
    setEditingId(null);
    loadCategories();
  };

  const handleEdit = (cat) => {
    setName(cat.name);
    setEditingId(cat._id);
  };

  const handleDelete = async (id) => {
    if (confirm("Delete this category?")) {
      await deleteCategory(id);
      loadCategories();
    }
  };

  return (
    <div className="p-6 bg-amber-200" >
      <h2 className="text-amber-700 font-bold mb-4">Category Management</h2>

      <form onSubmit={handleSubmit} className="flex gap-2 mb-6">
        <input
          className="border p-2 rounded w-64 text-indigo-500"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Category name"
        />
        <button className="bg-black text-white px-4 rounded">
          {editingId ? "Update" : "Add"}
        </button>
      </form>

      <table className="w-full border-b-fuchsia-600">
        <thead>
          <tr className="bg-gray-700">
            <th className="p-2 border">Name</th>
            <th className="p-2 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {categories.map((cat) => (
            <tr key={cat._id}>
              <td className="p-2 border">{cat.name}</td>
              <td className="p-2 border flex gap-2">
                <button
                  onClick={() => handleEdit(cat)}
                  className="text-blue-600"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(cat._id)}
                  className="text-red-600"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CategoryManagement;
