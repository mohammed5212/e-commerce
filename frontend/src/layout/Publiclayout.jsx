
import React from "react";
import Header from "../components/user/Header.jsx";
import Footer from "../components/user/Footer.jsx";
import { Outlet } from "react-router-dom";

const PublicLayout = () => {
  return (
  <div className="min-h-screen flex flex-col bg-white text-black dark:bg-[#111827] dark:text-white">
      {/* Header stays on top */}
      <Header />

      {/* Page content grows and pushes footer down */}
      <main className="flex-1 px-4 py-6">
        <Outlet />
      </main>

      {/* Footer stays at bottom */}
      <Footer />

    </div>
  );
};

export default PublicLayout;