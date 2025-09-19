"use client";

import { AlertDialog, Button, Flex } from "@radix-ui/themes";
import { useContext, useState } from "react";

import { useRouter } from "next/navigation";
import { Company, Job, Opening } from "../../../../generated/prisma";
import { UserContext } from "../context/user-context";
import EditJob from "./edit-job-btn";

export default function EditDelJob({
    job,
}: {
    job: Job & { company: Company } & Opening;
}) {
    const { user } = useContext(UserContext);
    const router = useRouter();
    const [message, setMessage] = useState("");

    // Only show this component if current user's company matches the job's company
    if (user?.company?.id === job?.company?.id) {
        async function handleDelete() {
            try {
                const res = await fetch("/api/job/" + job.id, {
                    method: "DELETE",
                }).then((r) => r.json()) as {
                    success?: string;
                    message?: string;
                    data?: {} | null;
                };

                if (res?.success) {
                    setMessage(res?.message || "Deleted successfully");
                    router.back();
                } else {
                    setMessage(res.message || "Deletion failed");
                }
            } catch (err: any) {
                console.error(err.message);
                setMessage("Error in deletion");
            }
        }

        return (
            <div className="flex gap-2 mt-2">
                <AlertDialog.Root>
                    <AlertDialog.Trigger>
                        <Button color="red">Delete</Button>
                    </AlertDialog.Trigger>
                    <AlertDialog.Content maxWidth="450px">
                        <AlertDialog.Title>Delete Company</AlertDialog.Title>
                        <AlertDialog.Description size="2">
                            Are you sure? This company will no longer be accessible and any existing sessions will be expired.
                        </AlertDialog.Description>

                        <Flex gap="3" mt="4" justify="end">
                            <AlertDialog.Cancel>
                                <Button variant="soft" color="gray">
                                    Cancel
                                </Button>
                            </AlertDialog.Cancel>
                            <AlertDialog.Action>
                                <Button onClick={handleDelete}>Delete</Button>
                            </AlertDialog.Action>
                        </Flex>
                    </AlertDialog.Content>
                </AlertDialog.Root>

                <EditJob job={job} />

                {/* <CallOutMessage message={message} /> */}
            </div>
        );
    }

    return null;
}
