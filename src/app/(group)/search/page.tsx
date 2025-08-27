
import JobCard, { OpeningWithCompany } from "@/app/components/cards/job-card";
import { Company } from "../../../../generated/prisma";

export default async function Search({ searchParams }: { searchParams: { q: string,jt:string,et:string } }) {
  const query = searchParams.q || "";
  const jt = searchParams.jt || "";
  const et = searchParams.et || "";

  const res = await fetch(
    `http://localhost:3000/api/search?q=${query}&jt=${jt}&et=${et}`
  );

  const result = await res.json();
  const jobData:OpeningWithCompany[] = result?.data || [];
  // console.log("aaaaaaaaaaaa",jobData);
  

  return (
    <div className="flex flex-wrap justify-center gap-4">
      {jobData.length === 0 ? (
        <p>No results found.</p>
      ) : (
        jobData.map((job) => (
          <div key={job.id} className="flex flex-col">
            <JobCard item={job} />
          </div>
        ))
      )}
    </div>
  );
}
