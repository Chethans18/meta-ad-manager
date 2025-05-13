"use client"

import { useState } from "react"
import { ImageIcon, PencilIcon, Plus, Trash2, Upload, X } from "lucide-react"
import Image from "next/image"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"

interface AdCreative {
  id: string
  headline: string
  description: string
  cta: string
  imageUrl: string
}

export function CampaignCreatives() {
  const [adFormat, setAdFormat] = useState("single-image")
  const [creatives, setCreatives] = useState<AdCreative[]>([
    {
      id: "1",
      headline: "Summer Sale - Up to 50% Off",
      description: "Shop our biggest sale of the season. Limited time only!",
      cta: "Shop Now",
      imageUrl: "/placeholder.svg?height=300&width=600",
    },
  ])

  const addCreative = () => {
    const newCreative: AdCreative = {
      id: Math.random().toString(36).substring(7),
      headline: "",
      description: "",
      cta: "Shop Now",
      imageUrl: "/placeholder.svg?height=300&width=600",
    }
    setCreatives([...creatives, newCreative])
  }

  const removeCreative = (id: string) => {
    setCreatives(creatives.filter((creative) => creative.id !== id))
  }

  const updateCreative = (id: string, field: keyof AdCreative, value: string) => {
    setCreatives(creatives.map((creative) => (creative.id === id ? { ...creative, [field]: value } : creative)))
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Ad Format</CardTitle>
          <CardDescription>Choose the format for your ad</CardDescription>
        </CardHeader>
        <CardContent>
          <RadioGroup value={adFormat} onValueChange={setAdFormat} className="grid grid-cols-1 gap-4 md:grid-cols-3">
            <Card
              className={`cursor-pointer border-2 ${adFormat === "single-image" ? "border-primary" : "border-border"}`}
            >
              <CardContent className="pt-6 text-center">
                <div className="mb-4 flex justify-center">
                  <ImageIcon className="h-10 w-10 text-muted-foreground" />
                </div>
                <RadioGroupItem value="single-image" id="format-image" className="sr-only" />
                <Label htmlFor="format-image" className="cursor-pointer">
                  Single Image
                </Label>
              </CardContent>
            </Card>

            <Card className={`cursor-pointer border-2 ${adFormat === "carousel" ? "border-primary" : "border-border"}`}>
              <CardContent className="pt-6 text-center">
                <div className="mb-4 flex justify-center">
                  <svg
                    className="h-10 w-10 text-muted-foreground"
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
                    <rect width="6" height="16" x="2" y="4" rx="1" />
                    <rect width="6" height="16" x="9" y="4" rx="1" />
                    <rect width="6" height="16" x="16" y="4" rx="1" />
                  </svg>
                </div>
                <RadioGroupItem value="carousel" id="format-carousel" className="sr-only" />
                <Label htmlFor="format-carousel" className="cursor-pointer">
                  Carousel
                </Label>
              </CardContent>
            </Card>

            <Card className={`cursor-pointer border-2 ${adFormat === "video" ? "border-primary" : "border-border"}`}>
              <CardContent className="pt-6 text-center">
                <div className="mb-4 flex justify-center">
                  <svg
                    className="h-10 w-10 text-muted-foreground"
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
                    <path d="m19 6-7 6 7 6V6Z" />
                    <rect width="4" height="16" x="5" y="4" rx="1" />
                  </svg>
                </div>
                <RadioGroupItem value="video" id="format-video" className="sr-only" />
                <Label htmlFor="format-video" className="cursor-pointer">
                  Video
                </Label>
              </CardContent>
            </Card>
          </RadioGroup>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Ad Creatives</CardTitle>
              <CardDescription>Create your ad content</CardDescription>
            </div>
            {creatives.length < 6 && (
              <Button onClick={addCreative} variant="outline" size="sm">
                <Plus className="mr-2 h-4 w-4" />
                Add Creative
              </Button>
            )}
          </div>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue={creatives[0]?.id}>
            <TabsList className="flex h-auto flex-wrap">
              {creatives.map((creative, index) => (
                <TabsTrigger key={creative.id} value={creative.id} className="relative">
                  Ad {index + 1}
                  {creatives.length > 1 && (
                    <Button
                      variant="ghost"
                      size="sm"
                      className="absolute -right-1 -top-1 h-5 w-5 rounded-full p-0"
                      onClick={(e) => {
                        e.stopPropagation()
                        removeCreative(creative.id)
                      }}
                    >
                      <X className="h-3 w-3" />
                      <span className="sr-only">Remove</span>
                    </Button>
                  )}
                </TabsTrigger>
              ))}
            </TabsList>

            {creatives.map((creative) => (
              <TabsContent key={creative.id} value={creative.id} className="space-y-6">
                <div className="grid gap-6 md:grid-cols-2">
                  <div className="space-y-6">
                    <div className="space-y-2">
                      <Label htmlFor={`headline-${creative.id}`}>Headline</Label>
                      <Input
                        id={`headline-${creative.id}`}
                        placeholder="Enter headline"
                        maxLength={40}
                        value={creative.headline}
                        onChange={(e) => updateCreative(creative.id, "headline", e.target.value)}
                      />
                      <p className="text-xs text-muted-foreground">{creative.headline.length}/40 characters</p>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor={`description-${creative.id}`}>Description</Label>
                      <Textarea
                        id={`description-${creative.id}`}
                        placeholder="Enter ad description"
                        rows={4}
                        maxLength={125}
                        value={creative.description}
                        onChange={(e) => updateCreative(creative.id, "description", e.target.value)}
                      />
                      <p className="text-xs text-muted-foreground">{creative.description.length}/125 characters</p>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor={`cta-${creative.id}`}>Call to Action</Label>
                      <Select value={creative.cta} onValueChange={(value) => updateCreative(creative.id, "cta", value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a call to action" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Shop Now">Shop Now</SelectItem>
                          <SelectItem value="Learn More">Learn More</SelectItem>
                          <SelectItem value="Sign Up">Sign Up</SelectItem>
                          <SelectItem value="Subscribe">Subscribe</SelectItem>
                          <SelectItem value="Book Now">Book Now</SelectItem>
                          <SelectItem value="Contact Us">Contact Us</SelectItem>
                          <SelectItem value="Download">Download</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <Label>Ad Preview Image</Label>
                    <div className="relative aspect-video overflow-hidden rounded-lg border bg-muted">
                      <Image
                        src={creative.imageUrl || "/placeholder.svg"}
                        alt="Ad preview"
                        fill
                        className="object-cover"
                      />
                      <div className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 transition-opacity hover:opacity-100">
                        <div className="flex gap-2">
                          <Button size="sm" variant="secondary">
                            <PencilIcon className="mr-2 h-4 w-4" />
                            Change Image
                          </Button>
                          <Button size="sm" variant="destructive">
                            <Trash2 className="mr-2 h-4 w-4" />
                            Remove
                          </Button>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-center rounded-lg border-2 border-dashed p-6">
                      <div className="text-center">
                        <Upload className="mx-auto h-10 w-10 text-muted-foreground" />
                        <h3 className="mt-2 font-medium">Upload Media</h3>
                        <p className="text-sm text-muted-foreground">Drag and drop or click to upload</p>
                        <p className="mt-1 text-xs text-muted-foreground">Recommended size: 1200 x 628 pixels</p>
                        <Button variant="secondary" size="sm" className="mt-4">
                          Select File
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>

                <Card className="bg-muted/50">
                  <CardHeader>
                    <CardTitle className="text-base">Ad Preview</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="rounded-md border bg-white p-4">
                      <div className="flex items-start space-x-4">
                        <div className="h-12 w-12 rounded-full bg-blue-600 text-white flex items-center justify-center">
                          <svg
                            className="h-8 w-8"
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                          >
                            <path d="M12 2.04C6.5 2.04 2 6.53 2 12.06C2 17.06 5.66 21.21 10.44 21.96V14.96H7.9V12.06H10.44V9.85C10.44 7.34 11.93 5.96 14.22 5.96C15.31 5.96 16.45 6.15 16.45 6.15V8.62H15.19C13.95 8.62 13.56 9.39 13.56 10.18V12.06H16.34L15.89 14.96H13.56V21.96C18.34 21.21 22 17.06 22 12.06C22 6.53 17.5 2.04 12 2.04Z" />
                          </svg>
                        </div>
                        <div className="flex-1 space-y-1">
                          <div className="flex items-center justify-between">
                            <p className="text-sm font-medium">Your Business Name</p>
                            <p className="text-xs text-muted-foreground">Sponsored</p>
                          </div>
                          <p className="text-xs text-muted-foreground">Yesterday at 11:30 AM</p>
                          <p className="text-sm">{creative.description || "Your ad description will appear here"}</p>
                          <div className="relative aspect-video w-full overflow-hidden rounded-md border">
                            <Image
                              src={creative.imageUrl || "/placeholder.svg"}
                              alt="Ad preview"
                              fill
                              className="object-cover"
                            />
                          </div>
                          <div className="flex items-center justify-between">
                            <div>
                              <h3 className="text-sm font-semibold">
                                {creative.headline || "Your headline will appear here"}
                              </h3>
                              <p className="text-xs text-muted-foreground">yourbusiness.com</p>
                            </div>
                            <Button size="sm" className="h-8">
                              {creative.cta}
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            ))}
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}
