// components/dashboard/dashboard-layout-enhanced.tsx
"use client";

import { cn } from "@/lib/utils";
import ThemeToggle from "@/components/layout/theme-toggle";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { DashboardSidebar } from "@/components/dashboard/dashboard-sidebar";

interface DashboardLayoutProps {
  children: React.ReactNode;
  className?: string;
}

export function DashboardLayoutEnhanced({
  children,
  className,
}: DashboardLayoutProps) {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <div
      className={cn(
        "flex h-screen transition-colors duration-200",
        theme === "dark"
          ? "bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950"
          : "bg-gradient-to-br from-slate-50 via-white to-slate-100"
      )}
    >
      {/* Sidebar */}
      <DashboardSidebar />

      {/* Main Content */}
      <main
        className={cn(
          "flex-1 flex flex-col overflow-hidden md:ml-0",
          className
        )}
      >
        {/* Theme Toggle - Fixed Position */}
        <div className="fixed top-4 right-4 z-50">
          <div className="p-2 rounded-xl border-2 border-white/20 bg-white/5 dark:bg-black/20 backdrop-blur-sm">
            <ThemeToggle />
          </div>
        </div>

        {/* Content area with scroll */}
        <div className="flex-1 overflow-y-auto pt-16 md:pt-0 scrollbar-thin">
          {children}
        </div>
      </main>
    </div>
  );
}