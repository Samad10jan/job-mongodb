"use client"

import { useContext, useState } from "react";
import { UserContext } from "../(group)/layout";
import { Button, Dialog, Flex, Text, TextField } from "@radix-ui/themes";
import { Opening } from "../../../generated/prisma";



export default function EditJob({job}:{job:Opening}) {
    const [jobTitle, setJobTitle] = useState(job.title ||"");
    const [jobDescription, setDescription] = useState(job.description||"");
    const [jobLocation, setJobLocation] = useState(job.location||"");
    const [jobSalary, setJobSalary] = useState(job.salary);
    const [jobType, setJobType] = useState(job.job_type||"");
    const [employementType, setEmployementType] = useState(job.employment_type||"");
    const [loading, setLoading] = useState(false);
    const { user } = useContext(UserContext);

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setLoading(true);

        const salaryNum = Number.parseInt(jobSalary);

        const data = {
            title: jobTitle,
            description: jobDescription,
            location: jobLocation,
            salary: salaryNum,
            job_type: jobType,
            employment_type: employementType
        };

        try {
            const res = await fetch("/api/job/"+job.id, {
                method: "POST",
                body: JSON.stringify(data),
            });

            const result = await res.json();

            if (res.success) {
                alert(result.message || "Job posted successfully");
               
            } else {
                alert(result.message || "Failed to post job");
            }
        } catch (error) {
            console.error("Error submitting job:", error);
            alert("An error occurred while submitting the job.");
        } finally {
            setLoading(false);
        }
    }

    return (
        <Dialog.Root>
            <Dialog.Trigger>
                <Button>Edit Job</Button>
            </Dialog.Trigger>

            <Dialog.Content maxWidth="600px">
                <Dialog.Title>Add a New Job</Dialog.Title>
                <Dialog.Description size="2" mb="4">
                    Fill out the job details and submit the form to post a new job opening.
                </Dialog.Description>

                <form onSubmit={handleSubmit}>
                    <Flex direction="column" gap="3">
                        <label>
                            <Text as="div" size="2" mb="1" weight="bold">Job Title</Text>
                            <TextField.Root
                                placeholder="Enter job title"
                                value={jobTitle}
                                onChange={(e) => setJobTitle(e.target.value)}
                                required
                            />
                        </label>
                        <label>
                            <Text as="div" size="2" mb="1" weight="bold">Description</Text>
                            <textarea
                                placeholder="Job Description"
                                value={jobDescription}
                                onChange={(e) => setDescription(e.target.value)}
                                className="border rounded p-2 w-full"
                                required
                            />
                        </label>
                        <label>
                            <Text as="div" size="2" mb="1" weight="bold">Location</Text>
                            <TextField.Root
                                placeholder="Job Location"
                                value={jobLocation}
                                onChange={(e) => setJobLocation(e.target.value)}
                                required
                            />
                        </label>
                        <label>
                            <Text as="div" size="2" mb="1" weight="bold">Salary</Text>
                            <TextField.Root
                                placeholder="Salary"
                                type="number"
                                value={jobSalary}
                                onChange={(e) => setJobSalary(e.target.value)}
                                required
                            />
                        </label>

                        <label>
                            <Text as="div" size="2" mb="1" weight="bold">Job Type</Text>
                            <select
                                value={jobType}
                                onChange={(e) => setJobType(e.target.value)}
                                className="border p-2 rounded w-full"
                                required
                            >
                                <option value="">Select Job Type</option>
                                <option value="onsite">Onsite</option>
                                <option value="remote">Remote</option>
                                <option value="hybrid">Hybrid</option>
                            </select>
                        </label>

                        <label>
                            <Text as="div" size="2" mb="1" weight="bold">Employment Type</Text>
                            <select
                                value={employementType}
                                onChange={(e) => setEmployementType(e.target.value)}
                                className="border p-2 rounded w-full"
                                required
                            >
                                <option value="">Select Employment Type</option>
                                <option value="fulltime">Full-time</option>
                                <option value="parttime">Part-time</option>
                                <option value="contract">Contract</option>
                            </select>
                        </label>
                    </Flex>

                    <Flex gap="3" mt="4" justify="end">
                        <Dialog.Close>
                            <Button variant="soft" color="gray">Cancel</Button>
                        </Dialog.Close>
                        <Button
                            type="submit"
                            disabled={loading}
                            className="bg-blue-600 text-white"
                        >
                            {loading ? "Submitting..." : "Post Job"}
                        </Button>
                    </Flex>
                </form>
            </Dialog.Content>
        </Dialog.Root>
    );
}
