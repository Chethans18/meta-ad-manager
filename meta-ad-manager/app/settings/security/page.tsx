"use client"

import { useState } from "react"
import { Save, Shield } from "lucide-react"

import { MainNav } from "@/components/main-nav"
import { SettingsSidebar } from "@/components/settings-sidebar"
import { UserNav } from "@/components/user-nav"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Separator } from "@/components/ui/separator"
import { Switch } from "@/components/ui/switch"
import { useToast } from "@/hooks/use-toast"
import { AudienceDashboard } from "@/components/audience-dashboard"

export default function SecuritySettingsPage() {
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)
  const [securitySettings, setSecuritySettings] = useState({
    twoFactorMethod: "app",
    loginNotifications: true,
    browserRemember: true,
    loginVerification: true,
    passwordChangeRequire: false,
  })

  const handleSwitchChange = (name: string, checked: boolean) => {
    setSecuritySettings((prev) => ({ ...prev, [name]: checked }))
  }

  const handleRadioChange = (value: string) => {
    setSecuritySettings((prev) => ({ ...prev, twoFactorMethod: value }))
  }

  const handleSaveSettings = async () => {
    setIsLoading(true)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500))

      toast({
        title: "Security settings updated",
        description: "Your security settings have been updated successfully.",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "There was an error updating your security settings. Please try again.",
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
                  <CardTitle>Two-Factor Authentication</CardTitle>
                  <CardDescription>Add an extra layer of security to your account</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="two-factor">Enable Two-Factor Authentication</Label>
                        <p className="text-sm text-muted-foreground">Require a verification code when signing in</p>
                      </div>
                      <Switch id="two-factor" checked={true} disabled />
                    </div>

                    <div className="rounded-md bg-muted p-4">
                      <div className="flex items-start">
                        <Shield className="mr-3 h-5 w-5 text-primary" />
                        <div>
                          <p className="text-sm font-medium">Two-factor authentication is enabled</p>
                          <p className="text-sm text-muted-foreground">
                            Your account is protected with an additional layer of security.
                          </p>
                        </div>
                      </div>
                    </div>

                    <RadioGroup
                      value={securitySettings.twoFactorMethod}
                      onValueChange={handleRadioChange}
                      className="space-y-4"
                    >
                      <div className="flex items-start space-x-3 rounded-md border p-4">
                        <RadioGroupItem value="app" id="method-app" className="mt-1" />
                        <div className="flex-1">
                          <Label htmlFor="method-app" className="text-base">
                            Authenticator App
                          </Label>
                          <p className="text-sm text-muted-foreground">
                            Use an authenticator app like Google Authenticator or Authy to get verification codes.
                          </p>
                          {securitySettings.twoFactorMethod === "app" && (
                            <div className="mt-4 space-y-4">
                              <div className="flex justify-center">
                                <div className="rounded-md bg-muted p-4">
                                  <div className="h-40 w-40 bg-gray-200 flex items-center justify-center">
                                    <span className="text-sm text-muted-foreground">QR Code Placeholder</span>
                                  </div>
                                </div>
                              </div>
                              <div className="space-y-2">
                                <Label htmlFor="verification-code">Verification Code</Label>
                                <Input id="verification-code" placeholder="Enter 6-digit code" />
                                <Button className="w-full">Verify</Button>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="flex items-start space-x-3 rounded-md border p-4">
                        <RadioGroupItem value="sms" id="method-sms" className="mt-1" />
                        <div className="flex-1">
                          <Label htmlFor="method-sms" className="text-base">
                            SMS Text Message
                          </Label>
                          <p className="text-sm text-muted-foreground">
                            Receive verification codes via SMS text message.
                          </p>
                          {securitySettings.twoFactorMethod === "sms" && (
                            <div className="mt-4 space-y-4">
                              <div className="space-y-2">
                                <Label htmlFor="phone-number">Phone Number</Label>
                                <Input id="phone-number" placeholder="+1 (555) 123-4567" />
                                <Button className="w-full">Send Code</Button>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </RadioGroup>
                  </div>

                  <div className="space-y-2">
                    <Label>Recovery Codes</Label>
                    <div className="rounded-md border p-4">
                      <p className="text-sm text-muted-foreground">
                        Recovery codes can be used to access your account if you lose your two-factor authentication
                        device.
                      </p>
                      <div className="mt-4 flex flex-wrap gap-2">
                        <code className="rounded bg-muted px-2 py-1 text-xs">ABCD-EFGH-IJKL</code>
                        <code className="rounded bg-muted px-2 py-1 text-xs">MNOP-QRST-UVWX</code>
                        <code className="rounded bg-muted px-2 py-1 text-xs">YZAB-CDEF-GHIJ</code>
                        <code className="rounded bg-muted px-2 py-1 text-xs">KLMN-OPQR-STUV</code>
                        <code className="rounded bg-muted px-2 py-1 text-xs">WXYZ-ABCD-EFGH</code>
                      </div>
                      <div className="mt-4 flex space-x-2">
                        <Button variant="outline" size="sm">
                          Download Codes
                        </Button>
                        <Button variant="outline" size="sm">
                          Generate New Codes
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Login Security</CardTitle>
                  <CardDescription>Manage your login security preferences</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="login-notifications">Login Notifications</Label>
                      <p className="text-sm text-muted-foreground">
                        Receive notifications when someone logs into your account
                      </p>
                    </div>
                    <Switch
                      id="login-notifications"
                      checked={securitySettings.loginNotifications}
                      onCheckedChange={(checked) => handleSwitchChange("loginNotifications", checked)}
                    />
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="browser-remember">Remember Browsers</Label>
                      <p className="text-sm text-muted-foreground">
                        Allow trusted browsers to skip two-factor authentication
                      </p>
                    </div>
                    <Switch
                      id="browser-remember"
                      checked={securitySettings.browserRemember}
                      onCheckedChange={(checked) => handleSwitchChange("browserRemember", checked)}
                    />
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="login-verification">Login Verification</Label>
                      <p className="text-sm text-muted-foreground">
                        Verify new logins from unrecognized devices or browsers
                      </p>
                    </div>
                    <Switch
                      id="login-verification"
                      checked={securitySettings.loginVerification}
                      onCheckedChange={(checked) => handleSwitchChange("loginVerification", checked)}
                    />
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="password-change">Require Password Change</Label>
                      <p className="text-sm text-muted-foreground">Require password change every 90 days</p>
                    </div>
                    <Switch
                      id="password-change"
                      checked={securitySettings.passwordChangeRequire}
                      onCheckedChange={(checked) => handleSwitchChange("passwordChangeRequire", checked)}
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
                  <CardTitle>Security Activity</CardTitle>
                  <CardDescription>Recent security events for your account</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="rounded-md border p-4">
                      <div className="flex items-start justify-between">
                        <div>
                          <p className="font-medium">Password Changed</p>
                          <p className="text-sm text-muted-foreground">San Francisco, CA, USA · Chrome on macOS</p>
                          <p className="text-xs text-muted-foreground">2 days ago</p>
                        </div>
                      </div>
                    </div>
                    <div className="rounded-md border p-4">
                      <div className="flex items-start justify-between">
                        <div>
                          <p className="font-medium">New Login</p>
                          <p className="text-sm text-muted-foreground">New York, NY, USA · Safari on iOS</p>
                          <p className="text-xs text-muted-foreground">5 days ago</p>
                        </div>
                      </div>
                    </div>
                    <div className="rounded-md border p-4">
                      <div className="flex items-start justify-between">
                        <div>
                          <p className="font-medium">Two-Factor Authentication Enabled</p>
                          <p className="text-sm text-muted-foreground">San Francisco, CA, USA · Chrome on macOS</p>
                          <p className="text-xs text-muted-foreground">2 weeks ago</p>
                        </div>
                      </div>
                    </div>
                    <Button variant="link" className="h-auto p-0 text-sm">
                      View all security activity
                    </Button>
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
