"use client"

import Link from "next/link"
import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { Plus } from "lucide-react"

import { useAuth } from "@/context/auth-context" // adjust path if needed
import { CardMetric } from "@/components/card-metric"
import { MainNav } from "@/components/main-nav"
import { Overview } from "@/components/overview"
import { RecentCampaigns } from "@/components/recent-campaigns"
import { UserNav } from "@/components/user-nav"
import { Button } from "@/components/ui/button"
import { AudienceDashboard } from "@/components/audience-dashboard"

export default function DashboardPage() {
  const { user, loading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!loading && !user) {
      router.push("/auth/signin")
    }
  }, [user, loading, router])

  if (loading || !user) {
    return <div className="flex justify-center items-center min-h-screen">Loading...</div>
  }

  return (
    <div className="flex min-h-screen flex-col">
      <header className="border-b">
        <div className="flex h-16 items-center px-4">
          <MainNav className="mx-6" />
          <div className="ml-auto flex items-center space-x-4">
            <AudienceDashboard />
            <UserNav />
          </div>
        </div>
      </header>
      <div className="flex-1 space-y-4 p-8 pt-6">
        <div className="flex items-center justify-between space-y-2">
          <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
          <div className="flex items-center space-x-2">
            <Button asChild>
              <Link href="/campaigns/create">
                <Plus className="mr-2 h-4 w-4" />
                Create Campaign
              </Link>
            </Button>
          </div>
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <CardMetric title="Total Spend" value="$4,231.89" description="+20.1% from last month" trend="up" />
          <CardMetric title="Impressions" value="3.2M" description="+12.5% from last month" trend="up" />
          <CardMetric title="Clicks" value="48.9K" description="+15.9% from last month" trend="up" />
          <CardMetric title="CTR" value="1.52%" description="+2.4% from last month" trend="up" />
        </div>
        <div className="grid gap-4 md:grid-cols-1 lg:grid-cols-7">
          <Overview className="col-span-full lg:col-span-4" />
          <RecentCampaigns className="col-span-full lg:col-span-3" />
        </div>
      </div>
    </div>
  )
}
