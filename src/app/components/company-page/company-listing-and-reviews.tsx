"use client";

import { Avatar, Box, Button, Card, Flex, Tabs, Text, TextArea, Separator, Badge } from "@radix-ui/themes";
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
    reviews,
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
            id: "temp-" + Date.now().toString(),
            content: review,
            company_id: company.id,
            user_id: user.id,
            user: {
                id: user.id,
                email: user.email,
                password: user.password,
                role: user.role,
                avatar: user.avatar,
                company: user.company,
            },
        };

        const Obj = [tempData, ...reviewState];

        try {
            const res = await fetch("/api/review", {
                method: "POST",
                body: JSON.stringify({
                    content: review,
                    company_id: company.id,
                }),
            });
            const resp = await res.json();

            if (resp.success) {
                setReview("");
                setReviewState(Obj);
            } else {
                alert("Unable to Post Review");
            }
        } catch (err: any) {
            console.log(err.message);
            alert("Error client");
        }
    }

    return (
        <div>
            <Tabs.Root defaultValue="joblist">
                <Tabs.List className="flex justify-center gap-6 border-b pb-2">
                    <Tabs.Trigger value="joblist" className="font-medium">
                        Job Openings
                    </Tabs.Trigger>
                    <Tabs.Trigger value="reviews" className="font-medium">
                        Reviews
                    </Tabs.Trigger>
                </Tabs.List>

                <Box pt="4">
                    {/* JOB LIST */}
                    <Tabs.Content value="joblist">
                        {company.jobs.length > 0 ? (
                            <div className="grid gap-6 md:grid-cols-2">
                                {company.jobs.map((job, index) => (
                                    <Card key={index} className="p-6 hover:shadow-lg transition-shadow rounded-xl">
                                        <Flex direction="column" gap="2">
                                            <Text size="4" weight="bold">
                                                {job.title}
                                            </Text>
                                            <Text size="2" color="gray">
                                                {job.description}
                                            </Text>
                                            <Badge color="blue" radius="full" className="w-fit mt-2">
                                                📍 {job.location || "Remote"}
                                            </Badge>
                                        </Flex>
                                        <Flex justify="end" mt="4">
                                            <Link href={"/job/" + job.id}>
                                                <Button variant="solid">View Details</Button>
                                            </Link>
                                        </Flex>
                                    </Card>
                                ))}
                            </div>
                        ) : (
                            <Text size="2" color="gray" className="text-center">
                                No job openings available at the moment.
                            </Text>
                        )}
                    </Tabs.Content>

                    {/* REVIEWS */}
                    <Tabs.Content value="reviews">
                        <Card className="p-4 mb-6 rounded-xl shadow-sm">
                            <TextArea
                                placeholder="Write your review..."
                                value={review}
                                onChange={(e) => setReview(e.target.value)}
                            />
                            <Flex justify="end" mt="3">
                                {user ? (
                                    <Button onClick={handleSubmit} disabled={!review.trim()}>
                                        Post Review
                                    </Button>
                                ) : (
                                    <Button onClick={() => (window.location.href = "/login")} variant="soft">
                                        Login To Post Review
                                    </Button>
                                )}
                            </Flex>
                        </Card>

                        <div className="space-y-6">

                            {
                                reviewState.length > 0 ?
                                    (
                                        reviewState.map((r, index) => (
                                            <Card key={index} className="p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow">
                                                <Flex align="center" gap="4" mb="3">
                                                    <Avatar src={r?.user?.avatar || ""} fallback={r?.user?.email[0]} radius="full" />
                                                    <Box>
                                                        <Text weight="bold">{r?.user?.email}</Text>

                                                    </Box>
                                                </Flex>
                                                <Separator size="4" className="my-2" />
                                                <Text size="3" className="leading-relaxed">
                                                    {r.content}
                                                </Text>

                                                {user?.id === r.user_id && (
                                                    <Flex justify="end" gap="3" mt="4">
                                                        <Button size="1" variant="soft" color="green">
                                                            Edit
                                                        </Button>
                                                        <EditDeleteReviewBtn reviewId={r.id} />
                                                    </Flex>
                                                )}
                                            </Card>
                                        ))
                                    ) :
                                    
                                    (
                                        <Text size="2" color="gray" className="text-center">
                                            No reviews yet. Be the first to write one!
                                        </Text>
                                    )
                            }
                        </div>
                    </Tabs.Content>
                </Box>
            </Tabs.Root>
        </div>
    );
}
