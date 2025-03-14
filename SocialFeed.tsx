import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Instagram, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ShareMomentsModal } from "@/components/modals/ShareMomentsModal";

// Mock social media posts data
const socialPosts = [
  {
    id: 1,
    imageUrl: "https://images.unsplash.com/photo-1624138784614-87fd1b6528f8",
    caption: "Sunset at Bondi Beach 🌅 #Australia #Travel @SnapPacker",
    likes: 1243,
    username: "travelgram_sarah"
  },
  {
    id: 2,
    imageUrl: "https://images.unsplash.com/photo-1523482580672-f109ba8cb9be",
    caption: "Opera House views never get old ✨ Book with @SnapPacker for the best experiences!",
    likes: 892,
    username: "wanderlust_mike"
  },
  {
    id: 3,
    imageUrl: "https://images.unsplash.com/photo-1529108190281-9a4f620bc2d8",
    caption: "Great Barrier Reef adventures with @SnapPacker 🐠 #Queensland #Australia",
    likes: 1567,
    username: "dive_master_jane"
  },
  {
    id: 4,
    imageUrl: "https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9",
    caption: "Exploring Uluru with the best tour guides @SnapPacker 🏜️ #NorthernTerritory",
    likes: 2103,
    username: "outback_explorer"
  },
  {
    id: 5,
    imageUrl: "https://images.unsplash.com/photo-1545044846-351ba102b6d5",
    caption: "Melbourne's coffee culture is unmatched ☕️ Thanks @SnapPacker for the recommendations!",
    likes: 756,
    username: "coffee_wanderer"
  },
  {
    id: 6,
    imageUrl: "https://images.unsplash.com/photo-1536293283170-b4604bbe272c",
    caption: "Wildlife encounters in Tasmania 🦘 Book your adventure with @SnapPacker",
    likes: 1892,
    username: "nature_lover_alex"
  }
];

export function SocialFeed() {
  const [hoveredPost, setHoveredPost] = useState<number | null>(null);
  const [selectedPost, setSelectedPost] = useState<typeof socialPosts[0] | null>(null);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);

  const handleShare = (post: typeof socialPosts[0]) => {
    setSelectedPost(post);
    setIsShareModalOpen(true);
  };

  return (
    <section 
      className="relative py-16"
      style={{
        backgroundImage: `url('https://images.unsplash.com/photo-1501785888041-af3ef285b470')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}
    >
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/60" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-white mb-4">
            Travel Moments
          </h2>
          <p className="text-gray-200">
            Follow us <span className="text-primary font-semibold">@SnapPacker</span> for more travel inspiration
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {socialPosts.map((post) => (
            <Card
              key={post.id}
              className="relative overflow-hidden aspect-square group cursor-pointer"
              onMouseEnter={() => setHoveredPost(post.id)}
              onMouseLeave={() => setHoveredPost(null)}
            >
              <img
                src={post.imageUrl}
                alt={post.caption}
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div
                className={`absolute inset-0 bg-black/60 flex flex-col justify-end p-4 transition-opacity duration-300 ${
                  hoveredPost === post.id ? "opacity-100" : "opacity-0"
                }`}
              >
                <div className="text-white">
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <div className="flex items-center gap-2">
                      <Instagram className="h-4 w-4" />
                      <span className="font-semibold text-sm">
                        {post.username}
                      </span>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-white hover:text-white hover:bg-white/20"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleShare(post);
                      }}
                    >
                      <Share2 className="h-4 w-4" />
                    </Button>
                  </div>
                  <p className="text-sm line-clamp-2">
                    {post.caption}
                  </p>
                  <p className="text-sm mt-2 text-gray-300">
                    {post.likes.toLocaleString()} likes
                  </p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {selectedPost && (
        <ShareMomentsModal
          isOpen={isShareModalOpen}
          onClose={() => {
            setIsShareModalOpen(false);
            setSelectedPost(null);
          }}
          post={selectedPost}
        />
      )}
    </section>
  );
}