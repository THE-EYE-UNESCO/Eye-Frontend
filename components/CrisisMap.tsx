'use client'

import { useEffect, useRef, useState } from 'react'
import { MapPin, AlertTriangle, Users, Clock } from 'lucide-react'

interface CrisisData {
  id: string
  lat: number
  lng: number
  title: string
  severity: 'critical' | 'high' | 'moderate'
  affected: string
  description: string
  lastUpdated: string
}

const crisisData: CrisisData[] = [
  {
    id: '1',
    lat: 50.4501,
    lng: 30.5234,
    title: 'Ukraine Crisis',
    severity: 'critical',
    affected: '2.1M',
    description: 'Escalating conflict in eastern regions',
    lastUpdated: '5 min ago'
  },
  {
    id: '2',
    lat: 9.1450,
    lng: 40.4897,
    title: 'Ethiopia Food Crisis',
    severity: 'high',
    affected: '890K',
    description: 'Severe drought affecting northern regions',
    lastUpdated: '23 min ago'
  },
  {
    id: '3',
    lat: 18.9712,
    lng: -72.2852,
    title: 'Haiti Cholera Outbreak',
    severity: 'moderate',
    affected: '156K',
    description: 'Health authorities mobilizing response',
    lastUpdated: '1 hour ago'
  },
  {
    id: '4',
    lat: 33.9391,
    lng: 67.7100,
    title: 'Afghanistan Crisis',
    severity: 'critical',
    affected: '1.8M',
    description: 'Humanitarian crisis deepening',
    lastUpdated: '12 min ago'
  },
  {
    id: '5',
    lat: 34.8021,
    lng: 38.9968,
    title: 'Syria Refugee Crisis',
    severity: 'high',
    affected: '1.2M',
    description: 'Ongoing displacement crisis',
    lastUpdated: '45 min ago'
  },
  {
    id: '6',
    lat: 15.5527,
    lng: 48.5164,
    title: 'Yemen Crisis',
    severity: 'critical',
    affected: '2.3M',
    description: 'Humanitarian catastrophe continues',
    lastUpdated: '8 min ago'
  },
  {
    id: '7',
    lat: 5.1521,
    lng: 46.1996,
    title: 'Somalia Drought',
    severity: 'high',
    affected: '670K',
    description: 'Severe drought conditions',
    lastUpdated: '32 min ago'
  },
  {
    id: '8',
    lat: 23.6850,
    lng: 90.3563,
    title: 'Bangladesh Flooding',
    severity: 'moderate',
    affected: '340K',
    description: 'Monsoon flooding affects millions',
    lastUpdated: '2 hours ago'
  }
]

export default function CrisisMap() {
  const mapRef = useRef<HTMLDivElement>(null)
  const [selectedCrisis, setSelectedCrisis] = useState<CrisisData | null>(null)
  const [mapLoaded, setMapLoaded] = useState(false)

  useEffect(() => {
    if (typeof window !== 'undefined' && mapRef.current && !mapLoaded) {
      // Load Leaflet dynamically
      import('leaflet').then((L) => {
        // Initialize map
        const map = L.map(mapRef.current!, {
          center: [20, 0],
          zoom: 2,
          zoomControl: false
        })

        // Add tile layer (OpenStreetMap)
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: '© OpenStreetMap contributors'
        }).addTo(map)

        // Custom marker icons
        const createMarkerIcon = (severity: string) => {
          const color = severity === 'critical' ? '#ef4444' : 
                       severity === 'high' ? '#f97316' : '#eab308'
          
          return L.divIcon({
            html: `
              <div class="relative">
                <div class="w-6 h-6 ${severity === 'critical' ? 'animate-pulse' : ''} rounded-full border-2 border-white shadow-lg" 
                     style="background-color: ${color}"></div>
                <div class="absolute -top-1 -right-1 w-2 h-2 bg-white rounded-full"></div>
              </div>
            `,
            className: 'crisis-marker',
            iconSize: [24, 24],
            iconAnchor: [12, 12]
          })
        }

        // Add crisis markers
        crisisData.forEach((crisis) => {
          const marker = L.marker([crisis.lat, crisis.lng], {
            icon: createMarkerIcon(crisis.severity)
          }).addTo(map)

          // Create popup content
          const popupContent = `
            <div class="p-3 min-w-64">
              <div class="flex items-center justify-between mb-2">
                <h3 class="font-semibold text-gray-900">${crisis.title}</h3>
                <span class="text-xs px-2 py-1 rounded ${
                  crisis.severity === 'critical' ? 'bg-red-100 text-red-600' :
                  crisis.severity === 'high' ? 'bg-orange-100 text-orange-600' :
                  'bg-yellow-100 text-yellow-600'
                }">${crisis.severity.toUpperCase()}</span>
              </div>
              <p class="text-sm text-gray-600 mb-2">${crisis.description}</p>
              <div class="flex items-center justify-between text-xs text-gray-500">
                <span>Affected: ${crisis.affected} people</span>
                <span>Updated: ${crisis.lastUpdated}</span>
              </div>
            </div>
          `

          marker.bindPopup(popupContent, {
            closeButton: true,
            autoClose: false,
            className: 'crisis-popup'
          })

          marker.on('click', () => {
            setSelectedCrisis(crisis)
          })
        })

        // Add zoom controls
        L.control.zoom({
          position: 'bottomright'
        }).addTo(map)

        setMapLoaded(true)
      })
    }
  }, [mapLoaded])

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'text-red-600 bg-red-100'
      case 'high': return 'text-orange-600 bg-orange-100'
      case 'moderate': return 'text-yellow-600 bg-yellow-100'
      default: return 'text-gray-600 bg-gray-100'
    }
  }

  return (
    <div className="space-y-6">
      {/* Map Container */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-gray-900">Global Crisis Map</h2>
          <div className="flex items-center space-x-4">
            <button className="text-sm text-gray-600 hover:text-gray-900">Satellite View</button>
            <button className="text-sm text-gray-600 hover:text-gray-900">Terrain</button>
            <button className="text-sm text-primary border-b border-primary">Crisis Layer</button>
          </div>
        </div>
        
        {/* Real Map */}
        <div className="relative rounded-lg overflow-hidden mb-6">
          <div 
            ref={mapRef} 
            className="w-full h-96 bg-blue-50"
            style={{ minHeight: '400px' }}
          />
          
          {/* Map overlay info */}
          <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm rounded-lg p-3 shadow-sm">
            <div className="text-sm font-medium text-gray-900">Active Crises: {crisisData.length}</div>
            <div className="text-xs text-gray-600">Last updated: 2 min ago</div>
          </div>
        </div>
        
        {/* Legend */}
        <div className="flex items-center justify-center space-x-8">
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 bg-red-500 rounded-full animate-pulse"></div>
            <span className="text-sm text-gray-600">Critical ({crisisData.filter(c => c.severity === 'critical').length})</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 bg-orange-500 rounded-full"></div>
            <span className="text-sm text-gray-600">High Priority ({crisisData.filter(c => c.severity === 'high').length})</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 bg-yellow-500 rounded-full"></div>
            <span className="text-sm text-gray-600">Moderate ({crisisData.filter(c => c.severity === 'moderate').length})</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 bg-green-500 rounded-full"></div>
            <span className="text-sm text-gray-600">Stable</span>
          </div>
        </div>
      </div>

      {/* Crisis Details Panel */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Crisis Details</h3>
        
        {selectedCrisis ? (
          <div className="space-y-4">
            <div className={`p-4 rounded-lg border ${
              selectedCrisis.severity === 'critical' ? 'bg-red-50 border-red-200' :
              selectedCrisis.severity === 'high' ? 'bg-orange-50 border-orange-200' :
              'bg-yellow-50 border-yellow-200'
            }`}>
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-semibold text-gray-900">{selectedCrisis.title}</h4>
                <span className={`text-xs px-2 py-1 rounded ${getSeverityColor(selectedCrisis.severity)}`}>
                  {selectedCrisis.severity.toUpperCase()}
                </span>
              </div>
              <p className="text-sm text-gray-600 mb-3">{selectedCrisis.description}</p>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="flex items-center space-x-2">
                  <Users className="w-4 h-4 text-gray-500" />
                  <span>Affected: {selectedCrisis.affected} people</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Clock className="w-4 h-4 text-gray-500" />
                  <span>Updated: {selectedCrisis.lastUpdated}</span>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center py-8 text-gray-500">
            <MapPin className="w-12 h-12 mx-auto mb-4 text-gray-300" />
            <p>Click on a crisis marker to view details</p>
          </div>
        )}
      </div>
    </div>
  )
}
