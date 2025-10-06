"use client";

import { OpeningWithCompany } from "@/types";
import { BookmarkFilledIcon } from "@radix-ui/react-icons";
import { Avatar, Badge, Box, Button, Card, Flex } from "@radix-ui/themes";
import Link from "next/link";
import { useState } from "react";
import CallOutMessage from "../reusables/call-out";

export default function SavedJobCard({
  item,
  onUnsave,
  userId,
}: {
  item: OpeningWithCompany;
  userId: string;
  onUnsave: (jobId: string) => void;
}) {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  async function handleUnsave() {
    setLoading(true);
    try {
      await fetch("/api/savedJobs", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, jobId: item.id }),
      });

      onUnsave(item.id); // remove from parent list
      setMessage("Job removed from saved jobs");
    } catch (err) {
      console.error(err);
      setMessage("Failed to remove job");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="p-1">
      <Card className="!relative flex md:w-md w-3xs h-full md:!h-60 md:!max-h-[18rem] !mx-auto !rounded-2xl hover:!shadow-xl !border !border-gray-200">
        <div className="absolute top-3 right-3 z-10">
          <Button
            onClick={handleUnsave}
            disabled={loading}
            variant="outline"
            title="Remove Saved Job"
            className="!p-1 md:!p-2 !rounded-full !min-w-0 !h-auto hover:!bg-red-400"
          >
            <BookmarkFilledIcon className="!w-4 !h-4 md:!w-6 md:!h-6" />
          </Button>
        </div>

        <div className="md:flex md:flex-col h-full justify-between">
          <Flex align="center" className="!pt-4 !px-3 !gap-2 !flex-1 flex-col">
            <div className="flex items-center gap-5 w-full mt-4">
              <Avatar
                src={item.company?.logoUrl || ""}
                size="5"
                radius="full"
                fallback={item.company?.title?.[0] || "·"}
                className="!w-12 !h-12 sm:!w-14 sm:!h-14 md:!size-16 !shrink-0"
              />
              <div
                className="!text-sm !font-semibold md:!text-lg !text-center !line-clamp-1"
                title={item.title}
              >
                {item.title}
              </div>
            </div>

            <Box className="text-center mt-1 w-full">
              <Flex gap="2" className="text-[11px] sm:text-xs text-gray-500 flex-wrap px-2">
                <Badge className="px-2 py-0.5 text-[10px] max-w-[7rem] truncate flex items-center gap-1">
                  {item.location}
                </Badge>
                <Badge className="px-2 py-0.5 text-[10px] max-w-[7rem] truncate flex items-center gap-1">
                  {item.job_type}
                </Badge>
              </Flex>
            </Box>
          </Flex>

          <div className="flex justify-end-safe mt-4 pb-3">
            <Link href={`/job/${item.id}`} title="view job details">
              <Button variant="solid" color="green" className="text-xs sm:text-sm px-3 py-1">
                View Details
              </Button>
            </Link>
          </div>
        </div>
      </Card>

      <CallOutMessage message={message} />
    </div>
  );
}
