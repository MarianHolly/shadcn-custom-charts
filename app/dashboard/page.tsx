// app/dashboard/page-improved.tsx
"use client";

import { useState, useEffect } from "react";
import { DashboardLayout } from "@/components/dashboard/dashboard-layout";
import { DashboardHeader } from "@/components/dashboard/dashboard-header";
import { StatsCard } from "@/components/dashboard/stats-card";
import { DashboardSection } from "@/components/dashboard/dashboard-section";
import { EmptyState } from "@/components/dashboard/empty-state";
import { LoadingSkeleton } from "@/components/dashboard/loading-skeleton";
import { UploadModal } from "@/components/landing/upload-modal";
import { useUploadStore } from "@/hooks/use-upload-store";
import { useAnalytics } from "@/hooks/use-analytics";
import { BarChart3, Clock, Star, Film, TrendingUp, Calendar } from "lucide-react";
import { motion } from "framer-motion";
import { ViewingOverTime } from "@/components/dashboard/charts/viewing-over-time";
import { RatingDistribution } from "@/components/dashboard/charts/rating-distribution";
import { GenreDistribution } from "@/components/dashboard/charts/genre-distribution";
import { ReleaseYearAnalysis } from "@/components/dashboard/charts/release-year-analysis";
import { Button } from "@/components/ui/button";
import { mockWatchedCSV } from "@/lib/mock/watched";


interface UploadedFile {
  file: File;
  type: "watched" | "ratings" | "diary" | "unknown";
  status: "uploading" | "success" | "error";
  progress: number;
  error?: string;
}

export default function ImprovedDashboardPage() {
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [useMockData, setUseMockData] = useState(false);

  const files = useUploadStore((state) => state.files);
  const addFile = useUploadStore((state) => state.addFile);
  const clearFiles = useUploadStore((state) => state.clearFiles);

  const watchedFile = files.find((f) => f.type === "watched");
  const dataToUse = useMockData ? mockWatchedCSV : (watchedFile?.data || "");
  const analytics = useAnalytics(dataToUse);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleUploadComplete = async (uploadedFiles: UploadedFile[]) => {
    try {
      for (const file of uploadedFiles) {
        if (file.status === "success" && file.type !== "unknown") {
          const csvContent = await file.file.text();
          addFile({
            id: `${Date.now()}_${Math.random()}`,
            name: file.file.name,
            size: file.file.size,
            type: file.type,
            data: csvContent,
            uploadedAt: Date.now(),
          });
        }
      }
      setUseMockData(false);
      setIsUploadModalOpen(false);
    } catch (error) {
      console.error("Error processing files:", error);
      alert("Error processing files. Please try again.");
    }
  };

  const handleClearData = () => {
    if (confirm("Are you sure you want to delete all imported data? This cannot be undone.")) {
      clearFiles();
      setUseMockData(false);
    }
  };

  const handleLoadMockData = () => {
    setUseMockData(true);
  };

  if (!mounted) {
    return <LoadingSkeleton />;
  }

  // Show empty state if no watched file uploaded and not using mock data
  if (!watchedFile && !useMockData) {
    return (
      <DashboardLayout>
        <div className="flex flex-col items-center justify-center min-h-screen p-8">
          <EmptyState onUploadClick={() => setIsUploadModalOpen(true)} />
          <Button
            onClick={handleLoadMockData}
            variant="outline"
            className="mt-4 border-2"
          >
            Load Mock Data (for testing)
          </Button>
        </div>
        <UploadModal
          open={isUploadModalOpen}
          onOpenChange={setIsUploadModalOpen}
          onUploadComplete={handleUploadComplete}
        />
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <DashboardHeader
        title="Your Letterboxd Analytics"
        description="Insights into your movie-watching journey"
        onUploadClick={() => setIsUploadModalOpen(true)}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {useMockData && (
          <div className="p-4 rounded-xl border-2 border-amber-500/50 bg-amber-500/10">
            <p className="text-sm text-amber-200 font-medium">
              ⚠️ You're viewing mock data for testing purposes
            </p>
          </div>
        )}

        {/* Key Metrics - Improved with sharper borders */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
        >
          <StatsCard
            label="Total Movies"
            value={analytics.totalMovies}
            icon={<Film className="w-5 h-5" />}
            description={`${analytics.totalMovies} movies watched`}
            delay={0}
            className="border-2 border-indigo-500/30 hover:border-indigo-500/50"
          />

          <StatsCard
            label="Average Rating"
            value={`${analytics.averageRating}★`}
            icon={<Star className="w-5 h-5" />}
            description="Your average rating"
            delay={0.1}
            className="border-2 border-amber-500/30 hover:border-amber-500/50"
          />

          <StatsCard
            label="Total Hours"
            value={analytics.totalHoursWatched}
            icon={<Clock className="w-5 h-5" />}
            description="Hours of cinema"
            delay={0.2}
            className="border-2 border-rose-500/30 hover:border-rose-500/50"
          />

          <StatsCard
            label="Tracking Period"
            value={`${analytics.totalDaysTracking}d`}
            icon={<Calendar className="w-5 h-5" />}
            description="Days of data"
            delay={0.3}
            className="border-2 border-cyan-500/30 hover:border-cyan-500/50"
          />
        </motion.div>

        {/* Viewing Over Time - Sharp borders */}
        <DashboardSection
          title="Viewing Over Time"
          description="Track your movie watching trends across different time periods"
          delay={0.4}
          className="border-2 border-white/20"
        >
          {analytics.moviesPerMonth && Object.keys(analytics.moviesPerMonth).length > 0 ? (
            <div className="p-6 rounded-xl bg-white/5 border-2 border-white/10">
              <ViewingOverTime data={analytics.moviesPerMonth} />
            </div>
          ) : (
            <div className="p-8 rounded-xl bg-white/5 border-2 border-white/10 text-center">
              <p className="text-white/60">No data available</p>
            </div>
          )}
        </DashboardSection>

        {/* Rating & Genre Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Rating Distribution */}
          <DashboardSection
            title="Rating Distribution"
            description="How you rate movies"
            delay={0.45}
            className="border-2 border-white/20"
          >
            {analytics.ratingDistribution && Object.keys(analytics.ratingDistribution).length > 0 ? (
              <div className="p-6 rounded-xl bg-white/5 border-2 border-white/10">
                <RatingDistribution data={analytics.ratingDistribution} />
              </div>
            ) : (
              <div className="p-8 text-center">
                <p className="text-white/60">No rating data available</p>
              </div>
            )}
          </DashboardSection>

          {/* Genre Distribution */}
          <DashboardSection
            title="Genre Distribution"
            description="Your favorite genres"
            delay={0.5}
            className="border-2 border-white/20"
          >
            {analytics.genreDistribution && Object.keys(analytics.genreDistribution).length > 0 ? (
              <div className="p-6 rounded-xl bg-white/5 border-2 border-white/10">
                <GenreDistribution data={analytics.genreDistribution} />
              </div>
            ) : (
              <div className="p-8 text-center">
                <p className="text-white/60">No genre data available</p>
              </div>
            )}
          </DashboardSection>
        </div>

        {/* Release Year Analysis */}
        <DashboardSection
          title="Movies by Release Year"
          description="See how many movies you watched from each release year"
          delay={0.55}
          className="border-2 border-white/20"
        >
          {analytics.moviesByReleaseYear && Object.keys(analytics.moviesByReleaseYear).length > 0 ? (
            <div className="p-6 rounded-xl bg-white/5 border-2 border-white/10">
              <ReleaseYearAnalysis data={analytics.moviesByReleaseYear} />
            </div>
          ) : (
            <div className="p-8 text-center">
              <p className="text-white/60">No year data available</p>
            </div>
          )}
        </DashboardSection>

        {/* Data Summary - Sharp borders */}
        <DashboardSection
          title="Imported Data"
          description={useMockData ? "Mock data loaded" : `${files.length} file${files.length !== 1 ? "s" : ""} loaded`}
          delay={0.6}
          className="border-2 border-white/20"
        >
          <div className="space-y-4">
            {!useMockData && files.length > 0 && (
              <div className="space-y-2">
                {files.map((file) => (
                  <div
                    key={file.id}
                    className="flex items-center justify-between p-4 rounded-xl bg-white/5 border-2 border-white/10 hover:border-white/20 transition-colors"
                  >
                    <div className="flex-1">
                      <p className="text-white text-sm font-medium">{file.name}</p>
                    </div>
                    <div className="flex items-center gap-4 ml-4">
                      <span className="text-xs text-indigo-400 capitalize px-2 py-1 rounded-md bg-indigo-500/10 border border-indigo-500/20">
                        {file.type}
                      </span>
                      <span className="text-xs text-white/40">
                        {(file.size / 1024).toFixed(1)} KB
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {useMockData && (
              <div className="p-4 rounded-xl bg-white/5 border-2 border-white/10">
                <p className="text-sm text-white/70">Mock data with 60 movies loaded</p>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex gap-3">
              {(files.length > 0 || useMockData) && (
                <button
                  onClick={handleClearData}
                  className="flex-1 px-4 py-3 rounded-xl bg-red-600/20 border-2 border-red-600/50 text-red-400 hover:bg-red-600/30 hover:border-red-600/70 transition-colors text-sm font-medium"
                >
                  Clear All Data
                </button>
              )}
              {!useMockData && (
                <button
                  onClick={handleLoadMockData}
                  className="flex-1 px-4 py-3 rounded-xl bg-amber-600/20 border-2 border-amber-600/50 text-amber-400 hover:bg-amber-600/30 hover:border-amber-600/70 transition-colors text-sm font-medium"
                >
                  Load Mock Data
                </button>
              )}
            </div>
          </div>
        </DashboardSection>
      </div>

      <UploadModal
        open={isUploadModalOpen}
        onOpenChange={setIsUploadModalOpen}
        onUploadComplete={handleUploadComplete}
      />
    </DashboardLayout>
  );
}