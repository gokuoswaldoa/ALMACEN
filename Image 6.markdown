---
name: Pastel Logistics
colors:
  surface: '#faf8ff'
  surface-dim: '#d2d9f4'
  surface-bright: '#faf8ff'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f2f3ff'
  surface-container: '#eaedff'
  surface-container-high: '#e2e7ff'
  surface-container-highest: '#dae2fd'
  on-surface: '#131b2e'
  on-surface-variant: '#3c4a42'
  inverse-surface: '#283044'
  inverse-on-surface: '#eef0ff'
  outline: '#6c7a71'
  outline-variant: '#bbcabf'
  surface-tint: '#006c49'
  primary: '#006c49'
  on-primary: '#ffffff'
  primary-container: '#10b981'
  on-primary-container: '#00422b'
  inverse-primary: '#4edea3'
  secondary: '#6b38d4'
  on-secondary: '#ffffff'
  secondary-container: '#8455ef'
  on-secondary-container: '#fffbff'
  tertiary: '#006398'
  on-tertiary: '#ffffff'
  tertiary-container: '#4aaaef'
  on-tertiary-container: '#003c5e'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#6ffbbe'
  primary-fixed-dim: '#4edea3'
  on-primary-fixed: '#002113'
  on-primary-fixed-variant: '#005236'
  secondary-fixed: '#e9ddff'
  secondary-fixed-dim: '#d0bcff'
  on-secondary-fixed: '#23005c'
  on-secondary-fixed-variant: '#5516be'
  tertiary-fixed: '#cce5ff'
  tertiary-fixed-dim: '#93ccff'
  on-tertiary-fixed: '#001d31'
  on-tertiary-fixed-variant: '#004b73'
  background: '#faf8ff'
  on-background: '#131b2e'
  surface-variant: '#dae2fd'
typography:
  display:
    fontFamily: Plus Jakarta Sans
    fontSize: 32px
    fontWeight: '700'
    lineHeight: 40px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 24px
    fontWeight: '700'
    lineHeight: 32px
    letterSpacing: -0.015em
  headline-lg-mobile:
    fontFamily: Plus Jakarta Sans
    fontSize: 22px
    fontWeight: '700'
    lineHeight: 28px
    letterSpacing: -0.015em
  headline-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 20px
    fontWeight: '600'
    lineHeight: 26px
    letterSpacing: -0.01em
  headline-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 18px
    fontWeight: '600'
    lineHeight: 24px
    letterSpacing: 0em
  body-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 16px
    fontWeight: '500'
    lineHeight: 24px
    letterSpacing: 0em
  body-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
    letterSpacing: 0em
  body-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 13px
    fontWeight: '400'
    lineHeight: 18px
    letterSpacing: 0.01em
  label-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 14px
    fontWeight: '600'
    lineHeight: 20px
    letterSpacing: 0.01em
  label-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 12px
    fontWeight: '600'
    lineHeight: 16px
    letterSpacing: 0.02em
  label-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 11px
    fontWeight: '700'
    lineHeight: 14px
    letterSpacing: 0.04em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  thumb-touch-min: 3rem
  thumb-reach-pad: 5.5rem
  inset-xs: 0.25rem
  inset-sm: 0.5rem
  inset-md: 0.75rem
  inset-base: 1rem
  inset-lg: 1.25rem
  inset-xl: 1.5rem
  gap-stack: 0.75rem
  gutter-mobile: 1rem
  margin-screen: 1rem
---

## Brand & Style

This design system reimagines high-velocity inventory management through a calming, human-centric aesthetic. Warehouse and inventory environments are traditionally high-stress, noisy, and visually cluttered with dense monochrome terminal screens. This system counteracts cognitive fatigue by introducing an airy, soft-pastel visual language that feels calm, tactile, and effortless without sacrificing operational rigor.

The core style bridges modern soft-minimalism and ergonomic utility. Large, approachable touch targets cater to rapid one-handed mobile input on the move, while rounded geometry conveys accessibility and precision. High-contrast typography paired with soft pastel semantic grouping allows workers to rapidly scan batch numbers, bin locations, and stock levels at an arm’s length under varying warehouse lighting conditions.

## Colors

The palette balances soft pastel containers with deeply saturated functional ink colors to preserve strict WCAG AAA contrast for numerical and logistical readouts.

- **Background & Canvas**: Root canvas sits at `#F8FAFC` with surface containers elevated via `#FFFFFF` and muted zones at `#F1F5F9`.
- **Primary (Mint / Emerald)**: Container backgrounds leverage soft mint (`#D1FAE5` to `#A7F3D0`), anchored by functional text/action color `#065F46` and interactive controls at `#10B981` / `#059669`. Used for stock confirmations, healthy replenishment tiers, and complete scan cycles.
- **Secondary (Lavender)**: Container fills utilize gentle lavender (`#EDE9FE` to `#DDD6FE`), anchored by `#5B21B6` and action points at `#8B5CF6`. Used for SKU groupings, bin assignments, and automated system adjustments.
- **Tertiary (Ice Blue)**: Pill fills leverage ice blue (`#E0F2FE` to `#BAE6FD`) with `#075985` text. Used for location telemetry, transit states, and item dimensions.
- **Accent (Pale Peach)**: Tints use `#FFEDD5` to `#FED7AA` with `#9A3412` text. Applied strategically for low stock warnings, re-count requests, and priority picks.
- **Neutrals**: Typography and primary borders use a balanced slate ramp: `#0F172A` (Headings & Values), `#334155` (Body text), `#64748B` (Secondary labels & units), and `#E2E8F0` (Structural hairpins & dividers).

## Typography

Plus Jakarta Sans provides high legibility under motion due to its tall x-height, open apertures, and geometric clarity. 

- Use tabular numbers (`font-variant-numeric: tabular-nums`) across all numerical metrics, item counts, barcode values, and inventory levels to prevent layout shifts during batch scanning.
- High-priority scan identifiers (e.g., Bin IDs, Bay Numbers) must be set in `label-lg` or `headline-md` with `font-weight: 700` to ensure effortless recognition from a typical hand-to-eye working distance (40–60 cm).
- Uppercase styling is reserved strictly for micro-labels (`label-sm`) such as unit classifications (PCS, BOX, PLT) and location flags.

## Layout & Spacing

The layout is architected around a single-column fluid model optimized for one-handed thumb interaction (thumb zone navigation).

- **The Natural Reach Zone**: All primary batch confirmation triggers, barcode scanner openers, and quantity adjusters must reside within the bottom 35% of the mobile viewport. Critical scan outputs appear in the neutral middle zone, while static references (warehouse map badges, user status) remain in the hard-to-reach upper zone.
- **Touch Target Integrity**: Interactive controls must maintain a minimum target size of `48px` (`3rem`), with `52px` to `56px` preferred for bottom actions to allow error-free use with gloved or wet hands.
- **Vertical Spacing Cadence**: Vertical cards use a baseline stack gap of `12px` (`0.75rem`). Safe area padding at the bottom of the viewport enforces `thumb-reach-pad` (`5.5rem`) to guarantee fixed floating buttons never obscure the final item in a scrollable batch list.

## Elevation & Depth

Depth is established through soft, diffused ambient light rather than harsh structural borders. Shadow rings carry subtle chromatic tinting derived from slate and cool neutral tones to avoid muddiness on pastel card backgrounds.

- **Level 0 (Floor)**: Canvas background `#F8FAFC`, zero shadow.
- **Level 1 (Resting Inventory Cards)**: Pure white `#FFFFFF` surface accompanied by a dual-layer soft ambient cast: `0 2px 4px -1px rgba(15, 23, 42, 0.03), 0 4px 12px -2px rgba(15, 23, 42, 0.05)`.
- **Level 2 (Active Touch & Swiped States)**: Elevated cards while dragging or selecting: `0 8px 20px -4px rgba(15, 23, 42, 0.08), 0 4px 8px -2px rgba(15, 23, 42, 0.04)`.
- **Level 3 (Sticky Ergonomic Actions & Modals)**: Bottom floating action sheets and thumb triggers: `0 12px 28px -6px rgba(15, 23, 42, 0.10), 0 4px 12px -2px rgba(15, 23, 42, 0.05)`.
- **Boundary Control**: Cards use a subtle `1px` inner hair-border (`border: 1px solid rgba(226, 232, 240, 0.7)`) to maintain physical edge definition in bright ambient warehouse environments.

## Shapes

The design uses rounded curvature to reinforce a friendly, tactile physical metaphor. 

- **Primary Cards & Panels**: Styled with `rounded-lg` to `rounded-xl` (`16px` to `20px` radius) to create smooth containers that guide the eye inward toward central item data.
- **Badges & Micro-Pills**: Styled with full pill radii (`9999px`) to immediately contrast against square shipping labels and physical boxes.
- **Inputs & Steppers**: Styled with `12px` to `14px` border radius, ensuring touch surfaces feel distinctly pressable and receptive.

## Components

### Buttons
- **Thumb Action Primary**: Large button (`52px` height) fixed within the ergonomic bottom rail. Mint green background (`#A7F3D0` hovering to `#6EE7B7`), dark spruce text (`#064E3B`), `font-weight: 600`, and `rounded-xl` (`16px` radius).
- **Secondary Stepper Buttons**: Square-like touch targets (`48x48px`) with soft lavender (`#DDD6FE`) or neutral slate surfaces (`#F1F5F9`) for one-handed incrementing and decrementing of item quantities (+ / -).

### Auto-Computed Value Badges
- **Mint Badge (Stock Matched / Verified)**: `#ECFDF5` background, `#065F46` label.
- **Lavender Badge (Bin Classification / Wave)**: `#F5F3FF` background, `#5B21B6` label.
- **Ice Blue Badge (Unit Metrics / Tare Weight)**: `#F0F9FF` background, `#0369A1` label.
- **Pale Peach Badge (Discrepancy / Expedited Pick)**: `#FFF7ED` background, `#C2410C` label.
- *Specification*: Badges sit at `24px` height, `10px` horizontal padding, full pill roundedness, with `label-sm` tracking.

### Inventory Cards
- Background `#FFFFFF`, rounded with `18px` border radius, bordered with `1px solid #E2E8F0`.
- Padding set to `16px`. Top row features the SKU title alongside the pastel status badge. The middle section contains high-contrast tabular quantities (`24px` bold slate). The bottom row houses single-handed touch actions (quick swipe reveal or touch toggle).

### Ergonomic Stepper Input Field
- Centered numerical input bounded by two oversized flanking buttons for rapid thumb adjustment. Field background uses `#F8FAFC` with an inset `1px` border, switching to ice blue halo on active focus (`box-shadow: 0 0 0 3px rgba(186, 230, 253, 0.6)`).

### Bottom Sheet Drawer
- Floating sheet anchored to the bottom edge with `24px` top corner radius. Contains a centered pull-pill handle (`36x4px`, `#CBD5E1`) for thumb-swipe dismissals during physical item verification.