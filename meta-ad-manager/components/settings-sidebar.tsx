"use client"

import type React from "react"

import { CreditCard, Lock, Settings, User } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"

import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"

interface SidebarNavItem {
  title: string
  href: string
  icon: React.ReactNode
}

export function SettingsSidebar() {
  const pathname = usePathname()

  const navItems: SidebarNavItem[] = [
    {
      title: "Profile",
      href: "/settings/profile",
      icon: <User className="mr-2 h-4 w-4" />,
    },
    {
      title: "Account",
      href: "/settings/account",
      icon: <Settings className="mr-2 h-4 w-4" />,
    },
    {
      title: "Billing",
      href: "/settings/billing",
      icon: <CreditCard className="mr-2 h-4 w-4" />,
    },
    {
      title: "Security",
      href: "/settings/security",
      icon: <Lock className="mr-2 h-4 w-4" />,
    },
  ]

  return (
    <nav className="flex flex-row space-x-2 overflow-x-auto pb-2 lg:flex-col lg:space-x-0 lg:space-y-1 lg:pb-0">
      {navItems.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className={cn(
            buttonVariants({ variant: "ghost" }),
            pathname === item.href ? "bg-muted hover:bg-muted" : "hover:bg-transparent hover:underline",
            "justify-start whitespace-nowrap",
          )}
        >
          {item.icon}
          {item.title}
        </Link>
      ))}
    </nav>
  )
}
