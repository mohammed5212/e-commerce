import { useEffect, useState } from "react";
import { adminAxios } from "../../axios/adminAxios";
import {
  getProducts,
  deleteProduct,
} from "../../services/productServices";

import AddProductForm from "../../components/admin/CreateProduct";
import AdminProductCard from "../../components/admin/AdminProductCard";

const AdminDashboard = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  /* ================= FETCH PRODUCTS ================= */
  const fetchProducts = async () => {
    try {
      const res = await getProducts();
      setProducts(res.products);
    } catch {
      setError("Failed to load products");
    } finally {
      setLoading(false);
    }
  };

  /* ================= FETCH CATEGORIES ================= */
  const fetchCategories = async () => {
    try {
      const res = await adminAxios.get("/category");
      setCategories(res.data.categories);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);

 

  return (
    <>
      <h2 className="text-2xl font-bold mb-6 text-gray-800">
        Product Management
      </h2>

      {error && <p className="mb-4 text-red-600">{error}</p>}

      {/* ================= ADD PRODUCT ================= */}
      <AddProductForm
        categories={categories}
        onSuccess={fetchProducts}
      />

      {/* ================= PRODUCTS ================= */}
      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          {/* MOBILE */}
          <div className="grid grid-cols-1 gap-4 md:hidden">
            {products.map((product) => (
              <div key={product._id} className="relative">
                <AdminProductCard
                  product={product}
                  categories={categories}
                  onUpdated={fetchProducts}
                />
                
              </div>
            ))}
          </div>

          {/* DESKTOP */}
          <div className="hidden md:grid grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product) => (
              <AdminProductCard
                key={product._id}
                product={product}
                categories={categories}
                onUpdated={fetchProducts}
              />
            ))}
          </div>
        </>
      )}
    </>
  );
};

export default AdminDashboard;