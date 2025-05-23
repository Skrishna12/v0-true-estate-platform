"use client"

import { useState } from "react"
import { PropertyCard } from "@/components/property-card"
import { AdvancedSearch } from "@/components/advanced-search"
import { PropertyPagination } from "@/components/property-pagination"
import { BreadcrumbNav } from "@/components/breadcrumb-nav"
import { useProperties } from "@/lib/hooks/use-properties"
import { Skeleton } from "@/components/ui/skeleton"

export default function PropertiesPage() {
  const [searchFilters, setSearchFilters] = useState({
    page: 1,
    limit: 12,
    search: "",
    minPrice: undefined as number | undefined,
    maxPrice: undefined as number | undefined,
    verified: null as boolean | null,
  })

  const { properties, loading, error, pagination } = useProperties(searchFilters)

  const handleSearch = (filters: any) => {
    setSearchFilters({
      ...searchFilters,
      page: 1, // Reset to first page
      search: filters.search,
      minPrice: filters.priceRange[0] !== 200000 ? filters.priceRange[0] : undefined,
      maxPrice: filters.priceRange[1] !== 1000000 ? filters.priceRange[1] : undefined,
      verified: filters.verified,
    })
  }

  const handleClearSearch = () => {
    setSearchFilters({
      page: 1,
      limit: 12,
      search: "",
      minPrice: undefined,
      maxPrice: undefined,
      verified: null,
    })
  }

  const handlePageChange = (page: number) => {
    setSearchFilters({ ...searchFilters, page })
  }

  return (
    <div className="container py-10">
      <BreadcrumbNav items={[{ label: "Properties" }]} />

      <h1 className="mb-6 text-3xl font-bold">Properties</h1>

      <div className="mb-6">
        <AdvancedSearch onSearch={handleSearch} onClear={handleClearSearch} />
      </div>

      {error && (
        <div className="mb-6 rounded-lg border border-red-200 bg-red-50 p-4 text-red-800">
          Error loading properties: {error}
        </div>
      )}

      <div className="grid gap-6">
        <div className="flex items-center justify-between">
          <p className="text-sm text-muted-foreground">
            {pagination ? (
              <>
                Showing <strong>{(pagination.page - 1) * pagination.limit + 1}</strong> to{" "}
                <strong>{Math.min(pagination.page * pagination.limit, pagination.total)}</strong> of{" "}
                <strong>{pagination.total}</strong> properties
              </>
            ) : (
              "Loading properties..."
            )}
          </p>
          <div className="flex items-center gap-2">
            <select
              className="rounded-md border p-2 text-sm"
              value={searchFilters.limit}
              onChange={(e) => setSearchFilters({ ...searchFilters, limit: Number(e.target.value), page: 1 })}
            >
              <option value={12}>12 per page</option>
              <option value={24}>24 per page</option>
              <option value={48}>48 per page</option>
            </select>
          </div>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: searchFilters.limit }).map((_, i) => (
              <div key={i} className="space-y-3">
                <Skeleton className="h-48 w-full" />
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {properties.map((property) => (
              <PropertyCard key={property.property_id} property={property} />
            ))}
          </div>
        )}

        {pagination && pagination.pages > 1 && (
          <div className="mt-8">
            <PropertyPagination
              currentPage={pagination.page}
              totalPages={pagination.pages}
              onPageChange={handlePageChange}
            />
          </div>
        )}

        {!loading && properties.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No properties found matching your criteria.</p>
          </div>
        )}
      </div>
    </div>
  )
}
