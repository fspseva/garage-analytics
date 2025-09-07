"use client"

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

const collections = [
  {
    name: "Mr. Jim",
    contractId: "0xcda69aa111eb386de9e2881e039e99bc43ac21f6951e3da9b71ae4450f67858d",
    volume: "₣284.56",
    volumeChange: "+18.4%",
    floorPrice: "₣0.425",
    floorChange: "-5.2%",
    sales: 142,
    salesChange: "+23.1%",
    status: "Active",
  },
  {
    name: "Bakteria",
    contractId: "0x33f6d2bf0762223229bc5b17cee8c1c0090be95dfd3ece5b63e8efb9e456ee21",
    volume: "₣198.34",
    volumeChange: "+12.7%",
    floorPrice: "₣0.380",
    floorChange: "-8.1%",
    sales: 89,
    salesChange: "+15.6%",
    status: "Active",
  },
  {
    name: "BearBros",
    contractId: "0xf0b6e2320caccb9071e45b1150b4da6f5edf74e7375ac6c87084822a87832de2",
    volume: "₣167.89",
    volumeChange: "+8.9%",
    floorPrice: "₣0.295",
    floorChange: "-12.3%",
    sales: 73,
    salesChange: "+9.4%",
    status: "Active",
  },
  {
    name: "Sangoro",
    contractId: "0xb03ec5c6eeaf6d09ed6755e21dff896234c8f509b813f3ff17ef14a436fa8462",
    volume: "₣145.23",
    volumeChange: "+32.1%",
    floorPrice: "₣0.512",
    floorChange: "+4.8%",
    sales: 68,
    salesChange: "+28.7%",
    status: "Active",
  },
  {
    name: "Koby",
    contractId: "0x202b55f66b8bafaf3b4fdf0653f1a4320607781dbd368bb576bc09250dd7dbbe",
    volume: "₣128.67",
    volumeChange: "-3.2%",
    floorPrice: "₣0.445",
    floorChange: "-7.6%",
    sales: 54,
    salesChange: "-1.8%",
    status: "Active",
  },
  {
    name: "FuelMonkees",
    contractId: "0x0d34ec513cbaf7e15737120725cd3e235a8fd1716fa0eedc5da4a64c182e5a9f",
    volume: "₣112.45",
    volumeChange: "+19.6%",
    floorPrice: "₣0.338",
    floorChange: "-9.4%",
    sales: 47,
    salesChange: "+21.3%",
    status: "Active",
  },
  {
    name: "Executoors",
    contractId: "0x3f3f87bb15c693784e90521c64bac855ce23d971356a6ccd57aa92e02e696432",
    volume: "₣98.78",
    volumeChange: "+6.7%",
    floorPrice: "₣0.287",
    floorChange: "-15.2%",
    sales: 41,
    salesChange: "+8.9%",
    status: "Active",
  },
  {
    name: "Fuel Dudes",
    contractId: "0x65aa85875bf92fb5b487ade154f88507d74b233ef901b4a172f4616b527a4784",
    volume: "₣87.34",
    volumeChange: "+25.4%",
    floorPrice: "₣0.421",
    floorChange: "-2.1%",
    sales: 38,
    salesChange: "+26.8%",
    status: "Active",
  },
  {
    name: "Fuel BomBa",
    contractId: "0x59b10bd361740618f12bba00f1083ef304a294b37ed7a8756c1b9cfc9b491b16",
    volume: "₣76.12",
    volumeChange: "-8.1%",
    floorPrice: "₣0.365",
    floorChange: "-11.7%",
    sales: 32,
    salesChange: "-5.4%",
    status: "Low Activity",
  },
  {
    name: "Fuel Pumps",
    contractId: "0x45c964371490bdfc2610ca116853d22a9b6e0de1abb67f61b81ab9d291b0015c",
    volume: "₣64.89",
    volumeChange: "+14.2%",
    floorPrice: "₣0.298",
    floorChange: "-6.8%",
    sales: 28,
    salesChange: "+16.1%",
    status: "Active",
  },
]

export function CollectionsTable() {
  return (
    <Card>
      <CardHeader className="px-7">
        <CardTitle>NFT Collections Overview</CardTitle>
        <CardDescription>
          Comprehensive data for all collections on the Garage marketplace
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
              <TableRow key={collection.contractId}>
                <TableCell>
                  <div className="font-medium">{collection.name}</div>
                  <div className="text-sm text-muted-foreground">
                    {collection.contractId.slice(0, 10)}...{collection.contractId.slice(-8)}
                  </div>
                </TableCell>
                <TableCell className="text-right">
                  <div className="font-medium">{collection.volume}</div>
                  <div className={`text-sm ${
                    collection.volumeChange.startsWith('+') 
                      ? 'text-green-600' 
                      : 'text-red-600'
                  }`}>
                    {collection.volumeChange}
                  </div>
                </TableCell>
                <TableCell className="text-right">
                  <div className="font-medium">{collection.floorPrice}</div>
                  <div className={`text-sm ${
                    collection.floorChange.startsWith('+') 
                      ? 'text-green-600' 
                      : 'text-red-600'
                  }`}>
                    {collection.floorChange}
                  </div>
                </TableCell>
                <TableCell className="text-right">
                  <div className="font-medium">{collection.sales}</div>
                  <div className={`text-sm ${
                    collection.salesChange.startsWith('+') 
                      ? 'text-green-600' 
                      : 'text-red-600'
                  }`}>
                    {collection.salesChange}
                  </div>
                </TableCell>
                <TableCell className="text-center">
                  <Badge 
                    variant={collection.status === 'Active' ? 'default' : 'secondary'}
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