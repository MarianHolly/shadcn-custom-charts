"use client";

import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ChartAreaInteractive } from "@/components/interactive-area-chart";

export default function Home() {
  const { setTheme } = useTheme();

  return (
    <div className="min-h-screen bg-background">
      <nav className="flex flex-row justify-center gap-4 my-8">
        <Button variant="outline" onClick={() => setTheme("light")}>
          <Sun className="h-4 w-4" />
          Light
        </Button>
        <Button variant="outline" onClick={() => setTheme("dark")}>
          <Moon className="mr-2 h-4 w-4" />
          Dark
        </Button>
      </nav>
      <main className="container mx-auto">
        <ChartAreaInteractive />
      </main>
    </div>
  );
}
