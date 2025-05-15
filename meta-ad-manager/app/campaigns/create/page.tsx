'use client'

import { useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useToast } from "@/hooks/use-toast"
import api from "@/lib/axios"

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

import { CampaignBudget } from "@/components/campaign-budget"
import { CampaignCreatives } from "@/components/campaign-creatives"
import { CampaignObjective } from "@/components/campaign-objective"
import { CampaignTargeting } from "@/components/campaign-targeting"
import { MainNav } from "@/components/main-nav"
import { UserNav } from "@/components/user-nav"
import { AudienceDashboard } from "@/components/audience-dashboard"

type CampaignCreative = {
  id: string
  imageUrl: string
  text: string
}

export default function CreateCampaignPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [activeTab, setActiveTab] = useState('objective')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const [campaignData, setCampaignData] = useState({
    name: '',
    objective: '',
    budget: 0,
    budgetType: 'daily',
    startDate: new Date(),
    endDate: new Date(),
    targeting: {
      ageRange: { min: 18, max: 65 },
      gender: 'all',
      locations: [],
      interests: [],
    },
    creatives: [] as CampaignCreative[],
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

  const handleCreativesUpdate = (data: CampaignCreative[]) => {
    setCampaignData(prev => ({ ...prev, creatives: data }))
  }

  const validateStep = () => {
    switch (activeTab) {
      case 'objective':
        if (!campaignData.name || !campaignData.objective) {
          setError('Please fill in all required fields')
          return false
        }
        break
      case 'targeting':
        if (!campaignData.targeting.locations.length) {
          setError('Please select at least one location')
          return false
        }
        break
      case 'budget':
        if (!campaignData.budget || campaignData.budget <= 0) {
          setError('Please set a valid budget')
          return false
        }
        break
      case 'creatives':
        if (!campaignData.creatives.length) {
          setError('Please add at least one creative')
          return false
        }
        break
    }
    return true
  }

  const handleNext = async () => {
    setError(null)
    
    if (!validateStep()) {
      return
    }

    if (activeTab === 'creatives') {
      try {
        setIsLoading(true)
        const payload = {
          ...campaignData,
          startDate: campaignData.startDate.toISOString(),
          endDate: campaignData.endDate.toISOString(),
        }

        const response = await api.post('/campaigns', payload)
        
        toast({
          title: "Success",
          description: "Campaign created successfully",
        })
        
        router.push('/campaigns')
      } catch (error: any) {
        console.error('Campaign creation error:', error)
        setError(error.response?.data?.message || 'Failed to create campaign')
        toast({
          title: "Error",
          description: error.response?.data?.message || 'Failed to create campaign',
          variant: "destructive",
        })
      } finally {
        setIsLoading(false)
      }
    } else {
      switch (activeTab) {
        case 'objective':
          setActiveTab('targeting')
          break
        case 'targeting':
          setActiveTab('budget')
          break
        case 'budget':
          setActiveTab('creatives')
          break
      }
    }
  }

  const handleBack = () => {
    switch (activeTab) {
      case 'targeting':
        setActiveTab('objective')
        break
      case 'budget':
        setActiveTab('targeting')
        break
      case 'creatives':
        setActiveTab('budget')
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
        </div>
        <Separator />
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
          <TabsList>
            <TabsTrigger value="objective">Objective</TabsTrigger>
            <TabsTrigger value="targeting">Targeting</TabsTrigger>
            <TabsTrigger value="budget">Budget</TabsTrigger>
            <TabsTrigger value="creatives">Creatives</TabsTrigger>
          </TabsList>

          <TabsContent value="objective" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Campaign Objective</CardTitle>
                <CardDescription>Choose what you want to achieve with your campaign</CardDescription>
              </CardHeader>
              <CardContent>
                <CampaignObjective onUpdate={handleObjectiveUpdate} />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="targeting" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Campaign Targeting</CardTitle>
                <CardDescription>Define your target audience</CardDescription>
              </CardHeader>
              <CardContent>
                <CampaignTargeting onUpdate={handleTargetingUpdate} />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="budget" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Campaign Budget</CardTitle>
                <CardDescription>Set your campaign budget and schedule</CardDescription>
              </CardHeader>
              <CardContent>
                <CampaignBudget onUpdate={handleBudgetUpdate} />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="creatives" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Campaign Creatives</CardTitle>
                <CardDescription>Create your ad content</CardDescription>
              </CardHeader>
              <CardContent>
                <CampaignCreatives onUpdate={handleCreativesUpdate} />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {error && (
          <div className="rounded-md bg-destructive/15 p-3 text-sm text-destructive">
            {error}
          </div>
        )}

        <div className="flex justify-between items-center">
          <Button 
            onClick={handleBack} 
            disabled={activeTab === 'objective'}
            variant="outline"
          >
            <ChevronLeft className="mr-2 h-4 w-4" />
            Back
          </Button>

          <div className="flex gap-2">
            <Button variant="outline">Save as Draft</Button>
            <Button onClick={handleNext} disabled={isLoading}>
              {isLoading ? (
                "Creating..."
              ) : activeTab === 'creatives' ? (
                "Create Campaign"
              ) : (
                <>
                  Next
                  <ChevronRight className="ml-2 h-4 w-4" />
                </>
              )}
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
