
import ApplyDeleteButton from "@/app/components/job-page/apply-delete-application-btn";
import EditDelJob from "@/app/components/job-page/edit-delete-job";
import ViewApplicants from "@/app/components/job-page/view-applicants-btn";
import { getUserFromCookies } from "@/helper";
import prismaClient from "@/services/prisma";
import { Avatar, Badge, Card } from "@radix-ui/themes";
import { notFound } from "next/navigation";

export default async function JobPage({ params }) {
  const user = await getUserFromCookies()
  console.log("user", user);

  const { id } = await params;
  const res = await fetch("http://localhost:3000/api/job/" + id);
  const data = await res.json();

  if (!data?.success) {
    notFound();
  }
  let isApplied = false;

  if (user) {
    const application = await prismaClient.application.findMany({
      where: {
        job_id: id,
        user_id: user?.id,
      },
    });

    if (application.length > 0) {
      isApplied = true;
    }

  }

  const jobDetail = data.data;
  // console.log("details:", jobDetail);
  // console.log(isApplied);



  return (
    <div className="max-w-5xl mx-auto mt-10 px-4 text-base ">
      <Card className=" ">
        <div className="flex flex-col md:flex-row gap-8 p-6 b">

          <div className="flex flex-col items-center md:items-start gap-4 min-w-[200px]">
            <Avatar
              size="9"
              src={jobDetail?.company?.logo}
              radius="full"
              fallback={jobDetail.title[0]}
              color="iris"
            />
            <div className="text-center md:text-left">
              <h1 className="text-2xl font-bold ">
                {jobDetail?.title}
              </h1>
              <Badge color="green" className="mt-1">
                {jobDetail?.employment_type}
              </Badge>
            </div>
          </div>

          <div className="flex-1 flex flex-col justify-between gap-6">

            <div className="flex flex-wrap justify-between gap-6">
              <div>
                <p >Job Type</p>
                <p className="text-gray-400 ">{jobDetail?.job_type}</p>
              </div>
              <div>
                <p >Salary</p>
                <p className="text-gray-400 ">{jobDetail?.salary}</p>
              </div>
              <div>
                <p >Location</p>
                <p className="text-gray-400 ">{jobDetail?.location}</p>
              </div>
            </div>


          </div>
        </div>
      </Card>
      <Card>
        <div className="flex flex-wrap gap-4 justify-end items-center ">
          <ApplyDeleteButton isUserApplied={isApplied} job={jobDetail} />
          <ViewApplicants job={jobDetail} />
          <div><EditDelJob job={jobDetail} /></div>

        </div>
      </Card>
    </div>
  );
}
