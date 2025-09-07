import { Metadata } from "next"
import {
  DownloadIcon,
  FilterIcon,
} from "lucide-react"

import { Button } from "@/registry/new-york-v4/ui/button"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/registry/new-york-v4/ui/tabs"
import { AnalyticsDatePicker } from "@/app/(examples)/garage-analytics/components/analytics-date-picker"
import { GarageMetricsCards } from "@/app/(examples)/garage-analytics/components/garage-metrics-cards"
import { ChartVolume } from "@/app/(examples)/garage-analytics/components/chart-volume"
import { ChartFloorPrice } from "@/app/(examples)/garage-analytics/components/chart-floor-price"
import { CollectionsTable } from "@/app/(examples)/garage-analytics/components/collections-table"
import { TopCollectionsChart } from "@/app/(examples)/garage-analytics/components/top-collections-chart"

export const metadata: Metadata = {
  title: "Garage NFT Analytics Dashboard",
  description: "Comprehensive analytics dashboard for the Garage NFT Marketplace on Fuel Network.",
}

export default function GarageAnalyticsPage() {
  return (
    <div className="@container/page flex flex-1 flex-col gap-8 p-6">
      <Tabs defaultValue="overview" className="gap-6">
        <div
          data-slot="dashboard-header"
          className="flex items-center justify-between"
        >
          <TabsList className="w-full @3xl/page:w-fit">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="collections">Collections</TabsTrigger>
            <TabsTrigger value="market">Market Analysis</TabsTrigger>
            <TabsTrigger value="trends">Trends</TabsTrigger>
          </TabsList>
          <div className="hidden items-center gap-2 @3xl/page:flex">
            <AnalyticsDatePicker />
            <Button variant="outline">
              <FilterIcon />
              Filter
            </Button>
            <Button variant="outline">
              <DownloadIcon />
              Export
            </Button>
          </div>
        </div>
        <TabsContent value="overview" className="flex flex-col gap-4">
          <GarageMetricsCards />
          <div className="grid grid-cols-1 gap-4 @4xl/page:grid-cols-[2fr_1fr]">
            <ChartVolume />
            <ChartFloorPrice />
          </div>
          <TopCollectionsChart />
        </TabsContent>
        <TabsContent value="collections" className="flex flex-col gap-4">
          <CollectionsTable />
        </TabsContent>
        <TabsContent value="market" className="flex flex-col gap-4">
          <div className="grid grid-cols-1 gap-4 @4xl/page:grid-cols-2">
            <ChartVolume />
            <ChartFloorPrice />
          </div>
          <CollectionsTable />
        </TabsContent>
        <TabsContent value="trends" className="flex flex-col gap-4">
          <TopCollectionsChart />
          <div className="grid grid-cols-1 gap-4 @4xl/page:grid-cols-2">
            <ChartVolume />
            <ChartFloorPrice />
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}