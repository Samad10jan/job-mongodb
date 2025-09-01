
"use client"
import { createContext, useContext, useState } from "react";

import { RocketIcon } from "@radix-ui/react-icons";
import { Button } from "@radix-ui/themes";
import { OpeningWithCompany } from "../cards/job-card";
import { UserContext } from "../context/user-context";
export const AppliedContext = createContext<{
    isApplied: boolean,
    setIsApplied: (x: boolean) => void
}>({
    isApplied: false,
    setIsApplied: () => null
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

    const handleApplyJob = async () => {
        try {
            const res = await fetch(`http://localhost:3000/api/job/${job.id}/apply`)
            const data = await res.json()
            console.log("data job :", data);

            if (data.success) {
                console.log(data.message);
                alert("Apply")
                setIsApplied(true)

            } else {
                console.log(data.message);
                alert("Unable to apply")

            }

        } catch (err: any) {
            console.log(err.message);
            // alert(data.message)
            alert("error")
            setIsApplied(false)

        }
    }
    return (
        <div>

            {user ?

                <div>


                    {!isApplied ?
                        <Button onClick={handleApplyJob}>
                            <RocketIcon /> Apply
                        </Button>
                        :
                        <Button onClick={handleDelete} color="ruby">Withdraw Application</Button>}

                </div>

                : <Button onClick={() => window.location.href = "/login"} variant="soft">Login To apply</Button>}
        </div>
    )
}