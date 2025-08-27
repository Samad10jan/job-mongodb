"use client"
import { RocketIcon } from "@radix-ui/react-icons";
import { Button } from "@radix-ui/themes";
import { useContext, useState } from "react";
import { AppliedContext } from "./apply-delete-application-btn";
import { Company, Job } from "../../../../generated/prisma";
import { OpeningWithCompany } from "../cards/job-card";


export default function JobApplyButton({ job }:{
    job:OpeningWithCompany
}) {
    const { isApplied, setIsApplied } = useContext(AppliedContext)

    console.log("isApplied: ", isApplied);

    if (isApplied) {
        return false
    }


    async function handleSubmit() {
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
            <Button onClick={handleSubmit}>
                <RocketIcon /> Apply
            </Button>
        </div>
    )

}