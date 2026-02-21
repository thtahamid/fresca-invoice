# Fresca Invoice Design System

This document outlines the visual language and component architecture for the Fresca Invoice application. The design focuses on a modern, "soft-pop" aesthetic with rich shadows, vibrant accents, and clean typography.

## Design Philosophy

- **Soft Pop**: High-contrast elements with rounded corners and subtle depth.
- **Vibrant Accents**: Use of OKLCH-based pastel and neon colors for categorization and visual interest.
- **Glassmorphism & Depth**: Leveraged through custom shadows (`--shadow-pop`) and background blur effects.

## Color System

The application uses Tailwind CSS v4's OKLCH color space for better perceptual uniformity and vibrant colors.

### Core Palette

| Token        | Light Mode (OKLCH) | Dark Mode (OKLCH) | Usage                       |
| :----------- | :----------------- | :---------------- | :-------------------------- |
| `background` | `0.98 0.01 240`    | `0.15 0.02 240`   | Main application background |
| `foreground` | `0.2 0.05 240`     | `0.95 0.02 240`   | Primary text content        |
| `primary`    | `0.6 0.15 240`     | `0.7 0.1 240`     | Brand color, main actions   |
| `card`       | `1 0 0`            | `0.2 0.02 240`    | Container backgrounds       |
| `border`     | `0.9 0.02 240`     | `0.3 0.02 240`    | Component borders           |

### Semantic Accents

Used for status indicators, charts, and decorative elements.

- **Mint**: `oklch(0.95 0.05 160)`
- **Lavender**: `oklch(0.95 0.05 280)`
- **Peach**: `oklch(0.95 0.05 40)`
- **Sky**: `oklch(0.95 0.05 220)`

## Typography

The project uses the **Geist** font family for a clean, developer-centric look.

- **Sans-serif**: `var(--font-geist-sans)` (Primary for UI elements)
- **Monospace**: `var(--font-geist-mono)` (Financial data, invoice numbers)

## Layout & Components

### Cards

Cards are the primary building block for the dashboard and invoice views.

- **Border Radius**: `var(--radius)` (Default: `1rem`)
- **Shadow**: `--shadow-pop`
- **Hover State**: `--shadow-pop-hover` with subtle scale transform.
- **Border**: `1px solid var(--border)`

### Inputs

- **Background**: `var(--input)`
- **Focus Ring**: `var(--ring)`
- **States**: High-contrast borders in dark mode to distinguish from card background.

### Buttons

- **Primary**: Solid background with `primary-foreground` text.
- **Secondary**: Muted background for less prominent actions.
- **Outline**: `1px solid var(--border)` with transparent background.
- **Social**: Custom styles for GitHub/Google authentication using brand colors.

## Effects

- **Shadow Pop**: `0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)`
- **Shadow Pop Hover**: `0 25px 50px -12px rgb(0 0 0 / 0.15)`
