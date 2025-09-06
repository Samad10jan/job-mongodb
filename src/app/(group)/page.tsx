import prismaClient from "@/services/prisma";
import { notFound } from "next/navigation";
import JobCard from "../components/cards/job-card";
import CompanyList from "../components/homepage/company-listing";
import HeroSection from "../components/homepage/hero-section";
import LogoAnimation from "../components/homepage/scrollanimation";
import Footer from "../components/homepage/footer";
import { Separator } from "@radix-ui/themes";

export default async function Home() {
  try {
    const [jobs, companies] = await Promise.all([
      prismaClient.opening.findMany({
        include: {
          company: {
            include: { owner: true },
          },
        },
        orderBy: { createdAt: "desc" },
        take: 4,
      }),
      prismaClient.company.findMany({
        include: { jobs: true },
      }),
    ]);

    return (
      <main className="min-h-screen *:m-3">

        <HeroSection />


        <LogoAnimation />

        <SectionDivider />


        <div id="companies">
          <CompanyList companys={companies} />
        </div>

        <SectionDivider />


        <section className="scrollappear">
          <h1
            className="text-center font-semibold text-3xl mb-6"
            id="jobs"
          >
            Recently Added Jobs
          </h1>
          {
          jobs.length > 0 ? (
            <div className="flex flex-wrap justify-center gap-4">
              {jobs.map((job) => (
                <JobCard key={job.id} item={job} />
              ))}
            </div>
          ) : (
            <p className="text-center font-bold text-gray-500">
              No jobs available yet
            </p>
          )}
        </section>

        <SectionDivider />


        <div id="contact">
          <Footer />
        </div>
      </main>
    );
  } catch (err: any) {
    console.error("Error fetching data:", err.message);
    notFound(); 
  }
}


function SectionDivider() {
  return (
    <div className="flex justify-center">
      <Separator size="4" className="!my-10 !max-w-4xl" />
    </div>
  );
}
