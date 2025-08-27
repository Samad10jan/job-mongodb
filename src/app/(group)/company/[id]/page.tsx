
import CompanyReviewsAndJobLIsting from "@/app/components/company-page/company-listing-and-reviews";
import DeleteBtn from "@/app/components/company-page/delete-company";
import { Avatar, Box, Card, Flex, Text } from "@radix-ui/themes";
import { notFound } from "next/navigation";


export default async function JobPage({ params }: { params: { id: string } }) {
    // const {user} = useContext(UserContext)
   
    const { id } = await params;

    const res = await fetch("http://localhost:3000/api/company/" + id);
    const data = await res.json();
    if (!data?.success) notFound();
    const companyDetails = data.data;

    const res2 = await fetch("http://localhost:3000/api/review/" + id);
    const data2 = await res2.json();
    if (!data2?.success) {
        notFound();
    }

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
                            size="8"
                            src={companyDetails?.employer_logo}
                            radius="full"
                            fallback={companyDetails.title[0]}
                        />
                        <Box>
                            <Text as="div" size="5" weight="bold">
                                {companyDetails?.title}
                            </Text>
                            <Text as="div" size="2" color="gray">
                                {companyDetails?.description}
                            </Text>
                        </Box>
                    </Flex>
                    {/* {

                     user?.company.id==companyDetails.id &&     */}
                        
                        <DeleteBtn id={companyDetails.id} />
                           
                    {/* }  */}

                    
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
