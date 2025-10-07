
import ApplyDeleteButton from "@/app/components/job-page/apply-delete-application-btn";
import EditDelJob from "@/app/components/job-page/edit-delete-job";
import ViewApplicants from "@/app/components/job-page/view-applicants-btn";
import NotFoundComponent from "@/app/components/reusables/notfound";
import { getUserFromCookies } from "@/helper";
import prismaClient from "@/services/prisma";
import { OpeningWithCompany } from "@/types";
import { Avatar, Badge, Card, Heading, Text } from "@radix-ui/themes";


export default async function JobPage({ params }: { params: Promise<{ id: string }> }) {
  const user = await getUserFromCookies();
  const param = await params;
  const { id } = param

  const res = await fetch(`${process.env.NEXT_PUBLIC_HOST_URL}/api/job/${id}`);
  const data = await res.json();
  if (!data?.success) {
    return (

      <NotFoundComponent message="Unable to get Job Details" />
    )
  }
  const jobDetail = data.data;
  let isApplied = false;

  if (user) {
    const apps = await prismaClient.application.findMany({
      where: { job_id: id, user_id: user?.id },
    });
    isApplied = apps.length > 0;
  }

  return (
    <div className="!max-w-6xl !mx-auto !mt-6 !px-4 !space-y-6">
      {/* Job Header */}
      <Card variant="surface">
        <div className="!flex !flex-col md:!flex-row !items-center !gap-4 ">
          <div className="!flex !flex-col md:!flex-row !items-center !gap-4">
            <Avatar

              src={jobDetail?.company?.logoUrl}
              radius="large"
              fallback={jobDetail?.company?.title?.[0] || jobDetail.title[0]}
              className="!ring-4 ring-gray-300/30 !shadow-lg !size-20 md:!size-30 "
            />
            <div className="text-center ">
              <Heading size="7">{jobDetail?.title}</Heading>

              <div className="flex justify-center md:justify-start gap-2 mt-3">
                <Badge color="green">{jobDetail?.employment_type}</Badge>
                <Badge color="blue">{jobDetail?.job_type.toUpperCase()}</Badge>
              </div>
            </div>
          </div>

          <div className=" !flex !justify-end-safe gap-4">
            <Detail label="Salary" value={`$${jobDetail?.salary}`} color="green" />
            <Detail label="Location" value={jobDetail?.location} color="blue" />
            <Detail label="Posted" value="Recently" color="purple" />
          </div>
        </div>
      </Card>

      {/* Content */}
      <div className="gap-6 flex flex-col md:flex-row ">
        {/* Left Side */}
        <div className="space-y-6 md:max-w-[80%] max-w-full ">
          <Card className="p-6">
            <Heading size="5" className="mb-4">Job Description</Heading>
            <Text size="3" className=" hyphens-auto">{jobDetail?.description}</Text>
          </Card>

          {jobDetail?.company && (
            <Card className="p-6 ">
              <Heading size="5" className="mb-4">About {jobDetail.company.title}</Heading>
              <div className="flex flex-col md:flex-row gap-4 ">
                <Avatar

                  src={jobDetail.company.logoUrl}
                  radius="large"
                  fallback={jobDetail.company.title[0]

                  }
                  className="!size-16 md:!size-20 "
                />
                <Text size="3" className="hyphens-auto">{jobDetail.company.description}</Text>
              </div>
            </Card>
          )}

          {user?.company?.id === jobDetail?.company.id && (
            <Card className="p-6">Analytics for applied users (Coming Soon)</Card>
          )}
        </div>


        {/* Right Side */}
        <div className="flex flex-col space-y-3 md:max-w-[20%] max-w-full ">
          <Card className="!p-6 !justify-center !flex flex-col">
            <Heading size="4" className="mb-4">Actions</Heading>
            <div className="space-y-3 flex-row flex-wrap">
              <ApplyDeleteButton isUserApplied={isApplied} job={jobDetail as OpeningWithCompany} />
              <ViewApplicants job={jobDetail} />
              <EditDelJob job={jobDetail} />
            </div>
          </Card>

          <Card className="p-6 space-y-3">
            <Heading size="4">Job Details</Heading>
            <Info label="Employment Type: " value={jobDetail?.employment_type} />
            <Info label="Work Model: " value={jobDetail?.job_type} />
            <Info label="Salary Range: " value={"$" + `${jobDetail?.salary} annually`} />
            <Info label="Location: " value={jobDetail?.location} />
          </Card>

        </div>
      </div>
    </div>
  );
}


function Detail({ label, value, color }: { label: string; value: string; color: any }) {
  return (
    <div className="flex flex-col items-center gap-1">
      <Text size="2" className="text-gray-500">{label}</Text>
      <Badge color={color} variant="soft">{value}</Badge>
    </div>
  );
}

function Info({ label, value }: { label: string; value: string }) {
  return (
    <div className="!flex !justify-between !gap-4">
      <Text size="2" className="text-gray-500 !w-[100px] ">{label}</Text>
      <Text size="3" weight="medium" className="!w-[150px]">{value}</Text>
    </div>
  );
}
