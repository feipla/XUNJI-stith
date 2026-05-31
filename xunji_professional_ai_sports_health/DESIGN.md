---
name: Xunji Professional AI Sports Health
colors:
  surface: '#101415'
  surface-dim: '#101415'
  surface-bright: '#363a3b'
  surface-container-lowest: '#0b0f10'
  surface-container-low: '#191c1e'
  surface-container: '#1d2022'
  surface-container-high: '#272a2c'
  surface-container-highest: '#323537'
  on-surface: '#e0e3e5'
  on-surface-variant: '#c5c6cd'
  inverse-surface: '#e0e3e5'
  inverse-on-surface: '#2d3133'
  outline: '#8f9097'
  outline-variant: '#44474d'
  surface-tint: '#b9c7e4'
  primary: '#b9c7e4'
  on-primary: '#233148'
  primary-container: '#0a192f'
  on-primary-container: '#74829d'
  inverse-primary: '#515f78'
  secondary: '#ffb4a4'
  on-secondary: '#630e00'
  secondary-container: '#b72301'
  on-secondary-container: '#ffcdc2'
  tertiary: '#3cddc7'
  on-tertiary: '#003731'
  tertiary-container: '#001d19'
  on-tertiary-container: '#009282'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#d6e3ff'
  primary-fixed-dim: '#b9c7e4'
  on-primary-fixed: '#0d1c32'
  on-primary-fixed-variant: '#39475f'
  secondary-fixed: '#ffdad3'
  secondary-fixed-dim: '#ffb4a4'
  on-secondary-fixed: '#3d0600'
  on-secondary-fixed-variant: '#8c1800'
  tertiary-fixed: '#62fae3'
  tertiary-fixed-dim: '#3cddc7'
  on-tertiary-fixed: '#00201c'
  on-tertiary-fixed-variant: '#005047'
  background: '#101415'
  on-background: '#e0e3e5'
  surface-variant: '#323537'
typography:
  display-lg:
    fontFamily: Hanken Grotesk
    fontSize: 48px
    fontWeight: '700'
    lineHeight: 56px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Hanken Grotesk
    fontSize: 32px
    fontWeight: '600'
    lineHeight: 40px
  headline-lg-mobile:
    fontFamily: Hanken Grotesk
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
  title-md:
    fontFamily: Hanken Grotesk
    fontSize: 20px
    fontWeight: '500'
    lineHeight: 28px
  body-lg:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  body-sm:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
  data-display:
    fontFamily: JetBrains Mono
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
    letterSpacing: -0.05em
  label-caps:
    fontFamily: JetBrains Mono
    fontSize: 12px
    fontWeight: '500'
    lineHeight: 16px
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  unit: 4px
  container-margin: 24px
  gutter: 16px
  stack-sm: 8px
  stack-md: 16px
  stack-lg: 32px
---

## Brand & Style
The design system for this professional AI-driven sports health management system is built on the pillars of scientific precision and empathetic guidance. It targets elite athletes and health-conscious professionals who require rigorous data analysis without the cognitive load of raw telemetry.

The visual style is **Modern Corporate with Glassmorphism accents**. It utilizes a "Scientific Glass" aesthetic—using translucent layers and background blurs to highlight AI-driven insights, creating a sense of depth and intelligence. The interface feels like a sophisticated digital cockpit that is both high-performance and calming, balancing intense training data with recovery-focused empathy.

## Colors
The palette is anchored by **Explorer Navy (#0A192F)**, providing a deep, stable foundation that evokes trust and professional science. **Pulse Orange (#FF5733)** is used sparingly for high-action focal points, vitality metrics, and primary calls to action. **Calm Teal (#2DD4BF)** represents the recovery phase, used for balanced health states and regenerative data.

The system defaults to a **Sophisticated Dark Mode**. Surface colors use subtle shifts in navy saturation rather than pure black to maintain depth. Functional status colors are mapped to the athlete's journey: Pulse Orange for active "Training" states, Calm Teal for "Recovery" states, and a specific Warning Gold for overexertion alerts.

## Typography
The typography strategy prioritizes legibility of complex data. **Hanken Grotesk** is used for headlines, providing a sharp, contemporary, and professional feel. **Inter** handles body text for maximum readability across various screen densities. 

A specialized **Data Display** role using **JetBrains Mono** is introduced for heart rate, pace, and power metrics, ensuring that numbers are easily scannable and occupy consistent horizontal space. Labels are consistently rendered in monospaced caps to reinforce the "instrument panel" aesthetic of the sports health system.

## Layout & Spacing
The design system employs a **12-column fluid grid** for desktop and a **4-column grid** for mobile. A strict 4px baseline grid ensures vertical rhythm. Data-heavy dashboards should utilize "Container Groups"—grouping related metrics within cards that span 3, 4, or 6 columns on desktop.

Spacing follows a geometric scale. AI Insight blocks are given extra internal padding (24px) to distinguish them from standard data cards (16px). Margin and gutter widths remain consistent to provide a "structured" feel that aligns with the scientific nature of the product.

## Elevation & Depth
Depth is communicated through **Tonal Layering** and **Glassmorphism**. 
1. **Base:** The Explorer Navy background.
2. **Cards:** Slightly lighter navy surfaces with a 1px low-contrast border.
3. **AI Insights:** Semi-transparent glass layers (15% white tint, 20px backdrop-blur) to suggest an "intelligent" overlay that floats above standard telemetry.
4. **Interactive Elements:** Subtle ambient shadows using a Pulse Orange or Calm Teal tint (5% opacity) depending on the context, creating a soft glow rather than a heavy drop shadow.

## Shapes
The shape language is **Rounded**, using an 8px (0.5rem) base radius for standard cards and buttons. This strikes a balance between the precision of sharp corners and the approachability of fully rounded shapes. Large AI Insight panels use `rounded-xl` (24px) to feel more like "bubbles of thought" within the structured grid.

## Components
- **Data Cards:** Use a dark navy background with a subtle 1px border (#FFFFFF10). Titles appear in `label-caps`. Primary metrics use `data-display` in neutral white or the relevant status color.
- **AI Insight Blocks:** These utilize the glassmorphism effect. They must include a "sparkle" icon or AI-themed glyph in the header. Text should be more conversational (`body-lg`) to provide "Empathetic Guidance."
- **Status Chips:** Small, pill-shaped indicators. "Training" chips use an orange glow; "Recovery" chips use a teal outline.
- **Buttons:** Primary buttons are solid Pulse Orange. Secondary buttons are Ghost-style with a Teal outline for recovery/planning actions.
- **Progress Gauges:** Circular gauges with a thickness of 4px. Use gradients from Primary Navy to the Status Color to show progress/load.
- **Input Fields:** Minimalist design with only a bottom border that glows Pulse Orange when focused.