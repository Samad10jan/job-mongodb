"use client"
import { RocketIcon } from "@radix-ui/react-icons";
import { Button } from "@radix-ui/themes";

export default function JobApplyButton({ job }) {
    async function handleSubmit() {
        try {
            const res = await fetch(`http://localhost:3000/api/job/${job.id}/apply`)
            const data = await res.json()
            console.log("data job :",data);

            if (data.success) {
                console.log(data.message);
                alert("Apply")


            } else {
                console.log(data.message);
                alert("Unable to apply")


            }

        } catch (err) {
            console.log(err.message);
            // alert(data.message)
            alert("error")




        }

    }
    return (
        <div>
            <Button onClick={handleSubmit}>
                <RocketIcon /> Apply
            </Button>
        </div>
    )

}