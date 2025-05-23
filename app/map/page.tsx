import { MapView } from "@/components/map-view"
import { getProperties } from "@/lib/data"

// Make this a client component to avoid prerendering issues
export const dynamic = "force-dynamic"

export default async function MapPage() {
  const properties = await getProperties()

  return (
    <div className="container py-10">
      <h1 className="mb-6 text-3xl font-bold">Property Map</h1>
      <MapView properties={properties} />
    </div>
  )
}
