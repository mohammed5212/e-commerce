import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu } from "lucide-react";    
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTrigger,SheetTitle,SheetDescription } from "@/components/ui/sheet";
import ModeToggle from "@/components/mode-toggle";


const Header = () => {
  const [open, setOpen] = useState(false); // Initialize state for mobile menu

  return (
    <header className="bg-white text-black dark:bg-[#1d232a] dark:text-white border-b border-gray-300 dark:border-gray-700">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 py-3">

        {/* Logo */}
        <Link to="/" className="text-xl font-bold">
          MyShop
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex gap-6 text-sm font-medium">
          <Link to="/" className="hover:text-primary dark:hover:text-blue-400">Home</Link>
          <Link to="/products" className="hover:text-primary dark:hover:text-blue-400">Products</Link>
          <Link to="/about" className="hover:text-primary dark:hover:text-blue-400">About</Link>
          <Link to="/category" className="hover:text-primary dark:hover:text-blue-400">Category</Link>
        </nav>

        {/* Right Buttons */}
        <div className="hidden md:flex items-center gap-3">
          <ModeToggle />
          <Button variant="outline">Login</Button>
        </div>

        {/* Mobile Menu */}
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" className="md:hidden">
              <Menu size={24} />
            </Button>
          </SheetTrigger>

          <SheetContent 
            side="left"
            className="p-4 bg-white text-black dark:bg-[#1d232a] dark:text-white"
          >
            <SheetHeader>
              <h2 className="text-xl font-bold">Menu</h2>
            </SheetHeader>

            <nav className="flex flex-col gap-4 mt-6 text-lg">
              <Link to="/" onClick={() => setOpen(false)}>Home</Link>
              <Link to="/products" onClick={() => setOpen(false)}>Products</Link>
              <Link to="/about" onClick={() => setOpen(false)}>About</Link>
              <Link to="/contact" onClick={() => setOpen(false)}>Contact</Link>
            </nav>
            
            <div className="absolute bottom-4 left-4 right-4 flex flex-col gap-3">
              <ModeToggle />
              <Button variant="outline" onClick={() => setOpen(false)}>Login</Button>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
};
export default Header;