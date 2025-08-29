
import prismaClient from "@/services/prisma";
import { notFound } from "next/navigation";
import JobCard from "../components/cards/job-card";
import CompanyList from "../components/homepage/company-listing";
import HeroSection from "../components/homepage/hero-section";
import LogoAnimation from "../components/homepage/scrollanimation";
import Footer from "../components/homepage/footer";
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

      <div >
        <HeroSection />
      </div>


      <div >
        <LogoAnimation />
      </div>
      <div id="companies">
        <CompanyList companys={company} />
      </div>

      <h1 className="text-center font-semibold text-3xl mt-4" id="jobs">Recently Added Jobs</h1>
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
      <div id="contact">

        <Footer />
      </div>
    </main>
  );
}
