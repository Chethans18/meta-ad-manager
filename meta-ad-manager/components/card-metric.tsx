import { ArrowDownIcon, ArrowUpIcon } from "lucide-react"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface CardMetricProps {
  title: string
  value: string
  description: string
  trend: "up" | "down" | "neutral"
}

export function CardMetric({ title, value, description, trend }: CardMetricProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        {trend === "up" && <ArrowUpIcon className="h-4 w-4 text-emerald-500" />}
        {trend === "down" && <ArrowDownIcon className="h-4 w-4 text-red-500" />}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <p
          className={`text-xs ${trend === "up" ? "text-emerald-500" : trend === "down" ? "text-red-500" : "text-muted-foreground"}`}
        >
          {description}
        </p>
      </CardContent>
    </Card>
  )
}
