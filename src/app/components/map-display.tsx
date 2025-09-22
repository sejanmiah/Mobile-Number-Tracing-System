'use client';

import { APIProvider, Map, AdvancedMarker, Circle } from '@vis.gl/react-google-maps';
import { getGoogleMapsApiKey } from '@/lib/config';

interface MapDisplayProps {
  latitude: number;
  longitude: number;
  accuracyRadiusMeters: number;
}

export default function MapDisplay({ latitude, longitude, accuracyRadiusMeters }: MapDisplayProps) {
  const apiKey = getGoogleMapsApiKey();

  if (!apiKey) {
    return (
      <div className="flex h-full items-center justify-center bg-muted">
        <p className="text-muted-foreground p-4 text-center">Google Maps API key is missing. Please configure it in your environment variables.</p>
      </div>
    );
  }
  
  const position = { lat: latitude, lng: longitude };

  // Calculate appropriate zoom level based on accuracy radius
  const getZoom = (radius: number) => {
    // This is a rough approximation. You might want to fine-tune it.
    // The smaller the radius, the higher the zoom level.
    if (radius > 100000) return 6; // ~Country level
    if (radius > 50000) return 8; // ~State/Region level
    if (radius > 10000) return 10; // ~City level
    if (radius > 1000) return 12; // ~Neighborhood level
    return 14; // ~Street level
  };

  return (
    <APIProvider apiKey={apiKey}>
      <Map
        center={position}
        zoom={getZoom(accuracyRadiusMeters)}
        gestureHandling={'greedy'}
        disableDefaultUI={true}
        mapId="tracer-map"
        style={{ width: '100%', height: '100%' }}
      >
        <AdvancedMarker position={position} />
        <Circle
          center={position}
          radius={accuracyRadiusMeters}
          strokeColor="hsl(var(--primary))"
          strokeOpacity={0.8}
          strokeWeight={2}
          fillColor="hsl(var(--primary))"
          fillOpacity={0.35}
        />
      </Map>
    </APIProvider>
  );
}
