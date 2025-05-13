"use client"

import { useState } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

import { CampaignBudget } from "@/components/campaign-budget"
import { CampaignCreatives } from "@/components/campaign-creatives"
import { CampaignObjective } from "@/components/campaign-objective"
import { CampaignTargeting } from "@/components/campaign-targeting"
import { MainNav } from "@/components/main-nav"
import { UserNav } from "@/components/user-nav"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AudienceDashboard } from "@/components/audience-dashboard"

export default function CreateCampaignPage() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState("objective")
  const [campaignData, setCampaignData] = useState({
    name: "",
    objective: "",
    budget: 0,
    budgetType: "daily",
    startDate: new Date(),
    endDate: new Date(),
    targeting: {
      ageRange: { min: 18, max: 65 },
      gender: "all",
      locations: [],
      interests: []
    },
    creatives: []
  })

  const handleObjectiveUpdate = (data: { name: string; objective: string }) => {
    setCampaignData(prev => ({ ...prev, name: data.name, objective: data.objective }))
  }

  const handleTargetingUpdate = (data: any) => {
    setCampaignData(prev => ({ ...prev, targeting: data }))
  }

  const handleBudgetUpdate = (data: { budget: number; budgetType: string }) => {
    setCampaignData(prev => ({ ...prev, budget: data.budget, budgetType: data.budgetType }))
  }

  const handleCreativesUpdate = (data: any[]) => {
    setCampaignData(prev => ({ ...prev, creatives: data }))
  }

  const handleNext = async () => {
    switch (activeTab) {
      case "objective":
        setActiveTab("targeting")
        break
      case "targeting":
        setActiveTab("budget")
        break
      case "budget":
        setActiveTab("creatives")
        break
      case "creatives":
        try {
          const response = await fetch('http://localhost:7000/api/campaigns', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(campaignData),
            credentials: 'include',
          })

          if (!response.ok) {
            const errorData = await response.json()
            throw new Error(errorData.message || 'Campaign creation failed')
          }

          router.push('/campaigns')
        } catch (error) {
          console.error('Campaign creation error:', error)
          // TODO: Add error handling UI
        }
        break
    }
  }

  const handleBack = () => {
    switch (activeTab) {
      case "targeting":
        setActiveTab("objective")
        break
      case "budget":
        setActiveTab("targeting")
        break
      case "creatives":
        setActiveTab("budget")
        break
    }
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
          <h2 className="text-3xl font-bold tracking-tight">Create Campaign</h2>
          <Button variant="outline" asChild>
            <Link href="/campaigns">Cancel</Link>
          </Button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Campaign Setup</CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="objective">1. Objective</TabsTrigger>
                <TabsTrigger value="targeting">2. Targeting</TabsTrigger>
                <TabsTrigger value="budget">3. Budget</TabsTrigger>
                <TabsTrigger value="creatives">4. Creatives</TabsTrigger>
              </TabsList>

              <TabsContent value="objective" className="py-6">
                <CampaignObjective onUpdate={handleObjectiveUpdate} />
              </TabsContent>

              <TabsContent value="targeting" className="py-6">
                <CampaignTargeting onUpdate={handleTargetingUpdate} />
              </TabsContent>

              <TabsContent value="budget" className="py-6">
                <CampaignBudget onUpdate={handleBudgetUpdate} />
              </TabsContent>

              <TabsContent value="creatives" className="py-6">
                <CampaignCreatives onUpdate={handleCreativesUpdate} />
              </TabsContent>
            </Tabs>

            <Separator className="my-6" />

            <div className="flex justify-between">
              <Button variant="outline" onClick={handleBack} disabled={activeTab === "objective"}>
                <ChevronLeft className="mr-2 h-4 w-4" />
                Back
              </Button>
              <Button onClick={handleNext}>
                {activeTab === "creatives" ? "Create Campaign" : "Next"}
                {activeTab !== "creatives" && <ChevronRight className="ml-2 h-4 w-4" />}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
