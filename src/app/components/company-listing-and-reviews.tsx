"use client"
import prismaClient from "@/services/prisma";
import { Avatar, Box, Button, Card, Dialog, DropdownMenu, Flex, Tabs, Text, TextArea, TextField } from "@radix-ui/themes";
import Link from "next/link";
import { useContext, useState } from "react";
import { Company, Reviews } from "../../../generated/prisma";
import { UserContext } from "../(group)/layout";

export default function CompanyReviewsAndJobLIsting({ company, reviews }:
    {
        company: Company,
        reviews: Reviews[]
    }) {
    const [review, setReview] = useState("");
    const [reviewState, setReviewState] = useState<Reviews[]>(reviews);

    const { user } = useContext(UserContext)

    


    async function handleSubmit() {


        const data = {
            content: review,
            company_id: company.id
        }
        //optimistic update
        const tempData = { ...data, ...user }
        const Obj = [ tempData,...reviewState]
        try {


            const res = await fetch("/api/review", {
                method: "POST",
                body: JSON.stringify(data)
            })
            const resp = await res.json()
            // console.log(resp.data);


            if (resp.success) {

                alert("Posted Review")
                alert(resp.message)
                

            }
            else {
                alert("Unable to Post Review")
                alert(resp.message)
            }


        } catch (err) {
            console.log(err.message);
            alert("Error client")

        }
        setReviewState(Obj)

    }



    return (
        <div>
            <Tabs.Root defaultValue="joblist">
                <Tabs.List>
                    <Tabs.Trigger value="joblist">Job List</Tabs.Trigger>
                    <Tabs.Trigger value="reviews">Reviews</Tabs.Trigger>

                </Tabs.List>

                <Box pt="3">
                    <Tabs.Content value="joblist">
                        <Text size="2"><p className="text-2xl font-bold text-center">Job Openings</p>
                            {
                                company.jobs.map((job, index) => {
                                    return (

                                        <Card key={index} className="flex my-5 justify-between">
                                            <div className="flex flex-col">
                                                <p className="font-bold text-2xl"> {job.title}</p>
                                                <p> {job.description}</p>
                                                <p> {job.location}</p>
                                            </div>
                                            <div>
                                                <Link href={"/job/" + job.id}><Button>Job Details</Button></Link>
                                            </div>

                                        </Card>

                                    )

                                })

                            }</Text>
                    </Tabs.Content>

                    <Tabs.Content value="reviews">
                        <TextArea placeholder="Reply to comment…" value={review} onChange={e => setReview(e.target.value)} />
                        <Button onClick={handleSubmit}  >Post Review</Button>


                        <div className="flex flex-col gap-5">
                            {
                                reviews.length > 0 &&
                                reviewState.map((r, index) => {
                                    return (
                                        <Flex className="flex flex-col gap-5" key={index}>
                                            <Card key={index} >
                                                <div className="flex gap-5">
                                                    <Avatar
                                                        src={r?.user?.avatar}
                                                        fallback={r?.user?.email[0]}
                                                    />
                                                    {r?.user?.email}

                                                </div>
                                                <div className="text-2xl ">
                                                    <hr></hr>
                                                    {r.content}

                                                </div>
                                                <div className="flex justify-end gap-4">
                                                    <Button color="green">Edit</Button>
                                                    <Button color="red">Delete</Button>
                                                </div>
                                            </Card>
                                        </Flex>
                                    )

                                })
                            }
                        </div>
                    </Tabs.Content>


                </Box>
            </Tabs.Root>

        </div>
    )

}