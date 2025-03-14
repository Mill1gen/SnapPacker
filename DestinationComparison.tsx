import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { DollarSign, Sun, Tent, Bus, Coffee, Globe } from "lucide-react";

// Comparison metrics data
const destinationMetrics = {
  "Sydney & New South Wales": {
    averageDailyCost: 75,
    weatherScore: 8.5,
    hostelPrice: 30,
    transportScore: 9,
    coffeePrice: 4,
    activities: [
      "Free City Walking Tours",
      "Bondi to Coogee Walk",
      "Blue Mountains Day Trip",
      "Opera House Visit"
    ],
    backpackerScore: 9,
    workOpportunities: 8,
    language: "English",
    visaRequirements: "Working Holiday Visa available",
    country: "Australia"
  },
  "Melbourne & Victoria": {
    averageDailyCost: 70,
    weatherScore: 7.5,
    hostelPrice: 28,
    transportScore: 9.5,
    coffeePrice: 3.8,
    activities: [
      "Street Art Tours",
      "Great Ocean Road",
      "Coffee Culture",
      "St Kilda Beach"
    ],
    backpackerScore: 9.5,
    workOpportunities: 8.5,
    language: "English",
    visaRequirements: "Working Holiday Visa available",
    country: "Australia"
  },
  "Queensland & Great Barrier Reef": {
    averageDailyCost: 85,
    weatherScore: 9,
    hostelPrice: 32,
    transportScore: 7,
    coffeePrice: 4.2,
    activities: [
      "Reef Snorkeling",
      "Island Hopping",
      "Rainforest Tours",
      "Surfing"
    ],
    backpackerScore: 8.5,
    workOpportunities: 7.5,
    language: "English",
    visaRequirements: "Working Holiday Visa available",
    country: "Australia"
  },
  "Wellington & North Island": {
    averageDailyCost: 65,
    weatherScore: 7,
    hostelPrice: 25,
    transportScore: 8,
    coffeePrice: 3.5,
    activities: [
      "Te Papa Museum",
      "Tongariro Crossing",
      "Hobbiton",
      "Rotorua"
    ],
    backpackerScore: 8.5,
    workOpportunities: 7,
    language: "English",
    visaRequirements: "Working Holiday Visa available",
    country: "New Zealand"
  },
  "Queenstown & South Island": {
    averageDailyCost: 80,
    weatherScore: 8,
    hostelPrice: 30,
    transportScore: 7,
    coffeePrice: 4,
    activities: [
      "Bungee Jumping",
      "Skiing/Snowboarding",
      "Milford Sound",
      "Hiking"
    ],
    backpackerScore: 9,
    workOpportunities: 8,
    language: "English",
    visaRequirements: "Working Holiday Visa available",
    country: "New Zealand"
  }
};

interface ComparisonMetrics {
  averageDailyCost: number;
  weatherScore: number;
  hostelPrice: number;
  transportScore: number;
  coffeePrice: number;
  activities: string[];
  backpackerScore: number;
  workOpportunities: number;
  language: string;
  visaRequirements: string;
  country: string;
}

export function DestinationComparison() {
  const [destination1, setDestination1] = useState<string>("");
  const [destination2, setDestination2] = useState<string>("");
  const [comparisonData, setComparisonData] = useState<any[]>([]);

  useEffect(() => {
    if (destination1 && destination2) {
      const metrics1 = destinationMetrics[destination1 as keyof typeof destinationMetrics];
      const metrics2 = destinationMetrics[destination2 as keyof typeof destinationMetrics];

      const data = [
        {
          name: "Daily Cost ($)",
          [destination1]: metrics1.averageDailyCost,
          [destination2]: metrics2.averageDailyCost,
        },
        {
          name: "Weather Score",
          [destination1]: metrics1.weatherScore,
          [destination2]: metrics2.weatherScore,
        },
        {
          name: "Hostel Price ($)",
          [destination1]: metrics1.hostelPrice,
          [destination2]: metrics2.hostelPrice,
        },
        {
          name: "Transport Score",
          [destination1]: metrics1.transportScore,
          [destination2]: metrics2.transportScore,
        },
        {
          name: "Coffee Price ($)",
          [destination1]: metrics1.coffeePrice,
          [destination2]: metrics2.coffeePrice,
        },
        {
          name: "Backpacker Score",
          [destination1]: metrics1.backpackerScore,
          [destination2]: metrics2.backpackerScore,
        },
        {
          name: "Work Opportunities",
          [destination1]: metrics1.workOpportunities,
          [destination2]: metrics2.workOpportunities,
        },
      ];

      setComparisonData(data);
    }
  }, [destination1, destination2]);

  const renderMetricCard = (
    icon: React.ReactNode,
    title: string,
    dest1Value: number | string,
    dest2Value: number | string,
    unit: string = ""
  ) => (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        {icon}
      </CardHeader>
      <CardContent>
        <div className="flex justify-between text-2xl font-bold">
          <div className="text-sm">
            <p className="text-muted-foreground">Destination 1</p>
            <p>{dest1Value}{unit}</p>
          </div>
          <div className="text-sm text-right">
            <p className="text-muted-foreground">Destination 2</p>
            <p>{dest2Value}{unit}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1">
          <label className="block text-sm font-medium mb-2">Destination 1</label>
          <Select value={destination1} onValueChange={setDestination1}>
            <SelectTrigger>
              <SelectValue placeholder="Select destination" />
            </SelectTrigger>
            <SelectContent>
              {Object.keys(destinationMetrics).map((dest) => (
                <SelectItem key={dest} value={dest}>{dest}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="flex-1">
          <label className="block text-sm font-medium mb-2">Destination 2</label>
          <Select value={destination2} onValueChange={setDestination2}>
            <SelectTrigger>
              <SelectValue placeholder="Select destination" />
            </SelectTrigger>
            <SelectContent>
              {Object.keys(destinationMetrics)
                .filter(dest => dest !== destination1)
                .map((dest) => (
                  <SelectItem key={dest} value={dest}>{dest}</SelectItem>
                ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {destination1 && destination2 && (
        <>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {renderMetricCard(
              <DollarSign className="h-4 w-4 text-muted-foreground" />,
              "Average Daily Cost",
              destinationMetrics[destination1 as keyof typeof destinationMetrics].averageDailyCost,
              destinationMetrics[destination2 as keyof typeof destinationMetrics].averageDailyCost,
              "$"
            )}
            {renderMetricCard(
              <Sun className="h-4 w-4 text-muted-foreground" />,
              "Weather Score",
              destinationMetrics[destination1 as keyof typeof destinationMetrics].weatherScore,
              destinationMetrics[destination2 as keyof typeof destinationMetrics].weatherScore,
              "/10"
            )}
            {renderMetricCard(
              <Tent className="h-4 w-4 text-muted-foreground" />,
              "Hostel Price",
              destinationMetrics[destination1 as keyof typeof destinationMetrics].hostelPrice,
              destinationMetrics[destination2 as keyof typeof destinationMetrics].hostelPrice,
              "$"
            )}
          </div>

          <Card className="p-4">
            <CardTitle className="mb-4">Detailed Comparison</CardTitle>
            <div className="h-[400px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={comparisonData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey={destination1} fill="#8884d8" />
                  <Bar dataKey={destination2} fill="#82ca9d" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Card>

          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Activities Comparison</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-semibold mb-2">{destination1}</h4>
                    <ul className="list-disc list-inside space-y-1">
                      {destinationMetrics[destination1 as keyof typeof destinationMetrics].activities.map((activity) => (
                        <li key={activity} className="text-sm">{activity}</li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">{destination2}</h4>
                    <ul className="list-disc list-inside space-y-1">
                      {destinationMetrics[destination2 as keyof typeof destinationMetrics].activities.map((activity) => (
                        <li key={activity} className="text-sm">{activity}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Travel Information</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-semibold mb-2">{destination1}</h4>
                    <p className="text-sm mb-1">
                      <span className="font-medium">Language:</span>{" "}
                      {destinationMetrics[destination1 as keyof typeof destinationMetrics].language}
                    </p>
                    <p className="text-sm">
                      <span className="font-medium">Visa:</span>{" "}
                      {destinationMetrics[destination1 as keyof typeof destinationMetrics].visaRequirements}
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">{destination2}</h4>
                    <p className="text-sm mb-1">
                      <span className="font-medium">Language:</span>{" "}
                      {destinationMetrics[destination2 as keyof typeof destinationMetrics].language}
                    </p>
                    <p className="text-sm">
                      <span className="font-medium">Visa:</span>{" "}
                      {destinationMetrics[destination2 as keyof typeof destinationMetrics].visaRequirements}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </>
      )}
    </div>
  );
}
