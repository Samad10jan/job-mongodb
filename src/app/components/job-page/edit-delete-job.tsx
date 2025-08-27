
"use client"

import { useContext } from "react";
import { AlertDialog, Button, Flex } from "@radix-ui/themes";

import EditJob from "./edit-job-btn";
import { redirect, useRouter } from "next/navigation";
import { UserContext } from "../context/user-context";
import { Company, Job, Opening } from "../../../../generated/prisma";

export default function EditDelJob({ job }:{job:Job&{company:Company}&Opening}) {
    const { user } = useContext(UserContext);
    const router =useRouter()
    // only that current user can se this viewcomponent if, current user company is equal to current job company matlab current userowner company hogi tabhi to 
    if (user?.company?.id === job?.company?.id) {

        async function handleDelete() {

            try {
                const res = await fetch("/api/job/" + job.id,
                    {
                        method: "DELETE"

                    }
                ) as {success?:string,message?:string,data?:{}|null}
                if (res?.success) {

                    alert(res?.message);
                    router.back()

                }
                else {
                    alert(res.message);

                }
            } catch (err:any) {


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
                        Are you sure? This company will no longer be accessible and any
                        existing sessions will be expired.
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
            </div>
        );
    }

    return null;
}
