"use client"

import { TrendingUp } from "lucide-react"
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/registry/new-york-v4/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/registry/new-york-v4/ui/chart"

const chartData = [
  { date: "2024-01-01", volume: 12.4 },
  { date: "2024-01-02", volume: 15.8 },
  { date: "2024-01-03", volume: 8.9 },
  { date: "2024-01-04", volume: 22.1 },
  { date: "2024-01-05", volume: 18.3 },
  { date: "2024-01-06", volume: 31.2 },
  { date: "2024-01-07", volume: 24.7 },
  { date: "2024-01-08", volume: 42.9 },
  { date: "2024-01-09", volume: 19.5 },
  { date: "2024-01-10", volume: 28.6 },
  { date: "2024-01-11", volume: 35.4 },
  { date: "2024-01-12", volume: 26.8 },
  { date: "2024-01-13", volume: 47.2 },
  { date: "2024-01-14", volume: 33.1 },
  { date: "2024-01-15", volume: 29.7 },
  { date: "2024-01-16", volume: 38.9 },
  { date: "2024-01-17", volume: 52.3 },
  { date: "2024-01-18", volume: 41.6 },
  { date: "2024-01-19", volume: 35.8 },
  { date: "2024-01-20", volume: 48.4 },
  { date: "2024-01-21", volume: 44.2 },
  { date: "2024-01-22", volume: 36.7 },
  { date: "2024-01-23", volume: 58.1 },
  { date: "2024-01-24", volume: 49.8 },
  { date: "2024-01-25", volume: 43.6 },
  { date: "2024-01-26", volume: 51.9 },
  { date: "2024-01-27", volume: 62.4 },
  { date: "2024-01-28", volume: 55.7 },
  { date: "2024-01-29", volume: 48.3 },
  { date: "2024-01-30", volume: 64.8 },
]

const chartConfig = {
  volume: {
    label: "Volume (₣)",
    color: "var(--chart-1)",
  },
} satisfies ChartConfig

export function ChartVolume() {
  return (
    <Card>
      <CardHeader>
        <CardDescription>Daily Trading Volume</CardDescription>
        <CardTitle className="text-3xl font-bold tracking-tight">
          ₣1,247.58
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="aspect-[3/1]">
          <AreaChart
            accessibilityLayer
            data={chartData}
            margin={{
              left: -16,
              right: 16,
            }}
          >
            <defs>
              <linearGradient id="fillVolume" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-volume)"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-volume)"
                  stopOpacity={0.1}
                />
              </linearGradient>
            </defs>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
              tickFormatter={(value) => {
                const date = new Date(value)
                return date.toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                })
              }}
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => `₣${value}`}
            />
            <ChartTooltip
              cursor={false}
              content={
                <ChartTooltipContent
                  labelFormatter={(value) => {
                    return new Date(value).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })
                  }}
                  indicator="dot"
                />
              }
            />
            <Area
              dataKey="volume"
              type="natural"
              fill="url(#fillVolume)"
              stroke="var(--color-volume)"
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 leading-none font-medium">
          Volume trending up by 24.8% <TrendingUp className="h-4 w-4" />
        </div>
        <div className="text-muted-foreground leading-none">
          Daily trading volume across all Garage collections
        </div>
      </CardFooter>
    </Card>
  )
}