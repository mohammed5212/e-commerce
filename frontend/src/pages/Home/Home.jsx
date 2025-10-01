import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-20 px-6 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          Welcome to Our Store
        </h1>
        <p className="text-lg md:text-xl mb-6">
          Discover amazing products with unbeatable prices
        </p>
        <Link
          to="/products"
          className="bg-white text-blue-700 font-semibold px-6 py-3 rounded-xl shadow hover:bg-gray-100 transition"
        >
          Shop Now
        </Link>
      </section>

      {/* Categories Section */}
      <section className="py-12 px-6">
        <h2 className="text-2xl font-bold mb-6 text-center">Shop by Category</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {["Men", "Women", "Electronics", "Food"]?.map((cat) => (
            <Link
              key={cat}
              to={`/products?category=${cat.toLowerCase()}`}
              className="bg-gray-100 rounded-2xl shadow hover:shadow-lg p-6 flex items-center justify-center text-lg font-medium hover:bg-gray-200 transition"
            >
              {cat}
            </Link>
          ))}
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-12 px-6 bg-gray-50">
        <h2 className="text-2xl font-bold mb-6 text-center">Featured Products</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map((id) => (
            <div
              key={id}
              className="bg-white rounded-2xl shadow hover:shadow-lg transition p-4"
            >
              <div className="h-40 bg-gray-200 rounded-xl mb-4"></div>
              <h3 className="font-semibold text-lg mb-2">Product {id}</h3>
              <p className="text-gray-600 mb-2">Short product description</p>
              <p className="font-bold mb-4">₹{id * 500}</p>
              <Link
                to={`/product/${id}`}
                className="block bg-blue-600 text-white text-center py-2 rounded-xl hover:bg-blue-700 transition"
              >
                View Details
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-6 text-center bg-indigo-700 text-white">
        <h2 className="text-3xl font-bold mb-4">Ready to Start Shopping?</h2>
        <p className="mb-6 text-lg">Browse thousands of products today.</p>
        <Link
          to="/products"
          className="bg-white text-indigo-700 px-6 py-3 rounded-xl font-semibold shadow hover:bg-gray-100 transition"
        >
          Explore Products
        </Link>
      </section>
    </div>
  );
};

export default HomePage;