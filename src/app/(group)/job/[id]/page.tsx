import { OpeningWithCompany } from "@/app/components/cards/job-card";
import ApplyDeleteButton from "@/app/components/job-page/apply-delete-application-btn";
import EditDelJob from "@/app/components/job-page/edit-delete-job";
import ViewApplicants from "@/app/components/job-page/view-applicants-btn";
import { getUserFromCookies } from "@/helper";
import prismaClient from "@/services/prisma";
import { Avatar, Badge, Card, Heading, Text } from "@radix-ui/themes";
import { notFound } from "next/navigation";


export default async function JobPage({ params }: { params: { id: string } }) {
  const user = await getUserFromCookies();
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
  console.log(jobDetail);



  return (
    <div className="max-w-6xl mx-auto mt-6 px-4 space-y-6">
    
      <Card className="overflow-hidden" variant="surface">
        <div className="p-8">
          <div className="flex flex-col lg:flex-row gap-6 items-start">
           
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 min-w-fit">
              <Avatar
                size="9"
                src={jobDetail?.company?.logoUrl}
                radius="large"
                fallback={jobDetail?.company?.title?.[0] || jobDetail.title[0]}
                color="iris"
                className="ring-4 ring-white shadow-lg"
              />
              <div className="text-center sm:text-left">
                <Heading size="7" className="mb-2">
                  {jobDetail?.title}
                </Heading>
                <Text size="4" className="text-gray-600  mb-3 flex items-center gap-2">

                  {jobDetail?.company?.title}
                </Text>
                <div className="flex flex-wrap gap-2">
                  <Badge color="green" size="2" className="px-3 py-1">
                    {jobDetail?.employment_type}
                  </Badge>
                  <Badge color="blue" size="2" className="px-3 py-1">
                    {jobDetail?.job_type.toUpperCase()}
                  </Badge>
                </div>
              </div>
            </div>

          
            <div className="flex-1 grid grid-cols-1 sm:grid-cols-3 gap-4 lg:gap-6">
              <div className="flex flex-col items-start gap-1">
                <Text size="2" className="text-gray-500 ">Salary</Text>
                <Badge color="green" variant="soft">${jobDetail?.salary}</Badge>
              </div>

              <div className="flex flex-col items-start gap-1">
                <Text size="2" className="text-gray-500 ">Location</Text>
                <Badge color="blue" variant="soft">{jobDetail?.location}</Badge>
              </div>

              <div className="flex flex-col items-start gap-1">
                <Text size="2" className="text-gray-500 ">Posted</Text>
                <Badge color="purple" variant="soft">Recently</Badge>
              </div>
            </div>

          </div>
        </div>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Job Description */}
          <Card>
            <div className="p-6">
              <Heading size="5" className="mb-4 flex items-center gap-2">
                Job Description
              </Heading>
              <div className="prose prose-gray dark:prose-invert max-w-none">
                <Text size="3" className="leading-relaxed whitespace-pre-wrap">
                  {jobDetail?.description}
                </Text>
              </div>
            </div>
          </Card>

          {/* Company Information */}
          {jobDetail?.company && (
            <Card>
              <div className="p-6">
                <Heading size="5" className="mb-4 flex items-center gap-2">
                  About {jobDetail.company.title}
                </Heading>
                <div className="flex items-start gap-4">
                  <Avatar
                    size="6"
                    src={jobDetail.company.logoUrl}
                    radius="large"
                    fallback={jobDetail.company.title[0]}
                    color="iris"
                  />
                  <div className="flex-1">
                    <Text size="3" className="leading-relaxed">
                      {jobDetail.company.description}
                    </Text>
                  </div>
                </div>
              </div>
            </Card>
          )}{
            user?.company?.id === jobDetail?.company.id &&
            <Card>
              Analytic of applied users only shown to that owner of this openings company
              comingSoon
            </Card>
          }

        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Action Buttons */}
          <Card>
            <div className="p-6">
              <Heading size="4" className="mb-4">Actions</Heading>
              <div className="space-y-3">
                <ApplyDeleteButton
                  isUserApplied={isApplied}
                  job={jobDetail as OpeningWithCompany}
                />
                <ViewApplicants job={jobDetail} />
                <EditDelJob job={jobDetail} />
              </div>
            </div>
          </Card>

          {/* Job Details */}
          <Card>
            <div className="p-6">
              <Heading size="4" className="mb-4">Job Details</Heading>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div>
                    <Text size="2" className="text-gray-500 ">Employment Type: </Text>
                    <Text size="3" weight="medium">
                      {jobDetail?.employment_type}
                    </Text>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div>
                    <Text size="2" className="text-gray-500 ">Work Model: </Text>
                    <Text size="3" weight="medium">
                      {jobDetail?.job_type}
                    </Text>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div>
                    <Text size="2" className="text-gray-500 ">Salary Range: </Text>
                    <Text size="3" weight="medium">
                      {jobDetail?.salary} annually
                    </Text>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div>
                    <Text size="2" className="text-gray-500 ">Location : </Text>
                    <Text size="3" weight="medium">{jobDetail?.location}</Text>
                  </div>
                </div>

              </div>
            </div>
          </Card>

          {/* Application Status */}
          {user && (
            <Card>
              <div className="p-6">
                <Heading size="4" className="mb-3">Application Status</Heading>
                <div className="flex items-center gap-3">
                  <div className={`w-3 h-3 rounded-full ${isApplied ? 'bg-green-500' : 'bg-gray-300'}`} />
                  <Text size="3" weight="medium">
                    {isApplied ? 'Application Submitted' : 'Not Applied'}
                  </Text>
                </div>
                {isApplied && (
                  <Text size="2" className="text-gray-500 mt-2">
                    Your application has been successfully submitted. The company will review it shortly.
                  </Text>
                )}
              </div>
            </Card>
          )}


        </div>
      </div>
    </div>
  );
}