"use client";

import { UserContext } from "@/app/components/context/user-context";
import { EnvelopeClosedIcon, GitHubLogoIcon, LinkedInLogoIcon } from "@radix-ui/react-icons";
import { Avatar, Badge, Card, Heading, Separator, Text, } from "@radix-ui/themes";

import ProfileOverviewTab from "@/app/components/profilepage/tab";
import NotFoundComponent from "@/app/components/reusables/notfound";
import { useParams } from "next/navigation";
import { useContext, useEffect, useState } from "react";

import UserCardSkeleton from "@/app/components/loading-skeletons/user-profile-skeleton";
import { UwC } from "@/types";

export default function UserProfile() {
  const params = useParams();
  const id = params.id as string;
  const { user } = useContext(UserContext);

  const [appliedUser, setAppliedUser] = useState<UwC | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFoundError, setNotFoundError] = useState(false);

  useEffect(() => {
    async function getAppliedUser() {
      try {
        if (!id?.trim()) {
          setNotFoundError(true);
          return;
        }

        const res = await fetch(`/api/applicantprofile/${id}`);
        const data = await res.json();
        console.log(data);

        if (!data?.success) {
          setNotFoundError(true);
          return;
        }

        const applications = data.data?.Application ?? [];
        const hasCompany = applications.some((app: any) => app.job?.company?.id === user?.company?.id);

        if (!hasCompany) {
          setNotFoundError(true);
          return;
        }

        setAppliedUser(data.data);
      } catch {
        setNotFoundError(true);
      } finally {
        setLoading(false);
      }
    }

    getAppliedUser();
  }, [id, user?.company.id]);

  if (loading) return <UserCardSkeleton />;

  if (notFoundError || !appliedUser) {
    return (
      <NotFoundComponent message="Applicant Not found" />
    );
  }

  // Define data with existence checks
  const firstName = user?.details?.firstName?.trim();
  const lastName = user?.details?.lastName?.trim();
  const education = user?.details?.education?.trim();
  const experience = user?.details?.experience;
  const email = appliedUser?.email?.trim();
  const phone = user?.details?.phone;
  const address = user?.details?.address?.trim();
  const linkedin = user?.details?.linkedin?.trim();
  const github = user?.details?.github?.trim();

  return (
    <div className="max-w-6xl mx-auto mt-6 px-4 space-y-6">

      <Card className="overflow-hidden">
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 h-32" />
        <div className="relative px-8 pb-8 -mt-16 flex flex-col items-center lg:flex-row lg:items-end gap-6">
          <Avatar
            src={appliedUser.details?.avatar ?? ""}
            fallback={appliedUser.email?.[0]?.toUpperCase() ?? "?"}
            size="9"
            radius="full"
            variant="solid"
            className="ring-4 ring-white shadow-lg"
          />

          <div className="flex-1 space-y-3">
            {(firstName || lastName) && (
              <Heading size="7">
                {firstName} {lastName}
              </Heading>
            )}

            {education && (
              <Text size="4" className="text-gray-600">
                {education}
              </Text>
            )}

            {experience && (
              <div className="flex gap-2">
                <Badge color="blue">{experience} yrs</Badge>
              </div>
            )}
          </div>
        </div>
      </Card>

      <div className="!flex !flex-col lg:!flex-row !flex-wrap !gap-6">

        {/* Tabs */}
        <div className="lg:flex-1">
          <ProfileOverviewTab userDetails={user?.details} />
        </div>


        <Card className="p-6 h-fit">
          <Heading size="4" className="mb-4">
            Contact Information
          </Heading>

          <div className="space-y-2">
            {email && (
              <div className="flex items-center gap-2">
                <EnvelopeClosedIcon className="w-4 h-4 text-gray-500" />
                <Text>{email}</Text>
              </div>
            )}
            {phone && <Text>{phone}</Text>}
            {address && <Text>{address}</Text>}
          </div>

          {(linkedin || github) && (
            <>
              <Separator className="my-4" />
              <Heading size="3" className="mb-2">
                Social Links
              </Heading>
              <div className="space-y-2">
                {linkedin && (
                  <a
                    href={`https://${linkedin}`}
                    target="_blank"
                    className="flex items-center gap-2 text-blue-600 hover:underline"
                  >
                    <LinkedInLogoIcon /> LinkedIn
                  </a>
                )}

                {github && (
                  <a
                    href={`https://${github}`}
                    target="_blank"
                    className="flex items-center gap-2 text-gray-700 hover:underline"
                  >
                    <GitHubLogoIcon /> GitHub
                  </a>
                )}
              </div>
            </>
          )}
        </Card>
      </div>
    </div>
  );
}