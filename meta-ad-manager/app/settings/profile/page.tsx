"use client"

import { useEffect, useState } from "react"
import { Camera, Save } from "lucide-react"
import { MainNav } from "@/components/main-nav"
import { SettingsSidebar } from "@/components/settings-sidebar"
import { UserNav } from "@/components/user-nav"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"
import { AudienceDashboard } from "@/components/audience-dashboard"
import api from "@/lib/axios"
import { useAuth } from "@/context/auth-context"

export default function ProfileSettingsPage() {
  const { toast } = useToast()
  const { user, setUser } = useAuth()
  const [avatarUrl, setAvatarUrl] = useState<File | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const [profileData, setProfileData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    company: "",
    role: "",
    bio: "",
    timezone: "",
    language: "en",
  })

  const fetchProfile = async () => {
    try {
      console.log("Fetching profile data...");
      const token = localStorage.getItem('token');
      if (!token) {
        console.error("No token found");
        toast({
          title: "Authentication Error",
          description: "Please sign in to view your profile.",
          variant: "destructive",
        });
        return;
      }

      const res = await api.get("/auth/me", {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      
      console.log("Profile API Response:", res.data);
      
      // Check if user data exists in the response
      const userData = res.data.user || res.data;
      if (!userData) {
        throw new Error("No user data received");
      }

      setProfileData({
        firstName: userData.firstName || "",
        lastName: userData.lastName || "",
        email: userData.email || "",
        company: userData.company || "",
        role: userData.role || "",
        bio: userData.bio || "",
        timezone: userData.timezone || "",
        language: userData.language || "en",
      });

      // Update auth context with latest user data
      if (setUser) {
        setUser(userData);
      }
    } catch (error: any) {
      console.error("Profile fetch error:", error);
      toast({
        title: "Failed to load profile",
        description: error.response?.data?.message || "Could not fetch profile data.",
        variant: "destructive",
      });
    }
  };

  useEffect(() => {
    fetchProfile();
  }, [toast]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setProfileData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setProfileData((prev) => ({ ...prev, [name]: value }))
  }

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setAvatarUrl(file)
    }
  }

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleCancel = () => {
    setIsEditing(false);
    // Reset form data to original values
    fetchProfile();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error("No authentication token found");
      }

      const formData = new FormData()

      Object.entries(profileData).forEach(([key, value]) => {
        formData.append(key, value)
      })

      if (avatarUrl) {
        formData.append("avatar", avatarUrl)
      }

      const response = await api.put("/auth/update-profile", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`
        },
      })

      if (response.data.user) {
        // Update auth context with new user data
        if (setUser) {
          setUser(response.data.user);
        }
      }

      toast({
        title: "Profile updated",
        description: "Your profile information has been updated successfully.",
      })
      setIsEditing(false)
    } catch (error: any) {
      toast({
        title: "Update failed",
        description: error.response?.data?.message || "There was an error updating your profile.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
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
          <h2 className="text-3xl font-bold tracking-tight">Settings</h2>
        </div>
        <Separator />
        <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
          <aside className="lg:w-1/5">
            <SettingsSidebar />
          </aside>
          <div className="flex-1 lg:max-w-2xl">
            <form onSubmit={handleSubmit}>
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Profile</CardTitle>
                    <CardDescription>Manage your personal information and preferences</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="flex flex-col items-center space-y-4">
                      <div className="relative">
                        <Avatar className="h-24 w-24">
                          <AvatarImage src={avatarUrl ? URL.createObjectURL(avatarUrl) : "/placeholder.svg?height=96&width=96"} alt="Profile" />
                          <AvatarFallback>JD</AvatarFallback>
                        </Avatar>
                        <Button
                          size="icon"
                          variant="outline"
                          className="absolute bottom-0 right-0 h-8 w-8 rounded-full"
                          onClick={() => document.getElementById('avatar-input')?.click()}
                          type="button"
                        >
                          <Camera className="h-4 w-4" />
                          <span className="sr-only">Change profile picture</span>
                        </Button>
                        <input
                          id="avatar-input"
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={handleAvatarChange}
                        />
                      </div>
                      <div className="text-center">
                        <p className="text-sm text-muted-foreground">JPG, GIF, or PNG. Max size 2MB.</p>
                      </div>
                    </div>

                    <div className="grid gap-6 sm:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="firstName">First name</Label>
                        <Input id="firstName" name="firstName" value={profileData.firstName} onChange={handleChange} />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="lastName">Last name</Label>
                        <Input id="lastName" name="lastName" value={profileData.lastName} onChange={handleChange} />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input id="email" name="email" type="email" value={profileData.email} onChange={handleChange} />
                    </div>

                    <div className="grid gap-6 sm:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="company">Company</Label>
                        <Input id="company" name="company" value={profileData.company} onChange={handleChange} />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="role">Role</Label>
                        <Input id="role" name="role" value={profileData.role} onChange={handleChange} />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="bio">Bio</Label>
                      <Textarea id="bio" name="bio" rows={4} value={profileData.bio} onChange={handleChange} />
                      <p className="text-xs text-muted-foreground">
                        Brief description for your profile. URLs are hyperlinked.
                      </p>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Preferences</CardTitle>
                    <CardDescription>Manage your language and regional preferences</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-2">
                      <Label htmlFor="language">Language</Label>
                      <Select
                        value={profileData.language}
                        onValueChange={(value) => handleSelectChange("language", value)}
                      >
                        <SelectTrigger id="language">
                          <SelectValue placeholder="Select language" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="en">English</SelectItem>
                          <SelectItem value="es">Spanish</SelectItem>
                          <SelectItem value="fr">French</SelectItem>
                          <SelectItem value="de">German</SelectItem>
                          <SelectItem value="pt">Portuguese</SelectItem>
                          <SelectItem value="ja">Japanese</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="timezone">Timezone</Label>
                      <Select
                        value={profileData.timezone}
                        onValueChange={(value) => handleSelectChange("timezone", value)}
                      >
                        <SelectTrigger id="timezone">
                          <SelectValue placeholder="Select timezone" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="america_new_york">Eastern Time (US & Canada)</SelectItem>
                          <SelectItem value="america_chicago">Central Time (US & Canada)</SelectItem>
                          <SelectItem value="america_denver">Mountain Time (US & Canada)</SelectItem>
                          <SelectItem value="america_los_angeles">Pacific Time (US & Canada)</SelectItem>
                          <SelectItem value="europe_london">London</SelectItem>
                          <SelectItem value="europe_paris">Paris</SelectItem>
                          <SelectItem value="asia_tokyo">Tokyo</SelectItem>
                          <SelectItem value="australia_sydney">Sydney</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-end space-x-2">
                    {isEditing ? (
                      <>
                        <Button 
                          type="button" 
                          variant="outline" 
                          onClick={handleCancel}
                          disabled={isLoading}
                        >
                          Cancel
                        </Button>
                        <Button 
                          type="submit" 
                          disabled={isLoading}
                        >
                          {isLoading ? (
                            <>Saving changes...</>
                          ) : (
                            <>
                              <Save className="mr-2 h-4 w-4" />
                              Save changes
                            </>
                          )}
                        </Button>
                      </>
                    ) : (
                      <Button 
                        type="button" 
                        onClick={handleEdit}
                      >
                        Edit Profile
                      </Button>
                    )}
                  </CardFooter>
                </Card>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
