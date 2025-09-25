"use client";

import JobCard from "@/app/components/cards/job-card";
import JobCardSkeleton from "@/app/components/loading-skeletons/job-card-skeleton";
import { OpeningWithCompany } from "@/types";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";


type SavedJob = {
  id: string;
  jobId: string;
  job: OpeningWithCompany;
};

export default function SavedJobs() {
  const params =useParams()
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

  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 p-6">
        {[[],[],[]].map((_, i) => (
          <JobCardSkeleton key={i} />
        ))}
      </div>
    );
  }

  if (savedJobs.length === 0) {
    return (
      <div className="p-6 text-center text-gray-600">
        <h2 className="text-xl font-semibold">No Saved Jobs</h2>
        <p className="text-sm mt-2">You haven’t saved any jobs yet.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
      {savedJobs.map((saved) => (
        <JobCard key={saved.id} item={saved.job} />
      ))}
    </div>
  );
}
