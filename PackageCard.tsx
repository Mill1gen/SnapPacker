import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Star, Share2, BookOpen } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { ShareTripModal } from "@/components/modals/ShareTripModal";
import { StoryGeneratorModal } from "@/components/modals/StoryGeneratorModal";
import type { Package } from "@/lib/mockData";

interface PackageCardProps {
  package: Package;
}

export function PackageCard({ package: pkg }: PackageCardProps) {
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [isStoryModalOpen, setIsStoryModalOpen] = useState(false);
  const { data: reviews = [] } = useQuery<{ rating: number }[]>({
    queryKey: [`/api/packages/${pkg.id}/reviews`],
  });

  const averageRating =
    reviews.length > 0
      ? reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length
      : 0;

  return (
    <>
      <Card className="group overflow-hidden shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 ease-in-out bg-white">
        <div className="aspect-video relative overflow-hidden">
          <img
            src={pkg.image}
            alt={pkg.title}
            className="absolute inset-0 w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500 ease-in-out"
          />
        </div>
        <CardHeader>
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 group-hover:text-primary transition-colors duration-300">
                {pkg.title}
              </h3>
              <div className="flex items-center gap-2">
                <p className="text-sm text-gray-500">{pkg.location}</p>
                {reviews.length > 0 && (
                  <div className="flex items-center">
                    <div className="flex">
                      {[1, 2, 3, 4, 5].map((i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 transform group-hover:scale-110 transition-all duration-300 ${
                            i <= Math.floor(averageRating)
                              ? "text-yellow-400 fill-yellow-400"
                              : "text-gray-300"
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-sm text-gray-500 ml-1">
                      ({reviews.length})
                    </span>
                  </div>
                )}
              </div>
            </div>
            <div className="text-right">
              <p className="text-xl font-bold text-primary transform group-hover:scale-110 transition-transform duration-300">
                ${pkg.price}
              </p>
              <p className="text-sm text-gray-500">{pkg.duration}</p>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-gray-600 group-hover:text-gray-900 transition-colors duration-300">
            {pkg.description}
          </p>
          <ul className="mt-4 space-y-2">
            {pkg.highlights.map((highlight, index) => (
              <li 
                key={index} 
                className="text-sm text-gray-600 group-hover:text-gray-900 transition-colors duration-300"
              >
                • {highlight}
              </li>
            ))}
          </ul>
        </CardContent>
        <CardFooter>
          <div className="w-full flex gap-2">
            <Button 
              className="flex-1 shadow-md hover:shadow-xl transition-all duration-300 bg-primary/90 hover:bg-primary group-hover:translate-y-0.5"
            >
              Book Now
            </Button>
            <Button
              variant="outline"
              className="shadow-md hover:shadow-xl transition-all duration-300"
              onClick={() => setIsStoryModalOpen(true)}
            >
              <BookOpen className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              className="shadow-md hover:shadow-xl transition-all duration-300"
              onClick={() => setIsShareModalOpen(true)}
            >
              <Share2 className="h-4 w-4" />
            </Button>
          </div>
        </CardFooter>
      </Card>

      <ShareTripModal
        isOpen={isShareModalOpen}
        onClose={() => setIsShareModalOpen(false)}
        package={pkg}
      />

      <StoryGeneratorModal
        isOpen={isStoryModalOpen}
        onClose={() => setIsStoryModalOpen(false)}
        destination={pkg.location}
        duration={pkg.duration}
      />
    </>
  );
}