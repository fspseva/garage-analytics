# Garage NFT Analytics Dashboard

A comprehensive analytics dashboard for the Garage NFT Marketplace on Fuel Network, built using the shadcn/ui Starter Kit components.

## 🚀 Features

### Dashboard Overview
- **Real-time Metrics Cards**: Total volume, average floor price, active collections, and total sales
- **Interactive Charts**: Volume trends, floor price monitoring, and top collections visualization
- **Collections Table**: Comprehensive overview of all NFT collections with live data
- **Responsive Design**: Fully responsive layout that works on all device sizes

### Two Dashboard Versions

#### 1. Static Dashboard (`/garage-analytics`)
- Uses mock data for demonstration purposes
- Perfect for design reviews and UI testing
- Located at: `http://localhost:4000/garage-analytics`

#### 2. Dynamic Dashboard (`/garage-analytics-dynamic`)
- Integrates with the real Garage API (garage-api.bako.global)
- Features live data fetching with fallback to mock data
- Implements CORS proxy for client-side API calls
- Located at: `http://localhost:4000/garage-analytics-dynamic`

## 📊 Components Created

### Core Components
- `GarageMetricsCards` / `GarageMetricsCardsDynamic` - Key performance indicators
- `ChartVolume` / `ChartVolumeDynamic` - Trading volume visualization
- `ChartFloorPrice` - Floor price trends
- `TopCollectionsChart` - Leading collections by volume
- `CollectionsTable` / `CollectionsTableDynamic` - Detailed collections data

### Layout Components
- `AppSidebar` - Navigation sidebar with analytics sections
- `SiteHeader` - Header with breadcrumbs and search
- `AnalyticsDatePicker` - Date range selection
- `NavMain`, `NavUser`, `TeamSwitcher` - Sidebar navigation components

### API Integration
- `garage-api.ts` - Complete API service for Garage marketplace data
- Supports direct API calls and CORS proxy fallback
- Includes mock data for development and offline usage

## 🎨 Design Features

Based on the shadcn/ui design system with:
- Modern card-based layout with gradients and shadows
- Interactive charts using Recharts
- Consistent typography and spacing
- Dark/light theme support
- Professional color scheme optimized for financial data

## 🔗 API Integration

### Collection Support
The dashboard supports all major Garage NFT collections including:
- Mr. Jim
- Bakteria  
- BearBros
- Sangoro
- Koby
- FuelMonkees
- Executoors
- Fuel Dudes
- Fuel BomBa
- Fuel Pumps
- Fuel Pengus

### Data Sources
- **Primary**: Garage API (garage-api.bako.global/mainnet)
- **Fallback**: CORS proxy (api.allorigins.win)
- **Development**: Mock data with realistic patterns

## 🚀 Getting Started

### Prerequisites
- Node.js 18.0 or higher
- pnpm package manager

### Running the Dashboard

1. **Start the development server** (if not already running):
   ```bash
   pnpm v4:dev
   ```

2. **Access the dashboards**:
   - Static version: http://localhost:4000/garage-analytics
   - Dynamic version: http://localhost:4000/garage-analytics-dynamic

### Navigation
- **Overview Tab**: Key metrics, volume charts, and top collections
- **Collections Tab**: Detailed table of all collections
- **Market Analysis Tab**: Combined charts and collection data
- **Trends Tab**: Historical trends and patterns

## 📱 Responsive Design

The dashboard is fully responsive with breakpoints:
- Mobile: Single column layout
- Tablet: Two column grid
- Desktop: Four column metrics grid
- Large screens: Optimized chart sizing

## 🔧 Customization

### Modifying API Endpoints
Edit `/lib/garage-api.ts` to change:
- Base URL for different networks (mainnet/testnet)
- CORS proxy settings
- Collection ID mappings
- Mock data patterns

### Styling
All components use Tailwind CSS with shadcn/ui design tokens:
- Colors: Uses CSS custom properties for theming
- Typography: Consistent font scales and weights
- Spacing: Container queries for responsive design
- Charts: Customizable color schemes

## 📈 Data Visualization

### Charts
- **Area Charts**: Trading volume over time
- **Line Charts**: Floor price trends
- **Bar Charts**: Top collections comparison
- **Interactive Elements**: Tooltips, zoom, time range selection

### Metrics
- **Volume**: Total trading volume with percentage changes
- **Floor Prices**: Average and individual collection floors
- **Sales**: Transaction counts and trends
- **Collections**: Active collection monitoring

## 🛠 Technical Architecture

### Built With
- **Next.js 15**: React framework with App Router
- **TypeScript**: Type-safe development
- **Tailwind CSS**: Utility-first styling
- **shadcn/ui**: High-quality component library
- **Recharts**: Chart visualization library
- **Radix UI**: Accessible component primitives

### File Structure
```
apps/v4/app/(examples)/
├── garage-analytics/           # Static dashboard
│   ├── page.tsx               # Main dashboard page
│   ├── layout.tsx             # Dashboard layout
│   └── components/            # Dashboard components
├── garage-analytics-dynamic/   # Dynamic dashboard
│   ├── page.tsx               # Live data dashboard
│   ├── layout.tsx             # Dashboard layout
│   └── lib/                   # API integration
└── shared components/          # Reusable components
```

## 🔄 API Reference

The dashboard integrates with the Garage API following the specifications in `api_setup.md`:

### Endpoints Used
- `GET /{network}/collections` - Collection data
- Collection details and metrics
- Historical trading data

### Response Format
All API responses follow the documented structure with proper error handling and fallbacks.

## 🎯 Performance

- **Lazy Loading**: Components load data on demand
- **Caching**: Browser caching for API responses  
- **Optimized Renders**: Efficient React re-rendering
- **Bundle Size**: Tree-shaken imports for minimal bundle size

## 📝 Next Steps

To extend the dashboard:
1. Add real-time WebSocket connections for live updates
2. Implement user authentication and personalized views
3. Add more chart types (pie charts, scatter plots)
4. Create export functionality for reports
5. Add advanced filtering and search capabilities

---

**Dashboard URLs**:
- Static Demo: http://localhost:4000/garage-analytics
- Live Data: http://localhost:4000/garage-analytics-dynamic

The dashboard is now ready for use and provides a comprehensive view of the Garage NFT Marketplace analytics!