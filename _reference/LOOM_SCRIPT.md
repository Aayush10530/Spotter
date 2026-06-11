# Loom Recording Script
# Target: 3-5 minutes
# Record ONLY after live deployment is working

## Setup before recording
  [ ] Live URL open in browser (not localhost)
  [ ] Browser zoom at 100%
  [ ] Console closed (no errors visible)
  [ ] Form is empty and ready
  [ ] Screen recording covers full browser

## Script

### 0:00 - 0:30 — Introduction
Say:
  "This is the SpotterAI ELD Trip Planner,
  a full-stack app built with Django and React.
  It takes 4 trip inputs and generates
  FMCSA-compliant ELD daily log sheets
  and a mapped route automatically."

Show: The live URL in the browser address bar

### 0:30 - 1:00 — Fill the form
Type these exact values:
  Current location:  Chicago, IL
  Pickup location:   Dallas, TX
  Dropoff location:  Atlanta, GA
  Cycle hours used:  22

Show the loading state after clicking Plan Trip
Point out the progress steps

### 1:00 - 2:00 — Walk through the map
Point out:
  Blue line — the route
  Blue marker — start in Chicago
  Green marker — pickup in Dallas
  Amber markers — fuel stops
  Gray markers — rest stops
  Coral marker — dropoff in Atlanta

Say:
  "The algorithm calculated where fuel stops
  and mandatory rest periods happen based on
  FMCSA Hours of Service regulations"

### 2:00 - 3:30 — Walk through log sheets
Click Day 1 tab. Point out:
  The 24-hour grid with colored bars
  Row 3 Driving — the purple bar
  The 30-minute break gap
  The sleeper berth at end of day
  The remarks section with locations
  The totals adding to 24 hours

Click Day 2 tab. Say:
  "Day 2 shows the sleeper berth continuing
  from midnight, then driving to Dallas for pickup,
  then continuing toward Atlanta"

Click Day 3 tab. Say:
  "Final day shows arrival in Atlanta,
  the 1-hour dropoff on-duty stop,
  then off duty for the remainder"

### 3:30 - 4:30 — Code walkthrough
Show in VS Code or GitHub:
  hos_calculator.py — "This is the core algorithm
  enforcing all 6 HOS rules"

  geocoding.py — "Converts city names to coordinates
  using OpenRouteService free API"

  services/api.js — "Single file for all
  frontend API calls"

  logGridDrawer.js — "Pure canvas drawing logic
  completely separate from React components"

Say:
  "Business logic is completely separated from
  UI. The Django backend handles all calculations.
  React only renders what it receives."

### 4:30 - 5:00 — Close
Show GitHub repo — point out public URL
Show README with live links
End on the live app URL again

Say:
  "All source code is on GitHub, link in the README.
  The app is live at [your Vercel URL]"
