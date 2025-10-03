"use client";

import { Box, Card, Flex, Skeleton } from "@radix-ui/themes";

export default function JobCardSkeleton() {
  return (
    
      <Card
        className="
      !relative
      flex md:w-md w-3xs
      h-full
      md:!h-60 md:!max-h-[18rem] !mx-auto !rounded-2xl
      hover:!shadow-xl !border !border-gray-200
      *:!mb-2
      !p-1
    "
      >
       
        <div className="absolute top-3 right-3 z-10">
          <Skeleton className="!w-8 !h-8 md:!w-10 md:!h-10 rounded-full" />
        </div>

        <div className="md:flex md:flex-col h-full justify-between">
          <Flex align="center" className="!pt-4 !px-3 !gap-2 !flex-1 flex-col">
        
            <div className="flex items-center gap-5 w-full mt-4">
              <Skeleton className="!w-12 !h-12 sm:!w-14 sm:!h-14 md:!size-16 rounded-full shrink-0" />

              <Skeleton className="h-5 w-32 sm:w-40 md:w-48 rounded-md" />
            </div>

           
            <Box className="text-center mt-1 w-full">
              <Flex
                gap="2"
                className="text-[11px] sm:text-xs text-gray-500 flex-wrap px-2 justify-center"
              >
                <Skeleton className="h-5 w-20 sm:w-24 md:w-28 rounded-md" />
                <Skeleton className="h-5 w-20 sm:w-24 md:w-28 rounded-md" />
              </Flex>
            </Box>
          </Flex>

       
          <div className="flex justify-end-safe mt-4 pb-3">
            <Skeleton className="h-7 sm:h-8 w-24 sm:w-28 rounded-md" />
          </div>
        </div>
      </Card>
    

  );
}
