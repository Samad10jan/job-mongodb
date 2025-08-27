
import { AlertDialog, Button, Flex } from "@radix-ui/themes";

export default function EditDeleteReviewBtn({ reviewId }:{reviewId:string}) {

    async function handleDelete() {
        if (!reviewId) {
            return (
                alert("No Id")
            );

        }
        try {
            const res = await fetch("/api/review/"+reviewId,{
                method:"DELETE"
            })
            const resp = await res.json()
            console.log("res:",res);
            
            if(resp.success){
                alert("Done Deletion")

            }
            else{
                alert("Deletion not done")
            }
            

        }catch (error:any) {
            console.log(error.message);
            alert("error in deletion")
            

        }finally{

        }

    }
    return (
        <div>
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
                            <Button onClick={handleDelete}>Delete</Button>
                        </AlertDialog.Action>
                    </Flex>
                </AlertDialog.Content>
            </AlertDialog.Root>
       
        </div>
    )
}