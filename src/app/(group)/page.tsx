
import prismaClient from "@/services/prisma";
import { notFound } from "next/navigation";
import JobCard from "../components/cards/job-card";
import CompanyList from "../components/homepage/company-listing";
import HeroSection from "../components/homepage/hero-section";
import LogoAnimation from "../components/homepage/scrollanimation";
import Footer from "../components/homepage/footer";
import { Separator } from "@radix-ui/themes";
export default async function Home() {
  let job = []
  let company = []
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
    company = await prismaClient.company.findMany({
      include: {
        jobs: true
      }
    })

    if ((job.length == 0)) {
      notFound();
    }

  } catch (err: any) {
    console.log(err.message);
    // alert("Unbale to get data from database")
    notFound();

  }

  return (

    <main className="h-screen *:m-3 ">

      <div  >
        <HeroSection />
      </div>

      <div >
        <LogoAnimation />
      </div>
      <div className="flex justify-center">

        <Separator size="4" className="!my-10 bg-gray-200 !max-w-4xl " />
      </div>

      <div id="companies" className=" ">
        <CompanyList companys={company} />
      </div>
      <div className="flex justify-center">

        <Separator size="4" className="!my-8 bg-gray-200 !max-w-4xl " />
      </div>
      <div className="scrollappear ">

        <h1 className="text-center font-semibold text-3xl mb-4 " id="jobs">Recently Added Jobs</h1>
        <div className="flex flex-wrap justify-center " >
          {
            job.map((job) => {
              return (
                <div key={job.id}>
                  <JobCard item={job} />
                </div>
              )
            })
          }
        </div>

      </div>

      <div className="flex justify-center">

        <Separator size="4" className="!my-10 bg-gray-200 !max-w-4xl " />
      </div>

      <div id="contact">

        <Footer />
      </div>
    </main>
  );
}
