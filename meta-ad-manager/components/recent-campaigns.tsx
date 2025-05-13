import type React from "react"
import { MoreHorizontal } from "lucide-react"
import Link from "next/link"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

interface Campaign {
  id: string
  name: string
  objective: string
  status: "Active" | "Paused" | "Completed"
  budget: string
  dateCreated: string
}

export function RecentCampaigns({ className }: React.HTMLAttributes<HTMLDivElement>) {
  const campaigns: Campaign[] = [
    {
      id: "1",
      name: "Summer Sale Promotion",
      objective: "Conversions",
      status: "Active",
      budget: "$1,200",
      dateCreated: "2023-06-01",
    },
    {
      id: "2",
      name: "New Product Launch",
      objective: "Brand Awareness",
      status: "Active",
      budget: "$2,500",
      dateCreated: "2023-05-15",
    },
    {
      id: "3",
      name: "Customer Retargeting",
      objective: "Traffic",
      status: "Paused",
      budget: "$800",
      dateCreated: "2023-04-28",
    },
    {
      id: "4",
      name: "Holiday Special",
      objective: "Lead Generation",
      status: "Completed",
      budget: "$1,500",
      dateCreated: "2023-04-10",
    },
  ]

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>Recent Campaigns</CardTitle>
        <CardDescription>
          You have {campaigns.filter((c) => c.status === "Active").length} active campaigns
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {campaigns.map((campaign) => (
            <div
              key={campaign.id}
              className="flex flex-col sm:flex-row sm:items-center justify-between space-y-2 sm:space-y-0 sm:space-x-4"
            >
              <div className="flex flex-col space-y-1">
                <Link href={`/campaigns/${campaign.id}`} className="font-medium hover:underline">
                  {campaign.name}
                </Link>
                <div className="text-sm text-muted-foreground">
                  {campaign.objective} · {campaign.budget}
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Badge
                  variant={
                    campaign.status === "Active" ? "default" : campaign.status === "Paused" ? "outline" : "secondary"
                  }
                >
                  {campaign.status}
                </Badge>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-8 w-8 p-0">
                      <span className="sr-only">Open menu</span>
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                    <DropdownMenuItem>Edit campaign</DropdownMenuItem>
                    <DropdownMenuItem>Duplicate campaign</DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="text-red-500">Delete campaign</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
