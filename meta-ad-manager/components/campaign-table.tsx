"use client"

import { useEffect } from "react"
import { CaretSortIcon, DotsHorizontalIcon } from "@radix-ui/react-icons"
import { Eye, PauseIcon, PlayIcon, Trash2Icon } from "lucide-react"
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
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { useCampaign } from "@/context/campaign-context"
import { useToast } from "@/hooks/use-toast"
import { formatDate } from "@/lib/utils"

export function CampaignTable() {
  const { campaigns = [], isLoading, fetchCampaigns, updateCampaign, deleteCampaign } = useCampaign()
  const { toast } = useToast()

  useEffect(() => {
    const loadCampaigns = async () => {
      try {
        await fetchCampaigns()
      } catch (error) {
        console.error('Error loading campaigns:', error)
        toast({
          title: "Error",
          description: "Failed to load campaigns. Please try again.",
          variant: "destructive",
        })
      }
    }
    loadCampaigns()
  }, [])

  const toggleCampaignStatus = async (id: string, currentStatus: string) => {
    try {
      const newStatus = currentStatus === "active" ? "paused" : "active"
      await updateCampaign(id, { status: newStatus })
      toast({
        title: "Campaign Status Updated",
        description: `Campaign has been ${newStatus === "active" ? "activated" : "paused"}.`,
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update campaign status. Please try again.",
        variant: "destructive",
      })
    }
  }

  const handleDelete = async (id: string) => {
    try {
      await deleteCampaign(id)
      toast({
        title: "Campaign Deleted",
        description: "The campaign has been successfully deleted.",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete campaign. Please try again.",
        variant: "destructive",
      })
    }
  }

  if (isLoading) {
    return <div>Loading campaigns...</div>
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Campaign Management</CardTitle>
        <CardDescription>Manage your ad campaigns, track performance, and optimize your results.</CardDescription>
      </CardHeader>
      <CardContent className="px-0 sm:px-6">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[250px]">
                  <Button variant="ghost" className="p-0 hover:bg-transparent">
                    Campaign Name
                    <CaretSortIcon className="ml-2 h-4 w-4" />
                  </Button>
                </TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="hidden md:table-cell">Objective</TableHead>
                <TableHead className="hidden md:table-cell">Budget</TableHead>
                <TableHead className="hidden md:table-cell">Created</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {campaigns?.map((campaign) => (
                <TableRow key={campaign.id}>
                  <TableCell className="font-medium">
                    <Link href={`/campaigns/${campaign.id}`} className="hover:underline">
                      {campaign.name}
                    </Link>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        campaign.status === "active"
                          ? "default"
                          : campaign.status === "paused"
                            ? "outline"
                            : "secondary"
                      }
                    >
                      {campaign.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="hidden md:table-cell">{campaign.objective}</TableCell>
                  <TableCell className="hidden md:table-cell">
                    {campaign.budget.amount} ({campaign.budget.type})
                  </TableCell>
                  <TableCell className="hidden md:table-cell">{formatDate(campaign.createdAt)}</TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <span className="sr-only">Open menu</span>
                          <DotsHorizontalIcon className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem asChild>
                          <Link href={`/campaigns/${campaign.id}`} className="flex items-center">
                            <Eye className="mr-2 h-4 w-4" />
                            <span>View details</span>
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                          <Link href={`/campaigns/${campaign.id}/edit`} className="flex items-center">
                            <svg
                              className="mr-2 h-4 w-4"
                              xmlns="http://www.w3.org/2000/svg"
                              width="24"
                              height="24"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            >
                              <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" />
                            </svg>
                            <span>Edit campaign</span>
                          </Link>
                        </DropdownMenuItem>
                        {(campaign.status === "active" || campaign.status === "paused") && (
                          <DropdownMenuItem onClick={() => toggleCampaignStatus(campaign.id!, campaign.status!)}>
                            {campaign.status === "active" ? (
                              <>
                                <PauseIcon className="mr-2 h-4 w-4" />
                                <span>Pause campaign</span>
                              </>
                            ) : (
                              <>
                                <PlayIcon className="mr-2 h-4 w-4" />
                                <span>Activate campaign</span>
                              </>
                            )}
                          </DropdownMenuItem>
                        )}
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                          className="text-red-500"
                          onClick={() => handleDelete(campaign.id!)}
                        >
                          <Trash2Icon className="mr-2 h-4 w-4" />
                          <span>Delete campaign</span>
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  )
}
