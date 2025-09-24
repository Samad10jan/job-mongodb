import JobCard from "@/app/components/cards/job-card";
import NotFoundComponent from "@/app/components/reusables/notfound";
import { getUserFromCookies } from "@/helper";
import prismaClient from "@/services/prisma";
import { Card, Heading, Text } from "@radix-ui/themes";

export default async function AppliedApp() {
  const user = await getUserFromCookies();

  if (!user) {
    return (
      <NotFoundComponent message="Please login to see your Job Application" />
    );
  }

  const applications = await prismaClient.application.findMany({
    where: { user_id: user.id },
    include: {
      job: {
        include: {
          company: {
            include: {
              owner: true,
            },
          },
        },
      },
    },
  });

  if (!applications.length) {
    return (
      <Card className="max-w-lg mx-auto mt-10 p-6 text-center">
        <Heading size="5" className="mb-2">No Applications Found</Heading>
        <Text size="3" className="text-gray-600">
          You haven’t applied to any jobs yet. Start exploring and apply today!
        </Text>
      </Card>
    );
  }

  return (
    <div className="max-w-6xl mx-auto mt-10 px-4 space-y-6">
      <Heading size="6" className="mb-6 text-center">
        Applied Applications
      </Heading>

      <div className="flex flex-wrap flex-row justify-center">
        {applications.map((apply) => (
          <JobCard key={apply.id} item={apply.job} />
        ))}
      </div>
    </div>
  );
}
