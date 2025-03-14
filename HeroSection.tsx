import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { SearchBar } from "@/components/packages/SearchBar";
import { Link } from "wouter";

const CAROUSEL_IMAGES = [
  "https://images.unsplash.com/photo-1722694090031-4f9b538069b5",
  "https://images.unsplash.com/photo-1523482580672-f109ba8cb9be",
  "https://images.unsplash.com/photo-1529108190281-9a4f620bc2d8",
  "https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9"
];

export function HeroSection() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % CAROUSEL_IMAGES.length);
    }, 5000); // Change image every 5 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative h-screen">
      {CAROUSEL_IMAGES.map((image, index) => (
        <div
          key={image}
          className={`absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ${
            index === currentImageIndex ? "opacity-100" : "opacity-0"
          }`}
          style={{
            backgroundImage: `url("${image}")`,
          }}
        />
      ))}
      <div className="absolute inset-0 bg-black bg-opacity-60" />

      <div className="relative h-full flex flex-col items-center justify-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl md:text-7xl font-extrabold text-white mb-6 tracking-tight">
            Discover Australia's Beauty
          </h1>
          <p className="text-xl md:text-3xl text-white mb-8 font-light">
            Unforgettable experiences await with SnapPacker
          </p>
          <div className="max-w-2xl mx-auto mb-8">
            <SearchBar />
          </div>
          <div className="flex justify-center gap-4">
            <Link href="/packages">
              <Button size="lg" className="bg-primary hover:bg-primary/90 text-white font-bold px-8 py-6 text-lg shadow-lg">
                Explore Packages
              </Button>
            </Link>
            <Link href="/contact">
              <Button 
                size="lg" 
                variant="outline" 
                className="bg-white/10 backdrop-blur-sm text-white border-white hover:bg-white hover:text-primary font-bold px-8 py-6 text-lg shadow-lg transition-colors"
              >
                Contact Us
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}