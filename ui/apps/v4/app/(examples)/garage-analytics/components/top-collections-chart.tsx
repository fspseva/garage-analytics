"use client"

import { TrendingUp } from "lucide-react"
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts"

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
  { collection: "Mr. Jim", volume: 284.56, sales: 142 },
  { collection: "Bakteria", volume: 198.34, sales: 89 },
  { collection: "BearBros", volume: 167.89, sales: 73 },
  { collection: "Sangoro", volume: 145.23, sales: 68 },
  { collection: "Koby", volume: 128.67, sales: 54 },
  { collection: "FuelMonkees", volume: 112.45, sales: 47 },
  { collection: "Executoors", volume: 98.78, sales: 41 },
  { collection: "Fuel Dudes", volume: 87.34, sales: 38 },
  { collection: "Fuel BomBa", volume: 76.12, sales: 32 },
  { collection: "Fuel Pumps", volume: 64.89, sales: 28 },
]

const chartConfig = {
  volume: {
    label: "Volume (₣)",
    color: "var(--chart-1)",
  },
  sales: {
    label: "Sales",
    color: "var(--chart-2)",
  },
} satisfies ChartConfig

export function TopCollectionsChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Top Collections by Volume</CardTitle>
        <CardDescription>
          Leading NFT collections on the Garage marketplace
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="aspect-[2/1]">
          <BarChart
            accessibilityLayer
            data={chartData}
            margin={{
              left: -16,
              right: 16,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="collection"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 8) + (value.length > 8 ? "..." : "")}
            />
            <YAxis
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => `₣${value}`}
              domain={[0, "dataMax"]}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideIndicator />}
            />
            <Bar
              dataKey="volume"
              fill="var(--color-volume)"
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 leading-none font-medium">
          Collections showing strong performance <TrendingUp className="h-4 w-4" />
        </div>
        <div className="text-muted-foreground leading-none">
          Top 10 collections by 30-day trading volume
        </div>
      </CardFooter>
    </Card>
  )
}