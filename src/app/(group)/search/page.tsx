
import JobCard from "@/app/components/cards/job-card";
import { OpeningWithCompany } from "@/types";
import { Quote } from "@radix-ui/themes";

export default async function Search({ searchParams }: { searchParams: Promise<{ q: string, jt: string, et: string,sll:number,slg:number,cp:string }> }) {
  const searchParam= await searchParams
  const query = searchParam.q || "";
  const jt = searchParam.jt || "";
  const et = searchParam.et || "";
  const sll = Number(searchParam.sll || 0); // lower salary
  const slg = Number(searchParam.slg || 0); // higher salary
  // const cp = searchParam.cp || "";

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_HOST_URL}/api/search?q=${query}&jt=${jt}&et=${et}&slg=${slg}&sll=${sll}`
  );

  const result = await res.json();
  const jobData: OpeningWithCompany[] = result?.data || [];

  // can add compnay in sidebar -_- (mendoukusai naa), salary, or also can add more data to schema 

  return (
    <div >
      {jobData.length === 0 ? (
        <p className="text-center ">No results found.</p>
      ) : (
        <div>
          <p className="text-center line-clamp-1">Result for <Quote>{query}</Quote></p>
          <div  className="flex flex-wrap gap-2 justify-evenly  ">

            {jobData.map((job) => (
              <div key={job.id} className="size-25 md:size-fit *:scale-40 md:*:scale-100 flex justify-center items-center">
                <JobCard item={job} />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
