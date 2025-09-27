"use client"
import { BackpackIcon, BookmarkFilledIcon, BookmarkIcon, SewingPinFilledIcon } from "@radix-ui/react-icons";
import { Avatar, Badge, Box, Button, Card, Flex, Text } from "@radix-ui/themes";
import Link from "next/link";
import { Suspense, useContext, useState } from "react";
import { Company, Opening, User } from "../../../../generated/prisma";
import JobCardSkeleton from "../loading-skeletons/job-card-skeleton";
import { UserContext } from "../context/user-context";
import CallOutMessage from "../reusables/call-out";
import { OpeningWithCompany } from "@/types";



export default function JobCard({ item }: { item: OpeningWithCompany }) {
  const { user } = useContext(UserContext);

  const [isSaved, setIsSaved] = useState<boolean>(
    user?.SavedJobs?.some((job: any) => job.jobId === item.id) || false
  );

  const [message, setMessage] = useState("");

  async function handleSave() {
    if (!user) {
      setMessage("Please login to save jobs");
      return;
    }

    try {
      if (isSaved) {
        // UNSAVE
        await fetch(`/api/savedJobs`, {
          method: "DELETE",
          body: JSON.stringify({ userId: user.id, jobId: item.id }),
        });
        setIsSaved(false);
      } else {
        // SAVE
        await fetch("/api/savedJobs", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ userId: user.id, jobId: item.id }),
        });
        setIsSaved(true);
      }
    } catch (error) {
      console.error("Error saving job:", error);
      setMessage("An error occurred while saving the job");
    }
  }

  return (
    <Suspense fallback={<JobCardSkeleton />}>
      <div className="p-3">
        <Card
          className="
            !relative
            !w-full !max-w-[15em] md:max-w-md lg:max-w-lg
            !h-60 md:!h-[25rem] !mx-auto !rounded-2xl
            hover:!shadow-xl !border !border-gray-200
            !overflow-hidden
          "
        >
          {/* absolute save button so it doesn't affect layout on small screens */}
          <div className="absolute top-3 right-3 z-10">
            <Button
              onClick={handleSave}
              variant="outline"
              title={isSaved ? "Unsave Job" : "Save Job"}
              className="!p-1 md:!p-2 !rounded-full !min-w-0 !h-auto"
            >
              {isSaved ? (
                <BookmarkFilledIcon className="!w-4 !h-4 md:!w-6 md:!h-6" />
              ) : (
                <BookmarkIcon className="!w-4 !h-4 md:!w-6 md:!h-6" />
              )}
            </Button>
          </div>

          {/* content split top-to-bottom to keep footer button pinned */}
          <div className="flex flex-col h-full justify-between">
            <Flex direction="column" align="center" className="pt-4 px-3 gap-2 flex-1 overflow-hidden">
              <Avatar
                src={item.company?.logoUrl || ""}
                size="5"
                radius="full"
                fallback={item.title?.[0] || "·"}
                className="!w-12 !h-12 sm:!w-14 sm:!h-14 md:!w-20 md:!h-20 !shrink-0"
              />

              {/* Title - clamp to 2 lines */}
              <Text
                as="div"
                weight="bold"
                className="text-sm sm:text-base md:text-lg text-center line-clamp-1 md:line-clamp-2 px-1"
                title={item.title}
              >
                {item.title}
              </Text>

              {/* Location / Job Type */}
              <Box className="text-center mt-1 w-full">
                <Flex
                  justify="center"
                  gap="2"
                  className="text-[11px] sm:text-xs text-gray-500 flex-wrap px-2"
                >
                  <Badge className="px-2 py-0.5 text-[10px] max-w-[7rem] truncate flex items-center gap-1">
                    <SewingPinFilledIcon className="w-3 h-3" /> {item.location}
                  </Badge>
                  <Badge className="px-2 py-0.5 text-[10px] max-w-[7rem] truncate flex items-center gap-1">
                    <BackpackIcon className="w-3 h-3" /> {item.job_type}
                  </Badge>
                </Flex>

                <Text
                  as="div"
                  className="text-[11px] sm:text-xs text-gray-500 truncate max-w-[85%] mx-auto mt-1"
                  title={item.company?.owner?.email}
                >
                  Recruiter: {item.company?.owner?.email}
                </Text>
              </Box>
            </Flex>

            {/* Footer action pinned to bottom, small on mobile */}
            <div className="flex justify-center pb-3">
              <Link href={`/job/${item.id}`}>
                <Button
                  variant="solid"
                  color="green"
                  className="text-xs sm:text-sm px-3 py-1"
                  title="view details"
                >
                  View Details
                </Button>
              </Link>
            </div>
          </div>
        </Card>

        <CallOutMessage message={message} />
      </div>
    </Suspense>
  );
}
