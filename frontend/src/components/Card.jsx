import React from "react";
const ProductCard=({ product })=> {
  return (
     <div className="bg-white rounded-lg shadow-sm border p-2 w-full">
      <div className="w-full h-32 rounded-md overflow-hidden bg-gray-100">
        <img
          src={product.image}
          alt={product.title}
          className="w-full h-full object-contain"
        />
      </div>

      <h1 className="text-pink-800 font-semibold mt-2 leading-tight">
        {product.title}
      </h1>

      {/* <p className="text-xs text-gray-600 line-clamp-2">
        {product.description}
       </p> */}

      <div className="flex justify-between items-center mt-2">
        <span className="font-bold text-green-600 text-sm">price:₹{product.price}</span>
       
      </div>
      <div className="flex justify-center gap-2 mt-2">
             <button className="bg-blue-600 text-white text-xs px-2 py-1 rounded-md">
          Buy Now
        </button>
        
      </div>
       
    </div>
    );
}
export default ProductCard;