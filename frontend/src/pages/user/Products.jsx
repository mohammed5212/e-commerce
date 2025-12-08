 import ProductCard from "../../components/Card.jsx";
import React from "react";

const Products = () => {
 
 const products = [
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
        "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8cHJvZHVjdHxlbnwwfHwwfHx8MA%3D%3D",
    },
    {
      title: "Head & Shoulder Massage",
      description: "Stress-relief upper body massage",
      price: 349,
      image:
        "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8cHJvZHVjdHxlbnwwfHwwfHx8MA%3D%3D",
    },
    {
      title: "Foot Reflexology",
      description: "Pressure-point foot treatment",
      price: 299,
      image:
        "https://plus.unsplash.com/premium_photo-1679913792906-13ccc5c84d44?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8cHJvZHVjdHxlbnwwfHwwfHx8MA%3D%3D",
    },
    {
      title: "Body Spa",
      description: "Luxury spa session with herbal oils",
      price: 899,
      image:
        "https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8cHJvZHVjdHxlbnwwfHwwfHx8MA%3D%3D",
    },
    {
      title: "Hot Stone Therapy",
      description: "Muscle relaxation with heated stones",
      price: 799,
      image:
        "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8cHJvZHVjdHxlbnwwfHwwfHx8MA%3D%3D",
    },
    {
      title: "Deep Tissue Massage",
      description: "Strong pressure for muscle pain relief",
      price: 599,
      image:
        "https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fHByb2R1Y3R8ZW58MHx8MHx8fDA%3D",
    },
    {
      title: "Facial Treatment",
      description: "Fresh glowing skin facial",
      price: 499,
      image:
        "https://images.unsplash.com/photo-1615397349754-cfa2066a298e?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fHByb2R1Y3R8ZW58MHx8MHx8fDA%3D",
    },
    {
      title: "Herbal Steam Therapy",
      description: "Detox steam with herbs",
      price: 399,
      image:
        "https://plus.unsplash.com/premium_photo-1670537994863-5ad53a3214e0?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTN8fHByb2R1Y3R8ZW58MHx8MHx8fDA%3D",
    },
    {
      title: "Thai Stretch Massage",
      description: "Body stretching & pressure technique",
      price: 699,
      image:
        "https://images.unsplash.com/photo-1615397349754-cfa2066a298e?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fHByb2R1Y3R8ZW58MHx8MHx8fDA%3D",
    },
  ];

   return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4 text-white">Shop</h1>

      <div
        className="
          grid 
          grid-cols-2 
          xs:grid-cols-3
          sm:grid-cols-4
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