"use client"
import { OpeningWithCompany } from "@/types";
import { BackpackIcon, BookmarkFilledIcon, BookmarkIcon, SewingPinFilledIcon } from "@radix-ui/react-icons";
import { Avatar, Badge, Box, Button, Card, Flex, Text } from "@radix-ui/themes";
import Link from "next/link";
import { Suspense, useContext, useState } from "react";
import { UserContext } from "../context/user-context";
import JobCardSkeleton from "../loading-skeletons/job-card-skeleton";
import CallOutMessage from "../reusables/call-out";



export default function JobCard({ item }: { item: OpeningWithCompany }) {
  const { user } = useContext(UserContext);

  // user ke kisi SavedJob array me kisi job_id se any match kar rha hai ya nahi  
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
      <div className="p-1 ">
        <Card
          className="
            !relative
            flex md:w-md w-3xs 
            h-full
            md:!h-60 md:!max-h-[18rem] !mx-auto !rounded-2xl
            hover:!shadow-xl !border !border-gray-200
             *:!mb-2
          "
        >

          <div className="absolute top-3 right-3 z-10 ">
            <Button
              onClick={handleSave}
              variant="outline"
              title={isSaved ? "Unsave Job" : "Save Job"}
              className="!p-1 md:!p-2 !rounded-full !min-w-0 !h-auto hover:!bg-emerald-400"
            >
              {isSaved ? (
                <BookmarkFilledIcon className="!w-4 !h-4 md:!w-6 md:!h-6" />
              ) : (
                <BookmarkIcon className="!w-4 !h-4 md:!w-6 md:!h-6" />
              )}
            </Button>
          </div>

          <div className="md:flex md:flex-col h-full justify-between">
            <Flex align="center" className="!pt-4 !px-3 !gap-2 !flex-1 flex-col  ">
              <div className="flex  items-center gap-5 w-full mt-4">

                <Avatar
                  src={item.company?.logoUrl || ""}
                  size="5"
                  radius="full"
                  fallback={item.company?.title?.[0] || "·"}
                  className="!w-12 !h-12 sm:!w-14 sm:!h-14 md:!size-16 !shrink-0 justify-self-start"
                />


                <div
                  className="!text-sm !font-semibold md:!text-lg !text-center !line-clamp-1 "
                  title={item.title}
                >
                  {item.title}
                </div>
              </div>

              {/* Location / Job Type */}
              <Box className="text-center mt-1 w-full ">
                <Flex

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

                {/* <Badge className="!text-[11px] sm:!text-xs !text-gray-500 !truncate !max-w-[85%] !mx-auto !my-1" variant="surface">

                  <HoverCard.Root>
                    <HoverCard.Trigger >
                    
                      <div>

                        Recruiter
                      </div>
                     
                    </HoverCard.Trigger>
                    <HoverCard.Content className="!text-xs !scale-90">
                      <p>

                        {item.company?.owner?.email}

                      </p>

                    </HoverCard.Content>
                  </HoverCard.Root>
                </Badge> */}

              </Box>
            </Flex>

            {/* Footer action pinned to bottom, small on mobile */}
            <div className="flex justify-end-safe mt-4 pb-3">
              <Link href={`/job/${item.id}`} title="view job details">
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
