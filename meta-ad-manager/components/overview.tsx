"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface DataPoint {
  name: string
  impressions: number
  clicks: number
  spend: number
}

export function Overview({ className }: React.HTMLAttributes<HTMLDivElement>) {
  const [data, setData] = useState<DataPoint[]>([])

  useEffect(() => {
    // This would typically be fetched from an API
    const mockData = [
      { name: "Jan 1", impressions: 150000, clicks: 2500, spend: 320 },
      { name: "Jan 2", impressions: 180000, clicks: 3200, spend: 380 },
      { name: "Jan 3", impressions: 220000, clicks: 4500, spend: 450 },
      { name: "Jan 4", impressions: 280000, clicks: 5100, spend: 520 },
      { name: "Jan 5", impressions: 250000, clicks: 4800, spend: 490 },
      { name: "Jan 6", impressions: 300000, clicks: 5500, spend: 550 },
      { name: "Jan 7", impressions: 320000, clicks: 6200, spend: 630 },
    ]
    setData(mockData)
  }, [])

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>Campaign Performance</CardTitle>
        <CardDescription>View metrics across all your active campaigns</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="impressions" className="space-y-4">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="impressions">Impressions</TabsTrigger>
            <TabsTrigger value="clicks">Clicks</TabsTrigger>
            <TabsTrigger value="spend">Spend</TabsTrigger>
          </TabsList>
          <TabsContent value="impressions">
            <div className="h-[350px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={data}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="impressions" stroke="#3b82f6" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </TabsContent>
          <TabsContent value="clicks">
            <div className="h-[350px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={data}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="clicks" stroke="#10b981" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </TabsContent>
          <TabsContent value="spend">
            <div className="h-[350px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={data}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="spend" stroke="#f59e0b" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
