import { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { MapPin, Search } from 'lucide-react';

interface LocationPickerProps {
  lat: number;
  lng: number;
  onLocationChange: (lat: number, lng: number) => void;
}

const MAPBOX_TOKEN = 'pk.eyJ1IjoibG92YWJsZSIsImEiOiJjbHdodzUwZGYwMW93MnFyMjRwY3Q5eGxyIn0.r5_1pVXYYqX3vJeToU9BOA';

const LocationPicker = ({ lat, lng, onLocationChange }: LocationPickerProps) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const marker = useRef<mapboxgl.Marker | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [isMapReady, setIsMapReady] = useState(false);

  useEffect(() => {
    if (!mapContainer.current || map.current) return;

    mapboxgl.accessToken = MAPBOX_TOKEN;

    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v12',
      center: [lng, lat],
      zoom: 12,
    });

    // Add navigation controls
    map.current.addControl(new mapboxgl.NavigationControl(), 'top-right');

    // Add draggable marker
    marker.current = new mapboxgl.Marker({
      color: '#14b8a6', // vendor color
      draggable: true,
    })
      .setLngLat([lng, lat])
      .addTo(map.current);

    // Update coordinates when marker is dragged
    marker.current.on('dragend', () => {
      const lngLat = marker.current?.getLngLat();
      if (lngLat) {
        onLocationChange(lngLat.lat, lngLat.lng);
      }
    });

    // Update marker position on map click
    map.current.on('click', (e) => {
      const { lng: clickLng, lat: clickLat } = e.lngLat;
      marker.current?.setLngLat([clickLng, clickLat]);
      onLocationChange(clickLat, clickLng);
    });

    map.current.on('load', () => {
      setIsMapReady(true);
    });

    return () => {
      map.current?.remove();
      map.current = null;
    };
  }, []);

  // Update marker when lat/lng props change
  useEffect(() => {
    if (marker.current && isMapReady) {
      marker.current.setLngLat([lng, lat]);
      map.current?.flyTo({ center: [lng, lat], zoom: 14 });
    }
  }, [lat, lng, isMapReady]);

  const handleSearch = async () => {
    if (!searchQuery.trim()) return;

    try {
      const response = await fetch(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(searchQuery)}.json?access_token=${MAPBOX_TOKEN}&limit=1`
      );
      const data = await response.json();

      if (data.features && data.features.length > 0) {
        const [searchLng, searchLat] = data.features[0].center;
        marker.current?.setLngLat([searchLng, searchLat]);
        map.current?.flyTo({ center: [searchLng, searchLat], zoom: 14 });
        onLocationChange(searchLat, searchLng);
      }
    } catch (error) {
      console.error('Geocoding error:', error);
    }
  };

  return (
    <div className="space-y-4">
      {/* Search Bar */}
      <div className="flex gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search for a location..."
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
          />
        </div>
        <Button 
          type="button"
          onClick={handleSearch}
          className="bg-vendor hover:bg-vendor-accent text-vendor-foreground"
        >
          Search
        </Button>
      </div>

      {/* Map Container */}
      <div className="relative">
        <div 
          ref={mapContainer} 
          className="h-72 rounded-lg overflow-hidden border border-border"
        />
        <div className="absolute bottom-3 left-3 bg-background/90 backdrop-blur-sm px-3 py-2 rounded-lg text-xs text-muted-foreground flex items-center gap-2">
          <MapPin className="w-3 h-3 text-vendor" />
          Click or drag marker to set location
        </div>
      </div>

      {/* Coordinate Display */}
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="lat">Latitude</Label>
          <Input
            id="lat"
            type="number"
            step="0.0001"
            value={lat.toFixed(6)}
            onChange={(e) => onLocationChange(parseFloat(e.target.value) || 0, lng)}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="lng">Longitude</Label>
          <Input
            id="lng"
            type="number"
            step="0.0001"
            value={lng.toFixed(6)}
            onChange={(e) => onLocationChange(lat, parseFloat(e.target.value) || 0)}
          />
        </div>
      </div>
    </div>
  );
};

export default LocationPicker;
