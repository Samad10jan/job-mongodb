import { Avatar, Box, Button, Card, Flex, Text } from "@radix-ui/themes";
import Link from "next/link";
import { Company, Opening, User } from "../../../../generated/prisma";


export type OpeningWithCompany = Opening & { company?: Company &{owner:User} };

export default function JobCard({ item }: { item: OpeningWithCompany}) {
  return (
    <div className="p-4">
      <Box className="transition-transform duration-300 ease-in-out hover:scale-[1.03]">

        <Card className="w-full max-w-md mx-auto  min-h-[25em]  rounded-2xl shadow-md hover:shadow-xl  border-gray-200 ">
          <div className=" flex flex-col">

            <div className="self-end" >
              <Text
                as="div"
                className="text-sm text-emerald-700-400 font-medium"
              >
                <Link href={`/company/${item?.company?.id}`}>
                  {item.company?.title}
                </Link>
              </Text>
            </div>


            <Flex direction="column" align="center" className="p-6 gap-4 ">

              <Avatar
                src={""}
                size="5"
                radius="full"
                fallback={item.title[0]}
                className="w-16 h-16 md:w-24 md:h-24"
              />


              <Text
                as="div"
                weight="bold"
                className="text-lg md:text-xl text-center line-clamp-2  "
              >
                {item.title}
              </Text>


              <Box className="text-center space-y-2">
                <Text
                  as="div"
                  color="gray"
                  className="text-sm md:text-base line-clamp-3 text-gray-600 "
                >
                  {item.description}
                </Text>



                <Text
                  as="div"
                  className="text-xs text-gray-500"
                >
                  Recruiter: {item.company?.owner?.email}
                </Text>
              </Box>

              <Flex gap="4" className="pt-4 flex-wrap ">
                <Link href={`/job/${item.id}`}>
                  <Button variant="solid" color="green" className="text-sm">
                    View Details
                  </Button>
                </Link>
                <Button variant="soft" color="gray" className="text-sm">
                  Save Job
                </Button>
              </Flex>



            </Flex>



          </div>
        </Card>
      </Box>
    </div>
  );
}
