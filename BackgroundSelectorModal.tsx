import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Settings2 } from "lucide-react";

const backgroundOptions = [
  {
    id: 1,
    url: "https://images.unsplash.com/photo-1504609773096-104ff2c73ba4",
    label: "Backpacker on Mountain",
    location: "Swiss Alps"
  },
  {
    id: 2,
    url: "https://images.unsplash.com/photo-1501555088652-021faa106b9b",
    label: "Beach Backpacking",
    location: "Thailand"
  },
  {
    id: 3,
    url: "https://images.unsplash.com/photo-1527631746610-bca00a040d60",
    label: "City Explorer",
    location: "Tokyo, Japan"
  },
  {
    id: 4,
    url: "https://images.unsplash.com/photo-1501785888041-af3ef285b470",
    label: "Nature Trail",
    location: "New Zealand"
  },
  {
    id: 5,
    url: "https://images.unsplash.com/photo-1516939884455-1445c8652f83",
    label: "Historical Journey",
    location: "Rome, Italy"
  },
  {
    id: 6,
    url: "https://images.unsplash.com/photo-1527631746610-bca00a040d60",
    label: "Adventure Travel",
    location: "Costa Rica"
  }
];

interface BackgroundSelectorModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentBackground: string;
  onSelectBackground: (url: string) => void;
}

export function BackgroundSelectorModal({
  isOpen,
  onClose,
  currentBackground,
  onSelectBackground,
}: BackgroundSelectorModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[800px]">
        <DialogHeader>
          <DialogTitle>Choose Your Travel Moment Background</DialogTitle>
        </DialogHeader>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-4">
          {backgroundOptions.map((option) => (
            <div
              key={option.id}
              className={`relative aspect-video rounded-lg overflow-hidden cursor-pointer group ${
                currentBackground === option.url ? 'ring-2 ring-primary ring-offset-2' : ''
              }`}
              onClick={() => {
                onSelectBackground(option.url);
                onClose();
              }}
            >
              <img
                src={option.url}
                alt={option.label}
                className="absolute inset-0 w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-3">
                <p className="text-white font-semibold text-sm">
                  {option.label}
                </p>
                <p className="text-gray-200 text-xs">
                  {option.location}
                </p>
              </div>
            </div>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
}
