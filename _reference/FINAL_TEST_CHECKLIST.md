# Final Testing Checklist
# Run ALL of these before recording Loom
# Every single box must be checked

## Functional Tests

### Test 1 — Short trip
  Input: Chicago IL → Indianapolis IN → Columbus OH, 0 hrs
  [ ] Response received without error
  [ ] 1 log sheet generated
  [ ] Map shows route
  [ ] Day 1 totals = exactly 24.0 hrs
  [ ] No fuel stop (under 1000 miles)

### Test 2 — Medium trip (main demo)
  Input: Chicago IL → Dallas TX → Atlanta GA, 22 hrs
  [ ] Response received without error
  [ ] 3 log sheets generated
  [ ] Map shows all stops correctly
  [ ] Day 1 totals = exactly 24.0 hrs
  [ ] Day 2 totals = exactly 24.0 hrs
  [ ] Day 3 totals = exactly 24.0 hrs
  [ ] At least 1 fuel stop appears
  [ ] 30-min break appears in remarks
  [ ] 10-hr rest appears in log grid
  [ ] Pickup stop appears in Day 2
  [ ] Dropoff stop appears in Day 3

### Test 3 — High cycle hours
  Input: LA CA → Phoenix AZ → Denver CO, 62 hrs
  [ ] App handles without crashing
  [ ] Either completes trip OR shows clear error
  [ ] No 500 server error shown

### Test 4 — Invalid input
  Input: "asdfghjkl" as current location
  [ ] Friendly error message shown
  [ ] Not a blank screen
  [ ] Not a 500 error

### Test 5 — Empty form submission
  [ ] Validation errors shown on each empty field
  [ ] Form does not submit
  [ ] No API call made

## UI Tests
  [ ] Map renders with tiles visible
  [ ] All 5 marker types appear correctly colored
  [ ] Day selector pills switch log sheets
  [ ] Log grid canvas renders clearly
  [ ] Remarks table is populated
  [ ] Totals row shows correct values
  [ ] Total working number is circled
  [ ] Zero broken images anywhere

## Responsive Tests
  [ ] Works at 1440px width (desktop)
  [ ] Works at 768px width (tablet)
  [ ] Works at 390px width (mobile)
  [ ] No horizontal scroll on mobile
  [ ] Log sheet is readable on mobile

## Console Tests
  [ ] Zero red errors on page load
  [ ] Zero red errors after form submit
  [ ] Zero red errors switching day tabs
  [ ] Zero red errors on map interaction

## Live URL Tests
  [ ] Vercel URL loads correctly
  [ ] Render URL returns JSON at /api/plan-trip/
  [ ] Form submission reaches live backend
  [ ] Full end-to-end works on live URLs
  [ ] Not just on localhost
