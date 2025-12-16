import { useEffect, useState } from "react";
import ProductCard from "../../components/Card.jsx";
import React from "react";
import { axiosInstance } from "@/axios/axiosInstance.js";

const Products = () => {
  const [products, setProducts] = useState([]); // <<< MUST HAVE THIS
  const [loading, setLoading] = useState(true);

  // STATIC fallback products (if API fails)
  const staticProducts = [
    {
      title: "Relaxing Massage",
      description: "Full body herbal oil massage",
      price: 499,
      image:
        "https://plus.unsplash.com/premium_photo-1664392147011-2a720f214e01?w=600&auto=format&fit=crop&q=60",
    },
    {
      title: "Aroma Therapy",
      description: "Essential oils for deep relaxation",
      price: 699,
      image:
        "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&auto=format&fit=crop&q=60",
    },

  ];

  useEffect(() => {
    axiosInstance
      .get("/product/listProducts")
      .then((response) => {
        console.log("Products data:", response.data);

        if (response.data?.products?.length > 0) {
          setProducts(response.data.products); // <<< backend data
        } else {
          setProducts(staticProducts); // fallback
        }
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
        setProducts(staticProducts); // fallback on error
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading)
    return <p className="text-center text-white">Loading products...</p>;

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4 text-white">Shop</h1>

      <div
        className="
          grid 
          grid-cols-2 
          xs:grid-cols-3
          sm:grid-cols-4
          lg:grid-cols-5
          gap-3
        "
      >
        {products.map((item, i) => (
          <ProductCard key={i} product={item} />
        ))}
      </div>
    </div>
  );
};

export default Products;
