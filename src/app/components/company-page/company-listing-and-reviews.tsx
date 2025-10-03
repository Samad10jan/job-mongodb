"use client"

import { Avatar, Box, Button, Card, Flex, Tabs, Text, TextArea, Separator, Badge } from "@radix-ui/themes"
import Link from "next/link"
import { useContext, useState } from "react"
import { Company, Job } from "../../../../generated/prisma"
import { UserContext } from "../context/user-context"
import EditDeleteReviewBtn from "./edit-delete-review-btn"
import CallOutMessage from "../reusables/call-out"
import { ReviewWithUserAndCompany } from "@/types"
import { PinTopIcon, SewingPinFilledIcon } from "@radix-ui/react-icons"



export default function CompanyReviewsAndJobListing({
    company,
    reviews,
}: {
    company: Company & { jobs: Job[] }
    reviews: ReviewWithUserAndCompany[]
}) {
    const [review, setReview] = useState("")
    const [reviewState, setReviewState] = useState(reviews)
    const [message, setMessage] = useState("")
    const { user } = useContext(UserContext)

    // checks user already have reviewd or not 
    const hasUserReviewed = user
        ? reviewState.some((r) => r.user_id === user.id)
        : false

    const handleSubmit = async () => {
        if (!user) {
            setMessage("You must be logged in to post a review.")
            return
        }

        const now = new Date()

        try {
            const res = await fetch("/api/review", {
                method: "POST",
                body: JSON.stringify({
                    content: review,
                    company_id: company.id,
                }),
            })

            const resp = await res.json()

            if (resp.success && resp.data) {
                const reviewPosted = resp.data

                const tempData: ReviewWithUserAndCompany = {
                    id: reviewPosted.id,
                    content: reviewPosted.content,
                    company_id: reviewPosted.company_id,
                    user_id: user.id,
                    createdAt: new Date(reviewPosted.createdAt || now),
                    updatedAt: new Date(reviewPosted.updatedAt || now),
                    user: {
                        id: user.id,
                        email: user.email,
                        role: user.role,
                        avatar: user.details.avatar,
                        company: user.company,
                        details: user.details,
                    },
                }

                setReviewState([tempData, ...reviewState])
                setReview("")
                setMessage("Review posted successfully!")
            } else {
                setMessage("Unable to post review.")
            }
        } catch (error: any) {
            console.error(error.message)
            setMessage("Error posting review.")
        }
    }

    const handleDelete = async (reviewId: string) => {
        if (!reviewId) {
            setMessage("Invalid review ID.")
            return
        }

        try {
            const res = await fetch(`/api/review/${reviewId}`, {
                method: "DELETE",
            })

            const resp = await res.json()

            if (resp.success) {
                setReviewState(reviewState.filter((r) => r.id !== reviewId))
                setMessage("Review deleted successfully.")
            } else {
                setMessage("Unable to delete review.")
            }
        } catch (error: any) {
            console.error(error.message)
            setMessage("Error deleting review.")
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
                    {/* Job Openings */}
                    <Tabs.Content value="joblist">
                        {company.jobs.length > 0 ? (
                            <div className="flex flex-wrap gap-6">
                                {company.jobs.map((job) => (
                                    <Card key={job.id} className="p-6 hover:shadow-lg transition-shadow rounded-xl">
                                        <Flex direction="column" gap="2">
                                            <Text size="4" weight="bold">{job.title}</Text>
                                            <Text size="2" color="gray">{job.description}</Text>
                                            <Badge color="blue" className="w-fit mt-2">
                                            <SewingPinFilledIcon/> {job.location || "Remote"}
                                            </Badge>
                                        </Flex>
                                        <Flex justify="end" mt="4">
                                            <Link href={`/job/${job.id}`}>
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

                    {/* Reviews */}
                    <Tabs.Content value="reviews">
                        <Card className="p-4 mb-6 rounded-xl shadow-sm">
                            <TextArea
                                placeholder="Write your review..."
                                value={review}
                                onChange={(e) => setReview(e.target.value)}
                                disabled={hasUserReviewed}
                            />
                            <Flex justify="end" mt="3">
                                {user ? (
                                    <Button
                                        onClick={handleSubmit}
                                        disabled={!review.trim() || hasUserReviewed}
                                    >
                                        {hasUserReviewed ? "Review Already Posted" : "Post Review"}
                                    </Button>
                                ) : (
                                    <Button variant="soft" onClick={() => (window.location.href = "/login")}>
                                        Login To Post Review
                                    </Button>
                                )}
                            </Flex>
                        </Card>

                        <div className="space-y-6">
                            {reviewState.length > 0 ? (
                                reviewState.map((r) => (
                                    <Card key={r.id} className="p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow">
                                        <Flex align="center" gap="4" mb="3">
                                            <Avatar src={r.user.details?.avatar || ""} fallback={r.user.email[0]} radius="full" />
                                            <Box>
                                                <Text weight="bold"> {r.user.email} </Text>
                                                <Text size="2" color="gray">
                                                    {new Date(r.createdAt).toLocaleString('en-US', {
                                                        dateStyle: 'medium',
                                                        timeStyle: 'short',
                                                    })}
                                                </Text>
                                            </Box>
                                        </Flex>
                                        <Separator size="4" className="my-2" />
                                        <Text size="3" className="leading-relaxed">
                                            {r.content}
                                        </Text>

                                        {user?.id === r.user_id && (
                                            <Flex justify="end" gap="3" mt="4">
                                                <EditDeleteReviewBtn reviewId={r.id} handleDelete={handleDelete} />
                                            </Flex>
                                        )}
                                    </Card>
                                ))
                            ) : (
                                <Text size="2" color="gray" className="text-center">
                                    No reviews yet. Be the first to write one!
                                </Text>
                            )}
                        </div>
                    </Tabs.Content>
                </Box>
            </Tabs.Root>

            <CallOutMessage message={message} />
        </div>
    )
}
