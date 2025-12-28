# LessisMore Implementation Plan

**Based on:** All 5 SME Review Documents
**Created:** December 2024
**Goal:** Address all critical, high, and medium priority issues identified

---

## Executive Summary

The SME reviews identified **keyboard accessibility** as the single most critical issue, blocking both users and testing. This plan organizes fixes into 4 phases, prioritized by:
1. User safety (Dietitian warnings)
2. User access (Accessibility fixes)
3. Code robustness (Developer fixes)
4. User experience (UX improvements)

**Total Estimated Effort:** 20-25 hours

---

## Phase 1: Critical Safety & Accessibility (Priority: BLOCKING)

**Timeline:** First
**Estimated Effort:** 6-8 hours

### 1.1 Keyboard Accessibility Fixes (Accessibility Specialist - Critical)

**Files to modify:**
- `calculator.html` - Quiz option buttons
- `tracker.html` - Habit checkboxes
- `shopping.html` - Shopping list checkboxes

**Changes needed:**

#### calculator.html - Quiz Options
```javascript
// BEFORE: <div class="option" onclick="selectOption(${idx})">
// AFTER:
<button
  class="option"
  role="radio"
  aria-checked="${selected === idx}"
  tabindex="0"
  onclick="selectOption(${idx})"
  onkeydown="handleOptionKey(event, ${idx})">
```

Add keyboard handler:
```javascript
function handleOptionKey(e, idx) {
  if (e.key === 'Enter' || e.key === ' ') {
    e.preventDefault();
    selectOption(idx);
  }
}
```

#### tracker.html - Habit Checkboxes
```javascript
// BEFORE: <div class="habit-checkbox" onclick="toggleHabit('${h.id}')">
// AFTER:
<input
  type="checkbox"
  id="habit-${h.id}"
  class="habit-checkbox"
  ${isCompleted ? 'checked' : ''}
  onchange="toggleHabit('${h.id}')"
  aria-label="${h.name}">
<label for="habit-${h.id}">${h.name}</label>
```

#### shopping.html - Shopping List Checkboxes
```javascript
// BEFORE: <div class="food-checkbox" onclick="toggleItem('${f.name}')">
// AFTER:
<input
  type="checkbox"
  id="item-${f.name.replace(/\s/g, '-')}"
  class="food-checkbox"
  ${checkedItems[f.name] ? 'checked' : ''}
  onchange="toggleItem('${f.name}')"
  aria-label="${f.name}">
```

### 1.2 Safety Warnings (Dietitian - Critical)

**Files to modify:**
- `medications.html` - Add Warfarin/Vitamin K warning
- `protocol.html` - Add iron/potassium warnings
- `symptoms.html` - Add "red flag" symptoms guidance

**Changes needed:**

#### Add to medications.html (before the lookup tool):
```html
<div class="warning-box" role="alert">
  <strong>⚠️ Critical Interactions:</strong>
  <ul>
    <li><strong>Warfarin users:</strong> Changes in Vitamin K intake can affect your INR. Consult your doctor before dietary changes.</li>
    <li><strong>Blood pressure medications:</strong> Potassium supplements can cause dangerous interactions.</li>
  </ul>
</div>
```

#### Add iron warning to protocol.html:
```html
<div class="warning-box">
  <strong>⚠️ Before supplementing iron:</strong> Men and post-menopausal women should test ferritin levels first.
  Iron overload (hemochromatosis) affects 1 in 200 people of Northern European descent.
</div>
```

### 1.3 Form Labels (Accessibility - Critical)

**Files to modify:**
- `bloodwork.html` - Add labels to all input fields

```html
<!-- BEFORE -->
<input type="number" id="vitd-value" placeholder="ng/mL">

<!-- AFTER -->
<label for="vitd-value">Vitamin D (25-OH)</label>
<input type="number" id="vitd-value" placeholder="ng/mL" aria-describedby="vitd-hint">
<span id="vitd-hint" class="hint">Optimal: 50-80 ng/mL</span>
```

---

## Phase 2: Error Handling & Code Quality (Priority: HIGH)

**Timeline:** Second
**Estimated Effort:** 4-6 hours

### 2.1 localStorage Error Handling (Front-end Developer)

**Create new utility file:** `js/storage.js` (or inline in each file initially)

```javascript
// Safe localStorage wrapper
function safeGetItem(key, defaultValue = null) {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultValue;
  } catch (e) {
    console.error(`Failed to load ${key}:`, e);
    return defaultValue;
  }
}

function safeSetItem(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch (e) {
    if (e.name === 'QuotaExceededError') {
      showToast('Storage full. Please clear old data.');
    } else {
      console.error(`Failed to save ${key}:`, e);
    }
    return false;
  }
}
```

**Files to update:** All 9 HTML files - replace direct localStorage calls

### 2.2 Clipboard Error Handling (Front-end Developer)

**File:** `shopping.html`

```javascript
// BEFORE:
navigator.clipboard.writeText(text).then(() => alert('Copied!'));

// AFTER:
function copyList() {
  const checked = foods.filter(f => checkedItems[f.name]);

  if (checked.length === 0) {
    showToast('No items checked. Select items first.');
    return;
  }

  // ... build text ...

  navigator.clipboard.writeText(text)
    .then(() => showToast(`${checked.length} items copied!`))
    .catch(() => showToast('Copy failed. Please select and copy manually.'));
}
```

### 2.3 XSS Protection (Front-end Developer)

**Add to all files:**

```javascript
function escapeHtml(str) {
  if (typeof str !== 'string') return str;
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}
```

**Apply to:** All innerHTML template literals that include user/stored data

### 2.4 Toast Notification System (Replace alert())

**Add to all files:**

```html
<div id="toast" class="toast" role="alert" aria-live="polite"></div>
```

```css
.toast {
  position: fixed;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  background: var(--card-bg);
  color: var(--text);
  padding: 12px 24px;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.3);
  opacity: 0;
  transition: opacity 0.3s;
  z-index: 1000;
}
.toast.show { opacity: 1; }
```

```javascript
function showToast(message, duration = 3000) {
  const toast = document.getElementById('toast');
  toast.textContent = message;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), duration);
}
```

---

## Phase 3: Accessibility Compliance (Priority: HIGH)

**Timeline:** Third
**Estimated Effort:** 4-5 hours

### 3.1 Skip Links (All Pages)

**Add as first element in body:**
```html
<a href="#main-content" class="skip-link">Skip to main content</a>
```

```css
.skip-link {
  position: absolute;
  left: -9999px;
  z-index: 999;
  padding: 8px 16px;
  background: var(--accent);
  color: white;
}
.skip-link:focus {
  left: 10px;
  top: 10px;
}
```

**Wrap main content:**
```html
<main id="main-content">
  <!-- existing content -->
</main>
```

### 3.2 Focus Indicators (All Pages)

**Add to CSS:**
```css
:focus-visible {
  outline: 3px solid var(--accent);
  outline-offset: 2px;
}

/* Remove default outline only if focus-visible supported */
:focus:not(:focus-visible) {
  outline: none;
}
```

### 3.3 Color Contrast Fixes

**Update CSS variables:**
```css
:root {
  /* BEFORE: --text-muted: #999; (2.85:1 - FAILS) */
  --text-muted: #666;  /* 5.7:1 - PASSES */
}

[data-theme="dark"] {
  /* BEFORE: --text-muted: #777; (4.0:1 - borderline) */
  --text-muted: #999;  /* 5.3:1 on #1e1e1e - PASSES */
}
```

### 3.4 Live Regions for Dynamic Content

**Add to pages with dynamic updates:**
```html
<div id="status-announcer" class="sr-only" aria-live="polite"></div>
```

```css
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  border: 0;
}
```

```javascript
function announce(message) {
  const announcer = document.getElementById('status-announcer');
  announcer.textContent = message;
}
```

---

## Phase 4: UX Improvements (Priority: MEDIUM)

**Timeline:** Fourth
**Estimated Effort:** 6-8 hours

### 4.1 Copy Button Label Fix (shopping.html)

```html
<!-- BEFORE -->
<button onclick="copyList()">Copy List</button>

<!-- AFTER -->
<button onclick="copyList()">Copy Checked Items</button>
```

### 4.2 First-Time User Guidance (index.html)

**Add "Start Here" indicator:**
```javascript
// Check if user has completed calculator
const hasCalcResults = localStorage.getItem('calculator_results');

// If not, highlight the calculator card
if (!hasCalcResults) {
  document.querySelector('[href="calculator.html"]').classList.add('start-here');
}
```

```css
.start-here::before {
  content: "Start Here →";
  position: absolute;
  top: -10px;
  left: 10px;
  background: var(--accent);
  color: white;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 12px;
}
```

### 4.3 Completion Badges on Dashboard

```javascript
function updateDashboardBadges() {
  const completed = {
    calculator: !!localStorage.getItem('calculator_results'),
    symptoms: !!localStorage.getItem('symptom_results'),
    medications: !!localStorage.getItem('medications_results'),
    bloodwork: !!localStorage.getItem('bloodwork_entries')
  };

  Object.entries(completed).forEach(([key, done]) => {
    const card = document.querySelector(`[href="${key}.html"]`);
    if (card && done) {
      card.classList.add('completed');
    }
  });
}
```

```css
.completed::after {
  content: "✓";
  position: absolute;
  top: 10px;
  right: 10px;
  background: #4a7c59;
  color: white;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}
```

### 4.4 Mobile Week View Fix (tracker.html)

```css
@media (max-width: 400px) {
  .week-grid {
    display: flex;
    flex-direction: column;
  }

  .day-cell {
    display: flex;
    justify-content: space-between;
    padding: 8px;
    border-bottom: 1px solid var(--border);
  }
}
```

---

## Implementation Order

| Order | Task | File(s) | Effort | Impact |
|-------|------|---------|--------|--------|
| 1 | Keyboard accessibility - calculator | calculator.html | 1.5h | Critical |
| 2 | Keyboard accessibility - tracker | tracker.html | 1h | Critical |
| 3 | Keyboard accessibility - shopping | shopping.html | 1h | Critical |
| 4 | Safety warnings | medications.html, protocol.html | 1h | Critical |
| 5 | Form labels | bloodwork.html | 1h | Critical |
| 6 | localStorage wrapper | all files | 2h | High |
| 7 | Clipboard error handling | shopping.html | 30m | High |
| 8 | Toast notification system | all files | 1.5h | High |
| 9 | XSS protection | all files | 1h | High |
| 10 | Skip links | all files | 1h | High |
| 11 | Focus indicators | all files | 30m | High |
| 12 | Color contrast | all files | 30m | Medium |
| 13 | Live regions | key pages | 1h | Medium |
| 14 | Copy button label | shopping.html | 5m | Medium |
| 15 | First-time user guidance | index.html | 1h | Medium |
| 16 | Completion badges | index.html | 1h | Medium |
| 17 | Mobile week view | tracker.html | 1h | Medium |

---

## Testing After Each Phase

### After Phase 1:
- [ ] Complete all flows using keyboard only
- [ ] Verify quiz options respond to Enter/Space
- [ ] Verify habit checkboxes are focusable
- [ ] Verify shopping checkboxes are focusable
- [ ] Check safety warnings are visible

### After Phase 2:
- [ ] Test localStorage disabled scenario
- [ ] Test clipboard permission denied
- [ ] Verify toast notifications appear
- [ ] Verify no XSS in bloodwork inputs

### After Phase 3:
- [ ] Run axe DevTools on all pages
- [ ] Test skip link functionality
- [ ] Verify focus indicators visible
- [ ] Test with NVDA/VoiceOver

### After Phase 4:
- [ ] Verify copy button says "Copy Checked Items"
- [ ] Check first-time user sees "Start Here"
- [ ] Verify completion badges appear
- [ ] Test mobile week view at 320px

---

## Success Criteria

- [ ] WCAG 2.1 AA compliant (target: 90+ Lighthouse score)
- [ ] All 9 blocked QA test cases now pass
- [ ] Zero critical safety warnings missing
- [ ] Zero unhandled errors in console
- [ ] Works offline (PWA)
- [ ] Works in all target browsers

---

**Plan Status:** Ready for approval
**Next Step:** Begin Phase 1 implementation upon approval
