import { useEffect, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import { Card } from "@/components/ui/card";
import 'leaflet/dist/leaflet.css';

// Import marker icons
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

// Fix default marker icon issue
let DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41]
});
L.Marker.prototype.options.icon = DefaultIcon;

// Popular destinations data with mock popularity scores
const destinations = [
  // Australia
  { name: "Sydney Opera House", lat: -33.8568, lng: 151.2153, popularity: 1.0, country: "Australia" },
  { name: "Great Barrier Reef", lat: -16.2864, lng: 145.6845, popularity: 0.9, country: "Australia" },
  { name: "Melbourne CBD", lat: -37.8136, lng: 144.9631, popularity: 0.85, country: "Australia" },
  { name: "Gold Coast", lat: -28.0167, lng: 153.4000, popularity: 0.75, country: "Australia" },
  { name: "Byron Bay", lat: -28.6474, lng: 153.6020, popularity: 0.8, country: "Australia" },
  { name: "Cairns", lat: -16.9203, lng: 145.7710, popularity: 0.85, country: "Australia" },
  { name: "Bondi Beach", lat: -33.8915, lng: 151.2767, popularity: 0.85, country: "Australia" },
  { name: "Blue Mountains", lat: -33.7188, lng: 150.3715, popularity: 0.7, country: "Australia" },
  // New Zealand
  { name: "Queenstown", lat: -45.0312, lng: 168.6626, popularity: 0.95, country: "New Zealand" },
  { name: "Wellington", lat: -41.2865, lng: 174.7762, popularity: 0.8, country: "New Zealand" },
  { name: "Auckland", lat: -36.8509, lng: 174.7645, popularity: 0.85, country: "New Zealand" },
  { name: "Rotorua", lat: -38.1368, lng: 176.2497, popularity: 0.75, country: "New Zealand" },
  { name: "Franz Josef Glacier", lat: -43.4000, lng: 170.1833, popularity: 0.7, country: "New Zealand" },
  { name: "Abel Tasman", lat: -40.9147, lng: 172.9619, popularity: 0.65, country: "New Zealand" },
  { name: "Christchurch", lat: -43.5320, lng: 172.6306, popularity: 0.7, country: "New Zealand" },
  { name: "Lake Tekapo", lat: -44.0040, lng: 170.4775, popularity: 0.6, country: "New Zealand" }
];

// Map center coordinates for each country
const mapCenters = {
  Australia: { center: [-25.2744, 133.7751], zoom: 4 },
  "New Zealand": { center: [-41.2865, 174.7762], zoom: 5 },
  default: { center: [-30.0, 160.0], zoom: 4 }
};

interface DestinationHeatmapProps {
  country?: string;
}

export function DestinationHeatmap({ country }: DestinationHeatmapProps) {
  const mapRef = useRef<L.Map | null>(null);
  const heatLayerRef = useRef<any>(null);

  const filteredDestinations = country 
    ? destinations.filter(dest => dest.country === country.replace(/([A-Z])/g, ' $1').trim())
    : destinations;

  const mapConfig = country 
    ? mapCenters[country as keyof typeof mapCenters] || mapCenters.default
    : mapCenters.default;

  useEffect(() => {
    // Dynamically import the heatmap plugin
    const script = document.createElement('script');
    script.src = 'https://unpkg.com/leaflet.heat@0.2.0/dist/leaflet-heat.js';
    document.body.appendChild(script);

    script.onload = () => {
      if (!mapRef.current || heatLayerRef.current) return;

      const points = filteredDestinations.map(dest => [
        dest.lat,
        dest.lng,
        dest.popularity * 100
      ] as [number, number, number]); // Type assertion to fix the array type

      // Create heatmap layer after plugin is loaded
      if (window.L.heatLayer) {
        heatLayerRef.current = window.L.heatLayer(points, {
          radius: 35,
          blur: 35,
          maxZoom: 10,
          gradient: {
            0.4: '#fee8c8',
            0.6: '#fdbb84',
            0.7: '#fc8d59',
            0.8: '#ef6548',
            1.0: '#d7301f'
          }
        }).addTo(mapRef.current);
      }
    };

    return () => {
      document.body.removeChild(script);
      if (heatLayerRef.current && mapRef.current) {
        heatLayerRef.current.remove();
        heatLayerRef.current = null;
      }
    };
  }, [filteredDestinations]);

  return (
    <Card className="w-full overflow-hidden">
      <MapContainer
        center={mapConfig.center}
        zoom={mapConfig.zoom}
        style={{ height: "600px" }}
        ref={mapRef}
        className="w-full h-full"
      >
        <TileLayer
          attribution='© OpenStreetMap contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {filteredDestinations.map((dest) => (
          <Marker
            key={dest.name}
            position={[dest.lat, dest.lng]}
          >
            <Popup>
              <b>{dest.name}</b>
              <br />
              {dest.country}
              <br />
              Popularity: {(dest.popularity * 100).toFixed(0)}%
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </Card>
  );
}