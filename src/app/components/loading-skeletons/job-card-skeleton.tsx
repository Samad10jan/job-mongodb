"use client";

import { Card, Flex, Box, Text, Skeleton } from "@radix-ui/themes";

export default function JobCardSkeleton() {
  return (
    <div className="p-4">
      <Box className="transition-transform duration-300 ease-in-out hover:scale-[1.03]">
        <Card className="w-full max-w-md mx-auto min-h-[25em] rounded-2xl shadow-md border border-gray-200">
          <div className="flex flex-col">
            {/* Top right company name */}
            <div className="self-end p-2">
              <Skeleton className="h-4 w-24 rounded-md" />
            </div>

            <Flex direction="column" align="center" className="p-6 gap-4">
              {/* Avatar */}
              <Skeleton className="h-24 w-24 rounded-full" />

              {/* Job Title */}
              <Skeleton className="h-6 w-40 rounded-md" />

              {/* Description */}
              <Box className="text-center space-y-2 w-full flex flex-col items-center">
                <Skeleton className="h-4 w-64 rounded-md" />
                <Skeleton className="h-4 w-52 rounded-md" />
                <Skeleton className="h-3 w-36 rounded-md" />
              </Box>

              {/* Buttons */}
              <Flex gap="4" className="pt-4 flex-wrap">
                <Skeleton className="h-8 w-28 rounded-md" />
                <Skeleton className="h-8 w-24 rounded-md" />
              </Flex>
            </Flex>
          </div>
        </Card>
      </Box>
    </div>
  );
}
