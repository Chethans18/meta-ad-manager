"use client"

import type React from "react"

import { useState } from "react"
import { BarChart3, Globe, HeartHandshake, ShoppingCart, Smartphone, Users } from "lucide-react"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { useCampaign } from "@/context/campaign-context"

interface ObjectiveOption {
  id: string
  title: string
  description: string
  icon: React.ReactNode
}

export function CampaignObjective() {
  const { campaignData, updateCampaignData } = useCampaign()
  const [campaignName, setCampaignName] = useState(campaignData.name)
  const [selectedObjective, setSelectedObjective] = useState(campaignData.objective)

  const objectives: ObjectiveOption[] = [
    {
      id: "awareness",
      title: "Brand Awareness",
      description: "Increase awareness of your brand, products, or services",
      icon: <Globe className="h-8 w-8 text-blue-500" />,
    },
    {
      id: "traffic",
      title: "Traffic",
      description: "Send more people to a destination on or off Facebook",
      icon: <BarChart3 className="h-8 w-8 text-green-500" />,
    },
    {
      id: "engagement",
      title: "Engagement",
      description: "Get more people to engage with your content or page",
      icon: <HeartHandshake className="h-8 w-8 text-purple-500" />,
    },
    {
      id: "leads",
      title: "Lead Generation",
      description: "Collect leads for your business or brand",
      icon: <Users className="h-8 w-8 text-yellow-500" />,
    },
    {
      id: "conversions",
      title: "Conversions",
      description: "Encourage people to take specific actions on your website",
      icon: <ShoppingCart className="h-8 w-8 text-red-500" />,
    },
    {
      id: "app-installs",
      title: "App Installs",
      description: "Get more people to install your app",
      icon: <Smartphone className="h-8 w-8 text-indigo-500" />,
    },
  ]

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newName = e.target.value
    setCampaignName(newName)
    updateCampaignData('name', newName)
  }

  const handleObjectiveChange = (value: string) => {
    setSelectedObjective(value)
    updateCampaignData('objective', value)
  }

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="campaign-name">Campaign Name</Label>
        <Input
          id="campaign-name"
          placeholder="Enter campaign name"
          value={campaignName}
          onChange={handleNameChange}
        />
      </div>

      <div className="space-y-2">
        <Label>Campaign Objective</Label>
        <RadioGroup
          value={selectedObjective}
          onValueChange={handleObjectiveChange}
          className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3"
        >
          {objectives.map((objective) => (
            <label key={objective.id} className="cursor-pointer" htmlFor={`objective-${objective.id}`}>
              <Card className={`h-full transition-all ${selectedObjective === objective.id ? "border-primary" : ""}`}>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    {objective.title}
                    <RadioGroupItem value={objective.id} id={`objective-${objective.id}`} className="sr-only" />
                    {objective.icon}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>{objective.description}</CardDescription>
                </CardContent>
              </Card>
            </label>
          ))}
        </RadioGroup>
      </div>
    </div>
  )
}
