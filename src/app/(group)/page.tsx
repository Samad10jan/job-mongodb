
import JobCard from "../components/job-card";
import prismaClient from "@/services/prisma";
export default async function Home() {
  let job: any = []
  try {
    job = await prismaClient.opening.findMany({
      include: {
        company: {
          include: {
            owner: true
          }
        }
      }
    })
  } catch (err) {
    console.log(err.message);
    alert("Unbale to get data from database")

  }

  return (

    <main className="">
      <div>

      </div>


      <div className="flex flex-wrap justify-center sm:flex " >
        {
          job.map((job, index) => {
            return (
              <div key={index}>
                <JobCard item={job} />
              </div>
            )
          })
        }
      </div>
    </main>
  );
}
