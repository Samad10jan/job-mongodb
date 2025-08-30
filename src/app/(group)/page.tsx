
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
      <Separator size="4" className="my-10 bg-gray-200 dark:bg-gray-800" />
      <div id="companies" className=" ">
        <CompanyList companys={company} />
      </div>
      <Separator size="4" className="!my-10 bg-gray-200 dark:bg-gray-800" />
      <h1 className="text-center font-semibold text-3xl mt-4 scrollappear " id="jobs">Recently Added Jobs</h1>
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

      <div>

      </div>
      <Separator size="4" className="my-10 bg-gray-200 dark:bg-gray-800" />
      <div id="contact">

        <Footer />
      </div>
    </main>
  );
}
