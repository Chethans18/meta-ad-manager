"use client"

import { useState } from "react"
import { ArrowLeft, Facebook } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"


import { useAuth } from "@/context/auth-context"


export default function VerifyEmailPage() {
  const router = useRouter()
  const { setUser } = useAuth();
  const [isResending, setIsResending] = useState(false)
  const [resendSuccess, setResendSuccess] = useState(false)

  const handleResendEmail = async () => {
    setIsResending(true)

    try {
      // This would be an API call to your backend
      await new Promise((resolve) => setTimeout(resolve, 1500))

      setResendSuccess(true)

      // Reset success message after 5 seconds
      setTimeout(() => {
        setResendSuccess(false)
      }, 5000)
    } catch (error) {
      console.error("Error resending verification email:", error)
    } finally {
      setIsResending(false)
    }
  }

  const handleVerifyForDemo = () => {
    
    // This is just for demo purposes
    // In a real app, verification would happen via email link
    setUser({ name: "Demo User", email: "demo@example.com" });

  // Optionally, set a token (if your app depends on it)
    localStorage.setItem("token", "demo-token");
    router.push("/")
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-muted/40 p-4">
      <div className="mb-4 flex items-center">
        <Facebook className="h-8 w-8 text-blue-600" />
        <span className="ml-2 text-2xl font-bold">Ad Manager</span>
      </div>

      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold">Verify your email</CardTitle>
          <CardDescription>We've sent a verification email to your inbox</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="rounded-md bg-blue-50 p-4">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg
                  className="h-5 w-5 text-blue-400"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-blue-800">Please check your email</p>
              </div>
            </div>
          </div>

          <p className="text-sm text-muted-foreground">
            We've sent a verification email to your inbox. Please click the link in the email to verify your account.
          </p>

          <p className="text-sm text-muted-foreground">
            If you don't see the email, check your spam folder or click the button below to resend the verification
            email.
          </p>

          {resendSuccess && (
            <div className="rounded-md bg-green-50 p-3">
              <p className="text-sm text-green-800">Verification email resent successfully!</p>
            </div>
          )}

          <div className="flex flex-col space-y-2">
            <Button variant="outline" onClick={handleResendEmail} disabled={isResending}>
              {isResending ? "Resending..." : "Resend verification email"}
            </Button>

            {/* This button is just for demo purposes */}
            <Button onClick={handleVerifyForDemo}>Verify Email (Demo)</Button>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col space-y-4">
          <Link href="/auth/signin" className="inline-flex items-center text-sm text-primary hover:underline">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to sign in
          </Link>
        </CardFooter>
      </Card>
    </div>
  )
}
