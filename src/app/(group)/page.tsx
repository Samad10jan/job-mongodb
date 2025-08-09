
import { notFound } from "next/navigation";
import JobCard from "../components/cards/job-card";
import prismaClient from "@/services/prisma";
import Image from "next/image";
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

    if ((job.length == 0)) {
      notFound();
    }

  } catch (err) {
    console.log(err.message);
    // alert("Unbale to get data from database")
    notFound();

  }

  return (

    <main className="h-screen">

      {/* <section className=" md:max-w-[88rem] mx-auto flex items-center grow h-[60%] bg-gradient-to-l to-emerald-700 max-w-3xl rounded-2xl " >
        <div className="flex flex-col justify-between *:m-5  grow" >
          <div className="text-5xl text-white font-extrabold ">Forge Your Path. The Quest for the Perfect Job Begins.</div>

          <div>Step into a realm where your skills are magic, and every listing is a new adventure waiting to unfold.</div>
          <div>Ready your resume. The journey starts now.</div>
        </div>
        <div className=" rounded-full overflow-clip">
          <Image src={"https://thf.bing.com/th/id/OIP.rMKydbZB_oaAfaoJdp25JAHaE7?w=275&h=183&c=7&r=0&o=5&cb=thfc1&dpr=1.4&pid=1.7"} alt="" width={"500"} height={"700"} />
        </div>
      </section> */}


      <h1 className="text-center font-semibold text-3xl mt-4">Recently Added Jobs</h1>
      <div className="flex flex-wrap justify-center " >
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
      <div></div>
    </main>
  );
}
