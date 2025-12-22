const AdminSidebar = () => (
  <aside className="w-64 bg-gray-900 text-white">
    <div className="p-6 text-xl font-bold">Admin</div>
    <nav className="p-4 space-y-2">
      <a href="/admin/admindashboard" className="block hover:text-gray-300">
        Dashboard
      </a>
      <a href="/admin/products" className="block hover:text-gray-300">
        Products
      </a>
    </nav>
  </aside>
);

export default AdminSidebar;
