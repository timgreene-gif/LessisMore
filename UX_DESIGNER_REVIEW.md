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
- [x] Is the "Understand → Act → Protocol" flow intuitive?
  - **ASSESSMENT**: The flow is logical and follows established behavior change models (awareness → action → maintenance)
  - **IMPROVEMENT**: The dashboard doesn't clearly communicate this progression—add visual journey indicator
  - **CONCERN**: Users may not understand they should complete "Understand" tools before "Take Action"
- [x] Are the category groupings logical?
  - **VERIFIED**: Groupings align with user mental models (learn first, then act)
  - **SUGGESTION**: Consider renaming "Your Protocol" to "Your Plan" (more accessible language)
- [x] Is the capstone/protocol concept clear to users?
  - **ISSUE**: "Capstone" is academic jargon—replace with "Your Personalized Plan" or "Summary"
  - **UX PATTERN**: Capstone should visually connect to prior tools (show which data it pulls from)
- [x] Should any pages be combined or split?
  - **CONSIDER COMBINING**: Symptom Mapper + Risk Calculator could be unified flow
  - **KEEP SEPARATE**: Shopping List tabs work well as is—don't split
  - **CONSIDER**: Bloodwork log is low frequency use; could be secondary navigation

### 1.2 Navigation Patterns

| Pattern | Implementation | Notes |
|---------|---------------|-------|
| Primary Nav | Dashboard hub with cards | No persistent nav bar |
| Back Navigation | "← Back to Dashboard" link on each page | Inconsistent placement |
| Cross-links | Footer links on some pages | Not consistent across pages |
| Progress Indication | Quiz progress bar (calculator, symptoms) | Only on multi-step flows |

**Questions for Review:**
- [x] Should there be a persistent navigation bar?
  - **RECOMMENDATION**: No—hub-and-spoke is appropriate for this app's task-focused nature
  - **HOWEVER**: Add a minimal "Home" button or breadcrumb on each page for orientation
  - Current "← Back to Dashboard" is functional but could be more visually consistent
- [x] Is the hub-and-spoke model appropriate for this app?
  - **YES**: Users perform discrete tasks; they don't need constant navigation between tools
  - **SUPPORTS**: Focus on completing one task at a time without distraction
  - **RISK**: Users may feel "trapped" in longer flows like the calculator quiz
- [x] Are cross-links between related tools sufficient?
  - **INSUFFICIENT**: After Calculator results, suggest Symptom Mapper as next step
  - **ADD**: "What's Next?" section at end of each tool pointing to logical next steps
  - **IMPLEMENT**: Progress indicator on dashboard showing completed vs. pending tools

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
- [x] Is the recommended flow obvious to new users?
  - **NO**: Dashboard presents all options equally—no clear "start here"
  - **FIX**: Add "First time? Start with the Risk Calculator →" callout
  - **CONSIDER**: First-visit tooltip or modal explaining the recommended flow
- [x] Should onboarding guide users through this sequence?
  - **YES**: Light onboarding would significantly improve first-time experience
  - **SUGGESTION**: 3-step intro: "1) Understand your risks, 2) Take action, 3) Get your plan"
  - **DON'T OVERDO IT**: Keep it dismissable; power users will want to skip
- [x] Are there dead-ends where users don't know what to do next?
  - **YES - Calculator Results**: No clear next action after viewing results
  - **YES - Bloodwork Log**: After logging, no suggestion to regenerate protocol
  - **IMPROVEMENT**: Every tool completion should offer 1-2 "next step" suggestions

### 2.2 Calculator Flow

| Step | Screen | User Action |
|------|--------|-------------|
| 1 | Intro | Read description, click "Start Assessment" |
| 2 | Questions (1-10) | Select option, click "Next" |
| 3 | Results | View risk profile, click "Generate Protocol" |

**Questions for Review:**
- [x] Is 10 questions too many/few?
  - **APPROPRIATE**: 10 questions is within acceptable range (research suggests 5-12 optimal)
  - **ENHANCEMENT**: Add progress bar with "Question 3 of 10" text label
  - **CONSIDERATION**: Could offer "quick" (5 questions) vs "thorough" (10) option
- [x] Is the option selection clear (single-select)?
  - **MOSTLY CLEAR**: Visual selection state works well
  - **IMPROVEMENT**: Add subtle radio button visual to reinforce single-select behavior
  - **ISSUE**: No way to deselect—what if user changes mind?
- [x] Are results actionable?
  - **PARTIALLY**: Results show risk levels but actions are implicit
  - **IMPROVEMENT**: Add "What you can do" bullet for each high-risk nutrient
  - **ADD CTA**: Prominent "Generate Your Protocol →" button below results

### 2.3 Shopping List Flow

| Tab | Purpose | Key Actions |
|-----|---------|-------------|
| Recipe Collection | Browse 32 recipes | Filter by skill/time, view details |
| 7-Day Meal Plan | Weekly menu | View, print |
| Power Foods | Top nutrient sources | View by tier |
| Shopping List | Grocery checklist | Check items, copy to clipboard |

**Questions for Review:**
- [x] Is the tab structure intuitive?
  - **MOSTLY YES**: Tabs are well-labeled and functional
  - **ISSUE**: "Power Foods" vs "Shopping List" distinction may confuse some users
  - **SUGGESTION**: Consider "Browse Foods" → "My Shopping List" labeling
- [x] Is the relationship between recipes and shopping list clear?
  - **UNCLEAR**: No direct connection between recipe ingredients and shopping list
  - **IMPROVEMENT**: Add "Add ingredients to list" button on each recipe card
  - **IDEAL STATE**: Recipe → auto-populates shopping list would be magical UX
- [x] Is the "copy only checked items" behavior expected?
  - **LIKELY NOT**: Users may expect "copy list" to copy all items
  - **CRITICAL FIX**: Add explicit label: "Copy Checked Items" instead of "Copy List"
  - **FEEDBACK**: Show toast with "X items copied to clipboard" confirmation

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
- [x] Are card styles consistent across pages?
  - **MOSTLY YES**: Card patterns are recognizable across the app
  - **INCONSISTENCY**: Recipe cards denser than dashboard cards—consider harmonizing
  - **SUGGESTION**: Create 2-3 card variants (navigation, content, action) and use consistently
- [x] Is the information hierarchy within cards clear?
  - **GOOD**: Title → metadata → content hierarchy is generally clear
  - **IMPROVEMENT**: Recipe cards could use clearer visual separation between sections
  - **ISSUE**: Nutrient badges on recipe cards compete for attention with time/skill badges
- [x] Are interactive vs. static cards distinguishable?
  - **NEEDS WORK**: Dashboard cards have hover states but some content cards don't
  - **FIX**: Add cursor:pointer and subtle hover lift to all clickable cards
  - **PATTERN**: Use border or shadow change on interactive elements

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
- [x] Are custom controls accessible?
  - **CONCERN**: Custom checkboxes (shopping list, habits) may not be keyboard accessible
  - **DEFER TO**: Accessibility Specialist review for detailed findings
  - **NOTE**: Custom radio-style options in calculator need keyboard support
- [x] Is the visual language consistent?
  - **MOSTLY CONSISTENT**: Teal accent used throughout; filter chips have uniform style
  - **INCONSISTENCY**: Bloodwork page date picker uses native styling vs custom elsewhere
  - **IMPROVEMENT**: Standardize all form control styling
- [x] Are required vs. optional fields clear?
  - **NOT APPLICABLE**: Most interactions are selections, not form fields
  - **BLOODWORK PAGE**: Input fields don't indicate required vs optional
  - **SUGGESTION**: Use asterisk or "(required)" label for mandatory fields

### 3.3 Feedback Patterns

| Feedback Type | Implementation | Pages |
|---------------|----------------|-------|
| Success states | Green "✓ Saved" notices | calculator, symptoms, medications |
| Progress | Animated progress bar | calculator |
| Celebration | "All habits complete!" banner | tracker |
| Empty states | "No data yet" messages | bloodwork, tracker |
| Confirmation dialogs | Browser alert() | Various (delete actions) |

**Questions for Review:**
- [x] Are success/error states visible enough?
  - **SUCCESS STATES**: Green "✓ Saved" notices are subtle but appropriate
  - **ERROR STATES**: Limited error feedback—what happens on localStorage failure?
  - **IMPROVEMENT**: Use toast notifications for transient feedback
- [x] Should alerts be replaced with inline feedback?
  - **YES ABSOLUTELY**: Browser alert() blocks interaction and feels dated
  - **REPLACE WITH**: Toast/snackbar for success messages
  - **REPLACE WITH**: Inline error messages near the affected element
- [x] Is the celebration appropriately motivating?
  - **YES**: "All habits complete!" banner is encouraging without being excessive
  - **ENHANCEMENT**: Consider subtle confetti animation for streak milestones
  - **CAUTION**: Don't over-gamify—this is a health tool, not a game

---

## SECTION 4: Mobile Experience

### 4.1 Responsive Breakpoints

| Breakpoint | Adaptations |
|------------|-------------|
| < 500px | Single column grids, stacked layouts |
| < 600px | Simplified meal plan layout |
| All sizes | Touch-friendly tap targets (generally good) |

### 4.2 Mobile-Specific Issues to Review

- [x] Horizontal scrolling in tables (bloodwork, supplement guide)
  - **ISSUE CONFIRMED**: Tables force horizontal scroll on mobile
  - **FIX**: Use responsive tables (stacked layout) or horizontal scroll indicator
  - **PRIORITY**: Medium—tables are secondary content
- [x] Filter chip overflow on small screens
  - **ISSUE CONFIRMED**: Filter chips may wrap awkwardly on 320px screens
  - **FIX**: Use horizontal scroll with fade indicator for filter rows
- [x] Tab bar scrollability indication
  - **NEEDS IMPROVEMENT**: No visual cue that tabs are scrollable if they overflow
  - **FIX**: Add fade/gradient on edges to hint at more content
- [x] Touch target sizes (44x44px minimum)
  - **MOSTLY GOOD**: Buttons and checkboxes appear adequately sized
  - **CHECK**: Filter chips may be too small—verify 44x44px minimum
- [x] Thumb zone accessibility for key actions
  - **ISSUE**: Primary actions (Next, Save) should be in lower thumb zone on mobile
  - **IMPROVEMENT**: Move key CTAs to bottom of screen on mobile

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
- [x] Is the color system consistent?
  - **MOSTLY YES**: Teal primary is well-established throughout
  - **ISSUE**: Semantic colors (risk levels) need documentation
  - **RECOMMENDATION**: Create formal color palette with named tokens
- [x] Are risk levels (red/yellow/green) immediately understandable?
  - **YES**: Traffic light metaphor is universally understood
  - **ACCESSIBILITY NOTE**: Ensure colors aren't sole indicator (add icons/text)
  - **ENHANCEMENT**: Consider using severity shapes (triangle warning, etc.)
- [x] Does the medications page purple feel out of place?
  - **YES**: Purple accent breaks the established teal palette
  - **RECOMMENDATION**: Use teal with a secondary differentiator (icon, layout)
  - **ALTERNATIVE**: If color differentiation is intentional, document it as system

### 5.2 Dark Mode

| Aspect | Implementation |
|--------|---------------|
| Toggle | Fixed position button (top-right) |
| Persistence | localStorage |
| Coverage | All pages |
| Contrast | Custom dark theme variables |

**Questions for Review:**
- [x] Are contrast ratios sufficient in dark mode?
  - **DEFER TO**: Accessibility Specialist for detailed contrast audit
  - **INITIAL OBSERVATION**: Some muted text may be too low contrast
  - **RECOMMENDATION**: Test all color combinations with contrast checker
- [x] Is the toggle discoverable?
  - **PARTIALLY**: Fixed position top-right is standard but small
  - **IMPROVEMENT**: Add label on hover/focus "Switch to dark/light mode"
  - **CONSIDERATION**: Respect system preference (prefers-color-scheme)
- [x] Any components that break in dark mode?
  - **RISK**: Images/icons with transparent backgrounds may not invert properly
  - **CHECK**: Verify all emojis remain visible in dark mode
  - **TEST**: Risk level colors on dark backgrounds

### 5.3 Typography

| Element | Style |
|---------|-------|
| Font Family | Segoe UI, Tahoma, sans-serif |
| Headers | 16-28px, bold |
| Body | 11-14px |
| Labels | 10-12px, often uppercase |

**Questions for Review:**
- [x] Is the type hierarchy clear?
  - **MOSTLY YES**: Headers, body, and labels are distinguishable
  - **IMPROVEMENT**: Define formal type scale (h1=28px, h2=22px, etc.)
  - **CONSISTENCY**: Apply same scale across all pages
- [x] Is body text readable (size, line-height)?
  - **CONCERN**: 11px body text is below recommended minimum (14-16px ideal)
  - **LINE HEIGHT**: Should be 1.4-1.6 for body text; verify current values
  - **RECOMMENDATION**: Increase minimum font size to 14px for accessibility
- [x] Are labels too small for some users?
  - **YES**: 10-12px labels may be difficult for users with vision impairments
  - **FIX**: Minimum 12px for labels; consider 14px for critical labels
  - **UPPERCASE ISSUE**: All-caps at small sizes reduces readability

---

## SECTION 6: Specific Page Reviews

### 6.1 Dashboard (index.html)

**Strengths:**
- Clear visual hierarchy
- Engaging card hover effects
- Privacy badge builds trust
- PWA install prompt

**Potential Issues:**
- [x] No clear starting point for new users
  - **CRITICAL**: Add "Start Here" visual cue on Risk Calculator card
  - **SOLUTION**: Highlight first card or add "Begin your journey" section
- [x] "Capstone" terminology may confuse
  - **CONFIRMED**: Academic term; replace with "Your Personalized Plan"
- [x] Quote takes significant space
  - **ACCEPTABLE**: Quote adds personality but could be smaller
  - **SUGGESTION**: Make collapsible or move to footer on mobile
- [x] Cards don't indicate completion status
  - **HIGH VALUE FIX**: Add checkmark or badge for completed tools
  - **IMPLEMENTATION**: Query localStorage for saved results, show indicator

### 6.2 Calculator (calculator.html)

**Strengths:**
- Clear progress indication
- One question per screen (focused)
- Immediate visual feedback on selection
- Results saved automatically

**Potential Issues:**
- [x] Can't skip questions
  - **DESIGN DECISION**: Mandatory completion ensures accurate results
  - **ACCEPTABLE**: As long as this is communicated ("All questions required")
- [x] No way to review answers before submission
  - **IMPROVEMENT**: Add "Review Answers" step before final results
  - **ALTERNATIVE**: Allow editing from results page with "Retake Quiz"
- [x] Results page is dense
  - **CONFIRMED**: Information overload risk
  - **FIX**: Progressive disclosure—show summary first, details on expand
  - **PRIORITY**: Lead with top 3 risks, then "See all results"

### 6.3 Symptom Mapper (symptoms.html)

**Strengths:**
- Category tabs reduce overwhelm
- Selected symptoms visible in bar
- Clear analyze button

**Potential Issues:**
- [x] Category tabs not visually connected to symptoms
  - **ISSUE**: Tab → content relationship not visually clear
  - **FIX**: Use connected tab design (active tab flows into content area)
- [x] "None yet" feels negative
  - **FIX**: Change to "Select symptoms above to get started" (positive framing)
  - **ENHANCEMENT**: Add encouraging empty state illustration
- [x] Results ordering logic unclear to users
  - **IMPROVEMENT**: Add label "Ranked by match strength" above results
  - **ENHANCEMENT**: Show percentage match or "X of Y symptoms match"

### 6.4 Shopping List (shopping.html)

**Strengths:**
- Comprehensive filtering
- Visual skill/time badges
- Print functionality
- Persistent checked state

**Potential Issues:**
- [x] Four tabs may overwhelm
  - **ACCEPTABLE**: Four tabs is within cognitive limit
  - **IMPROVEMENT**: Consider grouping Recipes + Meal Plan, and Power Foods + Shopping List
- [x] Copy behavior (checked only) may surprise users
  - **CRITICAL UX FIX**: Button should say "Copy Checked Items" not "Copy List"
  - **ADD**: Item count feedback "Copy 5 checked items"
- [x] Recipe cards very dense
  - **CONFIRMED**: Too much information visible at once
  - **FIX**: Show title + key badges; reveal details on click/expand
- [x] No search within recipes
  - **HIGH VALUE ADD**: Search by ingredient, nutrient, or recipe name
  - **PRIORITY**: Medium—filters provide some functionality

### 6.5 Habit Tracker (tracker.html)

**Strengths:**
- Gamification (streaks, celebration)
- Week-at-a-glance view
- Date navigation
- Focus habits from calculator

**Potential Issues:**
- [x] Can't add custom habits
  - **FEATURE REQUEST**: Allow custom habit creation would increase engagement
  - **PRIORITY**: Medium—core habits are well-curated
- [x] Limited habit descriptions
  - **IMPROVEMENT**: Add "Why this matters" tooltip for each habit
  - **CONNECTS TO**: Link habits back to nutrient goals
- [x] No reminders/notifications
  - **LIMITATION**: PWA notifications require user permission and have limited browser support
  - **ALTERNATIVE**: Add "Add to calendar" export feature
- [x] Week view hard to read on mobile
  - **CONFIRMED**: 7-day grid doesn't work on 320px screens
  - **FIX**: Use 3-4 day sliding window or vertical day list on mobile

### 6.6 Protocol Generator (protocol.html)

**Strengths:**
- Aggregates all user data
- Prioritized actions
- 30-day timeline
- Print-friendly

**Potential Issues:**
- [x] "Generate" button without data shows generic protocol
  - **ISSUE**: Users may not realize they're seeing generic vs personalized results
  - **FIX**: Show data source indicators "Based on: Calculator ✓, Symptoms ✗, Medications ✗"
  - **ENHANCEMENT**: Prompt to complete missing assessments
- [x] No progress tracking against protocol
  - **HIGH VALUE ADD**: Allow marking protocol items as "Done" or "In Progress"
  - **CONNECTS TO**: Habit tracker integration opportunity
- [x] Long scrolling page
  - **ACCEPTABLE**: Print-friendly format requires full content
  - **IMPROVEMENT**: Add sticky navigation or table of contents for sections
  - **MOBILE**: Consider collapsible sections on mobile

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
- [x] Add onboarding flow for new users
  - **RECOMMENDATION**: 3-step intro explaining the journey
  - **IMPLEMENTATION**: Modal on first visit, dismissable, stores preference
- [x] Make the "copy checked items" behavior explicit
  - **RECOMMENDATION**: Change button label to "Copy Checked Items (X)"
  - **IMPLEMENTATION**: Simple text change + dynamic count
- [x] Improve mobile table scrolling indicators
  - **RECOMMENDATION**: Add horizontal scroll shadow/fade indicators
  - **IMPLEMENTATION**: CSS-only solution possible

### Priority 2: High
- [x] Add persistent navigation or breadcrumbs
  - **RECOMMENDATION**: Minimal home button + breadcrumb on each page
  - **JUSTIFICATION**: Improves orientation without heavy nav bar
- [x] Show data status on dashboard (which assessments complete)
  - **RECOMMENDATION**: Badge/checkmark on completed tool cards
  - **HIGH IMPACT**: Creates sense of progress and completeness
- [x] Add search to recipes
  - **RECOMMENDATION**: Search by title, ingredient, or nutrient
  - **IMPLEMENTATION**: Client-side filtering of existing data
- [x] Improve week view readability on mobile
  - **RECOMMENDATION**: 3-day sliding window or vertical list on mobile
  - **BREAKPOINT**: Below 400px screen width

### Priority 3: Medium
- [x] Unify medications page styling with rest of app
  - **RECOMMENDATION**: Replace purple accent with teal
  - **IMPLEMENTATION**: CSS variable change
- [x] Add contextual help/tooltips
  - **RECOMMENDATION**: "?" icons with hover/tap explanations
  - **FOCUS ON**: Complex terms (e.g., "optimal ranges", nutrient names)
- [x] Replace alert() dialogs with inline notifications
  - **RECOMMENDATION**: Toast notification component
  - **IMPLEMENTATION**: CSS + minimal JS
- [x] Add progress tracking in protocol
  - **RECOMMENDATION**: Checkbox for each action item
  - **PERSISTENCE**: Save to localStorage

### Priority 4: Nice to Have
- [x] Custom habit creation
  - **VALUE**: Increases personalization and engagement
  - **COMPLEXITY**: Medium—requires habit management UI
- [x] Notifications/reminders for habits
  - **VALUE**: High for retention
  - **COMPLEXITY**: High—browser notification API + permission handling
- [x] Recipe favorites/bookmarks
  - **VALUE**: Medium—convenience feature
  - **COMPLEXITY**: Low—localStorage + heart icon
- [x] Meal plan customization
  - **VALUE**: High—personalization
  - **COMPLEXITY**: High—significant UI work

---

## REVIEWER NOTES

### Overall Impressions:

**Strengths:**
- Clean, modern visual design with consistent teal palette
- Logical information architecture following understand → act → plan flow
- Good use of progressive disclosure in quiz flows
- Privacy-first approach (localStorage) builds trust
- Dark mode implementation is thorough

**Weaknesses:**
- First-time user experience lacks guidance
- Some pages feel information-dense (recipe cards, results pages)
- Mobile experience needs refinement in several areas
- Browser alert() dialogs feel dated
- Copy behavior ambiguity is a genuine usability issue

### Critical Issues:

1. **"Copy List" button ambiguity** - Users will expect all items, get checked only. Simple label fix.

2. **No clear starting point** - New users don't know where to begin. High-impact, low-effort fix.

3. **Mobile week view** - 7-day grid breaks on small screens. Impacts daily engagement use case.

### Recommended Focus Areas:

1. **First-Time User Experience** - Add light onboarding, "start here" indicators, completion badges
2. **Mobile Polish** - Table scrolling, week view, thumb zone CTAs
3. **Feedback & Confirmation** - Replace alerts with toasts, add copy confirmation
4. **Navigation Clarity** - Consistent back links, breadcrumbs, "what's next" suggestions

### Design System Suggestions:

1. **Document Color Palette** - Primary, secondary, semantic colors with usage guidelines
2. **Create Typography Scale** - Standardize h1-h6, body, labels, captions
3. **Define Card Variants** - Navigation cards, content cards, action cards
4. **Component Library** - Buttons, chips, checkboxes, tabs as reusable patterns
5. **Spacing System** - 4px/8px grid for consistent whitespace

---

## OVERALL ASSESSMENT

**Usability**: ⭐⭐⭐⭐ (4/5) - Solid foundation, minor friction points identified

**Visual Design**: ⭐⭐⭐⭐ (4/5) - Clean and consistent, medications page exception

**Mobile Experience**: ⭐⭐⭐ (3/5) - Functional but needs polish

**Information Architecture**: ⭐⭐⭐⭐ (4/5) - Logical flow, needs better signposting

**Recommendation**: APPROVED with improvements. Prioritize copy button label fix, first-time user guidance, and mobile week view before broader rollout.

---

**Review completed by: UX Designer (simulated expert review)**
**Date: December 2024**
