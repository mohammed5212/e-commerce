const Home = () => {
  return (
    <div className="w-full">

      {/* HERO SECTION */}
      <section
        className="h-[80vh] bg-cover bg-center flex items-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1607082349566-187342175e2f')",
        }}
      >
        <div className="bg-black/60 p-8 md:p-12 ml-6 md:ml-16 rounded-lg max-w-xl">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Shop Smart, Live Better
          </h1>
          <p className="text-gray-200 text-lg mb-6">
            Discover top-quality products at unbeatable prices.
          </p>
          <button className="bg-yellow-500 hover:bg-yellow-600 text-black px-6 py-3 rounded-md font-semibold transition">
            Shop Now
          </button>
        </div>
      </section>

      {/* FEATURES */}
      <section className="py-12 bg-gray-100">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 px-4">

          <div className="bg-white p-6 rounded-xl shadow text-center">
            <p className="text-4xl mb-3">🚚</p>
            <h3 className="text-lg font-semibold text-amber-500">Free Delivery</h3>
            <p className="text-gray-600 mt-2">
              On all orders above ₹999
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow text-center text-cyan-700">
            <p className="text-4xl mb-3">💳</p>
            <h3 className="text-lg  font-semibold">Secure Payments</h3>
            <p className="text-gray-600 mt-2">
              100% safe and encrypted
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow text-center text-amber-500">
            <p className="text-4xl mb-3  ">⭐</p>
            <h3 className="text-lg font-semibold">Top Quality</h3>
            <p className="text-gray-600 mt-2">
              Best products guaranteed
            </p>
          </div>

        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-gray-900 text-gray-300 text-center py-4">
        © 2025 ShopEase. All rights reserved.
      </footer>

    </div>
  );
};

export default Home;
