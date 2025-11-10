// app/showcase/page.tsx
"use client";

import { useState } from "react";
import { DashboardLayout } from "@/components/dashboard/dashboard-layout";
import { ChartAreaInteractive } from "@/components/interactive-area-chart";
import { ChartPieInteractive } from "@/components/interactive-pie-chart";
import { ChartBarInteractive } from "@/archive/components/chart-bar-interactive";
import { ChartBarLabelCustom } from "@/archive/components/chart-bar-label-custom";
import { ChartRadarGridCircleNoLines } from "@/archive/components/chart-radar-grid-circle-no-lines";
import { ChartRadarLegend } from "@/archive/components/chart-radar-legend";
import { ChartRadialText } from "@/archive/components/chart-radial-text";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, BarChart3, PieChart, Radar, Activity } from "lucide-react";

const chartCategories = [
  {
    name: "Area Charts",
    icon: <Activity className="w-5 h-5" />,
    charts: [
      { name: "Interactive Area Chart", component: ChartAreaInteractive },
    ],
  },
  {
    name: "Bar Charts",
    icon: <BarChart3 className="w-5 h-5" />,
    charts: [
      { name: "Interactive Bar Chart", component: ChartBarInteractive },
      { name: "Bar Chart with Custom Labels", component: ChartBarLabelCustom },
    ],
  },
  {
    name: "Pie Charts",
    icon: <PieChart className="w-5 h-5" />,
    charts: [
      { name: "Interactive Pie Chart", component: ChartPieInteractive },
    ],
  },
  {
    name: "Radar Charts",
    icon: <Radar className="w-5 h-5" />,
    charts: [
      { name: "Radar Grid Circle (No Lines)", component: ChartRadarGridCircleNoLines },
      { name: "Radar Chart with Legend", component: ChartRadarLegend },
    ],
  },
  {
    name: "Radial Charts",
    icon: <Activity className="w-5 h-5" />,
    charts: [
      { name: "Radial Chart with Text", component: ChartRadialText },
    ],
  },
];

export default function ComponentsShowcasePage() {
  const [selectedCategory, setSelectedCategory] = useState(0);

  return (
    <DashboardLayout>
      {/* Header */}
      <div className="border-b-2 border-white/20 bg-gradient-to-r from-slate-900/50 to-slate-950/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center gap-4 mb-6">
            <Link href="/dashboard">
              <Button variant="outline" size="sm" className="border-2">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Dashboard
              </Button>
            </Link>
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">Components Showcase</h1>
          <p className="text-white/60">
            Explore various chart components for inspiration and testing
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Category Navigation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex gap-3 flex-wrap">
            {chartCategories.map((category, index) => (
              <button
                key={category.name}
                onClick={() => setSelectedCategory(index)}
                className={`
                  flex items-center gap-2 px-4 py-3 rounded-xl border-2 font-medium transition-all
                  ${
                    selectedCategory === index
                      ? "bg-indigo-600/20 border-indigo-500/50 text-indigo-300"
                      : "bg-white/5 border-white/10 text-white/70 hover:border-white/20 hover:text-white"
                  }
                `}
              >
                {category.icon}
                <span>{category.name}</span>
                <span className="ml-2 px-2 py-0.5 rounded-md bg-white/10 text-xs">
                  {category.charts.length}
                </span>
              </button>
            ))}
          </div>
        </motion.div>

        {/* Charts Display */}
        <div className="space-y-8">
          {chartCategories[selectedCategory].charts.map((chart, index) => (
            <motion.div
              key={chart.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="rounded-xl border-2 border-white/20 bg-gradient-to-br from-white/5 to-white/[2.5%] p-6 backdrop-blur-sm"
            >
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-white mb-2">{chart.name}</h2>
                <p className="text-white/60 text-sm">
                  Component from the archive folder - explore its features and interactivity
                </p>
              </div>

              {/* Chart Container */}
              <div className="p-6 rounded-xl bg-white/5 border-2 border-white/10">
                <chart.component />
              </div>

              {/* Info */}
              <div className="mt-4 p-4 rounded-lg bg-indigo-500/10 border border-indigo-500/20">
                <p className="text-sm text-indigo-200">
                  💡 This component uses Recharts library with shadcn/ui styling
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Additional Info */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-12 p-6 rounded-xl border-2 border-white/20 bg-gradient-to-br from-white/5 to-white/[2.5%]"
        >
          <h3 className="text-xl font-bold text-white mb-4">About These Components</h3>
          <div className="space-y-3 text-white/70">
            <p>
              These chart components are built using <strong>Recharts</strong> and styled with <strong>shadcn/ui</strong> components.
            </p>
            <p>
              Each chart includes interactive features like tooltips, legends, and customizable data display options.
            </p>
            <p>
              You can use these components as inspiration for your analytics dashboard or implement them directly in your project.
            </p>
          </div>
        </motion.div>
      </div>
    </DashboardLayout>
  );
}