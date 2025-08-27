
"use client"


import { AlertDialog, Button, Flex } from "@radix-ui/themes";
import { redirect } from "next/navigation";
import { useContext } from "react";
import { UserContext } from "../context/user-context";


export default function DeleteBtn({ id }:{id:string}) {
    const { user } = useContext(UserContext)
    if (user?.company.id != id) return null


    async function handleDelete() {
        const res = await fetch("/api/company/" + id, {
            method: "DELETE",
        })
        console.log(res);

        const data = await res.json();
        console.log(data);

        if (data.success) {
            alert(data.message)
            redirect("/");
        }
        else {
            alert(data.message)
        }

    }
    return (
        <div>
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

        </div>
    )
}