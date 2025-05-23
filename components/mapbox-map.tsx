"use client"

import { useEffect, useRef, useState } from "react"
import mapboxgl from "mapbox-gl"
import "mapbox-gl/dist/mapbox-gl.css"
import type { Property } from "@/lib/types"

// Helper function to get the base URL
function getBaseUrl() {
  // In client-side, use relative URLs
  if (typeof window !== "undefined") {
    return ""
  }

  // In server environment, use environment variables or default
  const vercelUrl = process.env.VERCEL_URL
  if (vercelUrl) {
    return `https://${vercelUrl}`
  }

  // Default to localhost in development
  return "http://localhost:3000"
}

interface MapboxMapProps {
  properties: Property[]
  onPropertyClick?: (property: Property) => void
  className?: string
}

export function MapboxMap({ properties, onPropertyClick, className = "h-[600px] w-full" }: MapboxMapProps) {
  const mapContainer = useRef<HTMLDivElement>(null)
  const map = useRef<mapboxgl.Map | null>(null)
  const [mapLoaded, setMapLoaded] = useState(false)
  const [mapboxToken, setMapboxToken] = useState<string | null>(null)
  const [tokenError, setTokenError] = useState<string | null>(null)

  // Fetch the Mapbox token from our secure API route
  useEffect(() => {
    async function fetchMapboxToken() {
      try {
        const baseUrl = getBaseUrl()
        const response = await fetch(`${baseUrl}/api/mapbox-token`)
        if (!response.ok) {
          throw new Error("Failed to fetch Mapbox token")
        }
        const data = await response.json()
        setMapboxToken(data.token)
        mapboxgl.accessToken = data.token
      } catch (error) {
        console.error("Error fetching Mapbox token:", error)
        setTokenError("Failed to load map: API token not available")
      }
    }

    fetchMapboxToken()
  }, [])

  useEffect(() => {
    if (!mapContainer.current || !mapboxToken) return

    // Initialize map with optimized settings
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/streets-v12",
      center: [-74.006, 40.7128], // Default to NYC
      zoom: 10,
      antialias: true,
      optimizeForTerrain: true,
    })

    map.current.on("load", () => {
      setMapLoaded(true)
    })

    // Add navigation controls
    map.current.addControl(new mapboxgl.NavigationControl(), "top-right")

    // Add geolocation control
    map.current.addControl(
      new mapboxgl.GeolocateControl({
        positionOptions: {
          enableHighAccuracy: true,
        },
        trackUserLocation: true,
        showUserHeading: true,
      }),
      "top-right",
    )

    return () => {
      if (map.current) {
        map.current.remove()
      }
    }
  }, [mapboxToken, mapContainer])

  useEffect(() => {
    if (!map.current || !mapLoaded) return

    // Filter properties with location data
    const propertiesWithLocation = properties.filter(
      (property) => property.location && property.location.lat && property.location.lng,
    )

    if (propertiesWithLocation.length === 0) return

    // Remove existing sources and layers
    if (map.current.getSource("properties")) {
      map.current.removeLayer("clusters")
      map.current.removeLayer("cluster-count")
      map.current.removeLayer("unclustered-point")
      map.current.removeSource("properties")
    }

    // Add clustered data source
    map.current.addSource("properties", {
      type: "geojson",
      data: {
        type: "FeatureCollection",
        features: propertiesWithLocation.map((property) => ({
          type: "Feature",
          geometry: {
            type: "Point",
            coordinates: [property.location!.lng, property.location!.lat],
          },
          properties: {
            id: property.property_id,
            name: property.name || property.address,
            address: property.address,
            city: property.city,
            state: property.state,
            value: property.value,
            verified: property.verified,
            transparency_score: property.transparency_score || 75,
          },
        })),
      },
      cluster: true,
      clusterMaxZoom: 14,
      clusterRadius: 50,
    })

    // Add cluster circles
    map.current.addLayer({
      id: "clusters",
      type: "circle",
      source: "properties",
      filter: ["has", "point_count"],
      paint: {
        "circle-color": ["step", ["get", "point_count"], "#51bbd6", 100, "#f1f075", 750, "#f28cb1"],
        "circle-radius": ["step", ["get", "point_count"], 20, 100, 30, 750, 40],
      },
    })

    // Add cluster count labels
    map.current.addLayer({
      id: "cluster-count",
      type: "symbol",
      source: "properties",
      filter: ["has", "point_count"],
      layout: {
        "text-field": "{point_count_abbreviated}",
        "text-font": ["DIN Offc Pro Medium", "Arial Unicode MS Bold"],
        "text-size": 12,
      },
    })

    // Add individual property points
    map.current.addLayer({
      id: "unclustered-point",
      type: "circle",
      source: "properties",
      filter: ["!", ["has", "point_count"]],
      paint: {
        "circle-color": [
          "case",
          ["get", "verified"],
          "#10b981", // Green for verified
          "#f59e0b", // Yellow for unverified
        ],
        "circle-radius": 8,
        "circle-stroke-width": 2,
        "circle-stroke-color": "#fff",
      },
    })

    // Click handlers for clusters
    map.current.on("click", "clusters", (e) => {
      const features = map.current!.queryRenderedFeatures(e.point, {
        layers: ["clusters"],
      })
      const clusterId = features[0].properties!.cluster_id
      const source = map.current!.getSource("properties") as mapboxgl.GeoJSONSource

      source.getClusterExpansionZoom(clusterId, (err, zoom) => {
        if (err) return

        map.current!.easeTo({
          center: (features[0].geometry as any).coordinates,
          zoom: zoom,
        })
      })
    })

    // Click handlers for individual properties
    map.current.on("click", "unclustered-point", (e) => {
      const coordinates = (e.features![0].geometry as any).coordinates.slice()
      const props = e.features![0].properties!

      // Create popup
      const popup = new mapboxgl.Popup({ offset: 25 })
        .setLngLat(coordinates)
        .setHTML(`
          <div class="p-3 min-w-[200px]">
            <h3 class="font-semibold text-sm mb-1">${props.name}</h3>
            <p class="text-xs text-gray-600 mb-2">${props.city ? `${props.city}, ${props.state}` : props.address}</p>
            <p class="text-sm font-medium text-green-600 mb-2">$${Number(props.value).toLocaleString()}</p>
            <div class="flex items-center justify-between">
              <span class="inline-flex items-center px-2 py-1 rounded-full text-xs ${
                props.verified ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"
              }">
                ${props.verified ? "✓ Verified" : "⚠ Unverified"}
              </span>
              <span class="text-xs text-gray-500">${props.transparency_score}% Score</span>
            </div>
            <button 
              onclick="window.open('/properties/${props.id}', '_blank')"
              class="mt-2 w-full bg-blue-600 text-white text-xs py-1 px-2 rounded hover:bg-blue-700"
            >
              View Details
            </button>
          </div>
        `)
        .addTo(map.current!)

      // Handle property click callback
      if (onPropertyClick) {
        const property = propertiesWithLocation.find((p) => p.property_id === props.id)
        if (property) {
          onPropertyClick(property)
        }
      }
    })

    // Change cursor on hover
    map.current.on("mouseenter", "clusters", () => {
      map.current!.getCanvas().style.cursor = "pointer"
    })
    map.current.on("mouseleave", "clusters", () => {
      map.current!.getCanvas().style.cursor = ""
    })
    map.current.on("mouseenter", "unclustered-point", () => {
      map.current!.getCanvas().style.cursor = "pointer"
    })
    map.current.on("mouseleave", "unclustered-point", () => {
      map.current!.getCanvas().style.cursor = ""
    })

    // Fit map to show all properties
    if (propertiesWithLocation.length > 1) {
      const bounds = new mapboxgl.LngLatBounds()
      propertiesWithLocation.forEach((property) => {
        if (property.location) {
          bounds.extend([property.location.lng, property.location.lat])
        }
      })
      map.current.fitBounds(bounds, { padding: 50 })
    } else if (propertiesWithLocation.length === 1) {
      const property = propertiesWithLocation[0]
      if (property.location) {
        map.current.setCenter([property.location.lng, property.location.lat])
        map.current.setZoom(14)
      }
    }
  }, [properties, mapLoaded, onPropertyClick])

  if (tokenError) {
    return (
      <div className={`${className} flex items-center justify-center bg-muted rounded-lg`}>
        <div className="text-center text-muted-foreground">
          <p>{tokenError}</p>
          <p className="text-sm">Please check your Mapbox API configuration</p>
        </div>
      </div>
    )
  }

  if (!mapboxToken) {
    return (
      <div className={`${className} flex items-center justify-center bg-muted rounded-lg`}>
        <div className="text-center text-muted-foreground">
          <p>Loading map...</p>
        </div>
      </div>
    )
  }

  return (
    <div className={className}>
      <div ref={mapContainer} className="h-full w-full rounded-lg" />
    </div>
  )
}
