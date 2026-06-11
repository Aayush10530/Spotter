# Session Start Template
# Paste this at the beginning of EVERY AI session
# Update the 3 fields before pasting

---
PROJECT: SpotterAI ELD Trip Planner
STACK: Django + React (Create React App)
CURRENT PHASE: Phase 7
LAST COMPLETED: log_builder.py — merges route and scheduling data into response schema
NEXT TASK: serializers.py — validates inputs and structures response

ARCHITECTURE RULES — READ BEFORE DOING ANYTHING:
- backend/trip_planner/services/ holds all logic
- views.py only handles HTTP, calls services
- hos_calculator.py is pure math, no strings
- log_builder.py does all string formatting    → DONE ✓
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
