
import  React from "react";
import { Link } from "react-router-dom";
import { Facebook, Twitter, Instagram, Github } from "lucide-react";
// Assuming these icons are available via lucide-react or similar

 const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white text-black dark:bg-[#1d232a] dark:text-white border-t border-gray-300 dark:border-gray-700 mt-10">
      <div className="max-w-7xl mx-auto px-4 py-8">
        
        {/* Top Section: Links Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 border-b border-gray-300 dark:border-gray-700 pb-8">
          
          <div>
            <h3 className="text-sm font-semibold mb-4 uppercase text-primary dark:text-blue-400">Company</h3>
            <ul className="space-y-3 text-sm">
              <li><Link to="/about" className="hover:text-primary dark:hover:text-blue-400">About Us</Link></li>
              <li><Link to="/contact" className="hover:text-primary dark:hover:text-blue-400">Contact</Link></li>
              <li><Link to="/careers" className="hover:text-primary dark:hover:text-blue-400">Careers</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold mb-4 uppercase text-primary dark:text-blue-400">Products</h3>
            <ul className="space-y-3 text-sm">
              <li><Link to="/products" className="hover:text-primary dark:hover:text-blue-400">All Products</Link></li>
              <li><Link to="/categories" className="hover:text-primary dark:hover:text-blue-400">Categories</Link></li>
              <li><Link to="/bestsellers" className="hover:text-primary dark:hover:text-blue-400">Bestsellers</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold mb-4 uppercase text-primary dark:text-blue-400">Legal</h3>
            <ul className="space-y-3 text-sm">
              <li><Link to="/privacy" className="hover:text-primary dark:hover:text-blue-400">Privacy Policy</Link></li>
              <li><Link to="/terms" className="hover:text-primary dark:hover:text-blue-400">Terms of Service</Link></li>
              <li><Link to="/return" className="hover:text-primary dark:hover:text-blue-400">Return Policy</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold mb-4 uppercase text-primary dark:text-blue-400">Connect</h3>
            <div className="flex space-x-4">
              <a href="#" aria-label="Facebook" className="hover:text-primary dark:hover:text-blue-400"><Facebook size={20} /></a>
              <a href="#" aria-label="Twitter" className="hover:text-primary dark:hover:text-blue-400"><Twitter size={20} /></a>
              <a href="#" aria-label="Instagram" className="hover:text-primary dark:hover:text-blue-400"><Instagram size={20} /></a>
              <a href="#" aria-label="GitHub" className="hover:text-primary dark:hover:text-blue-400"><Github size={20} /></a>
            </div>
          </div>
          <Link
  to="/admin/login"
  className="text-xs text-gray-400 hover:text-gray-600"
>
  Admin
</Link>

        </div>

        {/* Bottom Section: Copyright */}
        <div className="pt-6 text-center text-sm text-gray-600 dark:text-gray-400">
          © {currentYear} MyShop. All rights reserved.
        </div>
        
      </div>
    </footer>
  );
};

export default Footer;