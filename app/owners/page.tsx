import { OwnerCard } from "@/components/owner-card"
import { OwnerFilters } from "@/components/owner-filters"
import { getOwners } from "@/lib/data"

export default async function OwnersPage() {
  const owners = await getOwners()

  return (
    <div className="container py-10">
      <h1 className="mb-6 text-3xl font-bold">Property Owners</h1>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-[300px_1fr]">
        <div className="rounded-lg border p-4">
          <OwnerFilters />
        </div>
        <div className="grid gap-6">
          <div className="flex items-center justify-between">
            <p className="text-sm text-muted-foreground">
              Showing <strong>{owners.length}</strong> owners
            </p>
            <div className="flex items-center gap-2">
              <select className="rounded-md border p-2 text-sm">
                <option value="name">Name (A-Z)</option>
                <option value="properties">Most Properties</option>
                <option value="net-worth">Net Worth (High to Low)</option>
                <option value="verified">Verification Status</option>
              </select>
            </div>
          </div>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {owners.map((owner) => (
              <OwnerCard key={owner.owner_id} owner={owner} />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
