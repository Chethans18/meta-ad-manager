"use client"

import { useState } from "react"
import { CalendarIcon } from "lucide-react"
import { format } from "date-fns"

import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export function CampaignBudget() {
  const [budgetType, setBudgetType] = useState("daily")
  const [budget, setBudget] = useState("50")
  const [dateRange, setDateRange] = useState<{ from: Date; to?: Date }>({
    from: new Date(),
    to: new Date(new Date().setDate(new Date().getDate() + 30)),
  })

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Budget</CardTitle>
          <CardDescription>Set your campaign budget and schedule</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <Label>Budget Type</Label>
            <RadioGroup value={budgetType} onValueChange={setBudgetType} className="flex space-x-4">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="daily" id="budget-daily" />
                <Label htmlFor="budget-daily">Daily Budget</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="lifetime" id="budget-lifetime" />
                <Label htmlFor="budget-lifetime">Lifetime Budget</Label>
              </div>
            </RadioGroup>
          </div>

          <div className="space-y-2">
            <Label htmlFor="budget-amount">Budget Amount</Label>
            <div className="flex w-full max-w-sm items-center space-x-2">
              <Select defaultValue="usd">
                <SelectTrigger className="w-20">
                  <SelectValue placeholder="USD" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="usd">USD</SelectItem>
                  <SelectItem value="eur">EUR</SelectItem>
                  <SelectItem value="gbp">GBP</SelectItem>
                </SelectContent>
              </Select>
              <Input
                id="budget-amount"
                type="number"
                placeholder="Enter amount"
                value={budget}
                onChange={(e) => setBudget(e.target.value)}
              />
            </div>
            <p className="text-sm text-muted-foreground">
              {budgetType === "daily"
                ? `Your campaign will spend up to $${budget} per day`
                : `Your campaign will spend up to $${budget} over its entire duration`}
            </p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Campaign Schedule</CardTitle>
          <CardDescription>Set when your campaign should run</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label>Campaign Duration</Label>
            <div className="grid gap-4 sm:grid-cols-2">
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="justify-start text-left font-normal">
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {dateRange?.from ? format(dateRange.from, "PPP") : <span>Start date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={dateRange?.from}
                    onSelect={(date) => setDateRange({ ...dateRange, from: date as Date })}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>

              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="justify-start text-left font-normal">
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {dateRange?.to ? format(dateRange.to, "PPP") : <span>End date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={dateRange?.to}
                    onSelect={(date) => setDateRange({ ...dateRange, to: date as Date })}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>

          <Tabs defaultValue="all-times">
            <div className="flex items-center justify-between">
              <Label>Ad Scheduling</Label>
              <TabsList>
                <TabsTrigger value="all-times">All times</TabsTrigger>
                <TabsTrigger value="specific-times">Specific times</TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="all-times">
              <p className="text-sm text-muted-foreground py-4">
                Your ads will run all days of the week at all times of the day.
              </p>
            </TabsContent>

            <TabsContent value="specific-times">
              <div className="py-4">
                <p className="text-sm text-muted-foreground mb-4">
                  Select the days and times when you want your ads to run.
                </p>
                <div className="grid grid-cols-7 gap-2 text-center">
                  {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day) => (
                    <Button key={day} variant="outline" className="h-12">
                      {day}
                    </Button>
                  ))}
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      <Card className="bg-muted/50">
        <CardHeader>
          <CardTitle>Budget Summary</CardTitle>
          <CardDescription>Estimated campaign performance</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex justify-between">
              <span>Campaign duration:</span>
              <span>30 days</span>
            </div>
            <div className="flex justify-between">
              <span>Total budget:</span>
              <span className="font-semibold">${budgetType === "daily" ? Number.parseInt(budget) * 30 : budget}</span>
            </div>
            <div className="flex justify-between">
              <span>Estimated daily reach:</span>
              <span>5,000 - 15,000 people</span>
            </div>
            <div className="flex justify-between">
              <span>Estimated clicks:</span>
              <span>500 - 1,500 per day</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
