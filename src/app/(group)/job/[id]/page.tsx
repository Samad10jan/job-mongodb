import { OpeningWithCompany } from "@/app/components/cards/job-card";
import ApplyDeleteButton from "@/app/components/job-page/apply-delete-application-btn";
import EditDelJob from "@/app/components/job-page/edit-delete-job";
import ViewApplicants from "@/app/components/job-page/view-applicants-btn";
import NotFoundComponent from "@/app/components/reusables/notfound";
import { getUserFromCookies } from "@/helper";
import prismaClient from "@/services/prisma";
import { Avatar, Badge, Card, Heading, Text } from "@radix-ui/themes";


export default async function JobPage({ params }: { params: { id: string } }) {
  const user = await getUserFromCookies();
  const { id } = params;

  const res = await fetch(`http://localhost:3000/api/job/${id}`);
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
    <div className="max-w-6xl mx-auto mt-6 px-4 space-y-6">
      {/* Job Header */}
      <Card variant="surface">
        <div className="p-8 flex flex-col lg:flex-row gap-6">
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4">
            <Avatar
              size="9"
              src={jobDetail?.company?.logoUrl}
              radius="large"
              fallback={jobDetail?.company?.title?.[0] || jobDetail.title[0]}
              className="ring-4 ring-white shadow-lg"
            />
            <div className="text-center sm:text-left">
              <Heading size="7">{jobDetail?.title}</Heading>
              <Text size="4" className="text-gray-600">{jobDetail?.company?.title}</Text>
              <div className="flex gap-2 mt-3">
                <Badge color="green">{jobDetail?.employment_type}</Badge>
                <Badge color="blue">{jobDetail?.job_type.toUpperCase()}</Badge>
              </div>
            </div>
          </div>

          <div className="flex-1 grid sm:grid-cols-3 gap-4">
            <Detail label="Salary" value={`$${jobDetail?.salary}`} color="green" />
            <Detail label="Location" value={jobDetail?.location} color="blue" />
            <Detail label="Posted" value="Recently" color="purple" />
          </div>
        </div>
      </Card>

      {/* Content */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Left Side */}
        <div className="lg:col-span-2 space-y-6">
          <Card className="p-6">
            <Heading size="5" className="mb-4">Job Description</Heading>
            <Text size="3" className="whitespace-pre-wrap">{jobDetail?.description}</Text>
          </Card>

          {jobDetail?.company && (
            <Card className="p-6">
              <Heading size="5" className="mb-4">About {jobDetail.company.title}</Heading>
              <div className="flex gap-4">
                <Avatar
                  size="6"
                  src={jobDetail.company.logoUrl}
                  radius="large"
                  fallback={jobDetail.company.title[0]}
                />
                <Text size="3">{jobDetail.company.description}</Text>
              </div>
            </Card>
          )}

          {user?.company?.id === jobDetail?.company.id && (
            <Card className="p-6">Analytics for applied users (Coming Soon)</Card>
          )}
        </div>

        {/* Right Side */}
        <div className="space-y-6">
          <Card className="p-6">
            <Heading size="4" className="mb-4">Actions</Heading>
            <div className="space-y-3">
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

/* --- Small Components --- */
function Detail({ label, value, color }: { label: string; value: string; color: any }) {
  return (
    <div className="flex flex-col items-start gap-1">
      <Text size="2" className="text-gray-500">{label}</Text>
      <Badge color={color} variant="soft">{value}</Badge>
    </div>
  );
}

function Info({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <Text size="2" className="text-gray-500">{label}</Text>
      <Text size="3" weight="medium">{value}</Text>
    </div>
  );
}
