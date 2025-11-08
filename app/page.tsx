"use client";

import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

import { ChartAreaInteractive } from "@/components/interactive-area-chart";
import { ChartPieInteractive } from "@/components/interactive-pie-chart";

export default function Home() {
  const { setTheme } = useTheme();

  return (
    <div className="min-h-screen bg-background mb-24">
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
      <Separator className="my-8" />

      <div className="container mx-auto">
        <ChartPieInteractive />
      </div>
    </div>
  );
}
