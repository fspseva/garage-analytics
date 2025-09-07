# Garage NFT Marketplace API Setup Guide

This comprehensive guide explains how to set up and configure the Garage NFT Marketplace API with your analytics dashboard.

## Table of Contents

- [Overview](#overview)
- [Architecture](#architecture)
- [Prerequisites](#prerequisites)
- [API Integration Methods](#api-integration-methods)
- [Local Development Setup](#local-development-setup)
- [Production Deployment](#production-deployment)
- [Dashboard Configuration](#dashboard-configuration)
- [MCP Server Setup](#mcp-server-setup)
- [Troubleshooting](#troubleshooting)
- [API Reference](#api-reference)

## Overview

The Garage NFT Marketplace API provides comprehensive data about NFT collections, including:

- **Collection Metrics**: Volume, floor prices, sales data
- **Market Analytics**: Trading activity, rankings, market share
- **Real-time Data**: Live updates of marketplace activity
- **Historical Data**: Time-series analytics and trends

## Architecture

```
┌─────────────────┐    ┌──────────────────┐    ┌─────────────────┐
│   Dashboard     │───▶│   Garage API     │───▶│   Fuel Network  │
│   (Frontend)    │    │   (Backend)      │    │   (Blockchain)  │
└─────────────────┘    └──────────────────┘    └─────────────────┘
         │                       │
         │              ┌──────────────────┐
         └─────────────▶│   MCP Server     │
                        │   (Local Tool)   │
                        └──────────────────┘
```

## Prerequisites

### System Requirements

- **Node.js**: Version 18.0 or higher
- **npm**: Version 9.0 or higher
- **TypeScript**: Version 5.0 or higher (for development)
- **Git**: For version control

### Network Access

- Internet connection for API calls
- Access to `https://garage-api.bako.global` (production)
- CORS proxy support for client-side requests

## API Integration Methods

### Method 1: Direct API Integration (Recommended for Production)

**Best for**: Production deployments, server-side applications

```javascript
// Example: Direct API call
const BASE_URL = 'https://garage-api.bako.global/mainnet';

async function fetchCollections() {
    const response = await fetch(`${BASE_URL}/collections`);
    const data = await response.json();
    return data;
}
```

### Method 2: CORS Proxy Integration (Current Dashboard Setup)

**Best for**: Client-side applications, GitHub Pages deployments

```javascript
// Example: Using CORS proxy (current implementation)
const proxyUrl = 'https://api.allorigins.win/get?url=' + 
                 encodeURIComponent('https://garage-api.bako.global/mainnet/collections');
const response = await fetch(proxyUrl);
const proxyData = await response.json();
const data = JSON.parse(proxyData.contents);
```

### Method 3: Static Data Integration (Fallback)

**Best for**: Development, offline testing

```javascript
// Example: Static data fallback (current dashboard)
const response = await fetch('/garage-overview/api-data.json');
const data = await response.json();
```

### Method 4: MCP Server Integration

**Best for**: Local development, CLI tools, advanced integrations

```bash
# Install and run MCP server
npm install
npm run build
npm start
```

## Local Development Setup

### 1. Clone and Setup Repository

```bash
# Clone the repository
git clone https://github.com/fspseva/garage-overview.git
cd garage-overview

# Install dependencies
npm install

# Build the project
npm run build
```

### 2. Configure Environment Variables

Create a `.env` file in the project root:

```env
# API Configuration
GARAGE_API_BASE_URL=https://garage-api.bako.global
GARAGE_API_NETWORK=mainnet
GARAGE_API_TIMEOUT=30000

# Development Settings
NODE_ENV=development
PORT=3000

# CORS Proxy (for client-side development)
CORS_PROXY_URL=https://api.allorigins.win/get?url=
```

### 3. Start Development Server

```bash
# Start local development server
python3 -m http.server 8000

# Or use Node.js serve
npm install -g serve
serve -p 8000
```

### 4. Access Dashboard

Open your browser and navigate to:
- **Local**: `http://localhost:8000`
- **Index file**: `http://localhost:8000/index.html`

## Production Deployment

### GitHub Pages Deployment (Current Setup)

The dashboard is currently configured for GitHub Pages deployment:

```yaml
# .github/workflows/deploy.yml
name: Deploy to GitHub Pages
on:
  push:
    branches: [ main, staging ]
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Deploy to GitHub Pages
        uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./
```

**Live URL**: `https://fspseva.github.io/garage-overview/`

### Alternative Deployment Options

#### Vercel Deployment

```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
vercel --prod
```

#### Netlify Deployment

```bash
# Install Netlify CLI
npm install -g netlify-cli

# Deploy
netlify deploy --prod --dir ./
```

#### Self-hosted Server

```bash
# Using nginx
sudo cp index.html /var/www/html/
sudo systemctl reload nginx
```

## Dashboard Configuration

### 1. API Endpoint Configuration

Update the API base URL in `dashboard-static.js`:

```javascript
class GarageAnalytics {
    constructor() {
        // Configure API endpoint
        this.baseUrl = 'https://garage-api.bako.global/mainnet';
        
        // Configure known collections
        this.collections = {
            "0xcda69aa111eb386de9e2881e039e99bc43ac21f6951e3da9b71ae4450f67858d": "Mr. Jim",
            "0x33f6d2bf0762223229bc5b17cee8c1c0090be95dfd3ece5b63e8efb9e456ee21": "Bakteria",
            // ... more collections
        };
    }
}
```

### 2. Data Source Configuration

Choose your data source method by updating the `fetchAllCollections()` method:

#### Option A: Live API with CORS Proxy
```javascript
async fetchAllCollections() {
    const proxyUrl = 'https://api.allorigins.win/get?url=' + 
                     encodeURIComponent(`${this.baseUrl}/collections`);
    const response = await fetch(proxyUrl);
    const proxyData = await response.json();
    return JSON.parse(proxyData.contents);
}
```

#### Option B: Direct API (Server-side only)
```javascript
async fetchAllCollections() {
    const response = await fetch(`${this.baseUrl}/collections`);
    return await response.json();
}
```

#### Option C: Static Data
```javascript
async fetchAllCollections() {
    const response = await fetch('/garage-overview/api-data.json');
    return await response.json();
}
```

### 3. Refresh Configuration

Configure auto-refresh intervals in `dashboard-static.js`:

```javascript
// Auto-refresh every 5 minutes (current setting)
setInterval(() => {
    analytics.loadData().catch(err => console.error('Auto-refresh failed:', err));
}, 5 * 60 * 1000); // 5 minutes

// For more frequent updates (1 minute):
// }, 1 * 60 * 1000);

// For less frequent updates (15 minutes):
// }, 15 * 60 * 1000);
```

## MCP Server Setup

The project includes an MCP (Model Context Protocol) server for advanced API interactions.

### 1. Build and Start MCP Server

```bash
# Build the TypeScript code
npm run build

# Start the MCP server
npm start
```

### 2. MCP Server Configuration

The MCP server is configured in `src/index.ts`:

```typescript
const BASE_URLS = {
  development: "http://localhost:3000",
  production: "https://garage-api.bako.global"
};

const NETWORKS = ["mainnet", "testnet"] as const;
```

### 3. Available MCP Tools

The MCP server provides several tools for API interaction:

- `get_collections` - Fetch all collections with filtering
- `get_collection_details` - Get specific collection information  
- `get_collection_nfts` - List NFTs in a collection
- `get_collection_orders` - Get marketplace orders
- `get_nft_details` - Fetch specific NFT information
- `search_collections` - Search collections by name

### 4. Using MCP Server with Claude

Configure your `.mcp.json` file:

```json
{
  "servers": {
    "garage-nft": {
      "command": "node",
      "args": ["./build/index.js"]
    }
  }
}
```

## Troubleshooting

### Common Issues and Solutions

#### 1. CORS Errors

**Problem**: Browser blocks API requests due to CORS policy

**Solutions**:
```javascript
// Use CORS proxy
const proxyUrl = 'https://api.allorigins.win/get?url=' + encodeURIComponent(apiUrl);

// Or use alternative proxy
const proxyUrl = 'https://cors-anywhere.herokuapp.com/' + apiUrl;
```

#### 2. API Rate Limiting

**Problem**: Too many requests causing rate limit errors

**Solutions**:
```javascript
// Implement request throttling
const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

async function makeThrottledRequest(url) {
    await delay(1000); // Wait 1 second between requests
    return fetch(url);
}
```

#### 3. Data Loading Issues

**Problem**: Dashboard shows "Loading..." indefinitely

**Debug Steps**:
```javascript
// Enable detailed logging
console.log('API Response:', response);
console.log('Processed Data:', this.collectionData);

// Check network tab in browser dev tools
// Verify API endpoint URLs
// Check for JavaScript errors in console
```

#### 4. Collection Names Not Displaying

**Problem**: Collection IDs showing instead of friendly names

**Solution**:
```javascript
// Verify collection mapping in dashboard-static.js
this.collections = {
    "0xcda69aa111eb386de9e2881e039e99bc43ac21f6951e3da9b71ae4450f67858d": "Mr. Jim",
    // Ensure all your collection IDs are mapped
};
```

#### 5. Charts Not Rendering

**Problem**: Chart containers are empty

**Solutions**:
```javascript
// Check Chart.js is loaded
if (typeof Chart === 'undefined') {
    console.error('Chart.js not loaded');
}

// Verify canvas elements exist
const ctx = document.getElementById('volumeChart');
if (!ctx) {
    console.error('Chart canvas not found');
}
```

### Debug Mode

Enable debug mode by adding to your HTML:

```html
<script>
// Enable debug logging
window.GARAGE_DEBUG = true;

// Add to dashboard-static.js
if (window.GARAGE_DEBUG) {
    console.log('Debug mode enabled');
    // Additional logging here
}
</script>
```

## API Reference

### Base URLs

- **Production**: `https://garage-api.bako.global`
- **Networks**: `/mainnet` or `/testnet`
- **Full Example**: `https://garage-api.bako.global/mainnet/collections`

### Key Endpoints Used by Dashboard

#### Get All Collections
```
GET /{network}/collections
```

**Response Format**:
```json
{
  "success": true,
  "data": {
    "items": [
      {
        "id": "0x...",
        "name": "Collection Name",
        "metrics": {
          "volume": 1234.56,
          "floorPrice": 0.5,
          "sales": 42
        }
      }
    ]
  }
}
```

#### Get Collection Details
```
GET /{network}/collections/{collectionId}
```

### Collection ID Mapping

The dashboard uses these known collection IDs:

| Collection Name | Contract Address |
|----------------|------------------|
| Mr. Jim | `0xcda69aa111eb386de9e2881e039e99bc43ac21f6951e3da9b71ae4450f67858d` |
| Bakteria | `0x33f6d2bf0762223229bc5b17cee8c1c0090be95dfd3ece5b63e8efb9e456ee21` |
| BearBros | `0xf0b6e2320caccb9071e45b1150b4da6f5edf74e7375ac6c87084822a87832de2` |
| Sangoro | `0xb03ec5c6eeaf6d09ed6755e21dff896234c8f509b813f3ff17ef14a436fa8462` |
| Koby | `0x202b55f66b8bafaf3b4fdf0653f1a4320607781dbd368bb576bc09250dd7dbbe` |
| FuelMonkees | `0x0d34ec513cbaf7e15737120725cd3e235a8fd1716fa0eedc5da4a64c182e5a9f` |
| Executoors | `0x3f3f87bb15c693784e90521c64bac855ce23d971356a6ccd57aa92e02e696432` |
| Fuel Dudes | `0x65aa85875bf92fb5b487ade154f88507d74b233ef901b4a172f4616b527a4784` |
| Fuel BomBa | `0x59b10bd361740618f12bba00f1083ef304a294b37ed7a8756c1b9cfc9b491b16` |
| Fuel Pumps | `0x45c964371490bdfc2610ca116853d22a9b6e0de1abb67f61b81ab9d291b0015c` |
| Fuel Pengus | `0xaa919d413a57cb6c577b2e172480cbe2f88df0e28203fed52249cabca6cee74a` |

## Performance Optimization

### Caching Strategies

```javascript
// Implement simple caching
class ApiCache {
    constructor(ttl = 300000) { // 5 minutes
        this.cache = new Map();
        this.ttl = ttl;
    }
    
    get(key) {
        const item = this.cache.get(key);
        if (item && Date.now() - item.timestamp < this.ttl) {
            return item.data;
        }
        return null;
    }
    
    set(key, data) {
        this.cache.set(key, {
            data,
            timestamp: Date.now()
        });
    }
}
```

### Batch Requests

```javascript
// Batch multiple collection requests
async function fetchCollectionsBatch(collectionIds) {
    const promises = collectionIds.map(id => 
        fetch(`${baseUrl}/collections/${id}`)
    );
    
    return Promise.allSettled(promises);
}
```

## Security Considerations

### API Key Management (Future)

```javascript
// When API keys are implemented
const headers = {
    'Authorization': `Bearer ${process.env.GARAGE_API_KEY}`,
    'Content-Type': 'application/json'
};
```

### Rate Limiting

```javascript
// Implement exponential backoff
async function fetchWithRetry(url, options = {}, retries = 3) {
    for (let i = 0; i < retries; i++) {
        try {
            const response = await fetch(url, options);
            if (response.ok) return response;
            
            if (response.status === 429) {
                const delay = Math.pow(2, i) * 1000; // Exponential backoff
                await new Promise(resolve => setTimeout(resolve, delay));
                continue;
            }
            
            throw new Error(`HTTP ${response.status}`);
        } catch (error) {
            if (i === retries - 1) throw error;
        }
    }
}
```

## Support and Resources

### Documentation
- **API Documentation**: See `API.md` in the project root
- **Project Repository**: https://github.com/fspseva/garage-overview
- **Live Dashboard**: https://fspseva.github.io/garage-overview/

### Community and Support
- **Issues**: Report bugs and request features on GitHub Issues
- **Discussions**: Use GitHub Discussions for questions and ideas

### Development Resources
- **Fuel Network Documentation**: https://docs.fuel.network/
- **Garage Marketplace**: https://garage.bako.global/
- **Chart.js Documentation**: https://www.chartjs.org/docs/

---

**Last Updated**: January 2025
**Version**: 1.0.0