import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { Play } from "lucide-react";

export function VideoShowcase() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-6">
            Your Experience Starts Here
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Embark on an unforgettable journey through the stunning landscapes and rich cultures of Australia and New Zealand.
          </p>
        </div>

        <div className="relative aspect-video rounded-xl overflow-hidden shadow-2xl mb-12">
          <video
            className="w-full h-full object-cover"
            autoPlay
            muted
            loop
            playsInline
            poster="https://images.unsplash.com/photo-1523482580672-f109ba8cb9be"
          >
            <source
              src="https://player.vimeo.com/progressive_redirect/playback/735774905/rendition/720p/file.mp4"
              type="video/mp4"
            />
            Your browser does not support the video tag.
          </video>
          <div className="absolute inset-0 bg-black/30 flex items-center justify-center group hover:bg-black/40 transition-colors duration-300">
            <Button
              size="lg"
              className="bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white rounded-full p-8 group-hover:scale-110 transition-transform duration-300"
            >
              <Play className="h-8 w-8 fill-current" />
            </Button>
          </div>
        </div>

        <div className="flex justify-center">
          <Link href="/packages">
            <Button size="lg" className="bg-primary hover:bg-primary/90 text-white px-8 py-6 text-lg">
              Explore Our Tours
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}