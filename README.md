# Maariv

Demo news-style app: **Next.js** (App Router, TypeScript) frontend + **ASP.NET Core** API. Articles and tags are served by the API from JSON files under `backend/Data/`.

## Prerequisites

- **Node.js** (LTS) and npm  
- **.NET 8 SDK**

## Setup

Clone the repository, then:

```bash
npm install
```

Copy environment templates:

- `frontend/.env.example` → `frontend/.env.local`  
- `backend/.env.example` → `backend/.env` (optional; used for CORS)

Adjust **`BACKEND_API_URL`** in `frontend/.env.local` so it matches the URL where the API listens (default in code is `http://localhost:5226`).

## Run locally

Use **two terminals** from the repo root:

```bash
# Terminal 1 — API
npm run dev:backend

# Terminal 2 — Next.js (http://localhost:3000)
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Scripts (root)

| Command | Description |
|---------|-------------|
| `npm run dev` | Next.js dev server (`frontend` workspace) |
| `npm run dev:backend` | .NET API with hot reload |
| `npm run build` | Production build of the frontend |
| `npm run build:backend` | Build the API |

## Project layout

```
frontend/     Next.js app — `app/`, `components/`, `lib/fetch/`
backend/      ASP.NET Core — `Controllers/`, `Services/`, `Data/`
```

## Documentation

- **[EXAM_INTERVIEW_PREP.md](./EXAM_INTERVIEW_PREP.md)** — overview + interview notes  
- **[FRONTEND_QUESTION_BANK.md](./FRONTEND_QUESTION_BANK.md)** — frontend question bank  

## License

Private / educational — adjust as needed.
