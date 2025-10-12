
import CompanyReviewsAndJobLIsting from "@/app/components/company-page/company-listing-and-reviews";
import DeleteBtn from "@/app/components/company-page/delete-company";
import EditCompanyBtn from "@/app/components/company-page/edit-company-btn";
import { Avatar, Box, Card, Flex, Text } from "@radix-ui/themes";
import { notFound } from "next/navigation";


export default async function CompanyPage({ params }: { params: Promise<{ id: string }> }) {


    const param = await params;
    const { id } = param

    const res = await fetch(`${process.env.NEXT_PUBLIC_HOST_URL}/api/company/` + id);
    const data = await res.json();


    if (!data?.success) notFound();
    const companyDetails = data.data;


    const res2 = await fetch(`${process.env.NEXT_PUBLIC_HOST_URL}/api/review/` + id);
    const data2 = await res2.json();


    const review = data2.data;
    // console.log("Revire:",review);

    return (
        <div className="max-w-5xl mx-auto px-4 py-10 space-y-6">

            <Card className="p-6 shadow-md rounded-xl">
                <Flex
                    direction={{ initial: "column", sm: "row" }}
                    align={{ initial: "start", sm: "center" }}
                    justify="between"
                    gap="4"
                >
                    <Flex gap="4" align="center">
                        <Avatar
                          
                            src={companyDetails?.logoUrl}
                            radius="full"
                            fallback={companyDetails.title[0]}
                            className="!ring-4 ring-gray-300/30 !shadow-lg !size-20 md:!size-30 "


                        />
                        <Box>
                            <Text as="div" size="5" weight="bold">
                                {companyDetails?.title}
                            </Text>
                            <Text as="div" size="2" color="gray" className="line-clamp-4">
                                {companyDetails?.description}
                            </Text>
                        </Box>
                    </Flex>


                    <DeleteBtn id={companyDetails.id} />
                    <EditCompanyBtn companyInfo={companyDetails} />




                </Flex>
            </Card>


            <Card className="p-6 shadow-sm rounded-xl">
                <CompanyReviewsAndJobLIsting
                    company={companyDetails}
                    reviews={review}
                />
            </Card>
        </div>
    );
}
