# FrescaInvoice 🌽

A simple, colorful, and highly accessible invoicing application for product-based businesses. Built with a "Soft-Pop" design aesthetic.

## 🚀 Quick Start

1. **Install dependencies:**

   ```bash
   pnpm install
   ```

2. **Run the development server:**

   ```bash
   pnpm dev
   ```

3. **Build for production:**
   ```bash
   pnpm build
   ```

## 🏗️ Architecture

- **Framework:** Next.js (App Router)
- **Styling:** Tailwind CSS v4 + Lucide Icons
- **UI Components:** Shadcn UI (Radix UI)
- **Design System:** "Soft-Pop" (vibrant pastels, deep shadows, large radii)
- **State Management:** React `useState` for multi-step flow (Selection → Review → Preview)
- **Print Logic:** CSS `@media print` with an A4-optimized layout

## 📁 Repository Structure

```
src/
├── app/              # App router pages and layouts
├── components/
│   ├── catalog/      # Product selection and search
│   ├── invoice/      # Invoice summary, forms, and A4 preview
│   └── ui/           # Shadcn base components
├── lib/              # Data (catalog) and utility functions
└── types/            # TypeScript interfaces
```

## ✨ Key Features

- **Product Catalog:** Modern grid layout with search and packaging details.
- **Auto-Calculation:** System calculates unit prices automatically based on input.
- **Management:** Add, edit, and delete items from your invoice on the fly.
- **A4 Preview:** Specialized print-ready layout for professional invoices.
