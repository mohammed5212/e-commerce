import React from "react";
const ProductCard=({ product })=> {
  return (
     <div className="bg-white rounded-lg shadow-sm border p-2 w-full">
      <div className="w-full h-28 rounded-md overflow-hidden bg-gray-100">
        <img
          src={product.image}
          alt={product.title}
          className="w-full h-full object-cover"
        />
      </div>

      <h2 className="text-sm font-semibold mt-2 leading-tight">
        {product.title}
      </h2>

      <p className="text-xs text-gray-600 line-clamp-2">
        {product.description}
      </p>

      <div className="flex justify-between items-center mt-2">
        <span className="font-bold text-green-600 text-sm">₹{product.price}</span>
        <button className="bg-blue-600 text-white text-xs px-2 py-1 rounded-md">
          Buy
        </button>
      </div>
    </div>
    );
}
export default ProductCard;