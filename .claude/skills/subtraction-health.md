---
name: subtraction-health
description: Extends Subtraction Health app with new nutrients, foods, medications, or symptoms. Use when adding health data, updating depletion mappings, or maintaining consistency across HTML tool files.
---

# Subtraction Health Development Guide

## Project Structure

```
├── index.html          # Homepage with conversion flow
├── calculator.html     # Risk assessment quiz
├── protocol.html       # Generated action plan
├── symptoms.html       # Symptom-to-deficiency mapper
├── medications.html    # Drug-nutrient depletion lookup
├── shopping.html       # Power foods shopping list
├── tracker.html        # Daily habit tracker
├── bloodwork.html      # Lab results logger
└── subtraction_supplement_guide.html  # Reference guide
```

## Core Data Structures

### Nutrients (calculator.html, protocol.html)

```javascript
const nutrients = {
  magnesium: { name: 'Magnesium', score: 0 },
  b_vitamins: { name: 'B Vitamins', score: 0 },
  vitamin_c: { name: 'Vitamin C', score: 0 },
  vitamin_d: { name: 'Vitamin D', score: 0 },
  iron: { name: 'Iron', score: 0 },
  zinc: { name: 'Zinc', score: 0 },
  calcium: { name: 'Calcium', score: 0 },
  chromium: { name: 'Chromium', score: 0 },
  potassium: { name: 'Potassium', score: 0 },
  omega3: { name: 'Omega-3s', score: 0 }
};
```

### NutrientDB (protocol.html)

```javascript
const nutrientDB = {
  magnesium: {
    name: 'Magnesium',
    test: 'RBC Magnesium',
    foods: 'Pumpkin seeds, spinach, dark chocolate, almonds',
    signs: 'Cramps, twitches, anxiety, insomnia'
  },
  // ... add new nutrients following this pattern
};
```

### Power Foods (shopping.html)

```javascript
const powerFoods = [
  { name: 'Eggs', category: 'Protein', nutrients: ['B12', 'Vitamin D', 'Choline'], ... },
  // Add new foods with: name, category, nutrients array, serving, tip
];
```

## Adding New Content

### Add a Nutrient

1. **calculator.html**: Add to `nutrients` object and update relevant questions' `depletes` arrays
2. **protocol.html**: Add to `nutrientDB` with name, test, foods, signs
3. **symptoms.html**: Add symptoms that map to the nutrient
4. **bloodwork.html**: Add to markers list if testable

### Add a Food

1. **shopping.html**: Add to `powerFoods` array with:
   - `name`: Display name
   - `category`: 'Protein' | 'Vegetables' | 'Nuts & Seeds' | 'Seafood' | 'Fruits' | 'Other'
   - `nutrients`: Array of nutrient abbreviations
   - `serving`: Recommended serving size
   - `tip`: Usage tip

### Add a Medication

1. **medications.html**: Add to `medications` array with:
   - `name`: Generic name
   - `brand`: Common brand names (array)
   - `category`: Drug class
   - `depletes`: Array of nutrient keys

### Add a Symptom

1. **symptoms.html**: Add to `symptomData` with:
   - `name`: Symptom description
   - `category`: Body system
   - `deficiencies`: Array of { nutrient, strength: 'strong' | 'moderate' }

## Style Conventions

- **Accent color**: `#1a5f5f` (teal)
- **CSS variables**: Use `var(--accent)`, `var(--text-primary)`, etc.
- **Dark mode**: Support `[data-theme="dark"]` variants
- **Mobile-first**: Breakpoints at 500px, 400px

## localStorage Keys

| Key | Purpose |
|-----|---------|
| `calculator_results` | Risk assessment results |
| `symptom_results` | Mapped symptoms |
| `medication_results` | Medication depletions |
| `bloodwork_logs` | Lab results array |
| `subtraction_habits` | Habit tracking data |
| `email_leads` | Captured email addresses |
| `theme` | 'light' or 'dark' |

## Checklist for Changes

- [ ] Update all files that reference the data
- [ ] Maintain alphabetical/logical ordering
- [ ] Test dark mode appearance
- [ ] Test mobile responsiveness
- [ ] Verify localStorage saves correctly
- [ ] Check cross-page data flow (calculator → protocol)
