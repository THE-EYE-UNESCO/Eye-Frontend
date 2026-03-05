"use client";

import React, { useEffect, useRef, useState } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

interface Incident {
  id: string;
  title: string;
  category: string;
  coords: [number, number];
  color: string;
}

interface ClientSideMapProps {
  center: [number, number];
  zoom: number;
  incidents: Incident[];
  selectedIncidentId: string | null;
  onIncidentClick: (id: string) => void;
  locationLabel?: string;
  userLocation?: [number, number] | null;
}

export default function ClientSideMap({
  center,
  zoom,
  incidents,
  selectedIncidentId,
  onIncidentClick,
  locationLabel,
  userLocation
}: ClientSideMapProps) {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const markersRef = useRef<{ [key: string]: L.CircleMarker }>({});
  const userMarkerRef = useRef<L.CircleMarker | null>(null);
  const [isReady, setIsReady] = useState(false);

  // Initialize Map
  useEffect(() => {
    if (!mapContainerRef.current) return;

    // Ensure any existing map instance is removed before creating a new one
    // This is the absolute fix for "Map container is already initialized"
    if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
    }

    // Initialize Leaflet Map
    const map = L.map(mapContainerRef.current, {
        zoomControl: false,
        scrollWheelZoom: false,
    }).setView(center, zoom);

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: '&copy; OpenStreetMap'
    }).addTo(map);

    L.control.zoom({ position: 'bottomright' }).addTo(map);

    mapInstanceRef.current = map;
    setIsReady(true);

    return () => {
        if (mapInstanceRef.current) {
            mapInstanceRef.current.remove();
            mapInstanceRef.current = null;
            setIsReady(false);
        }
    };
  }, []); // Only run once on mount

  // Update Markers
  useEffect(() => {
    if (!mapInstanceRef.current || !isReady) return;

    const map = mapInstanceRef.current;

    // Clear old markers that are not in the new incidents list
    Object.keys(markersRef.current).forEach(id => {
        if (!incidents.find(inc => inc.id === id)) {
            markersRef.current[id].remove();
            delete markersRef.current[id];
        }
    });

    // Add or update markers
    incidents.forEach(incident => {
        const isSelected = selectedIncidentId === incident.id;
        
        let marker = markersRef.current[incident.id];
        
        if (!marker) {
            marker = L.circleMarker(incident.coords, {
                radius: 9,
                fillOpacity: 0.9,
            }).addTo(map);
            
            marker.on('click', () => onIncidentClick(incident.id));
            markersRef.current[incident.id] = marker;
        }

        // Update style based on selection
        marker.setStyle({
            fillColor: incident.color,
            color: isSelected ? "#0f172a" : incident.color,
            weight: isSelected ? 3 : 1,
            radius: isSelected ? 11 : 9,
        });

        // Update Tooltip
        const tooltipContent = `
            <div style="padding: 2px 4px;">
                <p style="font-weight: bold; font-size: 12px; margin: 0;">${incident.title}</p>
                <p style="color: #64748b; font-size: 10px; margin: 0;">${incident.category}</p>
            </div>
        `;
        marker.bindTooltip(tooltipContent, {
            direction: 'top',
            offset: [0, -8],
            opacity: 0.9
        });
    });

  }, [incidents, selectedIncidentId, isReady]);

  // Update user location marker
  useEffect(() => {
    if (!mapInstanceRef.current || !isReady || !userLocation) return;

    const map = mapInstanceRef.current;

    // Remove old user marker if exists
    if (userMarkerRef.current) {
      userMarkerRef.current.remove();
    }

    // Create user location marker
    const userMarker = L.circleMarker(userLocation, {
      radius: 8,
      fillColor: "#14b8a6",
      color: "#ffffff",
      weight: 3,
      fillOpacity: 1,
    }).addTo(map);

    userMarker.bindTooltip("Your Location", {
      direction: 'top',
      offset: [0, -8],
      opacity: 0.9,
      permanent: false
    });

    userMarkerRef.current = userMarker;

    return () => {
      if (userMarkerRef.current) {
        userMarkerRef.current.remove();
        userMarkerRef.current = null;
      }
    };
  }, [userLocation, isReady]);

  // Handle center/zoom updates if needed
  useEffect(() => {
    if (mapInstanceRef.current && isReady) {
        mapInstanceRef.current.setView(center, zoom, { animate: true });
    }
  }, [center, zoom, isReady]);

  return (
    <div className="h-full w-full relative overflow-hidden rounded-xl bg-bg-secondary border border-card-border shadow-inner">
      <div 
        ref={mapContainerRef} 
        className="h-full w-full z-0"
      />
      
      {!isReady && (
        <div className="absolute inset-0 flex items-center justify-center bg-bg-secondary z-10">
           <div className="flex flex-col items-center gap-3">
              <div className="h-6 w-6 animate-spin rounded-full border-2 border-tealGlow border-t-transparent" />
              <p className="text-[11px] font-medium text-text-muted">Loading Crisis Map...</p>
           </div>
        </div>
      )}

      {locationLabel && (
        <div className="pointer-events-none absolute bottom-4 left-4 z-[1000] rounded-full bg-white/95 px-4 py-1.5 text-[11px] font-bold text-slate-700 shadow-xl border border-slate-200/50 backdrop-blur-md">
          <span className="flex items-center gap-2">
            <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-tealGlow opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-tealGlow"></span>
            </span>
            {locationLabel}
          </span>
        </div>
      )}
    </div>
  );
}
