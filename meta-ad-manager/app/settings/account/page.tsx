"use client"

import { Badge } from "@/components/ui/badge"

import { useState } from "react"
import { AlertTriangle, Save } from "lucide-react"

import { MainNav } from "@/components/main-nav"
import { SettingsSidebar } from "@/components/settings-sidebar"
import { UserNav } from "@/components/user-nav"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Switch } from "@/components/ui/switch"
import { useToast } from "@/hooks/use-toast"
import { AudienceDashboard } from "@/components/audience-dashboard"

export default function AccountSettingsPage() {
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)
  const [isDeactivateDialogOpen, setIsDeactivateDialogOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [confirmText, setConfirmText] = useState("")
  const [accountSettings, setAccountSettings] = useState({
    twoFactorEnabled: false,
    emailNotifications: true,
    marketingEmails: true,
    activityDigest: true,
    securityAlerts: true,
  })

  const handleSwitchChange = (name: string, checked: boolean) => {
    setAccountSettings((prev) => ({ ...prev, [name]: checked }))
  }

  const handleSaveSettings = async () => {
    setIsLoading(true)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500))

      toast({
        title: "Settings updated",
        description: "Your account settings have been updated successfully.",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "There was an error updating your settings. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleDeactivateAccount = async () => {
    setIsLoading(true)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500))

      toast({
        title: "Account deactivated",
        description: "Your account has been deactivated. You can reactivate it by signing in again.",
      })

      setIsDeactivateDialogOpen(false)

      // In a real app, you would redirect to a logout page or sign-in page
    } catch (error) {
      toast({
        title: "Error",
        description: "There was an error deactivating your account. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleDeleteAccount = async () => {
    setIsLoading(true)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500))

      toast({
        title: "Account deleted",
        description: "Your account has been permanently deleted.",
      })

      setIsDeleteDialogOpen(false)

      // In a real app, you would redirect to a homepage or sign-up page
    } catch (error) {
      toast({
        title: "Error",
        description: "There was an error deleting your account. Please try again.",
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
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Account Security</CardTitle>
                  <CardDescription>Manage your account security settings</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="two-factor">Two-factor authentication</Label>
                        <p className="text-sm text-muted-foreground">Add an extra layer of security to your account</p>
                      </div>
                      <Switch
                        id="two-factor"
                        checked={accountSettings.twoFactorEnabled}
                        onCheckedChange={(checked) => handleSwitchChange("twoFactorEnabled", checked)}
                      />
                    </div>
                    {!accountSettings.twoFactorEnabled && (
                      <div className="rounded-md bg-muted p-4">
                        <p className="text-sm">
                          We strongly recommend enabling two-factor authentication for increased account security.
                        </p>
                        <Button variant="link" className="h-auto p-0 text-sm">
                          Learn more about two-factor authentication
                        </Button>
                      </div>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="current-password">Change Password</Label>
                    <div className="grid gap-4">
                      <div className="grid gap-2">
                        <Input id="current-password" type="password" placeholder="Current password" />
                      </div>
                      <div className="grid gap-2">
                        <Input id="new-password" type="password" placeholder="New password" />
                      </div>
                      <div className="grid gap-2">
                        <Input id="confirm-password" type="password" placeholder="Confirm new password" />
                      </div>
                      <Button className="w-full sm:w-auto">Update Password</Button>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Active Sessions</Label>
                    <div className="rounded-md border p-4">
                      <div className="flex items-start justify-between">
                        <div>
                          <p className="font-medium">Current Session</p>
                          <p className="text-sm text-muted-foreground">San Francisco, CA, USA · Chrome on macOS</p>
                          <p className="text-xs text-muted-foreground">Started 2 hours ago</p>
                        </div>
                        <Badge variant="outline" className="ml-2">
                          Current
                        </Badge>
                      </div>
                    </div>
                    <div className="rounded-md border p-4">
                      <div className="flex items-start justify-between">
                        <div>
                          <p className="font-medium">Mobile App</p>
                          <p className="text-sm text-muted-foreground">New York, NY, USA · iOS App</p>
                          <p className="text-xs text-muted-foreground">Started 3 days ago</p>
                        </div>
                        <Button variant="outline" size="sm">
                          Revoke
                        </Button>
                      </div>
                    </div>
                    <Button variant="link" className="h-auto p-0 text-sm">
                      View all active sessions
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Email Preferences</CardTitle>
                  <CardDescription>Manage your email notification preferences</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="email-notifications">Email Notifications</Label>
                      <p className="text-sm text-muted-foreground">Receive emails about your account activity</p>
                    </div>
                    <Switch
                      id="email-notifications"
                      checked={accountSettings.emailNotifications}
                      onCheckedChange={(checked) => handleSwitchChange("emailNotifications", checked)}
                    />
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="marketing-emails">Marketing Emails</Label>
                      <p className="text-sm text-muted-foreground">Receive emails about new features and promotions</p>
                    </div>
                    <Switch
                      id="marketing-emails"
                      checked={accountSettings.marketingEmails}
                      onCheckedChange={(checked) => handleSwitchChange("marketingEmails", checked)}
                    />
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="activity-digest">Activity Digest</Label>
                      <p className="text-sm text-muted-foreground">Receive a weekly digest of your account activity</p>
                    </div>
                    <Switch
                      id="activity-digest"
                      checked={accountSettings.activityDigest}
                      onCheckedChange={(checked) => handleSwitchChange("activityDigest", checked)}
                    />
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="security-alerts">Security Alerts</Label>
                      <p className="text-sm text-muted-foreground">Receive alerts about suspicious activity</p>
                    </div>
                    <Switch
                      id="security-alerts"
                      checked={accountSettings.securityAlerts}
                      onCheckedChange={(checked) => handleSwitchChange("securityAlerts", checked)}
                    />
                  </div>
                </CardContent>
                <CardFooter className="flex justify-end">
                  <Button onClick={handleSaveSettings} disabled={isLoading}>
                    {isLoading ? (
                      <>Saving changes...</>
                    ) : (
                      <>
                        <Save className="mr-2 h-4 w-4" />
                        Save changes
                      </>
                    )}
                  </Button>
                </CardFooter>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Danger Zone</CardTitle>
                  <CardDescription>Irreversible and destructive actions</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Alert variant="destructive">
                    <AlertTriangle className="h-4 w-4" />
                    <AlertTitle>Warning</AlertTitle>
                    <AlertDescription>
                      The actions below can result in permanent data loss. Please proceed with caution.
                    </AlertDescription>
                  </Alert>

                  <div className="rounded-md border border-destructive/20 p-4">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="font-medium">Deactivate Account</h3>
                        <p className="text-sm text-muted-foreground">
                          Temporarily disable your account. You can reactivate it later.
                        </p>
                      </div>
                      <Dialog open={isDeactivateDialogOpen} onOpenChange={setIsDeactivateDialogOpen}>
                        <DialogTrigger asChild>
                          <Button variant="outline" className="text-destructive">
                            Deactivate
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Deactivate Account</DialogTitle>
                            <DialogDescription>
                              Are you sure you want to deactivate your account? You can reactivate it later by signing
                              in.
                            </DialogDescription>
                          </DialogHeader>
                          <div className="py-4">
                            <p className="text-sm text-muted-foreground">While your account is deactivated:</p>
                            <ul className="list-disc pl-5 text-sm text-muted-foreground">
                              <li>Your campaigns will be paused</li>
                              <li>Your data will be preserved</li>
                              <li>You won't be billed for any services</li>
                            </ul>
                          </div>
                          <DialogFooter>
                            <Button variant="outline" onClick={() => setIsDeactivateDialogOpen(false)}>
                              Cancel
                            </Button>
                            <Button variant="destructive" onClick={handleDeactivateAccount} disabled={isLoading}>
                              {isLoading ? "Deactivating..." : "Deactivate Account"}
                            </Button>
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>
                    </div>
                  </div>

                  <div className="rounded-md border border-destructive/20 p-4">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="font-medium">Delete Account</h3>
                        <p className="text-sm text-muted-foreground">
                          Permanently delete your account and all associated data.
                        </p>
                      </div>
                      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
                        <DialogTrigger asChild>
                          <Button variant="destructive">Delete</Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Delete Account</DialogTitle>
                            <DialogDescription>
                              Are you sure you want to delete your account? This action cannot be undone and all your
                              data will be permanently deleted.
                            </DialogDescription>
                          </DialogHeader>
                          <div className="py-4">
                            <p className="mb-4 text-sm font-medium">Please type "DELETE" to confirm:</p>
                            <Input
                              value={confirmText}
                              onChange={(e) => setConfirmText(e.target.value)}
                              placeholder="Type DELETE to confirm"
                            />
                          </div>
                          <DialogFooter>
                            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
                              Cancel
                            </Button>
                            <Button
                              variant="destructive"
                              onClick={handleDeleteAccount}
                              disabled={isLoading || confirmText !== "DELETE"}
                            >
                              {isLoading ? "Deleting..." : "Delete Account"}
                            </Button>
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
