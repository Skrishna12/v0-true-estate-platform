"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Checkbox } from "@/components/ui/checkbox"

export function OwnerFilters() {
  const [netWorthRange, setNetWorthRange] = useState([100000, 5000000])

  return (
    <div className="space-y-6">
      <div>
        <h3 className="mb-4 text-lg font-medium">Filters</h3>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="search">Search</Label>
            <Input id="search" placeholder="Owner name or ID" />
          </div>

          <div className="space-y-2">
            <Label>Net Worth Range</Label>
            <div className="pt-2">
              <Slider
                defaultValue={netWorthRange}
                max={10000000}
                min={0}
                step={100000}
                onValueChange={setNetWorthRange}
              />
              <div className="mt-2 flex items-center justify-between text-sm">
                <span>${netWorthRange[0].toLocaleString()}</span>
                <span>${netWorthRange[1].toLocaleString()}</span>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <Label>Properties Owned</Label>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Checkbox id="properties-1" />
                <label
                  htmlFor="properties-1"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  1-2 Properties
                </label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="properties-3" />
                <label
                  htmlFor="properties-3"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  3-5 Properties
                </label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="properties-6" />
                <label
                  htmlFor="properties-6"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  6+ Properties
                </label>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <Label>Verification Status</Label>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Checkbox id="verified-owners" />
                <label
                  htmlFor="verified-owners"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Verified Owners
                </label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="unverified-owners" />
                <label
                  htmlFor="unverified-owners"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Unverified Owners
                </label>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <Label>Trust Score</Label>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Checkbox id="high-trust" />
                <label
                  htmlFor="high-trust"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  High (90-100%)
                </label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="medium-trust" />
                <label
                  htmlFor="medium-trust"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Medium (70-89%)
                </label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="low-trust" />
                <label
                  htmlFor="low-trust"
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
