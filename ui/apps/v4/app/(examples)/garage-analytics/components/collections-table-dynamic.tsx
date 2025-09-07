"use client"

import { useEffect, useState } from "react"
import { Badge } from "@/registry/new-york-v4/ui/badge"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/registry/new-york-v4/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/registry/new-york-v4/ui/table"
import { garageApi, type Collection } from "@/app/(examples)/garage-analytics/lib/garage-api"

export function CollectionsTableDynamic() {
  const [collections, setCollections] = useState<Collection[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchCollections = async () => {
      try {
        const data = await garageApi.getCollections()
        // Sort by volume descending
        const sortedData = data.sort((a, b) => b.volume - a.volume)
        setCollections(sortedData)
      } catch (error) {
        console.error('Failed to fetch collections:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchCollections()
  }, [])

  if (loading) {
    return (
      <Card>
        <CardHeader className="px-7">
          <CardTitle>NFT Collections Overview</CardTitle>
          <CardDescription>
            Loading collection data from the Garage marketplace...
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center py-8">
            <div className="text-muted-foreground">Loading collections...</div>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader className="px-7">
        <CardTitle>NFT Collections Overview</CardTitle>
        <CardDescription>
          Live data for {collections.length} collections on the Garage marketplace
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Collection</TableHead>
              <TableHead className="text-right">Volume (30d)</TableHead>
              <TableHead className="text-right">Floor Price</TableHead>
              <TableHead className="text-right">Sales</TableHead>
              <TableHead className="text-center">Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {collections.map((collection) => (
              <TableRow key={collection.id}>
                <TableCell>
                  <div className="font-medium">{collection.name}</div>
                  <div className="text-sm text-muted-foreground">
                    {collection.id.slice(0, 10)}...{collection.id.slice(-8)}
                  </div>
                </TableCell>
                <TableCell className="text-right">
                  <div className="font-medium">₣{collection.volume.toFixed(2)}</div>
                  <div className={`text-sm ${
                    collection.volumeChange > 0
                      ? 'text-green-600' 
                      : 'text-red-600'
                  }`}>
                    {collection.volumeChange > 0 ? '+' : ''}{collection.volumeChange.toFixed(1)}%
                  </div>
                </TableCell>
                <TableCell className="text-right">
                  <div className="font-medium">₣{collection.floorPrice.toFixed(3)}</div>
                  <div className={`text-sm ${
                    collection.floorChange > 0
                      ? 'text-green-600' 
                      : 'text-red-600'
                  }`}>
                    {collection.floorChange > 0 ? '+' : ''}{collection.floorChange.toFixed(1)}%
                  </div>
                </TableCell>
                <TableCell className="text-right">
                  <div className="font-medium">{collection.sales}</div>
                  <div className={`text-sm ${
                    collection.salesChange > 0
                      ? 'text-green-600' 
                      : 'text-red-600'
                  }`}>
                    {collection.salesChange > 0 ? '+' : ''}{collection.salesChange.toFixed(1)}%
                  </div>
                </TableCell>
                <TableCell className="text-center">
                  <Badge 
                    variant={collection.status === 'Active' ? 'default' : collection.status === 'Low Activity' ? 'secondary' : 'outline'}
                  >
                    {collection.status}
                  </Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}