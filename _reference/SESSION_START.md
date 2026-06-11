# Session Start Template
# Paste this at the beginning of EVERY AI session
# Update the 3 fields before pasting

---
PROJECT: SpotterAI ELD Trip Planner
STACK: Django + React (Create React App)
CURRENT PHASE: Phase 4
LAST COMPLETED: geocoding.py — converts city name to lat/lng coords
NEXT TASK: routing.py — gets distance, duration, polyline from ORS

ARCHITECTURE RULES — READ BEFORE DOING ANYTHING:
- backend/trip_planner/services/ holds all logic
- views.py only handles HTTP, calls services
- hos_calculator.py is pure math, no strings
- log_builder.py does all string formatting
- frontend/src/services/api.js holds all axios calls
- frontend/src/utils/ holds all helper functions
- Never mix business logic with UI components
- Never add dependencies not already in requirements.txt

FOLDER STRUCTURE STATUS:
  geocoding.py    → DONE ✓
  routing.py      → NEXT
  everything else → NOT STARTED

DO NOT:
- Change folder structure
- Add new packages without asking me first
- Rewrite files marked DONE ✓
- Put logic inside components
- Merge multiple files into one

CURRENT SESSION GOAL:
Build ONLY: routing.py
Nothing else. One file. Verify. Done.
---
