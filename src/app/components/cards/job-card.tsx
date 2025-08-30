"use client"
import { BackpackIcon, BookmarkIcon, SewingPinFilledIcon } from "@radix-ui/react-icons";
import { Avatar, Badge, Box, Button, Card, Flex, Text } from "@radix-ui/themes";
import Link from "next/link";
import { Suspense } from "react";
import { Company, Opening, User } from "../../../../generated/prisma";
import JobCardSkeleton from "../loading-skeletons/job-card-skeleton";


export type OpeningWithCompany = Opening & { company?: Company & { owner: User } };

export default function JobCard({ item }: { item: OpeningWithCompany }) {
  return (
    <Suspense fallback={<JobCardSkeleton />}>

      <div className="p-4">


        <Card className="w-[20rem] h-[28rem] mx-auto rounded-2xl hover:shadow-xl border border-gray-200">
          <div className="flex flex-col h-full">
            <div className="self-end">
              <Text as="div" className="text-sm text-emerald-700-400 font-medium">
                <button
                  title="Save Job"
                  className="hover:bg-emerald-500 transition-all rounded p-1"
                >
                  <BookmarkIcon className="md:!size-7 !size-5" />
                </button>
              </Text>
            </div>

            <Flex direction="column" align="center" className="p-6 gap-4 flex-1">
              <Avatar
                src={item.company?.logoUrl || ""}
                size="5"
                radius="full"
                fallback={item.title[0]}
                className="w-16 h-16 md:w-24 md:h-24"
              />

              <Text
                as="div"
                weight="bold"
                className="text-lg md:text-xl text-center line-clamp-2"
              >
                {item.title}
              </Text>

              <Box className="text-center space-y-2">
                <Flex justify="center" gap="4" className="text-xs text-gray-500">
                  <Badge><SewingPinFilledIcon /> {item.location}</Badge>
                  <Badge><BackpackIcon /> {item.job_type}</Badge>
                </Flex>

                <Text as="div" className="text-xs text-gray-500">
                  Recruiter: {item.company?.owner?.email}
                </Text>
              </Box>

              <Flex gap="4" className="pt-4 flex-wrap">
                <Link href={`/job/${item.id}`}>
                  <Button variant="solid" color="green" className="text-sm" title="view details">
                    View Details
                  </Button>
                </Link>
              </Flex>
            </Flex>
          </div>
        </Card>


      </div>
    </Suspense>
  );
}
