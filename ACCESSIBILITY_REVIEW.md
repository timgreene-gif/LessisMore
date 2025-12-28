# Accessibility Specialist Review Document

**Application:** LessisMore - Subtraction Health Dashboard
**Review Date:** December 2024
**Purpose:** WCAG 2.1 AA compliance audit and accessibility improvement recommendations

---

## EXECUTIVE SUMMARY

This document provides a comprehensive accessibility audit of the LessisMore application against WCAG 2.1 AA guidelines. Each section identifies issues, provides code examples, and suggests remediation.

---

## SECTION 1: Perceivable

### 1.1 Text Alternatives (WCAG 1.1.1)

**Emoji Usage Without Text Alternatives:**

| Location | Emoji | Issue |
|----------|-------|-------|
| Dashboard cards | 📖 🎯 🩺 💊 ✓ 🛒 🔬 📋 | Decorative but convey meaning |
| Symptom categories | ⚡ 🧠 😴 💪 ✨ 🛡️ | Used as category labels |
| Theme toggle | 🌙 ☀️ | Functional buttons |
| Risk levels | 🔥 | High risk indicator |

**Current Implementation (problematic):**
```html
<div class="card-icon learn">📖</div>
<button class="theme-toggle">🌙</button>
```

**Recommended Fix:**
```html
<div class="card-icon learn" aria-hidden="true">📖</div>
<button class="theme-toggle" aria-label="Toggle dark mode">
    <span aria-hidden="true">🌙</span>
</button>
```

**Checklist:**
- [ ] Add aria-label to all emoji-only buttons
- [ ] Add aria-hidden="true" to decorative emojis
- [ ] Ensure emoji meaning is conveyed in text nearby

### 1.2 Color Contrast (WCAG 1.4.3)

**Colors to Audit:**

| Element | Foreground | Background | Ratio | Pass/Fail |
|---------|------------|------------|-------|-----------|
| Body text | #333 | #ffffff | 12.6:1 | ✓ Pass |
| Muted text | #999 | #ffffff | 2.85:1 | ❌ Fail |
| Link text | #1a5f5f | #ffffff | 5.6:1 | ✓ Pass |
| Teal on light teal | #1a5f5f | #e8f4f4 | 4.2:1 | ✓ Pass (barely) |
| White on teal | #ffffff | #1a5f5f | 5.6:1 | ✓ Pass |
| Feature tags | #666 | #f5f5f5 | 5.7:1 | ✓ Pass |
| Detail text | #666 | #ffffff | 5.7:1 | ✓ Pass |

**Dark Mode Concerns:**
| Element | Foreground | Background | Ratio | Pass/Fail |
|---------|------------|------------|-------|-----------|
| Muted text | #777 | #1e1e1e | 4.0:1 | ⚠️ Borderline |
| Secondary text | #aaa | #1e1e1e | 7.2:1 | ✓ Pass |

**Checklist:**
- [ ] Fix muted text (#999) - increase to at least #767676
- [ ] Audit all dark mode color combinations
- [ ] Check risk level badges (red/yellow/green on various backgrounds)

### 1.3 Color as Information (WCAG 1.4.1)

**Risk Level Indicators:**
The risk calculator and symptom mapper use color-coded results:
- Red = High risk
- Yellow/Orange = Medium risk
- Green = Low risk

**Current Implementation (problematic):**
```html
<div class="risk-item high">
    <div class="nutrient">Magnesium</div>
    <div class="score">12</div>
    <div class="level">high</div>  <!-- Text label helps! -->
</div>
```

**Assessment:** Partially accessible - text labels ("high", "medium", "low") are present alongside colors. However:

**Checklist:**
- [ ] Verify text labels are always visible (not just on hover)
- [ ] Add icons alongside colors (e.g., ⚠️ for high)
- [ ] Ensure color is never the ONLY indicator

### 1.4 Text Resizing (WCAG 1.4.4)

**Issues:**
- [ ] Test at 200% zoom
- [ ] Check for text truncation
- [ ] Verify horizontal scrolling doesn't hide content

**Fixed pixel sizes found:**
```css
font-size: 11px;  /* Multiple places */
font-size: 9px;   /* Very small - accessibility concern */
font-size: 10px;  /* Small */
```

**Checklist:**
- [ ] Convert to rem/em units for scalability
- [ ] Minimum font size should be 12px (0.75rem)
- [ ] Test with browser zoom and text-only zoom

### 1.5 Reflow (WCAG 1.4.10)

**Horizontal Scroll Areas:**
| Page | Element | Issue |
|------|---------|-------|
| bloodwork.html | Data tables | Horizontal scroll on mobile |
| subtraction_supplement_guide.html | Tables | Wrapped in `.table-wrapper` with overflow-x |
| shopping.html | Meal plan | Complex grid layout |

**Checklist:**
- [ ] Tables should be responsive or stackable on mobile
- [ ] Ensure no loss of content when reflowing
- [ ] Test at 320px viewport width

---

## SECTION 2: Operable

### 2.1 Keyboard Navigation (WCAG 2.1.1)

**Interactive Elements Assessment:**

| Element | Keyboard Accessible? | Focus Visible? |
|---------|---------------------|----------------|
| Dashboard cards (links) | ✓ Yes | ⚠️ Default only |
| Quiz options (divs) | ❌ No | N/A |
| Symptom buttons | ✓ Yes (buttons) | ⚠️ Default only |
| Habit checkboxes (divs) | ❌ No | N/A |
| Shopping list checks (divs) | ❌ No | N/A |
| Tab buttons | ✓ Yes | ⚠️ Default only |
| Filter chips | ✓ Yes (buttons) | ⚠️ Default only |
| Theme toggle | ✓ Yes | ⚠️ Default only |

**Critical Issues - Custom Controls Not Keyboard Accessible:**

**1. Quiz Options (calculator.html):**
```html
<!-- Current (not accessible) -->
<div class="option" onclick="selectOption(${idx})">...</div>

<!-- Should be -->
<button class="option" onclick="selectOption(${idx})"
        aria-pressed="${selected}">...</button>
```

**2. Habit Checkboxes (tracker.html):**
```html
<!-- Current (not accessible) -->
<div class="habit-checkbox" onclick="toggleHabit('${h.id}')">...</div>

<!-- Should be -->
<input type="checkbox" id="${h.id}"
       onchange="toggleHabit('${h.id}')"
       ${checked ? 'checked' : ''}>
<label for="${h.id}">${h.name}</label>
```

**3. Shopping List Checkboxes (shopping.html):**
```html
<!-- Current (not accessible) -->
<div class="food-check ${checkedItems[f.name] ? 'checked' : ''}"
     onclick="toggleItem('${f.name}')">...</div>

<!-- Should be -->
<input type="checkbox" id="food-${f.name}"
       onchange="toggleItem('${f.name}')"
       ${checkedItems[f.name] ? 'checked' : ''}>
```

**Checklist:**
- [ ] Replace all interactive divs with buttons or native controls
- [ ] Add tabindex="0" to any remaining custom controls
- [ ] Add keyboard event handlers (Enter, Space)
- [ ] Test full app with keyboard only

### 2.2 Focus Visibility (WCAG 2.4.7)

**Current State:**
- Relies on browser default focus indicators
- Some custom buttons may override focus styles

**Recommended Addition to CSS:**
```css
:focus-visible {
    outline: 3px solid #e85a4f;
    outline-offset: 2px;
}

/* Remove for mouse users */
:focus:not(:focus-visible) {
    outline: none;
}
```

**Checklist:**
- [ ] Add visible focus indicators to all interactive elements
- [ ] Ensure focus indicator has 3:1 contrast ratio
- [ ] Test focus visibility in both light and dark modes

### 2.3 Skip Links (WCAG 2.4.1)

**Current State:** No skip links present

**Recommended Addition:**
```html
<body>
    <a href="#main-content" class="skip-link">Skip to main content</a>
    ...
    <main id="main-content">
```

```css
.skip-link {
    position: absolute;
    left: -9999px;
}
.skip-link:focus {
    position: fixed;
    top: 10px;
    left: 10px;
    z-index: 9999;
    padding: 10px 20px;
    background: #1a5f5f;
    color: white;
}
```

**Checklist:**
- [ ] Add skip link to all pages
- [ ] Link to main content area
- [ ] Ensure skip link is visible on focus

### 2.4 Page Titles (WCAG 2.4.2)

**Current Titles:**
| Page | Title |
|------|-------|
| index.html | "Subtraction Health Dashboard" ✓ |
| calculator.html | "Nutrient Depletion Risk Calculator" ✓ |
| symptoms.html | "Symptom → Deficiency Mapper" ✓ |
| shopping.html | "Nutrient-Dense Kitchen" ✓ |
| tracker.html | "Subtraction Habits Tracker" ✓ |

**Assessment:** Good - all pages have unique, descriptive titles.

### 2.5 Focus Order (WCAG 2.4.3)

**Potential Issues:**
- [ ] Fixed position theme toggle may be out of tab order context
- [ ] Modal-like recipe details may not trap focus
- [ ] Tab panels need proper focus management

**Checklist:**
- [ ] Verify logical tab order on all pages
- [ ] Test with screen reader for focus announcements
- [ ] Ensure modals/overlays trap focus appropriately

### 2.6 Timing (WCAG 2.2.1)

**Assessment:** No timeouts found. User can take as long as needed.

✓ Passes

---

## SECTION 3: Understandable

### 3.1 Language (WCAG 3.1.1)

**Current State:**
```html
<html lang="en">
```

✓ All pages have lang="en" attribute.

### 3.2 Input Errors (WCAG 3.3.1)

**Current Error Handling:**
| Interaction | Error Handling |
|-------------|----------------|
| Quiz - no selection | Next button disabled |
| Bloodwork - invalid number | Browser validation |
| Import file - invalid JSON | alert('Invalid file') |

**Issues:**
- [ ] Error messages use alert() - not accessible
- [ ] No inline error messages
- [ ] No error announcements for screen readers

**Recommended Pattern:**
```html
<div role="alert" id="error-message" aria-live="polite">
    Please enter a valid number
</div>
```

### 3.3 Labels and Instructions (WCAG 3.3.2)

**Form Labels Assessment:**

| Form Element | Label Present? | Notes |
|--------------|---------------|-------|
| Bloodwork date input | ❌ No | Just placeholder |
| Bloodwork value inputs | ⚠️ Visual only | Column headers serve as labels |
| Filter inputs | ⚠️ Visual only | Button text describes function |

**Bloodwork Page Issue:**
```html
<!-- Current (not accessible) -->
<input type="date" id="entryDate">
<input type="number" placeholder="Value">

<!-- Should be -->
<label for="entryDate">Entry Date</label>
<input type="date" id="entryDate">

<label for="vitd-value">Vitamin D Value (ng/mL)</label>
<input type="number" id="vitd-value">
```

**Checklist:**
- [ ] Add visible or screen-reader-only labels to all inputs
- [ ] Add aria-describedby for helper text
- [ ] Add aria-required for required fields

---

## SECTION 4: Robust

### 4.1 Valid HTML (WCAG 4.1.1)

**Issues to Check:**
- [ ] Run through W3C HTML validator
- [ ] Check for duplicate IDs
- [ ] Verify proper nesting

**Known Concerns:**
- Dynamic IDs may conflict if same recipe/food names
- Some inline event handlers

### 4.2 Name, Role, Value (WCAG 4.1.2)

**Custom Controls Audit:**

| Control | Name | Role | State |
|---------|------|------|-------|
| Theme toggle | ❌ Missing | ❌ No role | ❌ No state |
| Quiz options | ⚠️ Text content | ❌ No role | ❌ No selected state |
| Habit checkboxes | ⚠️ Text nearby | ❌ No role | ⚠️ Visual only |
| Shopping checkboxes | ⚠️ Text nearby | ❌ No role | ⚠️ Visual only |
| Tabs | ✓ Text content | ❌ No role | ⚠️ Visual only |
| Filter chips | ✓ Text content | ✓ button | ⚠️ No pressed state |

**Tab Panel Implementation Needed:**
```html
<!-- Current -->
<button class="tab active" onclick="switchTab('recipes')">Recipe Collection</button>

<!-- Should be -->
<div role="tablist">
    <button role="tab"
            id="recipes-tab"
            aria-selected="true"
            aria-controls="recipes-panel">
        Recipe Collection
    </button>
</div>
<div role="tabpanel"
     id="recipes-panel"
     aria-labelledby="recipes-tab">
    ...
</div>
```

**Toggle Button Pattern:**
```html
<button aria-pressed="true" onclick="toggleFilter('easy')">
    Easy
</button>
```

---

## SECTION 5: Screen Reader Testing

### 5.1 Landmarks

**Current Landmark Structure:**
```
<body>
    <div class="container">  <!-- No landmark -->
        <header>...</header>  <!-- ✓ banner -->
        <div class="card">... <!-- No landmark -->
    </div>
</body>
```

**Recommended Structure:**
```html
<body>
    <header role="banner">...</header>
    <nav role="navigation">...</nav>
    <main role="main" id="main-content">...</main>
    <footer role="contentinfo">...</footer>
</body>
```

**Checklist:**
- [ ] Add `<main>` element to all pages
- [ ] Add `<nav>` for navigation areas
- [ ] Use `<section>` with aria-label for major regions
- [ ] Add `<footer>` for page footer content

### 5.2 Headings

**Heading Structure Assessment:**

**index.html:**
```
h1: Subtraction Health  ✓
  (no h2s - just visual "section-title" spans)
```

**calculator.html:**
```
h1: Nutrient Depletion Risk Calculator  ✓
  h2: [Question text]  ✓
  h2: Your Depletion Risk Profile (in results)  ✓
    h3: Your Top Depletion Factors  ✓
    h3: Priority Actions  ✓
```

**Issues:**
- [ ] Some pages skip heading levels
- [ ] Visual hierarchy doesn't always match heading structure
- [ ] "section-title" class used instead of headings on dashboard

**Checklist:**
- [ ] Ensure logical heading hierarchy (h1 → h2 → h3)
- [ ] No skipped heading levels
- [ ] One h1 per page

### 5.3 Live Regions

**Dynamic Content Updates:**
| Update | Announced? | Fix Needed |
|--------|------------|------------|
| Quiz progress | ❌ No | Add aria-live |
| Habit streak change | ❌ No | Add aria-live |
| Filter results count | ❌ No | Add aria-live |
| Results loading | ❌ No | Add aria-live |
| Success messages | ❌ No | Add role="alert" |

**Recommended Additions:**
```html
<!-- Progress announcement -->
<div aria-live="polite" class="sr-only" id="progress-announce">
    Question 3 of 10
</div>

<!-- Results count -->
<div aria-live="polite" id="results-count">
    Showing 12 recipes
</div>

<!-- Success feedback -->
<div role="alert" id="success-message">
    Copied to clipboard!
</div>
```

---

## SECTION 6: Priority Issues

### Critical (Must Fix)

1. **Custom checkboxes not keyboard accessible**
   - Habit tracker checkboxes
   - Shopping list checkboxes
   - Impact: Users cannot complete core functionality

2. **Quiz options not keyboard accessible**
   - Calculator quiz options are divs with onclick
   - Impact: Cannot complete assessment

3. **Missing form labels**
   - Bloodwork inputs lack proper labels
   - Impact: Screen reader users cannot identify inputs

### High Priority

4. **Focus indicators insufficient**
   - Default only, may not meet contrast requirements

5. **No skip links**
   - No way to bypass repeated navigation

6. **Live regions missing**
   - Dynamic updates not announced

### Medium Priority

7. **Emoji accessibility**
   - Emojis used for meaning without text alternatives

8. **Tab panels lack ARIA**
   - Not properly structured for assistive technology

9. **Color contrast in muted text**
   - #999 fails WCAG AA

---

## SECTION 7: Testing Checklist

### Automated Testing
- [ ] Run axe DevTools on all pages
- [ ] Run WAVE on all pages
- [ ] Run Lighthouse accessibility audit
- [ ] Validate HTML with W3C validator

### Manual Testing
- [ ] Complete all flows using keyboard only
- [ ] Test with screen reader (NVDA/VoiceOver)
- [ ] Test at 200% zoom
- [ ] Test with high contrast mode
- [ ] Test with reduced motion preference

### Assistive Technology Testing
- [ ] NVDA + Firefox
- [ ] VoiceOver + Safari
- [ ] JAWS + Chrome (if available)
- [ ] TalkBack on Android
- [ ] VoiceOver on iOS

---

## REVIEWER NOTES

### Critical Barriers Found:


### WCAG Conformance Level:


### Recommended Remediation Timeline:


### Additional Observations:


---

**Thank you for your expert review.**
