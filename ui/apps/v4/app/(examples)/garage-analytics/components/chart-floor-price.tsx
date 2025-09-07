"use client"

import { TrendingDown } from "lucide-react"
import { Line, LineChart, CartesianGrid, XAxis, YAxis } from "recharts"

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
  { date: "2024-01-01", floorPrice: 0.485 },
  { date: "2024-01-02", floorPrice: 0.478 },
  { date: "2024-01-03", floorPrice: 0.492 },
  { date: "2024-01-04", floorPrice: 0.456 },
  { date: "2024-01-05", floorPrice: 0.463 },
  { date: "2024-01-06", floorPrice: 0.441 },
  { date: "2024-01-07", floorPrice: 0.449 },
  { date: "2024-01-08", floorPrice: 0.438 },
  { date: "2024-01-09", floorPrice: 0.452 },
  { date: "2024-01-10", floorPrice: 0.434 },
  { date: "2024-01-11", floorPrice: 0.426 },
  { date: "2024-01-12", floorPrice: 0.442 },
  { date: "2024-01-13", floorPrice: 0.418 },
  { date: "2024-01-14", floorPrice: 0.431 },
  { date: "2024-01-15", floorPrice: 0.424 },
  { date: "2024-01-16", floorPrice: 0.415 },
  { date: "2024-01-17", floorPrice: 0.408 },
  { date: "2024-01-18", floorPrice: 0.422 },
  { date: "2024-01-19", floorPrice: 0.419 },
  { date: "2024-01-20", floorPrice: 0.403 },
  { date: "2024-01-21", floorPrice: 0.411 },
  { date: "2024-01-22", floorPrice: 0.428 },
  { date: "2024-01-23", floorPrice: 0.395 },
  { date: "2024-01-24", floorPrice: 0.402 },
  { date: "2024-01-25", floorPrice: 0.418 },
  { date: "2024-01-26", floorPrice: 0.384 },
  { date: "2024-01-27", floorPrice: 0.391 },
  { date: "2024-01-28", floorPrice: 0.407 },
  { date: "2024-01-29", floorPrice: 0.398 },
  { date: "2024-01-30", floorPrice: 0.385 },
]

const chartConfig = {
  floorPrice: {
    label: "Floor Price (₣)",
    color: "var(--chart-2)",
  },
} satisfies ChartConfig

export function ChartFloorPrice() {
  return (
    <Card>
      <CardHeader>
        <CardDescription>Average Floor Price</CardDescription>
        <CardTitle className="text-3xl font-bold tracking-tight">
          ₣0.428
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="aspect-[3/2]">
          <LineChart
            accessibilityLayer
            data={chartData}
            margin={{
              left: -16,
              right: 16,
            }}
          >
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
              tickFormatter={(value) => `₣${value.toFixed(3)}`}
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
            <Line
              dataKey="floorPrice"
              type="monotone"
              stroke="var(--color-floorPrice)"
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 leading-none font-medium">
          Floor price down 8.2% this month <TrendingDown className="h-4 w-4" />
        </div>
        <div className="text-muted-foreground leading-none">
          Market adjustment across major collections
        </div>
      </CardFooter>
    </Card>
  )
}