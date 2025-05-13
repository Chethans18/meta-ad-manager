"use client"

import type React from "react"

import { useState } from "react"
import { CreditCard, Download, Plus, Trash2 } from "lucide-react"

import { MainNav } from "@/components/main-nav"
import { SettingsSidebar } from "@/components/settings-sidebar"
import { UserNav } from "@/components/user-nav"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
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
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Switch } from "@/components/ui/switch"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from "@/hooks/use-toast"
import { AudienceDashboard } from "@/components/audience-dashboard"

interface PaymentMethod {
  id: string
  type: "card" | "paypal"
  name: string
  last4?: string
  expiry?: string
  isDefault: boolean
}

interface Invoice {
  id: string
  date: string
  amount: string
  status: "paid" | "pending" | "failed"
  description: string
}

export default function BillingSettingsPage() {
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)
  const [isAddingPaymentMethod, setIsAddingPaymentMethod] = useState(false)
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([
    {
      id: "pm_1",
      type: "card",
      name: "Visa ending in 4242",
      last4: "4242",
      expiry: "04/2024",
      isDefault: true,
    },
    {
      id: "pm_2",
      type: "paypal",
      name: "PayPal (john.doe@example.com)",
      isDefault: false,
    },
  ])
  const [invoices, setInvoices] = useState<Invoice[]>([
    {
      id: "INV-001",
      date: "Mar 1, 2023",
      amount: "$49.99",
      status: "paid",
      description: "Ad Manager Pro Plan - Monthly",
    },
    {
      id: "INV-002",
      date: "Feb 1, 2023",
      amount: "$49.99",
      status: "paid",
      description: "Ad Manager Pro Plan - Monthly",
    },
    {
      id: "INV-003",
      date: "Jan 1, 2023",
      amount: "$49.99",
      status: "paid",
      description: "Ad Manager Pro Plan - Monthly",
    },
    {
      id: "INV-004",
      date: "Dec 1, 2022",
      amount: "$49.99",
      status: "paid",
      description: "Ad Manager Pro Plan - Monthly",
    },
  ])
  const [newCardData, setNewCardData] = useState({
    cardNumber: "",
    cardholderName: "",
    expiryMonth: "",
    expiryYear: "",
    cvc: "",
    makeDefault: false,
  })
  const [paymentType, setPaymentType] = useState("card")

  const handleCardInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setNewCardData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSwitchChange = (checked: boolean) => {
    setNewCardData((prev) => ({ ...prev, makeDefault: checked }))
  }

  const handleAddPaymentMethod = async () => {
    setIsLoading(true)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500))

      if (paymentType === "card") {
        const newCard: PaymentMethod = {
          id: `pm_${Math.random().toString(36).substring(2, 9)}`,
          type: "card",
          name: `Visa ending in ${newCardData.cardNumber.slice(-4)}`,
          last4: newCardData.cardNumber.slice(-4),
          expiry: `${newCardData.expiryMonth}/${newCardData.expiryYear}`,
          isDefault: newCardData.makeDefault,
        }

        if (newCard.isDefault) {
          // Update other payment methods to not be default
          setPaymentMethods(paymentMethods.map((pm) => ({ ...pm, isDefault: false })))
        }

        setPaymentMethods([...paymentMethods, newCard])
      } else if (paymentType === "paypal") {
        const newPaypal: PaymentMethod = {
          id: `pm_${Math.random().toString(36).substring(2, 9)}`,
          type: "paypal",
          name: "PayPal (connected account)",
          isDefault: newCardData.makeDefault,
        }

        if (newPaypal.isDefault) {
          // Update other payment methods to not be default
          setPaymentMethods(paymentMethods.map((pm) => ({ ...pm, isDefault: false })))
        }

        setPaymentMethods([...paymentMethods, newPaypal])
      }

      // Reset form
      setNewCardData({
        cardNumber: "",
        cardholderName: "",
        expiryMonth: "",
        expiryYear: "",
        cvc: "",
        makeDefault: false,
      })

      setIsAddingPaymentMethod(false)

      toast({
        title: "Payment method added",
        description: "Your payment method has been added successfully.",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "There was an error adding your payment method. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleSetDefaultPaymentMethod = (id: string) => {
    setPaymentMethods(
      paymentMethods.map((pm) => ({
        ...pm,
        isDefault: pm.id === id,
      })),
    )

    toast({
      title: "Default payment method updated",
      description: "Your default payment method has been updated successfully.",
    })
  }

  const handleDeletePaymentMethod = (id: string) => {
    setPaymentMethods(paymentMethods.filter((pm) => pm.id !== id))

    toast({
      title: "Payment method removed",
      description: "Your payment method has been removed successfully.",
    })
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
          <div className="flex-1 lg:max-w-3xl">
            <Tabs defaultValue="payment-methods" className="space-y-6">
              <TabsList>
                <TabsTrigger value="payment-methods">Payment Methods</TabsTrigger>
                <TabsTrigger value="billing-history">Billing History</TabsTrigger>
                <TabsTrigger value="plans">Plans & Usage</TabsTrigger>
              </TabsList>

              <TabsContent value="payment-methods" className="space-y-6">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between">
                    <div>
                      <CardTitle>Payment Methods</CardTitle>
                      <CardDescription>Manage your payment methods for billing</CardDescription>
                    </div>
                    <Dialog open={isAddingPaymentMethod} onOpenChange={setIsAddingPaymentMethod}>
                      <DialogTrigger asChild>
                        <Button>
                          <Plus className="mr-2 h-4 w-4" />
                          Add Payment Method
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-[425px]">
                        <DialogHeader>
                          <DialogTitle>Add Payment Method</DialogTitle>
                          <DialogDescription>Add a new payment method to your account</DialogDescription>
                        </DialogHeader>
                        <div className="space-y-4 py-4">
                          <RadioGroup value={paymentType} onValueChange={setPaymentType} className="flex space-x-4">
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="card" id="payment-card" />
                              <Label htmlFor="payment-card" className="flex items-center">
                                <CreditCard className="mr-2 h-4 w-4" />
                                Credit Card
                              </Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="paypal" id="payment-paypal" />
                              <Label htmlFor="payment-paypal" className="flex items-center">
                                <svg
                                  className="mr-2 h-4 w-4"
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
                                  <path d="M7 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8z" />
                                  <path d="M21 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8z" />
                                  <path d="M7 21a4 4 0 1 0 0-8 4 4 0 0 0 0 8z" />
                                  <path d="M21 21a4 4 0 1 0 0-8 4 4 0 0 0 0 8z" />
                                </svg>
                                PayPal
                              </Label>
                            </div>
                          </RadioGroup>

                          {paymentType === "card" ? (
                            <div className="space-y-4">
                              <div className="space-y-2">
                                <Label htmlFor="cardNumber">Card Number</Label>
                                <Input
                                  id="cardNumber"
                                  name="cardNumber"
                                  placeholder="4242 4242 4242 4242"
                                  value={newCardData.cardNumber}
                                  onChange={handleCardInputChange}
                                />
                              </div>
                              <div className="space-y-2">
                                <Label htmlFor="cardholderName">Cardholder Name</Label>
                                <Input
                                  id="cardholderName"
                                  name="cardholderName"
                                  placeholder="John Doe"
                                  value={newCardData.cardholderName}
                                  onChange={handleCardInputChange}
                                />
                              </div>
                              <div className="grid grid-cols-3 gap-4">
                                <div className="space-y-2">
                                  <Label htmlFor="expiryMonth">Expiry Month</Label>
                                  <Select
                                    value={newCardData.expiryMonth}
                                    onValueChange={(value) =>
                                      setNewCardData((prev) => ({ ...prev, expiryMonth: value }))
                                    }
                                  >
                                    <SelectTrigger id="expiryMonth">
                                      <SelectValue placeholder="MM" />
                                    </SelectTrigger>
                                    <SelectContent>
                                      {Array.from({ length: 12 }, (_, i) => {
                                        const month = (i + 1).toString().padStart(2, "0")
                                        return (
                                          <SelectItem key={month} value={month}>
                                            {month}
                                          </SelectItem>
                                        )
                                      })}
                                    </SelectContent>
                                  </Select>
                                </div>
                                <div className="space-y-2">
                                  <Label htmlFor="expiryYear">Expiry Year</Label>
                                  <Select
                                    value={newCardData.expiryYear}
                                    onValueChange={(value) =>
                                      setNewCardData((prev) => ({ ...prev, expiryYear: value }))
                                    }
                                  >
                                    <SelectTrigger id="expiryYear">
                                      <SelectValue placeholder="YY" />
                                    </SelectTrigger>
                                    <SelectContent>
                                      {Array.from({ length: 10 }, (_, i) => {
                                        const year = (new Date().getFullYear() + i).toString().slice(-2)
                                        return (
                                          <SelectItem key={year} value={year}>
                                            {year}
                                          </SelectItem>
                                        )
                                      })}
                                    </SelectContent>
                                  </Select>
                                </div>
                                <div className="space-y-2">
                                  <Label htmlFor="cvc">CVC</Label>
                                  <Input
                                    id="cvc"
                                    name="cvc"
                                    placeholder="123"
                                    value={newCardData.cvc}
                                    onChange={handleCardInputChange}
                                  />
                                </div>
                              </div>
                            </div>
                          ) : (
                            <div className="rounded-md bg-muted p-4">
                              <p className="text-sm">You will be redirected to PayPal to complete the connection.</p>
                            </div>
                          )}

                          <div className="flex items-center space-x-2">
                            <Switch
                              id="make-default"
                              checked={newCardData.makeDefault}
                              onCheckedChange={handleSwitchChange}
                            />
                            <Label htmlFor="make-default">Make default payment method</Label>
                          </div>
                        </div>
                        <DialogFooter>
                          <Button variant="outline" onClick={() => setIsAddingPaymentMethod(false)}>
                            Cancel
                          </Button>
                          <Button onClick={handleAddPaymentMethod} disabled={isLoading}>
                            {isLoading ? "Adding..." : "Add Payment Method"}
                          </Button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {paymentMethods.length === 0 ? (
                        <div className="rounded-md bg-muted p-8 text-center">
                          <CreditCard className="mx-auto h-10 w-10 text-muted-foreground" />
                          <h3 className="mt-4 text-lg font-medium">No payment methods</h3>
                          <p className="mt-2 text-sm text-muted-foreground">
                            You haven't added any payment methods yet.
                          </p>
                          <Button className="mt-4" onClick={() => setIsAddingPaymentMethod(true)}>
                            Add Payment Method
                          </Button>
                        </div>
                      ) : (
                        paymentMethods.map((method) => (
                          <div key={method.id} className="flex items-center justify-between rounded-lg border p-4">
                            <div className="flex items-center space-x-4">
                              {method.type === "card" ? (
                                <CreditCard className="h-6 w-6" />
                              ) : (
                                <svg
                                  className="h-6 w-6"
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
                                  <path d="M7 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8z" />
                                  <path d="M21 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8z" />
                                  <path d="M7 21a4 4 0 1 0 0-8 4 4 0 0 0 0 8z" />
                                  <path d="M21 21a4 4 0 1 0 0-8 4 4 0 0 0 0 8z" />
                                </svg>
                              )}
                              <div>
                                <p className="font-medium">{method.name}</p>
                                {method.expiry && (
                                  <p className="text-sm text-muted-foreground">Expires {method.expiry}</p>
                                )}
                              </div>
                              {method.isDefault && (
                                <Badge variant="outline" className="ml-2">
                                  Default
                                </Badge>
                              )}
                            </div>
                            <div className="flex items-center space-x-2">
                              {!method.isDefault && (
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => handleSetDefaultPaymentMethod(method.id)}
                                >
                                  Set as Default
                                </Button>
                              )}
                              <Button variant="ghost" size="icon" onClick={() => handleDeletePaymentMethod(method.id)}>
                                <Trash2 className="h-4 w-4 text-muted-foreground" />
                                <span className="sr-only">Delete</span>
                              </Button>
                            </div>
                          </div>
                        ))
                      )}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="billing-history" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Billing History</CardTitle>
                    <CardDescription>View and download your billing history</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Invoice</TableHead>
                          <TableHead>Date</TableHead>
                          <TableHead>Amount</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {invoices.map((invoice) => (
                          <TableRow key={invoice.id}>
                            <TableCell className="font-medium">{invoice.id}</TableCell>
                            <TableCell>{invoice.date}</TableCell>
                            <TableCell>{invoice.amount}</TableCell>
                            <TableCell>
                              <Badge
                                variant={
                                  invoice.status === "paid"
                                    ? "default"
                                    : invoice.status === "pending"
                                      ? "outline"
                                      : "destructive"
                                }
                              >
                                {invoice.status.charAt(0).toUpperCase() + invoice.status.slice(1)}
                              </Badge>
                            </TableCell>
                            <TableCell className="text-right">
                              <Button variant="ghost" size="icon">
                                <Download className="h-4 w-4" />
                                <span className="sr-only">Download</span>
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="plans" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Current Plan</CardTitle>
                    <CardDescription>You are currently on the Pro plan</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="rounded-lg border p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="text-xl font-bold">Pro Plan</h3>
                          <p className="text-sm text-muted-foreground">$49.99/month</p>
                        </div>
                        <Badge>Current Plan</Badge>
                      </div>
                      <Separator className="my-4" />
                      <div className="space-y-2">
                        <div className="flex items-center">
                          <svg
                            className="mr-2 h-4 w-4 text-primary"
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
                            <polyline points="20 6 9 17 4 12" />
                          </svg>
                          <span>Unlimited campaigns</span>
                        </div>
                        <div className="flex items-center">
                          <svg
                            className="mr-2 h-4 w-4 text-primary"
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
                            <polyline points="20 6 9 17 4 12" />
                          </svg>
                          <span>Advanced analytics</span>
                        </div>
                        <div className="flex items-center">
                          <svg
                            className="mr-2 h-4 w-4 text-primary"
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
                            <polyline points="20 6 9 17 4 12" />
                          </svg>
                          <span>Custom audience targeting</span>
                        </div>
                        <div className="flex items-center">
                          <svg
                            className="mr-2 h-4 w-4 text-primary"
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
                            <polyline points="20 6 9 17 4 12" />
                          </svg>
                          <span>Priority support</span>
                        </div>
                      </div>
                      <div className="mt-6 flex justify-end">
                        <Button variant="outline">Change Plan</Button>
                      </div>
                    </div>

                    <div>
                      <h3 className="mb-4 text-lg font-medium">Usage</h3>
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="text-sm font-medium">Ad Spend</span>
                            <span className="text-sm text-muted-foreground">$3,240 / $5,000</span>
                          </div>
                          <div className="h-2 w-full rounded-full bg-muted">
                            <div className="h-2 rounded-full bg-primary" style={{ width: "65%" }}></div>
                          </div>
                          <p className="text-xs text-muted-foreground">65% of monthly limit</p>
                        </div>

                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="text-sm font-medium">Active Campaigns</span>
                            <span className="text-sm text-muted-foreground">8 / Unlimited</span>
                          </div>
                          <div className="h-2 w-full rounded-full bg-muted">
                            <div className="h-2 rounded-full bg-primary" style={{ width: "100%" }}></div>
                          </div>
                        </div>

                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="text-sm font-medium">API Calls</span>
                            <span className="text-sm text-muted-foreground">12,450 / 50,000</span>
                          </div>
                          <div className="h-2 w-full rounded-full bg-muted">
                            <div className="h-2 rounded-full bg-primary" style={{ width: "25%" }}></div>
                          </div>
                          <p className="text-xs text-muted-foreground">25% of monthly limit</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Billing Information</CardTitle>
                    <CardDescription>Manage your billing information and tax details</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-2">
                      <h3 className="text-lg font-medium">Billing Contact</h3>
                      <div className="rounded-md border p-4">
                        <div className="space-y-1">
                          <p className="font-medium">John Doe</p>
                          <p className="text-sm text-muted-foreground">john.doe@example.com</p>
                          <p className="text-sm text-muted-foreground">+1 (555) 123-4567</p>
                        </div>
                        <Button variant="link" className="mt-2 h-auto p-0 text-sm">
                          Edit contact information
                        </Button>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <h3 className="text-lg font-medium">Billing Address</h3>
                      <div className="rounded-md border p-4">
                        <div className="space-y-1">
                          <p className="font-medium">Acme Inc.</p>
                          <p className="text-sm text-muted-foreground">
                            123 Main St, Suite 100
                            <br />
                            San Francisco, CA 94105
                            <br />
                            United States
                          </p>
                        </div>
                        <Button variant="link" className="mt-2 h-auto p-0 text-sm">
                          Edit billing address
                        </Button>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <h3 className="text-lg font-medium">Tax Information</h3>
                      <div className="rounded-md border p-4">
                        <div className="space-y-1">
                          <p className="font-medium">Tax ID: US123456789</p>
                          <p className="text-sm text-muted-foreground">Business registered in United States</p>
                        </div>
                        <Button variant="link" className="mt-2 h-auto p-0 text-sm">
                          Edit tax information
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  )
}
