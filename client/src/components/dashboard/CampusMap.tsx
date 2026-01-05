import React, { useEffect, useMemo, useRef } from 'react';
import {
  GoogleMap,
  Marker,
  InfoWindow,
  useLoadScript,
} from '@react-google-maps/api';
import { ToiletSummary } from '../../types';
import StarRating from '../toilet/StarRating';
import { Link } from 'react-router-dom';

const DEFAULT_CENTER = { lat: 43.4723, lng: -80.5449 };

type CampusMapProps = {
  toilets?: ToiletSummary[];
  selectedId?: string;
  onSelect?: (id?: string) => void;
};

const mapContainerStyle = {
  width: '100%',
  height: '100%',
  borderRadius: '24px',
  overflow: 'hidden',
};

const CampusMap: React.FC<CampusMapProps> = ({ toilets, selectedId, onSelect }) => {
  const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: apiKey ?? '',
  });
  const mapRef = useRef<google.maps.Map | null>(null);

  const selectedToilet = useMemo(
    () => toilets?.find((t) => t.id === selectedId),
    [selectedId, toilets]
  );

  useEffect(() => {
    if (!mapRef.current || !toilets?.length) return;
    const bounds = new window.google.maps.LatLngBounds();
    toilets.forEach((toilet) => bounds.extend(toilet.location));
    mapRef.current.fitBounds(bounds, 80);
  }, [toilets]);

  if (!apiKey) {
    return (
      <div className="flex h-full items-center justify-center rounded-3xl border border-white/10 bg-black/50">
        <p className="text-gray-300">
          Add <code>VITE_GOOGLE_MAPS_API_KEY</code> to load the campus map.
        </p>
      </div>
    );
  }

  if (loadError) {
    return (
      <div className="flex h-full items-center justify-center rounded-3xl border border-white/10 bg-black/50 text-red-400">
        Map failed to load. Please check the API key.
      </div>
    );
  }

  if (!isLoaded) {
    return (
      <div className="flex h-full items-center justify-center rounded-3xl border border-white/10 bg-black/50">
        <p className="text-gray-300">Loading map...</p>
      </div>
    );
  }

  return (
    <GoogleMap
      onLoad={(map) => (mapRef.current = map)}
      mapContainerStyle={mapContainerStyle}
      center={DEFAULT_CENTER}
      zoom={15}
      options={{
        styles: [
          {
            elementType: 'geometry',
            stylers: [{ color: '#1c1c1c' }],
          },
          {
            elementType: 'labels.text.fill',
            stylers: [{ color: '#f5f1e6' }],
          },
          {
            featureType: 'poi',
            stylers: [{ visibility: 'off' }],
          },
          {
            featureType: 'road',
            elementType: 'geometry',
            stylers: [{ color: '#2c2c2c' }],
          },
        ],
        streetViewControl: false,
        mapTypeControl: false,
      }}
    >
      {toilets?.map((toilet) => (
        <Marker
          key={toilet.id}
          position={toilet.location}
          onClick={() => onSelect?.(toilet.id)}
          icon={{
            path: google.maps.SymbolPath.CIRCLE,
            scale: toilet.id === selectedId ? 12 : 9,
            fillColor: toilet.id === selectedId ? '#FFD200' : '#ffffff',
            fillOpacity: 0.9,
            strokeColor: '#000',
            strokeWeight: 1.5,
          }}
        />
      ))}

      {selectedToilet && (
        <InfoWindow
          position={selectedToilet.location}
          onCloseClick={() => onSelect?.()}
        >
          <div className="min-w-[200px] text-black">
            <p className="text-xs uppercase tracking-[0.16em] text-gray-600">
              {selectedToilet.buildingCode}
            </p>
            <h3 className="text-lg font-semibold">{selectedToilet.name}</h3>
            <StarRating value={selectedToilet.avgStars} />
            <p className="text-xs text-gray-600">{selectedToilet.ratingCount} ratings</p>
            <Link
              to={`/toilets/${selectedToilet.id}`}
              className="mt-2 inline-block rounded-md bg-[var(--uw-gold)] px-3 py-1 text-sm font-semibold text-black transition hover:brightness-95"
            >
              Rate / View
            </Link>
          </div>
        </InfoWindow>
      )}
    </GoogleMap>
  );
};

export default CampusMap;
/// <reference types="google.maps" />
