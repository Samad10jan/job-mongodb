"use client";

import SavedJobCard from "@/app/components/cards/savedcard";
import JobCardSkeleton from "@/app/components/loading-skeletons/job-card-skeleton";
import { SavedJob } from "@/types";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";


export default function SavedJobs() {
  const params = useParams();
  const userId = params.id;
  const [savedJobs, setSavedJobs] = useState<SavedJob[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchSavedJobs() {
      try {
        const res = await fetch(`/api/savedJobs?userId=${userId}`);
        if (!res.ok) throw new Error("Failed to fetch saved jobs");
        const data = await res.json();
        setSavedJobs(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }
    fetchSavedJobs();
  }, [userId]);

  // callback unsaave function , that can be passed as props also (happy happy happy)
  const handleUnsave = (jobId: string) => {
    setSavedJobs((prev) => prev.filter((s) => s.jobId !== jobId));
  };

  if (loading) return <JobCardSkeleton />;

  if (savedJobs.length === 0)
    return (
      <div className="p-6 text-center text-gray-600">
        <h2 className="text-xl font-semibold">No Saved Jobs</h2>
        <p className="text-sm mt-2">You haven’t saved any jobs yet.</p>
      </div>
    );

  return (
    <div className="flex flex-wrap justify-start gap-6 p-6">
      {savedJobs.map((saved) => (
        <SavedJobCard
          key={saved.id}
          item={saved.job}
          userId={userId! as string}
          onUnsave={handleUnsave}
        />
      ))}
    </div>
  );
}
