
import { Button } from "@radix-ui/themes";

export default function EditDeleteReviewBtn({ reviewId }) {

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
            

        }catch (error) {
            console.log(error.message);
            alert("error in deletion")
            

        }finally{

        }

    }
    return (
        <div>
            <Button onClick={handleDelete}>Delete</Button>
       
        </div>
    )
}