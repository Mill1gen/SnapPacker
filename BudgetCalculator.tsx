import { useState, useEffect } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Loader2, DollarSign, Calendar, MapPin, TrendingUp } from "lucide-react";

interface BudgetEntry {
  categoryId: number;
  amount: number;
  location: string;
  duration: number;
  notes?: string;
}

interface AIPrediction {
  predictedAmount: number;
  confidence: number;
  seasonality: string;
}

const locations = {
  "Australia": [
    "Sydney",
    "Melbourne",
    "Brisbane",
    "Gold Coast",
    "Perth",
    "Cairns"
  ],
  "New Zealand": [
    "Auckland",
    "Wellington",
    "Queenstown",
    "Christchurch",
    "Rotorua",
    "Dunedin"
  ]
};

const categories = [
  { id: 1, name: "Accommodation", icon: "🏠" },
  { id: 2, name: "Food & Drinks", icon: "🍽️" },
  { id: 3, name: "Transportation", icon: "🚌" },
  { id: 4, name: "Activities", icon: "🎯" },
  { id: 5, name: "Shopping", icon: "🛍️" },
  { id: 6, name: "Other", icon: "📌" }
];

export function BudgetCalculator() {
  const { toast } = useToast();
  const [country, setCountry] = useState<string>("Australia");
  const [formData, setFormData] = useState<BudgetEntry>({
    categoryId: 1,
    amount: 0,
    location: locations[country as keyof typeof locations][0],
    duration: 1,
    notes: ""
  });

  // Fetch community averages
  const { data: communityData, isLoading: isLoadingCommunity } = useQuery({
    queryKey: ["/api/budget/community-average", formData.location, formData.categoryId],
    enabled: !!formData.location && !!formData.categoryId,
  });

  // Fetch AI predictions
  const { data: aiPrediction, isLoading: isLoadingAI } = useQuery<AIPrediction>({
    queryKey: ["/api/budget/ai-prediction", formData.location, formData.categoryId],
    enabled: !!formData.location && !!formData.categoryId,
  });

  // Submit budget entry
  const submitMutation = useMutation({
    mutationFn: async (data: BudgetEntry) => {
      const response = await fetch("/api/budget/entries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!response.ok) throw new Error("Failed to submit budget entry");
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "Success",
        description: "Your budget entry has been saved!",
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: "Failed to save budget entry. Please try again.",
        variant: "destructive",
      });
    },
  });

  // Update location options when country changes
  useEffect(() => {
    setFormData(prev => ({
      ...prev,
      location: locations[country as keyof typeof locations][0]
    }));
  }, [country]);

  return (
    <div className="grid gap-6 md:grid-cols-2">
      {/* Input Form */}
      <Card>
        <CardHeader>
          <CardTitle>Enter Your Budget Details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Country</label>
            <Select
              value={country}
              onValueChange={(value) => setCountry(value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select country" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Australia">Australia</SelectItem>
                <SelectItem value="New Zealand">New Zealand</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Location</label>
            <Select
              value={formData.location}
              onValueChange={(value) => setFormData(prev => ({ ...prev, location: value }))}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select location" />
              </SelectTrigger>
              <SelectContent>
                {locations[country as keyof typeof locations].map((location) => (
                  <SelectItem key={location} value={location}>
                    {location}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Category</label>
            <Select
              value={formData.categoryId.toString()}
              onValueChange={(value) => setFormData(prev => ({ ...prev, categoryId: parseInt(value) }))}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category.id} value={category.id.toString()}>
                    {category.icon} {category.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Amount (in local currency)</label>
            <div className="relative">
              <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 h-4 w-4" />
              <Input
                type="number"
                className="pl-10"
                value={formData.amount}
                onChange={(e) => setFormData(prev => ({ ...prev, amount: parseFloat(e.target.value) }))}
                placeholder="0.00"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Duration (days)</label>
            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 h-4 w-4" />
              <Input
                type="number"
                className="pl-10"
                value={formData.duration}
                onChange={(e) => setFormData(prev => ({ ...prev, duration: parseInt(e.target.value) }))}
                min="1"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Notes (optional)</label>
            <Input
              value={formData.notes}
              onChange={(e) => setFormData(prev => ({ ...prev, notes: e.target.value }))}
              placeholder="Add any additional details..."
            />
          </div>

          <Button
            className="w-full"
            onClick={() => submitMutation.mutate(formData)}
            disabled={submitMutation.isPending}
          >
            {submitMutation.isPending ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Saving...
              </>
            ) : (
              "Save Budget Entry"
            )}
          </Button>
        </CardContent>
      </Card>

      {/* Predictions and Community Data */}
      <Card>
        <CardHeader>
          <CardTitle>Smart Budget Insights</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* AI Predictions */}
          <div className="space-y-4">
            <h3 className="font-semibold flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              AI Cost Prediction
            </h3>
            {isLoadingAI ? (
              <div className="flex items-center justify-center p-4">
                <Loader2 className="h-6 w-6 animate-spin" />
              </div>
            ) : aiPrediction ? (
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Predicted Amount:</span>
                  <span className="font-semibold">${aiPrediction.predictedAmount.toFixed(2)}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Confidence:</span>
                  <span className="font-semibold">{(aiPrediction.confidence * 100).toFixed(1)}%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Season:</span>
                  <span className="font-semibold">{aiPrediction.seasonality}</span>
                </div>
              </div>
            ) : (
              <p className="text-sm text-gray-600">Select a location and category to see predictions</p>
            )}
          </div>

          {/* Community Averages */}
          <div className="space-y-4">
            <h3 className="font-semibold">Community Averages</h3>
            {isLoadingCommunity ? (
              <div className="flex items-center justify-center p-4">
                <Loader2 className="h-6 w-6 animate-spin" />
              </div>
            ) : communityData ? (
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Average Daily Cost:</span>
                  <span className="font-semibold">${communityData.averageAmount.toFixed(2)}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Submissions:</span>
                  <span className="font-semibold">{communityData.submissionCount}</span>
                </div>
              </div>
            ) : (
              <p className="text-sm text-gray-600">No community data available yet</p>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
