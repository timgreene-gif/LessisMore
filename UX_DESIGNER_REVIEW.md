# UX Designer Review Document

**Application:** LessisMore - Subtraction Health Dashboard
**Review Date:** December 2024
**Purpose:** Expert evaluation of user experience, information architecture, and interaction design

---

## APPLICATION OVERVIEW

A Progressive Web App (PWA) for tracking nutrient depletions through lifestyle factors, symptoms, medications, and habits. All data stored locally in the browser.

### Pages/Flows:
1. **Dashboard** (index.html) - Hub linking to all tools
2. **Risk Calculator** (calculator.html) - 10-question assessment
3. **Symptom Mapper** (symptoms.html) - Symptom selection → deficiency mapping
4. **Medication Lookup** (medications.html) - Drug → nutrient depletion lookup
5. **Habit Tracker** (tracker.html) - Daily habit check-ins
6. **Shopping List** (shopping.html) - Power foods with recipes
7. **Bloodwork Log** (bloodwork.html) - Lab result tracking with trends
8. **Protocol Generator** (protocol.html) - Personalized action plan
9. **Supplement Guide** (subtraction_supplement_guide.html) - Educational content

---

## SECTION 1: Information Architecture

### 1.1 Current Site Map

```
Dashboard (index.html)
├── Understand Your Situation
│   ├── The Guide (subtraction_supplement_guide.html)
│   ├── Risk Calculator (calculator.html)
│   ├── Symptom Mapper (symptoms.html)
│   └── Medication Lookup (medications.html)
├── Take Action
│   ├── Habit Tracker (tracker.html)
│   ├── Shopping List (shopping.html)
│   └── Bloodwork Log (bloodwork.html)
└── Your Protocol
    └── Protocol Generator (protocol.html) [Capstone]
```

**Questions for Review:**
- [ ] Is the "Understand → Act → Protocol" flow intuitive?
- [ ] Are the category groupings logical?
- [ ] Is the capstone/protocol concept clear to users?
- [ ] Should any pages be combined or split?

### 1.2 Navigation Patterns

| Pattern | Implementation | Notes |
|---------|---------------|-------|
| Primary Nav | Dashboard hub with cards | No persistent nav bar |
| Back Navigation | "← Back to Dashboard" link on each page | Inconsistent placement |
| Cross-links | Footer links on some pages | Not consistent across pages |
| Progress Indication | Quiz progress bar (calculator, symptoms) | Only on multi-step flows |

**Questions for Review:**
- [ ] Should there be a persistent navigation bar?
- [ ] Is the hub-and-spoke model appropriate for this app?
- [ ] Are cross-links between related tools sufficient?

---

## SECTION 2: User Flows

### 2.1 Primary User Journey

```
1. Land on Dashboard
2. Take Risk Calculator (2 min)
3. Map Symptoms (optional)
4. Check Medications (optional)
5. Generate Protocol (combines all data)
6. Track Habits daily
7. Log Bloodwork (periodically)
8. Regenerate Protocol with new data
```

**Questions for Review:**
- [ ] Is the recommended flow obvious to new users?
- [ ] Should onboarding guide users through this sequence?
- [ ] Are there dead-ends where users don't know what to do next?

### 2.2 Calculator Flow

| Step | Screen | User Action |
|------|--------|-------------|
| 1 | Intro | Read description, click "Start Assessment" |
| 2 | Questions (1-10) | Select option, click "Next" |
| 3 | Results | View risk profile, click "Generate Protocol" |

**Questions for Review:**
- [ ] Is 10 questions too many/few?
- [ ] Is the option selection clear (single-select)?
- [ ] Are results actionable?

### 2.3 Shopping List Flow

| Tab | Purpose | Key Actions |
|-----|---------|-------------|
| Recipe Collection | Browse 32 recipes | Filter by skill/time, view details |
| 7-Day Meal Plan | Weekly menu | View, print |
| Power Foods | Top nutrient sources | View by tier |
| Shopping List | Grocery checklist | Check items, copy to clipboard |

**Questions for Review:**
- [ ] Is the tab structure intuitive?
- [ ] Is the relationship between recipes and shopping list clear?
- [ ] Is the "copy only checked items" behavior expected?

---

## SECTION 3: UI Components

### 3.1 Card Patterns

| Card Type | Used In | Purpose |
|-----------|---------|---------|
| Dashboard cards | index.html | Navigation to tools |
| Recipe cards | shopping.html | Display meal info |
| Day cards | shopping.html (meal plan) | Daily meal schedule |
| Power food cards | shopping.html | Nutrient-dense food info |
| Risk item cards | calculator.html (results) | Nutrient risk levels |
| Deficiency cards | symptoms.html (results) | Matched deficiencies |

**Questions for Review:**
- [ ] Are card styles consistent across pages?
- [ ] Is the information hierarchy within cards clear?
- [ ] Are interactive vs. static cards distinguishable?

### 3.2 Form Controls

| Control | Used In | Notes |
|---------|---------|-------|
| Radio-style options | calculator.html | Single select, custom styled |
| Checkbox buttons | symptoms.html | Multi-select symptoms |
| Filter chips | shopping.html | Skill/time filters |
| Tab buttons | shopping.html, bloodwork.html | Content switching |
| Checkboxes (custom) | shopping.html (list) | Item completion |
| Date picker | bloodwork.html | Native HTML date input |
| Number inputs | bloodwork.html | Lab values |

**Questions for Review:**
- [ ] Are custom controls accessible?
- [ ] Is the visual language consistent?
- [ ] Are required vs. optional fields clear?

### 3.3 Feedback Patterns

| Feedback Type | Implementation | Pages |
|---------------|----------------|-------|
| Success states | Green "✓ Saved" notices | calculator, symptoms, medications |
| Progress | Animated progress bar | calculator |
| Celebration | "All habits complete!" banner | tracker |
| Empty states | "No data yet" messages | bloodwork, tracker |
| Confirmation dialogs | Browser alert() | Various (delete actions) |

**Questions for Review:**
- [ ] Are success/error states visible enough?
- [ ] Should alerts be replaced with inline feedback?
- [ ] Is the celebration appropriately motivating?

---

## SECTION 4: Mobile Experience

### 4.1 Responsive Breakpoints

| Breakpoint | Adaptations |
|------------|-------------|
| < 500px | Single column grids, stacked layouts |
| < 600px | Simplified meal plan layout |
| All sizes | Touch-friendly tap targets (generally good) |

### 4.2 Mobile-Specific Issues to Review

- [ ] Horizontal scrolling in tables (bloodwork, supplement guide)
- [ ] Filter chip overflow on small screens
- [ ] Tab bar scrollability indication
- [ ] Touch target sizes (44x44px minimum)
- [ ] Thumb zone accessibility for key actions

### 4.3 PWA Features

| Feature | Status |
|---------|--------|
| Manifest | ✓ Present |
| Service Worker | ✓ Registered |
| Install Prompt | ✓ Custom UI |
| Offline Support | Partial (needs review) |

---

## SECTION 5: Visual Design

### 5.1 Color System

| Color | Usage | Hex |
|-------|-------|-----|
| Primary Teal | Headers, accents, CTAs | #1a5f5f |
| Light Teal | Backgrounds, hover states | #e8f4f4 |
| Red/Coral | High risk, streaks, warnings | #e85a4f |
| Yellow/Orange | Medium risk, warnings | #f0ad4e |
| Green | Low risk, success, healthy | #4a7c59 |
| Purple | Medications page accent | #8e44ad |

**Questions for Review:**
- [ ] Is the color system consistent?
- [ ] Are risk levels (red/yellow/green) immediately understandable?
- [ ] Does the medications page purple feel out of place?

### 5.2 Dark Mode

| Aspect | Implementation |
|--------|---------------|
| Toggle | Fixed position button (top-right) |
| Persistence | localStorage |
| Coverage | All pages |
| Contrast | Custom dark theme variables |

**Questions for Review:**
- [ ] Are contrast ratios sufficient in dark mode?
- [ ] Is the toggle discoverable?
- [ ] Any components that break in dark mode?

### 5.3 Typography

| Element | Style |
|---------|-------|
| Font Family | Segoe UI, Tahoma, sans-serif |
| Headers | 16-28px, bold |
| Body | 11-14px |
| Labels | 10-12px, often uppercase |

**Questions for Review:**
- [ ] Is the type hierarchy clear?
- [ ] Is body text readable (size, line-height)?
- [ ] Are labels too small for some users?

---

## SECTION 6: Specific Page Reviews

### 6.1 Dashboard (index.html)

**Strengths:**
- Clear visual hierarchy
- Engaging card hover effects
- Privacy badge builds trust
- PWA install prompt

**Potential Issues:**
- [ ] No clear starting point for new users
- [ ] "Capstone" terminology may confuse
- [ ] Quote takes significant space
- [ ] Cards don't indicate completion status

### 6.2 Calculator (calculator.html)

**Strengths:**
- Clear progress indication
- One question per screen (focused)
- Immediate visual feedback on selection
- Results saved automatically

**Potential Issues:**
- [ ] Can't skip questions
- [ ] No way to review answers before submission
- [ ] Results page is dense

### 6.3 Symptom Mapper (symptoms.html)

**Strengths:**
- Category tabs reduce overwhelm
- Selected symptoms visible in bar
- Clear analyze button

**Potential Issues:**
- [ ] Category tabs not visually connected to symptoms
- [ ] "None yet" feels negative
- [ ] Results ordering logic unclear to users

### 6.4 Shopping List (shopping.html)

**Strengths:**
- Comprehensive filtering
- Visual skill/time badges
- Print functionality
- Persistent checked state

**Potential Issues:**
- [ ] Four tabs may overwhelm
- [ ] Copy behavior (checked only) may surprise users
- [ ] Recipe cards very dense
- [ ] No search within recipes

### 6.5 Habit Tracker (tracker.html)

**Strengths:**
- Gamification (streaks, celebration)
- Week-at-a-glance view
- Date navigation
- Focus habits from calculator

**Potential Issues:**
- [ ] Can't add custom habits
- [ ] Limited habit descriptions
- [ ] No reminders/notifications
- [ ] Week view hard to read on mobile

### 6.6 Protocol Generator (protocol.html)

**Strengths:**
- Aggregates all user data
- Prioritized actions
- 30-day timeline
- Print-friendly

**Potential Issues:**
- [ ] "Generate" button without data shows generic protocol
- [ ] No progress tracking against protocol
- [ ] Long scrolling page

---

## SECTION 7: Usability Heuristics

### Nielsen's 10 Heuristics Assessment

| Heuristic | Rating | Notes |
|-----------|--------|-------|
| Visibility of system status | ⭐⭐⭐ | Good progress bars, could show more data status |
| Match real world | ⭐⭐⭐⭐ | Nutrition language appropriate |
| User control | ⭐⭐⭐ | Can go back, but no undo |
| Consistency | ⭐⭐⭐ | Mostly consistent, medications page differs |
| Error prevention | ⭐⭐⭐ | Confirm dialogs on delete |
| Recognition over recall | ⭐⭐⭐⭐ | Visual cards, persistent state |
| Flexibility | ⭐⭐ | Limited customization |
| Aesthetic design | ⭐⭐⭐⭐ | Clean, modern look |
| Error recovery | ⭐⭐ | Limited error handling |
| Help & documentation | ⭐⭐ | Guide exists but not contextual |

---

## SECTION 8: Recommended Improvements

### Priority 1: Critical
- [ ] Add onboarding flow for new users
- [ ] Make the "copy checked items" behavior explicit
- [ ] Improve mobile table scrolling indicators

### Priority 2: High
- [ ] Add persistent navigation or breadcrumbs
- [ ] Show data status on dashboard (which assessments complete)
- [ ] Add search to recipes
- [ ] Improve week view readability on mobile

### Priority 3: Medium
- [ ] Unify medications page styling with rest of app
- [ ] Add contextual help/tooltips
- [ ] Replace alert() dialogs with inline notifications
- [ ] Add progress tracking in protocol

### Priority 4: Nice to Have
- [ ] Custom habit creation
- [ ] Notifications/reminders for habits
- [ ] Recipe favorites/bookmarks
- [ ] Meal plan customization

---

## REVIEWER NOTES

### Overall Impressions:


### Critical Issues:


### Recommended Focus Areas:


### Design System Suggestions:


---

**Thank you for your expert review.**
