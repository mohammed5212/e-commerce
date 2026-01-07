// import React from "react";
// const ProductCard=({ product })=> {
//   return (
//      <div className="bg-white rounded-lg shadow-sm border p-2 w-full">
//       <div className="w-full h-32 rounded-md overflow-hidden bg-gray-100">
//         <img
//           src={product.image}
//           alt={product.title}
//           className="w-full h-full object-contain"
//         />
//       </div>

//       <h1 className="text-pink-800 font-semibold mt-2 leading-tight">
//         {product.title}
//       </h1>

//       {/* <p className="text-xs text-gray-600 line-clamp-2">
//         {product.description}
//        </p> */}

//       <div className="flex justify-between items-center mt-2">
//         <span className="font-bold text-green-600 text-sm">price:₹{product.price}</span>
       
//       </div>
//       <div className="flex justify-center gap-2 mt-2">
//              <button className="bg-blue-600 text-white text-xs px-2 py-1 rounded-md">
//           Buy Now
//         </button>
//          <button className="bg-blue-600 text-white text-xs px-2 py-1 rounded-md">
//           Add To Cart
//         </button>
//       </div>
       
//     </div>
//     );
// }
// export default ProductCard;


import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { userAxios } from "../axios/userAxios";

// Login Modal
const LoginModal = ({ open, onClose }) => {
  const navigate = useNavigate()
  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-gray-600 p-4 rounded shadow w-80">
        <h2 className="text-lg font-bold mb-2">Not a user!</h2>
        <p>Please Register And Login</p>
         <div className="flex justify-between gap-2">
          <button
            onClick={() => navigate("/user/register")}
            className="flex-1 px-3 py-2 bg-green-500 text-white rounded hover:bg-green-600"
          >
            Register
          </button>
          <button
            onClick={onClose}
            className="flex-1 px-3 py-2 bg-gray-300 text-black rounded hover:bg-gray-400"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

const ProductCard = ({ product }) => {
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  const handleAction = async (type) => {
    try {
      // Check if user is logged in
      const res = await userAxios.get("/user/me"); 
      console.log("User info:", res.data);

      // Logged in → handle action
      if (type === "buy") {
        navigate("/checkout");
      } else if (type === "cart") {
        console.log("Added to cart", product);
      }
    } catch (error) {
      console.log("Axios error:", error.response?.status);
      if (error.response?.status === 401) {
        // Not logged in → show modal
        setShowModal(true);
      } else {
        alert("Something went wrong!");
      }
    }
  };

  return (
    <>
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

        <div className="flex justify-between items-center mt-2">
          <span className="font-bold text-green-600 text-sm">
            price: ₹{product.price}
          </span>
        </div>

        <div className="flex justify-center gap-2 mt-2">
          <button
            onClick={() => handleAction("buy")}
            className="bg-blue-600 text-white text-xs px-2 py-1 rounded-md"
          >
            Buy Now
          </button>

          <button
            onClick={() => handleAction("cart")}
            className="bg-blue-600 text-white text-xs px-2 py-1 rounded-md"
          >
            Add To Cart
          </button>
        </div>
      </div>

      {/* Login modal */}
      <LoginModal open={showModal} onClose={() => setShowModal(false)} />
    </>
  );
};

export default ProductCard;
