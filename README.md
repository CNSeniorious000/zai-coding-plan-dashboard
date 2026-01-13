# Z.AI Usage Dashboard

A modern Next.js dashboard for monitoring Z.AI API usage with real-time analytics and multi-language support.

## Features

- **Real-time Usage Tracking** - Monitor model calls, token usage, and tool performance
- **Quota Management** - Visual progress bars for limits (5-hour tokens, monthly MCP usage)
- **Time-series Analytics** - Interactive charts showing usage trends over time
- **Multi-language Support** - 7 locales (English, Chinese, Japanese, Korean, Spanish, French, German)
- **Dark/Light Mode** - Material You-inspired design with theme toggle
- **API Key Validation** - Secure key storage with automatic validation

## Tech Stack

- **Next.js 16** - App Router with React 19
- **TypeScript** - Full type safety
- **Tailwind CSS v4** - Utility-first styling
- **Recharts** - Data visualization
- **next-intl** - Internationalization
- **Radix UI** - Accessible components

## Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## API Reference

### POST /api/usage

Fetch usage statistics from Z.AI API.

**Request Body:**
```json
{
  "apiKey": "string (required) - Z.AI API key in format [hex32].[alphanum16]",
  "startTime": "string (optional) - ISO format start time",
  "endTime": "string (optional) - ISO format end time"
}
```

**Response:**
```json
{
  "modelUsage": {
    "timeSeries": [
      {
        "time": "14:00",
        "fullTime": "2026-01-13 14:00:00",
        "calls": 1234,
        "tokens": 567890
      }
    ],
    "totalCalls": 50000,
    "totalTokens": 10000000
  },
  "toolUsage": [
    {
      "tool": "browser",
      "callCount": 150,
      "successCount": 145,
      "failureCount": 5
    }
  ],
  "quotaLimit": {
    "limits": [
      {
        "type": "Token Usage (5 Hour)",
        "percentage": 65,
        "currentUsage": 650000,
        "total": 1000000,
        "remaining": 350000,
        "nextResetTime": 1736812800000
      },
      {
        "type": "MCP Usage (1 Month)",
        "percentage": 42,
        "currentUsage": 84,
        "total": 200,
        "remaining": 116,
        "usageDetails": [...]
      }
    ]
  }
}
```

## Development

```bash
# Build for production
npm run build

# Start production server
npm start

# Run linter
npm run lint
```

## Project Structure

```
src/
├── app/
│   ├── [locale]/          # Localized routes
│   │   ├── page.tsx       # Main dashboard
│   │   └── docs/          # Documentation
│   └── api/
│       └── usage/
│           └── route.ts   # Usage API endpoint
├── components/
│   ├── Dashboard.tsx      # Main dashboard component
│   ├── UsageCharts.tsx    # Data visualization
│   └── ui/                # Reusable UI components
├── i18n/                  # Internationalization config
└── lib/                   # Utilities
```

## API Key Format

Valid Z.AI API keys follow the pattern: `[a-f0-9]{32}\.[A-Za-z0-9]{16}`

Example: `1a2b3c4d5e6f7890abcdef1234567890.ABC123def456`

## Documentation

Full documentation available at `/docs` in the app.

## License

Private project.
