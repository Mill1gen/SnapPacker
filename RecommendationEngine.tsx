import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { PackageCard } from "@/components/packages/PackageCard";
import { Loading } from "@/components/ui/loading";
import { useMutation } from "@tanstack/react-query";
import type { Package } from "@/lib/mockData";
import { useToast } from "@/hooks/use-toast";

export function RecommendationEngine() {
  const [budget, setBudget] = useState<number[]>([1000]);
  const [duration, setDuration] = useState("");
  const [interests, setInterests] = useState<string[]>([]);
  const [country, setCountry] = useState<string>("australia");
  const { toast } = useToast();

  const { mutate: getRecommendations, data: recommendations, isPending } = useMutation<Package[]>({
    mutationFn: async () => {
      const response = await fetch("/api/recommendations/packages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          budget: budget[0],
          duration,
          interests,
          country
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to get recommendations");
      }

      return response.json();
    },
    onSuccess: (data) => {
      toast({
        title: "Success",
        description: `Found ${data.length} packages matching your preferences!`,
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to get recommendations. Please try again.",
        variant: "destructive",
      });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!duration || interests.length === 0) {
      toast({
        title: "Missing Information",
        description: "Please fill in all fields to get personalized recommendations.",
        variant: "destructive",
      });
      return;
    }
    getRecommendations();
  };

  return (
    <div className="space-y-8">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium mb-2">
            Destination Country
          </label>
          <Select value={country} onValueChange={setCountry}>
            <SelectTrigger>
              <SelectValue placeholder="Select country" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="australia">Australia</SelectItem>
              <SelectItem value="new-zealand">New Zealand</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">
            Budget (AUD)
          </label>
          <Slider
            min={500}
            max={5000}
            step={100}
            value={budget}
            onValueChange={setBudget}
            className="py-4"
          />
          <p className="text-sm text-gray-500 mt-1">
            Up to ${budget[0].toLocaleString()}
          </p>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">
            Duration
          </label>
          <Select value={duration} onValueChange={setDuration}>
            <SelectTrigger>
              <SelectValue placeholder="Select duration" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="weekend">Weekend Getaway (2-3 days)</SelectItem>
              <SelectItem value="short">Short Trip (4-7 days)</SelectItem>
              <SelectItem value="long">Extended Holiday (8+ days)</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">
            Interests (comma-separated)
          </label>
          <Input
            placeholder="e.g., beaches, hiking, culture"
            onChange={(e) => setInterests(e.target.value.split(",").map(i => i.trim()))}
          />
        </div>

        <Button type="submit" className="w-full" disabled={isPending}>
          Get Personalized Recommendations
        </Button>
      </form>

      {isPending ? (
        <div className="text-center py-12">
          <Loading size="lg" message="Finding your perfect packages..." />
        </div>
      ) : recommendations && recommendations.length > 0 && (
        <div className="space-y-6">
          <h3 className="text-2xl font-bold">Recommended Packages</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {recommendations.map((pkg) => (
              <PackageCard key={pkg.id} package={pkg} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}