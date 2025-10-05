"use client";

import { AlertDialog, Button, Flex } from "@radix-ui/themes";
import { redirect } from "next/navigation";
import { useContext, useState } from "react";
import { UserContext } from "../context/user-context";
import CallOutMessage from "../reusables/call-out";

export default function DeleteBtn({ id }: { id: string }) {
    const { user } = useContext(UserContext);
    const [message, setMessage] = useState("");

    if (user?.company?.id != id) return null;

    async function handleDelete() {
        const res = await fetch("/api/company/" + id, {
            method: "DELETE",
        });
        // console.log(res);

        const data = await res.json();
        // console.log(data);

        if (data.success) {
            setMessage(data.message);
            redirect("/");
        } else {
            setMessage(data.message);
        }
    }

    return (
        <div>
            <AlertDialog.Root>
                <AlertDialog.Trigger>
                    <Button color="red" name="delete-company">Delete</Button>
                </AlertDialog.Trigger>
                <AlertDialog.Content maxWidth="450px">
                    <AlertDialog.Title>Delete Company</AlertDialog.Title>
                    <AlertDialog.Description size="2">
                        Are you sure? This company will no longer be accessible and any existing sessions will be expired.
                    </AlertDialog.Description>

                    <Flex gap="3" mt="4" justify="end">
                        <AlertDialog.Cancel>
                            <Button variant="soft" color="gray" name="cancel">
                                Cancel
                            </Button>
                        </AlertDialog.Cancel>
                        <AlertDialog.Action>
                            <Button onClick={handleDelete} name="delete">Delete</Button>
                        </AlertDialog.Action>
                    </Flex>
                </AlertDialog.Content>
            </AlertDialog.Root>

            <CallOutMessage message={message} />
        </div>
    );
}
