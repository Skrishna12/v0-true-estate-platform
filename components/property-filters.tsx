"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Checkbox } from "@/components/ui/checkbox"

export function PropertyFilters() {
  const [priceRange, setPriceRange] = useState([200000, 1000000])
  const [sizeRange, setSizeRange] = useState([500, 5000])

  return (
    <div className="space-y-6">
      <div>
        <h3 className="mb-4 text-lg font-medium">Filters</h3>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="search">Search</Label>
            <Input id="search" placeholder="Address, owner, or ID" />
          </div>

          <div className="space-y-2">
            <Label>Price Range</Label>
            <div className="pt-2">
              <Slider defaultValue={priceRange} max={2000000} min={0} step={50000} onValueChange={setPriceRange} />
              <div className="mt-2 flex items-center justify-between text-sm">
                <span>${priceRange[0].toLocaleString()}</span>
                <span>${priceRange[1].toLocaleString()}</span>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <Label>Size (sq ft)</Label>
            <div className="pt-2">
              <Slider defaultValue={sizeRange} max={10000} min={0} step={100} onValueChange={setSizeRange} />
              <div className="mt-2 flex items-center justify-between text-sm">
                <span>{sizeRange[0]} sq ft</span>
                <span>{sizeRange[1]} sq ft</span>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <Label>Verification Status</Label>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Checkbox id="verified" />
                <label
                  htmlFor="verified"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Verified Properties
                </label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="unverified" />
                <label
                  htmlFor="unverified"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Unverified Properties
                </label>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <Label>Transparency Score</Label>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Checkbox id="high-transparency" />
                <label
                  htmlFor="high-transparency"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  High (90-100%)
                </label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="medium-transparency" />
                <label
                  htmlFor="medium-transparency"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Medium (70-89%)
                </label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="low-transparency" />
                <label
                  htmlFor="low-transparency"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Low (Below 70%)
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Button className="w-full">Apply Filters</Button>
    </div>
  )
}
