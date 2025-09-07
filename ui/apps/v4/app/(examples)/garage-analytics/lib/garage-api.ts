"use client"

interface Collection {
  id: string
  name: string
  volume: number
  floorPrice: number
  sales: number
  volumeChange: number
  floorChange: number
  salesChange: number
  status: 'Active' | 'Low Activity' | 'Inactive'
}

interface VolumeData {
  date: string
  volume: number
}

interface FloorPriceData {
  date: string
  floorPrice: number
}

interface TopCollectionData {
  collection: string
  volume: number
  sales: number
}

class GarageApiService {
  private baseUrl = 'https://garage-api.bako.global/mainnet'
  private corsProxy = 'https://api.allorigins.win/get?url='
  
  // Collection ID to name mapping from the API documentation
  private collectionNames: Record<string, string> = {
    "0xcda69aa111eb386de9e2881e039e99bc43ac21f6951e3da9b71ae4450f67858d": "Mr. Jim",
    "0x33f6d2bf0762223229bc5b17cee8c1c0090be95dfd3ece5b63e8efb9e456ee21": "Bakteria",
    "0xf0b6e2320caccb9071e45b1150b4da6f5edf74e7375ac6c87084822a87832de2": "BearBros",
    "0xb03ec5c6eeaf6d09ed6755e21dff896234c8f509b813f3ff17ef14a436fa8462": "Sangoro",
    "0x202b55f66b8bafaf3b4fdf0653f1a4320607781dbd368bb576bc09250dd7dbbe": "Koby",
    "0x0d34ec513cbaf7e15737120725cd3e235a8fd1716fa0eedc5da4a64c182e5a9f": "FuelMonkees",
    "0x3f3f87bb15c693784e90521c64bac855ce23d971356a6ccd57aa92e02e696432": "Executoors",
    "0x65aa85875bf92fb5b487ade154f88507d74b233ef901b4a172f4616b527a4784": "Fuel Dudes",
    "0x59b10bd361740618f12bba00f1083ef304a294b37ed7a8756c1b9cfc9b491b16": "Fuel BomBa",
    "0x45c964371490bdfc2610ca116853d22a9b6e0de1abb67f61b81ab9d291b0015c": "Fuel Pumps",
    "0xaa919d413a57cb6c577b2e172480cbe2f88df0e28203fed52249cabca6cee74a": "Fuel Pengus",
  }

  private async makeRequest(endpoint: string) {
    try {
      // Try direct API call first (for server-side or when CORS is not an issue)
      const directUrl = `${this.baseUrl}${endpoint}`
      const response = await fetch(directUrl)
      
      if (response.ok) {
        return await response.json()
      }
      
      // Fallback to CORS proxy
      const proxyUrl = `${this.corsProxy}${encodeURIComponent(directUrl)}`
      const proxyResponse = await fetch(proxyUrl)
      const proxyData = await proxyResponse.json()
      
      if (proxyData.contents) {
        return JSON.parse(proxyData.contents)
      }
      
      throw new Error('Unable to fetch data from API')
    } catch (error) {
      console.error('API request failed:', error)
      // Return mock data as fallback
      return this.getMockData(endpoint)
    }
  }

  private getMockData(endpoint: string): any {
    // Mock data for development/fallback
    if (endpoint === '/collections') {
      return {
        success: true,
        data: {
          items: Object.entries(this.collectionNames).map(([id, name], index) => ({
            id,
            name,
            metrics: {
              volume: Math.random() * 300 + 50,
              floorPrice: Math.random() * 0.5 + 0.3,
              sales: Math.floor(Math.random() * 100) + 20,
            }
          }))
        }
      }
    }
    
    return { success: false, data: null }
  }

  async getCollections(): Promise<Collection[]> {
    const response = await this.makeRequest('/collections')
    
    if (!response.success || !response.data?.items) {
      return []
    }

    return response.data.items.map((item: any) => ({
      id: item.id,
      name: this.collectionNames[item.id] || item.name || `Collection ${item.id.slice(0, 8)}`,
      volume: item.metrics?.volume || 0,
      floorPrice: item.metrics?.floorPrice || 0,
      sales: item.metrics?.sales || 0,
      volumeChange: (Math.random() - 0.5) * 60, // Mock percentage change
      floorChange: (Math.random() - 0.5) * 30,
      salesChange: (Math.random() - 0.5) * 50,
      status: item.metrics?.volume > 50 ? 'Active' : item.metrics?.volume > 20 ? 'Low Activity' : 'Inactive',
    }))
  }

  async getVolumeData(days: number = 30): Promise<VolumeData[]> {
    // Generate mock time series data for volume
    const data: VolumeData[] = []
    const now = new Date()
    
    for (let i = days - 1; i >= 0; i--) {
      const date = new Date(now)
      date.setDate(date.getDate() - i)
      
      data.push({
        date: date.toISOString().split('T')[0],
        volume: Math.random() * 60 + 10 + Math.sin(i * 0.2) * 15
      })
    }
    
    return data
  }

  async getFloorPriceData(days: number = 30): Promise<FloorPriceData[]> {
    // Generate mock time series data for floor prices
    const data: FloorPriceData[] = []
    const now = new Date()
    let basePrice = 0.45
    
    for (let i = days - 1; i >= 0; i--) {
      const date = new Date(now)
      date.setDate(date.getDate() - i)
      
      // Simulate price volatility with a slight downward trend
      basePrice += (Math.random() - 0.6) * 0.02
      basePrice = Math.max(0.3, Math.min(0.6, basePrice))
      
      data.push({
        date: date.toISOString().split('T')[0],
        floorPrice: basePrice
      })
    }
    
    return data
  }

  async getTopCollections(limit: number = 10): Promise<TopCollectionData[]> {
    const collections = await this.getCollections()
    
    return collections
      .sort((a, b) => b.volume - a.volume)
      .slice(0, limit)
      .map(collection => ({
        collection: collection.name,
        volume: collection.volume,
        sales: collection.sales
      }))
  }

  async getMetrics() {
    const collections = await this.getCollections()
    
    const totalVolume = collections.reduce((sum, col) => sum + col.volume, 0)
    const avgFloorPrice = collections.reduce((sum, col) => sum + col.floorPrice, 0) / collections.length
    const totalSales = collections.reduce((sum, col) => sum + col.sales, 0)
    const activeCollections = collections.filter(col => col.status === 'Active').length
    
    return {
      totalVolume: totalVolume,
      volumeChange: 24.8,
      avgFloorPrice: avgFloorPrice,
      floorChange: -8.2,
      activeCollections: activeCollections,
      collectionsChange: 15.3,
      totalSales: totalSales,
      salesChange: 31.7
    }
  }
}

export const garageApi = new GarageApiService()
export type { Collection, VolumeData, FloorPriceData, TopCollectionData }