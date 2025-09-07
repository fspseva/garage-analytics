"use client"

import { useEffect, useState } from "react"
import { TrendingUp, TrendingDown } from "lucide-react"
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
import { garageApi, type VolumeData } from "@/app/(examples)/garage-analytics/lib/garage-api"

const chartConfig = {
  volume: {
    label: "Volume (₣)",
    color: "var(--chart-1)",
  },
} satisfies ChartConfig

export function ChartVolumeDynamic() {
  const [volumeData, setVolumeData] = useState<VolumeData[]>([])
  const [loading, setLoading] = useState(true)
  const [totalVolume, setTotalVolume] = useState(0)
  const [volumeChange, setVolumeChange] = useState(0)

  useEffect(() => {
    const fetchVolumeData = async () => {
      try {
        const data = await garageApi.getVolumeData(30)
        setVolumeData(data)
        
        const total = data.reduce((sum, item) => sum + item.volume, 0)
        setTotalVolume(total)
        
        // Calculate change from first to last week
        if (data.length >= 14) {
          const firstWeekAvg = data.slice(0, 7).reduce((sum, item) => sum + item.volume, 0) / 7
          const lastWeekAvg = data.slice(-7).reduce((sum, item) => sum + item.volume, 0) / 7
          const change = ((lastWeekAvg - firstWeekAvg) / firstWeekAvg) * 100
          setVolumeChange(change)
        }
      } catch (error) {
        console.error('Failed to fetch volume data:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchVolumeData()
  }, [])

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardDescription>Daily Trading Volume</CardDescription>
          <CardTitle className="text-3xl font-bold tracking-tight">
            Loading...
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center h-[200px]">
            <div className="text-muted-foreground">Loading chart data...</div>
          </div>
        </CardContent>
      </Card>
    )
  }

  const isPositiveChange = volumeChange >= 0

  return (
    <Card>
      <CardHeader>
        <CardDescription>Daily Trading Volume</CardDescription>
        <CardTitle className="text-3xl font-bold tracking-tight">
          ₣{totalVolume.toFixed(2)}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="aspect-[3/1]">
          <AreaChart
            accessibilityLayer
            data={volumeData}
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
              tickFormatter={(value) => `₣${value.toFixed(0)}`}
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
          Volume trending {isPositiveChange ? 'up' : 'down'} by {Math.abs(volumeChange).toFixed(1)}%{' '}
          {isPositiveChange ? <TrendingUp className="h-4 w-4" /> : <TrendingDown className="h-4 w-4" />}
        </div>
        <div className="text-muted-foreground leading-none">
          Daily trading volume across all Garage collections
        </div>
      </CardFooter>
    </Card>
  )
}