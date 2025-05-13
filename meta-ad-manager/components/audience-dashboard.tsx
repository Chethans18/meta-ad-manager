"use client"

import { useState } from "react"
import { ChevronDown, ChevronUp, Users } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface AudienceMetric {
  label: string
  value: string
  change: number
}

export function AudienceDashboard() {
  const [selectedAudience, setSelectedAudience] = useState("Facebook Page")

  const audienceMetrics: Record<string, AudienceMetric[]> = {
    "Facebook Page": [
      { label: "Followers", value: "24.5K", change: 2.3 },
      { label: "Reach", value: "142K", change: 5.7 },
      { label: "Engagement", value: "3.2%", change: -0.5 },
    ],
    Instagram: [
      { label: "Followers", value: "18.7K", change: 4.1 },
      { label: "Reach", value: "98K", change: 7.2 },
      { label: "Engagement", value: "4.8%", change: 1.2 },
    ],
    Twitter: [
      { label: "Followers", value: "12.3K", change: 1.5 },
      { label: "Impressions", value: "76K", change: 3.8 },
      { label: "Engagement", value: "2.1%", change: -0.3 },
    ],
  }

  return (
    <div className="hidden md:block">
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline" className="flex items-center gap-2">
            <Users className="h-4 w-4" />
            <span className="hidden lg:inline">Audience</span>
            <span className="text-xs text-muted-foreground hidden lg:inline">24.5K</span>
            <ChevronDown className="h-3 w-3 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[350px] p-0" align="end">
          <Card className="border-0 shadow-none">
            <CardContent className="p-0">
              <div className="flex items-center justify-between border-b p-3">
                <h4 className="font-medium">Audience Overview</h4>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="sm">
                      {selectedAudience}
                      <ChevronDown className="ml-2 h-3 w-3 opacity-50" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Select Audience</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => setSelectedAudience("Facebook Page")}>
                      Facebook Page
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setSelectedAudience("Instagram")}>Instagram</DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setSelectedAudience("Twitter")}>Twitter</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
              <Tabs defaultValue="overview" className="w-full">
                <div className="border-b px-3">
                  <TabsList className="h-9 grid w-full grid-cols-2">
                    <TabsTrigger value="overview" className="text-xs">
                      Overview
                    </TabsTrigger>
                    <TabsTrigger value="demographics" className="text-xs">
                      Demographics
                    </TabsTrigger>
                  </TabsList>
                </div>
                <TabsContent value="overview" className="p-3">
                  <div className="grid grid-cols-3 gap-3">
                    {audienceMetrics[selectedAudience].map((metric) => (
                      <div key={metric.label} className="rounded-md border p-2">
                        <div className="text-xs text-muted-foreground">{metric.label}</div>
                        <div className="text-lg font-bold">{metric.value}</div>
                        <div
                          className={`text-xs flex items-center ${metric.change >= 0 ? "text-emerald-500" : "text-red-500"}`}
                        >
                          {metric.change >= 0 ? (
                            <ChevronUp className="h-3 w-3 mr-1" />
                          ) : (
                            <ChevronDown className="h-3 w-3 mr-1" />
                          )}
                          {Math.abs(metric.change)}%
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="mt-3 rounded-md bg-muted p-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-medium">Growth Rate</span>
                      <span className="text-xs text-muted-foreground">Last 30 days</span>
                    </div>
                    <div className="mt-2 h-2 w-full rounded-full bg-muted-foreground/20">
                      <div
                        className="h-2 rounded-full bg-primary"
                        style={{
                          width:
                            selectedAudience === "Instagram" ? "70%" : selectedAudience === "Twitter" ? "45%" : "60%",
                        }}
                      ></div>
                    </div>
                  </div>
                </TabsContent>
                <TabsContent value="demographics" className="p-3">
                  <div className="space-y-3">
                    <div className="space-y-1">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-medium">Age Groups</span>
                        <span className="text-xs text-muted-foreground">% of audience</span>
                      </div>
                      <div className="grid grid-cols-5 gap-1">
                        {["18-24", "25-34", "35-44", "45-54", "55+"].map((age, i) => (
                          <div key={age} className="space-y-1">
                            <div className="h-16 w-full rounded-sm bg-muted-foreground/20 relative">
                              <div
                                className="absolute bottom-0 w-full bg-primary rounded-sm"
                                style={{
                                  height: `${[35, 45, 30, 20, 15][i]}%`,
                                }}
                              ></div>
                            </div>
                            <div className="text-xs text-center">{age}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="space-y-1">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-medium">Gender</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="h-2 flex-1 rounded-full bg-muted-foreground/20">
                          <div className="h-2 rounded-full bg-blue-500" style={{ width: "58%" }}></div>
                        </div>
                        <span className="text-xs">58%</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="h-2 flex-1 rounded-full bg-muted-foreground/20">
                          <div className="h-2 rounded-full bg-pink-500" style={{ width: "42%" }}></div>
                        </div>
                        <span className="text-xs">42%</span>
                      </div>
                      <div className="flex justify-between text-xs text-muted-foreground pt-1">
                        <span>Male</span>
                        <span>Female</span>
                      </div>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
              <div className="border-t p-3">
                <Button variant="outline" size="sm" className="w-full">
                  View Detailed Audience Insights
                </Button>
              </div>
            </CardContent>
          </Card>
        </PopoverContent>
      </Popover>
    </div>
  )
}
