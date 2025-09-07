"use client"

import { useEffect, useState } from "react"
import { IconTrendingDown, IconTrendingUp } from "@tabler/icons-react"

import { Badge } from "@/registry/new-york-v4/ui/badge"
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/registry/new-york-v4/ui/card"
import { garageApi } from "@/app/(examples)/garage-analytics/lib/garage-api"

interface MetricsData {
  totalVolume: number
  volumeChange: number
  avgFloorPrice: number
  floorChange: number
  activeCollections: number
  collectionsChange: number
  totalSales: number
  salesChange: number
}

export function GarageMetricsCardsDynamic() {
  const [metrics, setMetrics] = useState<MetricsData | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchMetrics = async () => {
      try {
        const data = await garageApi.getMetrics()
        setMetrics(data)
      } catch (error) {
        console.error('Failed to fetch metrics:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchMetrics()
  }, [])

  if (loading || !metrics) {
    return (
      <div className="*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card grid grid-cols-1 gap-4 px-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:shadow-xs lg:px-6 @xl/main:grid-cols-2 @5xl/main:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <Card key={i} className="@container/card">
            <CardHeader>
              <CardDescription>Loading...</CardDescription>
              <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
                --
              </CardTitle>
            </CardHeader>
          </Card>
        ))}
      </div>
    )
  }

  return (
    <div className="*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card grid grid-cols-1 gap-4 px-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:shadow-xs lg:px-6 @xl/main:grid-cols-2 @5xl/main:grid-cols-4">
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Total Volume</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            ₣{metrics.totalVolume.toFixed(2)}
          </CardTitle>
          <CardAction>
            <Badge variant="outline">
              {metrics.volumeChange > 0 ? <IconTrendingUp /> : <IconTrendingDown />}
              {metrics.volumeChange > 0 ? '+' : ''}{metrics.volumeChange.toFixed(1)}%
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            {metrics.volumeChange > 0 ? 'Volume surging this month' : 'Volume declining this month'}{' '}
            {metrics.volumeChange > 0 ? <IconTrendingUp className="size-4" /> : <IconTrendingDown className="size-4" />}
          </div>
          <div className="text-muted-foreground">
            Trading activity for the last 30 days
          </div>
        </CardFooter>
      </Card>
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Average Floor Price</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            ₣{metrics.avgFloorPrice.toFixed(3)}
          </CardTitle>
          <CardAction>
            <Badge variant="outline">
              {metrics.floorChange > 0 ? <IconTrendingUp /> : <IconTrendingDown />}
              {metrics.floorChange > 0 ? '+' : ''}{metrics.floorChange.toFixed(1)}%
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            {metrics.floorChange < 0 ? 'Floor prices declining' : 'Floor prices rising'}{' '}
            {metrics.floorChange > 0 ? <IconTrendingUp className="size-4" /> : <IconTrendingDown className="size-4" />}
          </div>
          <div className="text-muted-foreground">
            {metrics.floorChange < 0 ? 'Market adjustment in progress' : 'Bullish market sentiment'}
          </div>
        </CardFooter>
      </Card>
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Active Collections</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            {metrics.activeCollections}
          </CardTitle>
          <CardAction>
            <Badge variant="outline">
              {metrics.collectionsChange > 0 ? <IconTrendingUp /> : <IconTrendingDown />}
              {metrics.collectionsChange > 0 ? '+' : ''}{metrics.collectionsChange.toFixed(1)}%
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            {metrics.collectionsChange > 0 ? 'Growing ecosystem' : 'Ecosystem consolidating'}{' '}
            {metrics.collectionsChange > 0 ? <IconTrendingUp className="size-4" /> : <IconTrendingDown className="size-4" />}
          </div>
          <div className="text-muted-foreground">
            {metrics.collectionsChange > 0 ? 'New collections launching weekly' : 'Market maturation phase'}
          </div>
        </CardFooter>
      </Card>
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Total Sales</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            {metrics.totalSales.toLocaleString()}
          </CardTitle>
          <CardAction>
            <Badge variant="outline">
              {metrics.salesChange > 0 ? <IconTrendingUp /> : <IconTrendingDown />}
              {metrics.salesChange > 0 ? '+' : ''}{metrics.salesChange.toFixed(1)}%
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            {metrics.salesChange > 0 ? 'Sales momentum building' : 'Sales activity slowing'}{' '}
            {metrics.salesChange > 0 ? <IconTrendingUp className="size-4" /> : <IconTrendingDown className="size-4" />}
          </div>
          <div className="text-muted-foreground">
            {metrics.salesChange > 0 ? 'Strong market activity' : 'Market consolidation period'}
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}