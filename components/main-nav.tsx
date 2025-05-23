"use client"

import type React from "react"

import Link from "next/link"
import { Building } from "lucide-react"
import { cn } from "@/lib/utils"
import { usePathname } from "next/navigation"

export function MainNav({ className, ...props }: React.HTMLAttributes<HTMLElement>) {
  const pathname = usePathname()

  const routes = [
    {
      href: "/",
      label: "Home",
      active: pathname === "/",
    },
    {
      href: "/properties",
      label: "Properties",
      active: pathname === "/properties",
    },
    {
      href: "/owners",
      label: "Owners",
      active: pathname === "/owners",
    },
    {
      href: "/map",
      label: "Map",
      active: pathname === "/map",
    },
  ]

  return (
    <div className="flex gap-6 md:gap-10">
      <Link href="/" className="flex items-center space-x-2">
        <Building className="h-6 w-6" />
        <span className="inline-block font-bold">TrueEstate</span>
      </Link>
      <nav className={cn("flex items-center space-x-6 text-sm font-medium", className)} {...props}>
        {routes.map((route) => (
          <Link
            key={route.href}
            href={route.href}
            className={cn(
              "transition-colors hover:text-foreground/80",
              route.active ? "text-foreground" : "text-foreground/60",
            )}
          >
            {route.label}
          </Link>
        ))}
      </nav>
    </div>
  )
}
