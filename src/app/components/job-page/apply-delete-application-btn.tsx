
"use client"
import { createContext, useState } from "react"
import JobApplyButton from "./applyjob-btn";
import { Button } from "@radix-ui/themes"
export const AppliedContext = createContext();

export default function ApplyDeleteButton({ isUserApplied, job }) {
    const [isApplied, setIsApplied] = useState(isUserApplied)
    console.log("job:", job);

    async function handleDelete() {

        try {
            const res = await fetch(`http://localhost:3000/api/job/${job.id}/apply`,
                {
                    method: "DELETE"
                }
            )
            const data = await res.json();
            console.log("data", data);


            if (data.success) {
                console.log(data.message);
                alert("Application Withdraw Done")

                setIsApplied(!isApplied)

            }
            else {
                console.log(data.message);
                alert("Something Went Wrong")
            }

        } catch (error) {
            console.log(error.message);
            alert("Error in Withdrawl of Application")


        }


    }
    return (
        <div>


            <AppliedContext.Provider value={{ isApplied, setIsApplied }}>

                {!isApplied ?
                    <JobApplyButton job={job} />
                    :
                    <Button onClick={handleDelete} color="ruby">Withdraw Application</Button>}
            </AppliedContext.Provider>

        </div>
    )
}