import type React from "react"
import Link from "next/link"
import { FacebookIcon } from "lucide-react"

import { cn } from "@/lib/utils"

export function MainNav({ className, ...props }: React.HTMLAttributes<HTMLElement>) {
  return (
    <nav className={cn("flex items-center space-x-4 lg:space-x-6", className)} {...props}>
      <Link href="/" className="flex items-center space-x-2 text-xl font-bold">
        <FacebookIcon className="h-6 w-6 text-blue-600" />
        <span className="hidden sm:inline">Ad Manager</span>
      </Link>
      <Link href="/" className="text-sm font-medium transition-colors hover:text-primary">
        Dashboard
      </Link>
      <Link
        href="/campaigns"
        className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
      >
        Campaigns
      </Link>
      <Link
        href="/ad-sets"
        className="hidden md:inline-flex text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
      >
        Ad Sets
      </Link>
      <Link
        href="/ads"
        className="hidden md:inline-flex text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
      >
        Ads
      </Link>
      <Link
        href="/audiences"
        className="hidden md:inline-flex text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
      >
        Audiences
      </Link>
      <Link
        href="/analytics"
        className="hidden md:inline-flex text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
      >
        Analytics
      </Link>
    </nav>
  )
}
