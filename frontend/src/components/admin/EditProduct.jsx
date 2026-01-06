import { useEffect, useState } from "react";
import { updateProduct } from "../../services/productServices";

const EditProductForm = ({ product, categories, onCancel, onSuccess }) => {
  const [form, setForm] = useState({
    title: "",
    price: "",
    category: "",
    image: null,
  });

  useEffect(() => {
    if (product) {
      setForm({
        title: product.title,
        price: product.price,
        category: product.category?._id,
        image: null,
      });
    }
  }, [product]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", form.title);
    formData.append("price", form.price);
    formData.append("category", form.category);
    if (form.image) formData.append("image", form.image);

    await updateProduct(product._id, formData);
    onSuccess();
  };

  return (
    <form onSubmit={handleSubmit} className="bg-yellow-800 p-4 rounded-lg grid gap-3">
      <h3 className="font-bold text-lg">Edit Product</h3>

      <input value={form.title} onChange={(e)=>setForm({...form,title:e.target.value})} />
      <input type="number" value={form.price} onChange={(e)=>setForm({...form,price:e.target.value})} />

      <select value={form.category} onChange={(e)=>setForm({...form,category:e.target.value})}>
        {categories.map((c) => (
          <option key={c._id} value={c._id}>{c.name}</option>
        ))}
      </select>

      <input type="file" onChange={(e)=>setForm({...form,image:e.target.files[0]})} />

      <div className="flex gap-3">
        <button className="bg-green-600 text-white flex-1">Update</button>
        <button type="button" onClick={onCancel} className="bg-gray-400 flex-1">
          Cancel
        </button>
      </div>
    </form>
  );
};

export default EditProductForm;
