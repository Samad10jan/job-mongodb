"use client";

import { UserContext } from "@/app/components/context/user-context";
import {EnvelopeClosedIcon,GitHubLogoIcon,LinkedInLogoIcon} from "@radix-ui/react-icons";
import {Avatar,Badge,Card,Heading,Separator,Text,} from "@radix-ui/themes";

import ProfileOverviewTab from "@/app/components/profilepage/tab";
import NotFoundComponent from "@/app/components/reusables/notfound";
import { useParams } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import { UwC } from "../../layout";
import Loading from "../../loading";

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

        if (!data?.success) {
          setNotFoundError(true);
          return;
        }

        if (user?.company.id !== data.data?.company?.id) {
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

  if (loading) return <Loading />;

  if (notFoundError || !appliedUser) {
    return (
      <NotFoundComponent message="Applicant Not found"/>
    );
  }

  const mockData = {
    name: "Unnamed Applicant",
    title: "Software Developer",
    description:"",
    education:"",
    skills:"",
    location: "New York, NY",
    phone: "+1 (555) 123-4567",
    linkedin: "linkedin.com/in/johndoe",
    github: "github.com/johndoe",
    experience: "3+ Years",
    appliedDate: "2024-01-15",
    status: "Under Review",
  };

  return (
    <div className="max-w-6xl mx-auto mt-6 px-4 space-y-6">
      {/* Profile Header */}
      <Card className="overflow-hidden">
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 h-32" />
        <div className="relative px-8 pb-8 -mt-16 flex flex-col lg:flex-row lg:items-end gap-6">
          <Avatar
            src={appliedUser.avatar ?? ""}
            fallback={appliedUser.email?.[0]?.toUpperCase() ?? "?"}
            size="9"
            radius="full"
            className="ring-4 ring-white shadow-lg"
          />

          <div className="flex-1 space-y-3">
            <Heading size="7">{mockData.name}</Heading>
            <Text size="4" className="text-gray-600">
              {mockData.title}
            </Text>
            <div className="flex gap-2">
              <Badge color="blue">{mockData.experience}</Badge>
              <Badge color="green">{mockData.status}</Badge>
            </div>
          </div>
        </div>
      </Card>

      {/* Main Layout: Tabs + Sidebar */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Tabs */}
        <div className="lg:col-span-2">
          <ProfileOverviewTab/>
        </div>

        {/* Sidebar */}
        <Card className="p-6 h-fit">
          <Heading size="4" className="mb-4">
            Contact Information
          </Heading>

          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <EnvelopeClosedIcon className="w-4 h-4 text-gray-500" />
              <Text>{appliedUser.email}</Text>
            </div>
            <Text>{mockData.phone}</Text>
            <Text>{mockData.location}</Text>
          </div>

          <Separator className="my-4" />

          <Heading size="3" className="mb-2">
            Social Links
          </Heading>
          <div className="space-y-2">
            <a
              href={`https://${mockData.linkedin}`}
              target="_blank"
              className="flex items-center gap-2 text-blue-600 hover:underline"
            >
              <LinkedInLogoIcon /> LinkedIn
            </a>
            <a
              href={`https://${mockData.github}`}
              target="_blank"
              className="flex items-center gap-2 text-gray-700 hover:underline"
            >
              <GitHubLogoIcon /> GitHub
            </a>
          </div>
        </Card>
      </div>
    </div>
  );
}
