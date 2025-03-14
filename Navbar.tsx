import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Menu, X, Phone, Mail, Search } from "lucide-react";
import { useState } from "react";

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-[#9F00FF] shadow-[0_2px_20px_rgba(159,0,255,0.5),inset_0_1px_20px_rgba(255,255,255,0.2)] fixed w-full z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/">
              <span className="text-3xl font-extrabold text-white transition-all duration-300 hover:text-white/90 hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.8)] cursor-pointer">
                SnapPacker
              </span>
            </Link>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/destinations">
              <span className="text-white/90 hover:text-white font-semibold text-lg transition-colors cursor-pointer">
                Destinations
              </span>
            </Link>
            <Link href="/experiences">
              <span className="text-white/90 hover:text-white font-semibold text-lg transition-colors cursor-pointer">
                Experiences
              </span>
            </Link>
            <Link href="/packages">
              <span className="text-white/90 hover:text-white font-semibold text-lg transition-colors cursor-pointer">
                Packages
              </span>
            </Link>
            <Link href="/contact">
              <span className="text-white/90 hover:text-white font-semibold text-lg transition-colors cursor-pointer">
                Contact
              </span>
            </Link>
            <div className="flex items-center space-x-6 ml-6 text-white/90">
              <a href="tel:1800SNAPPACKER" className="hover:text-white transition-colors hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.8)]">
                <Phone className="h-6 w-6" />
              </a>
              <a href="mailto:info@snappacker.com.au" className="hover:text-white transition-colors hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.8)]">
                <Mail className="h-6 w-6" />
              </a>
              <button className="hover:text-white transition-colors hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.8)]">
                <Search className="h-6 w-6" />
              </button>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-white hover:bg-white/10"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Nav */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-[#9F00FF] border-t border-white/10">
            <Link href="/destinations">
              <span className="block px-3 py-2 text-white/90 hover:text-white font-semibold cursor-pointer">
                Destinations
              </span>
            </Link>
            <Link href="/experiences">
              <span className="block px-3 py-2 text-white/90 hover:text-white font-semibold cursor-pointer">
                Experiences
              </span>
            </Link>
            <Link href="/packages">
              <span className="block px-3 py-2 text-white/90 hover:text-white font-semibold cursor-pointer">
                Packages
              </span>
            </Link>
            <Link href="/contact">
              <span className="block px-3 py-2 text-white/90 hover:text-white font-semibold cursor-pointer">
                Contact
              </span>
            </Link>
            <div className="flex justify-around px-3 py-4 border-t border-white/10">
              <a href="tel:1800SNAPPACKER" className="text-white/90 hover:text-white hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.8)]">
                <Phone className="h-6 w-6" />
              </a>
              <a href="mailto:info@snappacker.com.au" className="text-white/90 hover:text-white hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.8)]">
                <Mail className="h-6 w-6" />
              </a>
              <button className="text-white/90 hover:text-white hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.8)]">
                <Search className="h-6 w-6" />
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}