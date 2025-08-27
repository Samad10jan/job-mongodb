"use client";

import { Avatar, Box, Button, Card, Flex, Tabs, Text, TextArea } from "@radix-ui/themes";
import Link from "next/link";
import { useContext, useState } from "react";
import { Company, Job } from "../../../../generated/prisma";
import { UserContext } from "../context/user-context";
import EditDeleteReviewBtn from "./edit-delete-review-btn";



type ReviewWithUserAndCompany = {
    id: string;
    content: string;
    user_id: string;
    company_id: string;
    user: {
        id: string;
        email: string;
        password: string;
        role: string | null;
        avatar: string | null;
        company: {
            id: string;
            title: string;
            description: string;
            ownerId: string;
        } | null;
    };
};


export default function CompanyReviewsAndJobLIsting({
    company,
    reviews
}: {
    company: Company & { jobs: Job[] };
    reviews: ReviewWithUserAndCompany[];
}) {
    const [review, setReview] = useState("");
    const [reviewState, setReviewState] = useState(reviews);

    const { user } = useContext(UserContext);

    async function handleSubmit() {
        if (!user) {
            alert("You must be logged in to post a review.");
            return;
        }


        const tempData: ReviewWithUserAndCompany = {
            id: "temp-" + Date.now().toString(), //assigning temp unique id 
            content: review,
            company_id: company.id,
            user_id: user.id,
            user: {
                id: user.id,
                email: user.email,
                password: user.password,
                role: user.role,
                avatar: user.avatar,
                company: user.company
            }
        };

        const Obj = [tempData, ...reviewState];

        try {
            const res = await fetch("/api/review", {
                method: "POST",
                body: JSON.stringify({
                    content: review,
                    company_id: company.id
                })
            });
            const resp = await res.json();

            if (resp.success) {
                alert("Posted Review");
                alert(resp.message);
                setReview("");
            } else {
                alert("Unable to Post Review");
                alert(resp.message);
            }
        } catch (err: any) {
            console.log(err.message);
            alert("Error client");
        }

        setReviewState(Obj);
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
                        <Text size="2">
                            <p className="text-2xl font-bold text-center">Job Openings</p>
                            {company.jobs.map((job, index) => (
                                <Card key={index} className="flex my-5 justify-between">
                                    <div className="flex flex-col">
                                        <p className="font-bold text-2xl">{job.title}</p>
                                        <p>{job.description}</p>
                                        <p>{job.location}</p>
                                    </div>
                                    <div>
                                        <Link href={"/job/" + job.id}>
                                            <Button>Job Details</Button>
                                        </Link>
                                    </div>
                                </Card>
                            ))}
                        </Text>
                    </Tabs.Content>

                    <Tabs.Content value="reviews">
                        <TextArea
                            placeholder="Review.."
                            value={review}
                            onChange={e => setReview(e.target.value)}
                        />
                        {user ?

                            <Button onClick={handleSubmit}>Post Review</Button>



                            : <Button onClick={() => window.location.href = "/login"} variant="soft">Login To Post Review</Button>}


                        <div className="flex flex-col gap-5">
                            {reviewState.length > 0 &&
                                reviewState.map((r, index) => (
                                    <Flex className="flex flex-col gap-5" key={index}>
                                        <Card>
                                            <div className="flex gap-5">
                                                <Avatar
                                                    src={r?.user?.avatar || ""}
                                                    fallback={r?.user?.email[0]}
                                                />
                                                {r?.user?.email}
                                            </div>
                                            <div className="text-2xl">
                                                <hr />
                                                {r.content}
                                            </div>
                                            {user?.id === r.user_id && (
                                                <div className="flex justify-end gap-4">
                                                    <Button color="green">Edit</Button>
                                                    <EditDeleteReviewBtn reviewId={r.id} />
                                                </div>
                                            )}
                                        </Card>
                                    </Flex>
                                ))}
                        </div>
                    </Tabs.Content>
                </Box>
            </Tabs.Root>
        </div>
    );
}
