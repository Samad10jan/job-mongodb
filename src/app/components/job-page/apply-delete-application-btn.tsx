
"use client"
import { createContext, useContext, useState } from "react"
import JobApplyButton from "./applyjob-btn";
import { Button } from "@radix-ui/themes"
import { Company, Job } from "../../../../generated/prisma";
import { UserContext } from "../context/user-context";
import { OpeningWithCompany } from "../cards/job-card";
export const AppliedContext = createContext<{
    isApplied:boolean,
    setIsApplied:(x:boolean)=>void
}>({
    isApplied:false,
    setIsApplied:()=>null
});

export default function ApplyDeleteButton({ isUserApplied, job }: {
    isUserApplied: boolean,
    job: OpeningWithCompany
}) {
    const { user } = useContext(UserContext)
    const [isApplied, setIsApplied] = useState(isUserApplied)
    // console.log("job:", job);

    async function handleDelete() {

        try {
            const res = await fetch(`/api/job/${job.id}/apply`,
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

        } catch (error: any) {
            console.log(error.message);
            alert("Error in Withdrawl of Application")


        }


    }
    return (
        <div>

            {user ?

                <AppliedContext.Provider value={{ isApplied, setIsApplied }}>

                    {!isApplied ?
                        <JobApplyButton job={job} />
                        :
                        <Button onClick={handleDelete} color="ruby">Withdraw Application</Button>}
                </AppliedContext.Provider>

                : <Button onClick={() => window.location.href = "/login"} variant="soft">Login To apply</Button>}
        </div>
    )
}