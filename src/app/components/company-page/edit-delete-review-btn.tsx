
import { AlertDialog, Button, Flex } from "@radix-ui/themes";
import { ReactNode } from "react";

export default function EditDeleteReviewBtn({ reviewId, handleDelete }: { reviewId: string, handleDelete: (reviewId: string) => void }) {


    return (
        <div>
            {/* <Button size="1" variant="soft" color="green">
                Edit
            </Button> */}
            <AlertDialog.Root>
                <AlertDialog.Trigger>
                    <Button color="red">Delete</Button>
                </AlertDialog.Trigger>
                <AlertDialog.Content maxWidth="450px">
                    <AlertDialog.Title>Delete Review</AlertDialog.Title>
                    <AlertDialog.Description size="2">
                        Are you sure?
                    </AlertDialog.Description>

                    <Flex gap="3" mt="4" justify="end">
                        <AlertDialog.Cancel>
                            <Button variant="soft" color="gray">
                                Cancel
                            </Button>
                        </AlertDialog.Cancel>
                        <AlertDialog.Action>
                            <Button onClick={() => handleDelete(reviewId)}>Delete</Button>
                        </AlertDialog.Action>
                    </Flex>
                </AlertDialog.Content>
            </AlertDialog.Root>

        </div>
    )
}