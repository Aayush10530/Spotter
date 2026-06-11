# SpotterAI ELD Trip Planner

> Full-stack FMCSA-compliant ELD log generator
> for commercial truck drivers

## Live Demo
- **App:** https://[your-app].vercel.app
- **API:** https://[your-app].onrender.com/api/plan-trip/

## Video Walkthrough
https://loom.com/share/[your-video-id]

## What It Does
Takes 4 trip inputs and automatically generates:
- An interactive route map with all stops marked
- FMCSA-compliant ELD daily log sheets
- HOS compliance verification

## HOS Rules Enforced
| Rule | Value |
|---|---|
| Max driving per day | 11 hours |
| Max driving window | 14 hours |
| Mandatory rest | 10 hours |
| Break after driving | 30 min after 8 hrs |
| Weekly cycle limit | 70 hrs / 8 days |
| Fuel stops | Every 1,000 miles |
| Pickup / dropoff | 1 hr on-duty each |

## Tech Stack
| Layer | Technology |
|---|---|
| Frontend | React (Create React App) |
| Backend | Python + Django + DRF |
| Map | Leaflet.js + OpenStreetMap |
| Routing API | OpenRouteService (free) |
| Frontend hosting | Vercel |
| Backend hosting | Render.com |

## Running Locally

### Backend
```bash
cd backend
python -m venv venv
source venv/bin/activate        # Mac/Linux
venv\Scripts\activate           # Windows
pip install -r requirements.txt
cp .env.example .env
# Add your ORS_API_KEY to .env
python manage.py runserver
```

### Frontend
```bash
cd frontend
npm install
cp .env.example .env
# .env contains: REACT_APP_API_URL=http://localhost:8000
npm start
```

## Architecture
See [ARCHITECTURE.md](./ARCHITECTURE.md)

## Project Docs
- [PROJECT_CONTEXT.md](./PROJECT_CONTEXT.md)
- [ARCHITECTURE.md](./ARCHITECTURE.md)
- [CODING_RULES.md](./CODING_RULES.md)
- [FEATURE_LOG.md](./FEATURE_LOG.md)
