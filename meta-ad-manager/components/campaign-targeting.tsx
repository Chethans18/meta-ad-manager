"use client"

import { useState } from "react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export function CampaignTargeting() {
  const [targetingTab, setTargetingTab] = useState("demographics")
  const [ageRange, setAgeRange] = useState([18, 65])
  const [gender, setGender] = useState("all")
  const [locations, setLocations] = useState("")
  const [interests, setInterests] = useState("")

  return (
    <div className="space-y-6">
      <Tabs value={targetingTab} onValueChange={setTargetingTab}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="demographics">Demographics</TabsTrigger>
          <TabsTrigger value="location">Location</TabsTrigger>
          <TabsTrigger value="interests">Interests</TabsTrigger>
          <TabsTrigger value="behaviors">Behaviors</TabsTrigger>
        </TabsList>

        <TabsContent value="demographics" className="space-y-6 py-4">
          <Card>
            <CardHeader>
              <CardTitle>Age</CardTitle>
              <CardDescription>Select the age range for your target audience</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span>{ageRange[0]}</span>
                  <span>{ageRange[1]}</span>
                </div>
                <Slider
                  defaultValue={ageRange}
                  min={13}
                  max={65}
                  step={1}
                  onValueChange={(value) => setAgeRange(value as number[])}
                  className="py-4"
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Gender</CardTitle>
              <CardDescription>Select the gender to target</CardDescription>
            </CardHeader>
            <CardContent>
              <RadioGroup value={gender} onValueChange={setGender} className="flex space-x-4">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="all" id="gender-all" />
                  <Label htmlFor="gender-all">All</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="male" id="gender-male" />
                  <Label htmlFor="gender-male">Male</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="female" id="gender-female" />
                  <Label htmlFor="gender-female">Female</Label>
                </div>
              </RadioGroup>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="location" className="space-y-6 py-4">
          <Card>
            <CardHeader>
              <CardTitle>Locations</CardTitle>
              <CardDescription>Enter the locations you want to target</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="location-type">Location Type</Label>
                <Select defaultValue="country">
                  <SelectTrigger>
                    <SelectValue placeholder="Select location type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="country">Country</SelectItem>
                    <SelectItem value="region">Region</SelectItem>
                    <SelectItem value="city">City</SelectItem>
                    <SelectItem value="zip">Zip Code</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="locations">Locations</Label>
                <Input
                  id="locations"
                  placeholder="Enter locations (e.g. United States, Canada)"
                  value={locations}
                  onChange={(e) => setLocations(e.target.value)}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="interests" className="space-y-6 py-4">
          <Card>
            <CardHeader>
              <CardTitle>Interests</CardTitle>
              <CardDescription>Enter interests that your target audience has</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <Label htmlFor="interests">Interests</Label>
                <Input
                  id="interests"
                  placeholder="Enter interests (e.g. Technology, Fashion, Sports)"
                  value={interests}
                  onChange={(e) => setInterests(e.target.value)}
                />
                <p className="text-sm text-muted-foreground">Separate multiple interests with commas</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="behaviors" className="space-y-6 py-4">
          <Card>
            <CardHeader>
              <CardTitle>Behaviors</CardTitle>
              <CardDescription>Select behaviors to refine your targeting</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a behavior category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="digital-activities">Digital Activities</SelectItem>
                    <SelectItem value="purchase-behavior">Purchase Behavior</SelectItem>
                    <SelectItem value="travel">Travel</SelectItem>
                    <SelectItem value="mobile-device-user">Mobile Device User</SelectItem>
                  </SelectContent>
                </Select>

                <p className="text-sm text-muted-foreground">Select a behavior category to view specific behaviors</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <Card className="bg-muted/50">
        <CardHeader>
          <CardTitle>Audience Size Estimate</CardTitle>
          <CardDescription>Based on your targeting selections</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex justify-between">
            <div>
              <div className="text-2xl font-bold">1.2M - 2.5M</div>
              <div className="text-sm text-muted-foreground">Potential reach</div>
            </div>
            <Button variant="outline" size="sm">
              Save Audience
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
