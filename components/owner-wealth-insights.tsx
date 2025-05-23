import { WealthVisualization } from "./wealth-visualization"
import type { Owner, Property } from "@/lib/types"

interface OwnerWealthInsightsProps {
  owner: Owner
  properties: Property[]
}

export function OwnerWealthInsights({ owner, properties }: OwnerWealthInsightsProps) {
  return <WealthVisualization owner={owner} properties={properties} />
}
