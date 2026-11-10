# PATEK AI

PATEK AI is an autonomous pre-meeting intelligence platform that helps teams research companies, executives, recent market developments, risks, competitors, and recommended discussion questions before high-stakes conversations.

It combines a React + TypeScript frontend with an Express API and optional Google Gemini-powered research synthesis to generate executive briefing reports automatically.

## Why this project exists

The platform is designed for:

- Pre-meeting preparation before investor, partnership, procurement, and executive calls
- Company and executive intelligence gathering
- Research report generation with citations and talking points
- Fast decision support for business development and strategic teams

## Key features

- Meeting creation workflow for target companies and decision-makers
- AI-assisted research orchestration using Google Gemini
- Structured executive briefing reports
- Company, product, competitor, and executive intelligence views
- Meeting history and report tracking
- PDF-style export view for briefing documents
- Local JSON-backed persistence for meetings, reports, and settings
- Vite-powered React frontend with a modern dashboard interface

## Architecture overview

- Frontend: React 19 + TypeScript + Vite
- Backend: Express server running in TypeScript (`server.ts`)
- AI layer: Google Gemini via `@google/genai`
- Storage: local JSON store in `data/patek_store.json`
- Styling: custom CSS + component-driven UI

## Project structure

```text
.
├── .env.example              # Example environment variables
├── .gitignore
├── index.html                # Entrypoint for the Vite frontend
├── metadata.json             # App metadata for AI Studio integration
├── package.json              # Scripts and dependencies
├── server.ts                 # Express server and API routes
├── tsconfig.json             # TypeScript configuration
├── vite.config.ts           # Vite configuration
├── src/
│   ├── App.tsx              # App shell and tab routing
│   ├── main.tsx             # React bootstrap
│   ├── index.css            # Global styles
│   ├── types.ts             # Shared TypeScript interfaces
│   └── components/          # UI components for dashboard, reports, research, settings
├── data/
│   └── patek_store.json      # Runtime-generated local store (created on first run)
└── dist/                    # Production build output (generated after build)
```

## Tech stack

- React
- TypeScript
- Vite
- Express
- Google Gemini API
- Tailwind-inspired UI styling with custom CSS
- Node.js runtime

## Prerequisites

Before running the project, make sure you have:

- Node.js 18+ or newer
- npm or pnpm
- A valid Google Gemini API key if you want AI-generated research reports

## Getting started

1. Clone the repository:

```bash
git clone https://github.com/harshitha8426-cpu/patek-ai.git
cd patek-ai
```

2. Install dependencies:

```bash
npm install
```

3. Configure environment variables:

Copy the example file and set your values:

```bash
cp .env.example .env
```

Then update the file with your keys:

```env
GEMINI_API_KEY="your_gemini_api_key"
APP_URL="http://localhost:3000"
```

4. Start the development server:

```bash
npm run dev
```

The app will run on:

```text
http://localhost:3000
```

## Useful scripts

```bash
npm run dev       # start the Express + Vite development server
npm run build     # build production frontend bundle
npm run preview   # preview the built frontend
npm run lint      # run TypeScript type checking
npm run clean     # remove dist and built server output
```

## API overview

The app exposes a local Express API for meetings, reports, settings, and research orchestration.

### Health check

```http
GET /api/health
```

### Meetings

```http
GET /api/meetings
POST /api/meetings
GET /api/meetings/:id
```

### Research flow

```http
POST /api/meetings/:id/research
GET /api/research/:jobId/status
GET /api/research/:jobId/results
```

### Reports

```http
GET /api/reports/:reportId
GET /api/reports/:reportId/pdf
```

### Settings

```http
GET /api/settings
POST /api/settings
```

## Example workflow

1. Create a new meeting with a company name and meeting context.
2. Trigger the research pipeline.
3. The app generates an executive brief containing:
   - company overview
   - recent developments
   - executive intelligence
   - competitor analysis
   - opportunity and risk matrix
   - recommended questions
   - source list
4. Review the generated insight and export or share the briefing.

## Notes on AI behavior

This project can run with or without an API key:

- If `GEMINI_API_KEY` is present, it tries to generate a more tailored research brief using Gemini.
- If the key is not configured, the app falls back to a seeded synthetic report so the UI remains usable.

## Production build

```bash
npm run build
```

Then run the production server with the generated build output. In this repo, the project is intended to be served as a Node application with Vite in development and static assets in production.

## Contributing

Contributions are welcome. If you want to improve the platform, feel free to:

- add new research agents or data sources
- improve the report quality and UI
- expand API coverage
- enhance export or persistence workflows

## Project status

This repository is a working internal-style prototype for AI-driven meeting intelligence and strategic briefing generation. It is suitable for experimentation, demos, and extension into a broader research assistant product.

## Important

The repository does not currently include an explicit software license file. If you plan to distribute or commercialize the project, add a license appropriate for your use case before publishing externally.

