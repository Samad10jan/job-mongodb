import JobCard from "../../components/job-card";

export default async function Search({ searchParams }) {
  const query = searchParams.q || "";
  const jt = searchParams.jt || "";
  const et = searchParams.et || "";

  const res = await fetch(
    `http://localhost:3000/api/search?q=${query}&jt=${jt}&et=${et}`
  );

  const result = await res.json();
  const jobData = result?.data || [];

  return (
    <div className="flex flex-wrap justify-center gap-4">
      {jobData.length === 0 ? (
        <p>No results found.</p>
      ) : (
        jobData.map((job, index) => (
          <div key={index} className="flex flex-col">
            <JobCard item={job} />
          </div>
        ))
      )}
    </div>
  );
}
