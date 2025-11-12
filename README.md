# 📊 Shadcn Custom Charts

<div align="center">

**Beautiful, animated React chart components built with modern web technologies**

[![Next.js](https://img.shields.io/badge/Next.js-16.0-black?style=flat-square&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.2-blue?style=flat-square&logo=react)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.0-38bdf8?style=flat-square&logo=tailwind-css)](https://tailwindcss.com/)

[Features](#-features) • [Demo](#-demo) • [Installation](#-getting-started) • [Usage](#-usage) • [Components](#-available-components)

</div>

---

## 🎯 Overview

A collection of highly customizable, animated data visualization components designed for modern React applications. Built on top of the excellent [shadcn/ui](https://ui.shadcn.com/) component library, these charts combine the power of **Recharts** for data visualization with **Framer Motion** for smooth animations, all styled with **Tailwind CSS** for maximum flexibility.

This project goes beyond basic charting—it includes a complete **CSV data processing pipeline**, allowing users to upload their data and instantly visualize it through interactive dashboards. Perfect for analytics platforms, admin panels, or any application that needs beautiful data visualization.

### ✨ Why This Project?

Traditional charting libraries can be rigid and difficult to style. This project provides:
- 🎨 **Fully customizable** components that match your design system
- 🌗 **Dark mode support** out of the box
- ⚡ **Smooth animations** that enhance user experience
- 📱 **Responsive design** that works on all devices
- 🔧 **Type-safe** TypeScript implementations
- 🚀 **Production-ready** with Next.js 16 and React 19

---

## 🌟 Features

### 📈 Interactive Chart Components
- **Area Charts** - Smooth, animated area visualizations with time-range selectors
- **Pie Charts** - Interactive pie/donut charts with hover effects and legends
- **Bar Charts** - Customizable bar charts with interactive tooltips
- **Radar Charts** - Multi-dimensional data visualization
- **Radial Charts** - Circular progress and comparison charts

### 🎨 Design & UX
- **Framer Motion Animations** - Buttery smooth entrance and interaction animations
- **Dark Mode** - Seamless theme switching with next-themes
- **Responsive Layout** - Mobile-first design that scales beautifully
- **Customizable Colors** - Easy theme customization with Tailwind CSS
- **Interactive Tooltips** - Rich hover states with detailed information

### 📊 Data Processing
- **CSV Upload** - Drag-and-drop CSV file processing
- **Data Validation** - Automatic validation of uploaded data structures
- **Real-time Parsing** - Instant data processing with PapaParse
- **State Management** - Zustand-powered state for file management
- **Multiple File Types** - Support for watched items, ratings, and diary entries

### 🏗️ Developer Experience
- **TypeScript First** - Full type safety across all components
- **Component Library** - Reusable, composable chart building blocks
- **shadcn/ui Integration** - Built on top of Radix UI primitives
- **Modern Stack** - Next.js 16 with App Router and React 19
- **ESLint Config** - Code quality out of the box

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** 20.x or higher
- **npm**, **yarn**, or **pnpm**

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/MarianHolly/shadcn-custom-charts.git
   cd shadcn-custom-charts
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**

   Navigate to [http://localhost:3000](http://localhost:3000) to see the application.

### Build for Production

```bash
npm run build
npm start
```

---

## 📦 Tech Stack

This project leverages modern web technologies for optimal performance and developer experience:

| Technology | Purpose | Version |
|------------|---------|---------|
| **Next.js** | React framework with App Router | 16.0.1 |
| **React** | UI library | 19.2.0 |
| **TypeScript** | Type safety | 5.x |
| **Tailwind CSS** | Utility-first styling | 4.x |
| **Recharts** | Chart library | 2.15.4 |
| **Framer Motion** | Animation library | 12.x |
| **shadcn/ui** | Component library | Latest |
| **Radix UI** | Headless UI primitives | Latest |
| **Zustand** | State management | 5.0.8 |
| **PapaParse** | CSV parsing | 5.5.3 |
| **Lucide React** | Icon library | Latest |

---

## 🎨 Available Components

### Core Chart Components

#### Interactive Area Chart
```tsx
import { InteractiveAreaChart } from "@/components/interactive-area-chart"

<InteractiveAreaChart />
```
Features time-range selection, smooth animations, and multi-series support.

#### Interactive Pie Chart
```tsx
import { InteractivePieChart } from "@/components/interactive-pie-chart"

<InteractivePieChart />
```
Donut-style pie chart with interactive legend and hover effects.

### Dashboard Components

Located in `components/dashboard/charts/`:
- **Genre Distribution** - Analyze content by genre
- **Rating Distribution** - Visualize rating patterns
- **Release Year Analysis** - Track content over time
- **Viewing Over Time** - Monitor viewing trends

### Layout Components

- **DashboardLayout** - Complete dashboard shell with sidebar
- **StatsCard** - Animated statistics cards
- **DashboardHeader** - Page header with actions
- **DashboardSidebar** - Navigation sidebar
- **ThemeToggle** - Dark/light mode switcher

### Landing Page Components

- **HeroSection** - Eye-catching hero with animations
- **AboutSection** - Project description section
- **StepsSection** - Step-by-step guide
- **UploadModal** - Drag-and-drop file upload

---

## 💻 Usage

### Basic Chart Implementation

```tsx
"use client"

import { InteractiveAreaChart } from "@/components/interactive-area-chart"

export default function MyPage() {
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">My Dashboard</h1>
      <InteractiveAreaChart />
    </div>
  )
}
```

### Custom Chart with Your Data

```tsx
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip } from "@/components/ui/chart"
import { AreaChart, Area, XAxis, YAxis } from "recharts"

const myData = [
  { date: "2024-01", value: 100 },
  { date: "2024-02", value: 150 },
  { date: "2024-03", value: 180 },
]

export function MyCustomChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>My Analytics</CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <AreaChart data={myData}>
            <XAxis dataKey="date" />
            <YAxis />
            <ChartTooltip />
            <Area type="monotone" dataKey="value" />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
```

### CSV Data Upload Flow

The application includes a complete CSV processing pipeline:

1. **Upload CSV files** via drag-and-drop or file picker
2. **Automatic validation** checks data structure
3. **Data parsing** with PapaParse
4. **State storage** using Zustand
5. **Visualization** in dashboard charts

Supported file types:
- `watched.csv` - Viewing history data
- `ratings.csv` - Rating information
- `diary.csv` - Activity logs

---

## 🏗️ Project Structure

```
shadcn-custom-charts/
├── app/
│   ├── dashboard/          # Dashboard page and components
│   ├── showcase/           # Component showcase page
│   ├── upload/             # File upload page
│   ├── layout.tsx          # Root layout
│   └── page.tsx            # Landing page
├── components/
│   ├── dashboard/          # Dashboard-specific components
│   │   └── charts/         # Dashboard chart variants
│   ├── landing/            # Landing page sections
│   ├── layout/             # Layout components
│   ├── ui/                 # shadcn/ui components
│   ├── interactive-area-chart.tsx
│   └── interactive-pie-chart.tsx
├── hooks/
│   ├── use-analytics.ts    # Analytics data hook
│   └── use-upload-store.ts # Upload state management
├── lib/
│   ├── csv-parser.ts       # CSV processing utilities
│   └── utils.ts            # Helper functions
├── archive/                # Previous iterations and examples
└── public/                 # Static assets
```

---

## 🎨 Customization

### Theming

The project uses CSS variables for theming. Customize colors in `app/globals.css`:

```css
:root {
  --chart-1: 12 76% 61%;
  --chart-2: 173 58% 39%;
  --chart-3: 197 37% 24%;
  /* Add more chart colors */
}
```

### Component Styling

All components use Tailwind CSS classes and can be customized through:
- **Tailwind config** - Extend the default theme
- **CSS variables** - Override shadcn/ui defaults
- **Component props** - Pass custom classNames

### Animation Customization

Framer Motion animations can be customized in individual components:

```tsx
<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.5 }}
>
  {/* Your content */}
</motion.div>
```

---

## 🛠️ Development

### Available Scripts

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run start    # Start production server
npm run lint     # Run ESLint
```

### Adding New Components

This project uses shadcn/ui CLI for adding components:

```bash
npx shadcn-ui@latest add [component-name]
```

### Code Quality

The project includes ESLint configuration. Run linting before committing:

```bash
npm run lint
```

---

## 🤝 Contributing

Contributions are welcome! This project is a work of passion, and I'd love to see it grow with the community's input.

### How to Contribute

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Ideas for Contributions

- 🎨 New chart types (line, scatter, heatmap, etc.)
- 🔧 Performance optimizations
- 📱 Mobile UX improvements
- 🌐 Internationalization
- 📖 Documentation improvements
- 🐛 Bug fixes

---

## 📝 License

This project is open source and available for personal and commercial use. Feel free to use, modify, and distribute as you see fit.

---

## 👤 Author

**Marian Holly**

This project was built with ❤️ as an exploration of modern React patterns, beautiful UI design, and the power of component composition. I wanted to create something that not only looks great but also provides real value to developers building data-driven applications.

If you find this project useful, consider:
- ⭐ Starring the repository
- 🐛 Reporting bugs or requesting features
- 🤝 Contributing improvements
- 📢 Sharing with others who might benefit

---

## 🙏 Acknowledgments

This project builds upon the incredible work of:
- [shadcn](https://twitter.com/shadcn) for the amazing UI component library
- [Recharts](https://recharts.org/) team for the charting foundation
- [Radix UI](https://www.radix-ui.com/) for accessible primitives
- [Vercel](https://vercel.com/) for Next.js
- The entire React and open-source community

---

<div align="center">

**Built with Next.js, React, TypeScript, and Tailwind CSS**

Made with 💙 by developers, for developers

</div>
