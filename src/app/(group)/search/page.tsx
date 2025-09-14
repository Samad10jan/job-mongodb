
import JobCard, { OpeningWithCompany } from "@/app/components/cards/job-card";
import { Company } from "../../../../generated/prisma";
import { Quote } from "@radix-ui/themes";

export default async function Search({ searchParams }: { searchParams: { q: string, jt: string, et: string,sll:number,slg:number,cp:string } }) {
  const query = searchParams.q || "";
  const jt = searchParams.jt || "";
  const et = searchParams.et || "";
  const sll = Number(searchParams.sll || 0); // lower salary
  const slg = Number(searchParams.slg || 0); // higher salary
  // const cp = searchParams.cp || "";

  const res = await fetch(
    `http://localhost:3000/api/search?q=${query}&jt=${jt}&et=${et}&slg=${slg}&sll=${sll}`
  );

  const result = await res.json();
  const jobData: OpeningWithCompany[] = result?.data || [];

  // can add compnay in sidebar -_- (mendoukusai naa), salary, or also can add more data to schema 

  return (
    <div >
      {jobData.length === 0 ? (
        <p>No results found.</p>
      ) : (
        <div>
          <p>Result Found for <Quote>{query}</Quote></p>
          <div  className="flex flex-wrap justify-center gap-4">

            {jobData.map((job) => (
              <div key={job.id} className="flex flex-col">
                <JobCard item={job} />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
