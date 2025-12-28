# QA Tester Review Document

**Application:** LessisMore - Subtraction Health Dashboard
**Review Date:** December 2024
**Purpose:** Comprehensive functional testing, edge cases, and quality assurance

---

## TESTING ENVIRONMENT REQUIREMENTS

### Browsers to Test
- [ ] Chrome (latest)
- [ ] Firefox (latest)
- [ ] Safari (latest)
- [ ] Edge (latest)
- [ ] Chrome Mobile (Android)
- [ ] Safari Mobile (iOS)

### Device Viewports
- [ ] Desktop (1920x1080)
- [ ] Laptop (1366x768)
- [ ] Tablet (768x1024)
- [ ] Mobile (375x667)
- [ ] Small Mobile (320x568)

### Prerequisites
- Clear localStorage before each test session
- Test in both incognito and normal mode
- Test with and without service worker cached

---

## SECTION 1: Dashboard (index.html)

### 1.1 Functional Tests

| Test ID | Test Case | Steps | Expected Result | Pass/Fail |
|---------|-----------|-------|-----------------|-----------|
| DASH-001 | Page loads | Navigate to index.html | Dashboard displays with all cards | [ ] |
| DASH-002 | All cards clickable | Click each navigation card | Navigates to correct page | [ ] |
| DASH-003 | Hover effects | Hover over each card | Card lifts with shadow | [ ] |
| DASH-004 | Theme toggle | Click moon/sun button | Theme switches, persists on reload | [ ] |
| DASH-005 | PWA install prompt | First visit (clear storage) | Install prompt appears | [ ] |
| DASH-006 | Dismiss install | Click "Not now" | Prompt hides, doesn't reappear | [ ] |
| DASH-007 | Responsive layout | Resize to mobile | Cards stack vertically | [ ] |

### 1.2 Edge Cases

| Test ID | Test Case | Steps | Expected Result | Pass/Fail |
|---------|-----------|-------|-----------------|-----------|
| DASH-E01 | localStorage disabled | Disable localStorage in browser | App still loads (graceful degradation) | [ ] |
| DASH-E02 | Offline access | Enable airplane mode after first load | Cached version displays | [ ] |
| DASH-E03 | Theme on reload | Set dark mode, close and reopen | Dark mode persists | [ ] |

---

## SECTION 2: Risk Calculator (calculator.html)

### 2.1 Functional Tests

| Test ID | Test Case | Steps | Expected Result | Pass/Fail |
|---------|-----------|-------|-----------------|-----------|
| CALC-001 | Start assessment | Click "Start Assessment" | Quiz interface appears | [ ] |
| CALC-002 | Progress bar | Answer first question | Progress bar shows 10% | [ ] |
| CALC-003 | Select option | Click any option | Option highlights, Next enables | [ ] |
| CALC-004 | Change selection | Select different option | Only new option selected | [ ] |
| CALC-005 | Navigate forward | Click Next | Next question appears | [ ] |
| CALC-006 | Navigate back | Click Back | Previous question appears with selection | [ ] |
| CALC-007 | Complete all 10 | Answer all questions | Results screen appears | [ ] |
| CALC-008 | Results display | Complete quiz | Risk profile with scores shown | [ ] |
| CALC-009 | Results saved | Check localStorage | calculator_results key exists | [ ] |
| CALC-010 | Retake quiz | Click "Retake" | Quiz resets to intro | [ ] |
| CALC-011 | Back to dashboard | Click back link | Returns to dashboard | [ ] |

### 2.2 Scoring Verification

| Test ID | Test Case | Answers | Expected Top Risks | Pass/Fail |
|---------|-----------|---------|-------------------|-----------|
| CALC-S01 | High sugar user | Sugar: High, others: Low | Magnesium, B Vitamins high | [ ] |
| CALC-S02 | High caffeine | Caffeine: 5+, timing: with meals | Iron, Calcium high | [ ] |
| CALC-S03 | Stressed/poor sleep | Stress: Very high, Sleep: <5hr | Magnesium, B Vitamins high | [ ] |
| CALC-S04 | Medication user | PPIs selected | B12, Magnesium, Iron elevated | [ ] |
| CALC-S05 | Healthy baseline | All lowest options | All scores low | [ ] |

### 2.3 Edge Cases

| Test ID | Test Case | Steps | Expected Result | Pass/Fail |
|---------|-----------|-------|-----------------|-----------|
| CALC-E01 | Refresh mid-quiz | Answer 5 questions, refresh page | Quiz resets (no persistence) | [ ] |
| CALC-E02 | Skip question | Try to click Next without selecting | Button disabled, cannot proceed | [ ] |
| CALC-E03 | Rapid clicking | Click Next rapidly | No duplicate submissions | [ ] |
| CALC-E04 | Back from Q1 | Click Back on first question | Back button disabled | [ ] |

---

## SECTION 3: Symptom Mapper (symptoms.html)

### 3.1 Functional Tests

| Test ID | Test Case | Steps | Expected Result | Pass/Fail |
|---------|-----------|-------|-----------------|-----------|
| SYMP-001 | Category tabs | Click each category tab | Symptoms for that category display | [ ] |
| SYMP-002 | Select symptom | Click a symptom button | Button highlights, appears in selected bar | [ ] |
| SYMP-003 | Deselect symptom | Click selected symptom | Symptom deselected | [ ] |
| SYMP-004 | Remove from bar | Click X on tag in selected bar | Symptom removed | [ ] |
| SYMP-005 | Clear all | Click "Clear All" | All symptoms deselected | [ ] |
| SYMP-006 | Analyze button | Select 3+ symptoms, click Analyze | Results screen appears | [ ] |
| SYMP-007 | Results display | After analysis | Deficiencies ranked by match count | [ ] |
| SYMP-008 | Test recommendations | View results | Recommended tests listed | [ ] |
| SYMP-009 | Results saved | Check localStorage | symptom_results key exists | [ ] |
| SYMP-010 | Start over | Click "Start Over" | Returns to selection screen | [ ] |

### 3.2 Multi-Category Selection

| Test ID | Test Case | Steps | Expected Result | Pass/Fail |
|---------|-----------|-------|-----------------|-----------|
| SYMP-M01 | Cross-category | Select from Energy AND Mood | Both appear in selected bar | [ ] |
| SYMP-M02 | Category switching | Select, switch tab, select more | All selections preserved | [ ] |
| SYMP-M03 | Max selection | Select all symptoms (30+) | All tracked, button shows count | [ ] |

### 3.3 Edge Cases

| Test ID | Test Case | Steps | Expected Result | Pass/Fail |
|---------|-----------|-------|-----------------|-----------|
| SYMP-E01 | Analyze with 1 | Select only 1 symptom | Analysis works, limited results | [ ] |
| SYMP-E02 | Analyze with 0 | No symptoms selected | Analyze button disabled | [ ] |
| SYMP-E03 | Refresh after selection | Select 5, refresh | Selections lost (expected?) | [ ] |

---

## SECTION 4: Medication Lookup (medications.html)

### 4.1 Functional Tests

| Test ID | Test Case | Steps | Expected Result | Pass/Fail |
|---------|-----------|-------|-----------------|-----------|
| MED-001 | Category buttons | Click each medication category | Category expands with drugs | [ ] |
| MED-002 | Select medication | Click a medication | Appears in selected list | [ ] |
| MED-003 | Deselect medication | Click selected medication | Removed from list | [ ] |
| MED-004 | Multiple from category | Select 2-3 from same category | All tracked | [ ] |
| MED-005 | Cross-category | Select from different categories | All tracked | [ ] |
| MED-006 | View results | With meds selected | Depletion summary shows | [ ] |
| MED-007 | Results saved | Check localStorage | medications_results key exists | [ ] |
| MED-008 | Clear all | Click clear/reset | All selections cleared | [ ] |

### 4.2 Edge Cases

| Test ID | Test Case | Steps | Expected Result | Pass/Fail |
|---------|-----------|-------|-----------------|-----------|
| MED-E01 | No medications | Don't select any | No depletions shown | [ ] |
| MED-E02 | All medications | Select one from each category | Comprehensive depletion list | [ ] |

---

## SECTION 5: Habit Tracker (tracker.html)

### 5.1 Functional Tests

| Test ID | Test Case | Steps | Expected Result | Pass/Fail |
|---------|-----------|-------|-----------------|-----------|
| HABIT-001 | Page loads | Navigate to tracker | Today's date shown, 5 habits listed | [ ] |
| HABIT-002 | Toggle habit | Click checkbox | Checkbox fills, streak updates | [ ] |
| HABIT-003 | Untoggle habit | Click checked habit | Checkbox empties, streak updates | [ ] |
| HABIT-004 | Complete all 5 | Check all habits | Celebration banner appears | [ ] |
| HABIT-005 | Date navigation | Click left arrow | Previous day shown | [ ] |
| HABIT-006 | Today button | Navigate away, click Today | Returns to today | [ ] |
| HABIT-007 | Future date | Navigate to tomorrow | Checkboxes disabled | [ ] |
| HABIT-008 | Week view | Check habit today | Today column shows checkmark | [ ] |
| HABIT-009 | Streak calculation | Complete 3 days in a row | Streak shows 3 | [ ] |
| HABIT-010 | Data persists | Reload page | Habits still checked | [ ] |

### 5.2 Stats Verification

| Test ID | Test Case | Steps | Expected Result | Pass/Fail |
|---------|-----------|-------|-----------------|-----------|
| HABIT-S01 | Today count | Check 3 of 5 | Shows "3/5" | [ ] |
| HABIT-S02 | Week percent | Complete 2 full days | Shows 40% (10/25) | [ ] |
| HABIT-S03 | Best streak | Complete 5 days, break, complete 3 | Best shows 5 | [ ] |
| HABIT-S04 | Current streak | Miss yesterday | Current streak resets | [ ] |

### 5.3 Focus Habits (from Calculator)

| Test ID | Test Case | Steps | Expected Result | Pass/Fail |
|---------|-----------|-------|-----------------|-----------|
| HABIT-F01 | Focus URL param | Navigate with ?focus=no_sugar,sleep_7 | Banner appears, habits highlighted | [ ] |
| HABIT-F02 | Dismiss focus | Click "Got it" | Banner hides, URL cleaned | [ ] |

### 5.4 Data Management

| Test ID | Test Case | Steps | Expected Result | Pass/Fail |
|---------|-----------|-------|-----------------|-----------|
| HABIT-D01 | Export data | Click Export | JSON file downloads | [ ] |
| HABIT-D02 | Import data | Export, reset, import | Data restored | [ ] |
| HABIT-D03 | Invalid import | Import non-JSON file | Error shown | [ ] |
| HABIT-D04 | Reset data | Click Reset, confirm | All data cleared | [ ] |
| HABIT-D05 | Cancel reset | Click Reset, cancel | Data preserved | [ ] |

### 5.5 Edge Cases

| Test ID | Test Case | Steps | Expected Result | Pass/Fail |
|---------|-----------|-------|-----------------|-----------|
| HABIT-E01 | First day ever | Fresh install, no data | All zeros, no errors | [ ] |
| HABIT-E02 | Very old date | Navigate to 1 year ago | Page loads, can toggle | [ ] |
| HABIT-E03 | Timezone change | Change system timezone | Dates calculate correctly | [ ] |

---

## SECTION 6: Shopping List (shopping.html)

### 6.1 Recipe Tab Tests

| Test ID | Test Case | Steps | Expected Result | Pass/Fail |
|---------|-----------|-------|-----------------|-----------|
| SHOP-001 | Default view | Load page | Recipe Collection tab active, 32 recipes | [ ] |
| SHOP-002 | Filter by skill | Click "Easy" | Only easy recipes shown | [ ] |
| SHOP-003 | Filter by time | Click "Under 15min" | Only quick recipes shown | [ ] |
| SHOP-004 | Combine filters | Select Easy + Under 15min | Intersection of filters | [ ] |
| SHOP-005 | Remove filter | Click active filter | Filter removed | [ ] |
| SHOP-006 | Recipe details | Click recipe card | Details expand | [ ] |
| SHOP-007 | Close details | Click X or outside | Details collapse | [ ] |

### 6.2 Meal Plan Tab Tests

| Test ID | Test Case | Steps | Expected Result | Pass/Fail |
|---------|-----------|-------|-----------------|-----------|
| SHOP-008 | Switch to Meal Plan | Click tab | 7-day meal plan displays | [ ] |
| SHOP-009 | Print meal plan | Click Print | Print preview opens | [ ] |
| SHOP-010 | All days shown | Scroll through | Mon-Sun all visible | [ ] |

### 6.3 Power Foods Tab Tests

| Test ID | Test Case | Steps | Expected Result | Pass/Fail |
|---------|-----------|-------|-----------------|-----------|
| SHOP-011 | Switch to Power Foods | Click tab | Foods by tier displayed | [ ] |
| SHOP-012 | Tier 1 shown first | Check order | 4+ nutrients first | [ ] |
| SHOP-013 | Nutrient tags visible | View food cards | Nutrients listed | [ ] |

### 6.4 Shopping List Tab Tests

| Test ID | Test Case | Steps | Expected Result | Pass/Fail |
|---------|-----------|-------|-----------------|-----------|
| SHOP-014 | Switch to Shopping List | Click tab | Categorized food list appears | [ ] |
| SHOP-015 | Check item | Click checkbox | Item marked checked | [ ] |
| SHOP-016 | Uncheck item | Click checked item | Item unchecked | [ ] |
| SHOP-017 | Persist checks | Check items, reload | Checks preserved | [ ] |
| SHOP-018 | Uncheck all | Click "Uncheck All" | All items unchecked | [ ] |
| SHOP-019 | Copy list | Check 3 items, click Copy | Only checked items copied | [ ] |
| SHOP-020 | Print list | Click Print | Print preview with list | [ ] |
| SHOP-021 | Empty copy | No items checked, click Copy | Empty list or warning | [ ] |

### 6.5 Edge Cases

| Test ID | Test Case | Steps | Expected Result | Pass/Fail |
|---------|-----------|-------|-----------------|-----------|
| SHOP-E01 | All filters active | Enable all skill + all time | Should show all or none (check logic) | [ ] |
| SHOP-E02 | No matching recipes | Filter to impossible combo | "No recipes" message | [ ] |
| SHOP-E03 | Copy to clipboard denied | Deny clipboard permission | Error handled gracefully | [ ] |

---

## SECTION 7: Bloodwork Log (bloodwork.html)

### 7.1 Functional Tests

| Test ID | Test Case | Steps | Expected Result | Pass/Fail |
|---------|-----------|-------|-----------------|-----------|
| BLOOD-001 | Page loads | Navigate to bloodwork | Entry form and marker list visible | [ ] |
| BLOOD-002 | Add entry | Fill date + values, save | Entry saved, appears in history | [ ] |
| BLOOD-003 | Edit entry | Click existing entry | Values populate form | [ ] |
| BLOOD-004 | Delete entry | Click delete on entry | Entry removed after confirm | [ ] |
| BLOOD-005 | View trends | Click Trends tab | Charts/graphs display | [ ] |
| BLOOD-006 | Reference ranges | View markers | Optimal ranges shown | [ ] |
| BLOOD-007 | Marker status | Enter value in optimal | Green/good indicator | [ ] |
| BLOOD-008 | Out of range | Enter value outside optimal | Warning indicator | [ ] |

### 7.2 Data Validation

| Test ID | Test Case | Steps | Expected Result | Pass/Fail |
|---------|-----------|-------|-----------------|-----------|
| BLOOD-V01 | No date | Try to save without date | Error or disabled | [ ] |
| BLOOD-V02 | No values | Date only, save | Saves with nulls or error | [ ] |
| BLOOD-V03 | Negative number | Enter -10 for a value | Rejected or handled | [ ] |
| BLOOD-V04 | Very large number | Enter 99999 | Accepted (valid for some tests) | [ ] |
| BLOOD-V05 | Text in number | Type "abc" in value field | Rejected by browser | [ ] |

### 7.3 Edge Cases

| Test ID | Test Case | Steps | Expected Result | Pass/Fail |
|---------|-----------|-------|-----------------|-----------|
| BLOOD-E01 | First entry | No history | "No entries" message | [ ] |
| BLOOD-E02 | Many entries | Add 20+ entries | All display, scrollable | [ ] |
| BLOOD-E03 | Same date twice | Add two entries same date | Both saved or warning | [ ] |

---

## SECTION 8: Protocol Generator (protocol.html)

### 8.1 Functional Tests

| Test ID | Test Case | Steps | Expected Result | Pass/Fail |
|---------|-----------|-------|-----------------|-----------|
| PROTO-001 | Generate with data | Complete calc + symptoms, generate | Personalized protocol | [ ] |
| PROTO-002 | Generate empty | No prior data, generate | Generic protocol or prompt | [ ] |
| PROTO-003 | Print protocol | Click Print | Print-friendly layout | [ ] |
| PROTO-004 | Priority actions | View protocol | Actions ranked by importance | [ ] |
| PROTO-005 | Food recommendations | View protocol | Power foods listed | [ ] |
| PROTO-006 | Test recommendations | View protocol | Bloodwork tests suggested | [ ] |

### 8.2 Data Integration

| Test ID | Test Case | Steps | Expected Result | Pass/Fail |
|---------|-----------|-------|-----------------|-----------|
| PROTO-D01 | Calculator data | High sugar in calc | Sugar reduction emphasized | [ ] |
| PROTO-D02 | Symptom data | Fatigue + brain fog | B12, Iron highlighted | [ ] |
| PROTO-D03 | Combined data | Both calc + symptoms | Merged recommendations | [ ] |
| PROTO-D04 | Medication data | PPIs selected | B12 testing recommended | [ ] |

---

## SECTION 9: Supplement Guide (subtraction_supplement_guide.html)

### 9.1 Functional Tests

| Test ID | Test Case | Steps | Expected Result | Pass/Fail |
|---------|-----------|-------|-----------------|-----------|
| GUIDE-001 | Page loads | Navigate to guide | Content displays | [ ] |
| GUIDE-002 | Navigation | Click back to dashboard | Returns successfully | [ ] |
| GUIDE-003 | Tables readable | View on mobile | Tables scroll horizontally | [ ] |
| GUIDE-004 | Theme toggle | Toggle dark mode | All content readable | [ ] |
| GUIDE-005 | Print view | Print the guide | Formatted for print | [ ] |

---

## SECTION 10: Cross-Browser Testing

### 10.1 Browser Matrix

| Feature | Chrome | Firefox | Safari | Edge | iOS | Android |
|---------|--------|---------|--------|------|-----|---------|
| Page loads | [ ] | [ ] | [ ] | [ ] | [ ] | [ ] |
| Theme toggle | [ ] | [ ] | [ ] | [ ] | [ ] | [ ] |
| localStorage | [ ] | [ ] | [ ] | [ ] | [ ] | [ ] |
| Clipboard API | [ ] | [ ] | [ ] | [ ] | [ ] | [ ] |
| CSS Grid | [ ] | [ ] | [ ] | [ ] | [ ] | [ ] |
| CSS Variables | [ ] | [ ] | [ ] | [ ] | [ ] | [ ] |
| Flexbox | [ ] | [ ] | [ ] | [ ] | [ ] | [ ] |
| Print styling | [ ] | [ ] | [ ] | [ ] | [ ] | [ ] |
| PWA install | [ ] | [ ] | [ ] | [ ] | [ ] | [ ] |

---

## SECTION 11: Performance Testing

### 11.1 Load Time Targets

| Page | Target | Actual | Pass/Fail |
|------|--------|--------|-----------|
| Dashboard | < 1s | | [ ] |
| Shopping (largest) | < 2s | | [ ] |
| Calculator | < 1s | | [ ] |
| All others | < 1.5s | | [ ] |

### 11.2 Interaction Responsiveness

| Interaction | Target | Actual | Pass/Fail |
|-------------|--------|--------|-----------|
| Filter click | < 100ms | | [ ] |
| Tab switch | < 100ms | | [ ] |
| Habit toggle | < 50ms | | [ ] |
| Recipe expand | < 200ms | | [ ] |

---

## SECTION 12: Security Testing

### 12.1 Data Handling

| Test ID | Test Case | Steps | Expected Result | Pass/Fail |
|---------|-----------|-------|-----------------|-----------|
| SEC-001 | No data to server | Monitor network tab | No outbound requests | [ ] |
| SEC-002 | localStorage only | Check storage | All data in localStorage | [ ] |
| SEC-003 | Clear site data | Browser clear data | All user data removed | [ ] |

### 12.2 XSS Testing

| Test ID | Test Case | Steps | Expected Result | Pass/Fail |
|---------|-----------|-------|-----------------|-----------|
| SEC-004 | Script in input | Enter `<script>alert(1)</script>` | Script not executed | [ ] |
| SEC-005 | Malformed JSON import | Import crafted JSON | Graceful error | [ ] |

---

## SECTION 13: Bug Report Template

### Bug Report Format

```
BUG ID: [Auto-generated]
SEVERITY: Critical / High / Medium / Low
PAGE: [affected page]
BROWSER: [browser and version]
DEVICE: [desktop/mobile, OS]

STEPS TO REPRODUCE:
1.
2.
3.

EXPECTED RESULT:

ACTUAL RESULT:

SCREENSHOT: [attached]

NOTES:
```

---

## SECTION 14: Test Summary

### Overall Status

| Section | Total Tests | Passed | Failed | Blocked |
|---------|-------------|--------|--------|---------|
| Dashboard | | | | |
| Calculator | | | | |
| Symptoms | | | | |
| Medications | | | | |
| Habit Tracker | | | | |
| Shopping List | | | | |
| Bloodwork | | | | |
| Protocol | | | | |
| Guide | | | | |
| Cross-Browser | | | | |
| **TOTAL** | | | | |

### Critical Issues Found


### Recommendations


### Sign-off

| Role | Name | Date | Signature |
|------|------|------|-----------|
| QA Lead | | | |
| Developer | | | |
| Product Owner | | | |

---

**Thank you for your thorough testing.**
