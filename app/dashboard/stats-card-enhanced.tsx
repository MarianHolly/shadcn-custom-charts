// components/dashboard/stats-card-enhanced.tsx
"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { useTheme } from "next-themes";

interface StatsCardProps {
  label: string;
  value: string | number;
  description?: string;
  icon?: React.ReactNode;
  trend?: {
    value: number;
    direction: "up" | "down";
  };
  className?: string;
  delay?: number;
  color?: "indigo" | "amber" | "rose" | "cyan" | "emerald" | "violet";
}

const colorClasses = {
  indigo: {
    border: "border-indigo-500/30 hover:border-indigo-500/50 dark:border-indigo-500/30 dark:hover:border-indigo-500/50",
    bg: "bg-indigo-500/5 dark:bg-indigo-500/10",
    icon: "text-indigo-500 dark:text-indigo-400",
    gradient: "from-indigo-500/5 to-indigo-500/10 dark:from-indigo-500/10 dark:to-indigo-500/5",
  },
  amber: {
    border: "border-amber-500/30 hover:border-amber-500/50 dark:border-amber-500/30 dark:hover:border-amber-500/50",
    bg: "bg-amber-500/5 dark:bg-amber-500/10",
    icon: "text-amber-500 dark:text-amber-400",
    gradient: "from-amber-500/5 to-amber-500/10 dark:from-amber-500/10 dark:to-amber-500/5",
  },
  rose: {
    border: "border-rose-500/30 hover:border-rose-500/50 dark:border-rose-500/30 dark:hover:border-rose-500/50",
    bg: "bg-rose-500/5 dark:bg-rose-500/10",
    icon: "text-rose-500 dark:text-rose-400",
    gradient: "from-rose-500/5 to-rose-500/10 dark:from-rose-500/10 dark:to-rose-500/5",
  },
  cyan: {
    border: "border-cyan-500/30 hover:border-cyan-500/50 dark:border-cyan-500/30 dark:hover:border-cyan-500/50",
    bg: "bg-cyan-500/5 dark:bg-cyan-500/10",
    icon: "text-cyan-500 dark:text-cyan-400",
    gradient: "from-cyan-500/5 to-cyan-500/10 dark:from-cyan-500/10 dark:to-cyan-500/5",
  },
  emerald: {
    border: "border-emerald-500/30 hover:border-emerald-500/50 dark:border-emerald-500/30 dark:hover:border-emerald-500/50",
    bg: "bg-emerald-500/5 dark:bg-emerald-500/10",
    icon: "text-emerald-500 dark:text-emerald-400",
    gradient: "from-emerald-500/5 to-emerald-500/10 dark:from-emerald-500/10 dark:to-emerald-500/5",
  },
  violet: {
    border: "border-violet-500/30 hover:border-violet-500/50 dark:border-violet-500/30 dark:hover:border-violet-500/50",
    bg: "bg-violet-500/5 dark:bg-violet-500/10",
    icon: "text-violet-500 dark:text-violet-400",
    gradient: "from-violet-500/5 to-violet-500/10 dark:from-violet-500/10 dark:to-violet-500/5",
  },
};

export function StatsCardEnhanced({
  label,
  value,
  description,
  icon,
  trend,
  className,
  delay = 0,
  color = "indigo",
}: StatsCardProps) {
  const { theme } = useTheme();
  const colors = colorClasses[color];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      className={cn(
        "relative overflow-hidden rounded-xl border-2 p-6 backdrop-blur-sm transition-all duration-300",
        "bg-white dark:bg-gradient-to-br dark:from-white/5 dark:to-white/[2.5%]",
        "shadow-sm dark:shadow-none",
        colors.border,
        className
      )}
    >
      {/* Animated background gradient */}
      <div
        className={cn(
          "absolute inset-0 bg-gradient-to-br opacity-0 hover:opacity-100 transition-opacity duration-300",
          colors.gradient
        )}
      />

      <div className="relative z-10 space-y-3">
        {/* Header with icon */}
        <div className="flex items-center justify-between">
          <label
            className={cn(
              "text-sm font-medium uppercase tracking-wider",
              "text-slate-600 dark:text-white/60"
            )}
          >
            {label}
          </label>
          {icon && (
            <div
              className={cn(
                "p-2 rounded-lg transition-colors",
                colors.bg,
                colors.icon
              )}
            >
              {icon}
            </div>
          )}
        </div>

        {/* Value */}
        <div className="space-y-1">
          <p
            className={cn(
              "text-4xl font-bold",
              "text-slate-900 dark:text-white"
            )}
          >
            {value}
          </p>
          {description && (
            <p className="text-sm text-slate-500 dark:text-white/50">
              {description}
            </p>
          )}
        </div>

        {/* Trend indicator */}
        {trend && (
          <div
            className={cn(
              "inline-flex items-center gap-1 mt-2 text-xs font-medium px-2.5 py-1 rounded-md",
              trend.direction === "up"
                ? "bg-emerald-500/10 text-emerald-600 dark:bg-emerald-500/20 dark:text-emerald-400 border border-emerald-500/20"
                : "bg-red-500/10 text-red-600 dark:bg-red-500/20 dark:text-red-400 border border-red-500/20"
            )}
          >
            <span>
              {trend.direction === "up" ? "↑" : "↓"} {Math.abs(trend.value)}%
            </span>
          </div>
        )}
      </div>

      {/* Shine effect on hover */}
      <div className="absolute inset-0 opacity-0 hover:opacity-100 transition-opacity duration-500 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12 translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000" />
      </div>
    </motion.div>
  );
}