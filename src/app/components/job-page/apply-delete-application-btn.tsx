"use client";
import { createContext, useContext, useState } from "react";

import { RocketIcon } from "@radix-ui/react-icons";
import { Button } from "@radix-ui/themes";
import { UserContext } from "../context/user-context";
import { OpeningWithCompany } from "@/types";

export const AppliedContext = createContext<{
    isApplied: boolean;
    setIsApplied: (x: boolean) => void;
}>({
    isApplied: false,
    setIsApplied: () => null,
});

export default function ApplyDeleteButton({
    isUserApplied,
    job,
}: {
    isUserApplied: boolean;
    job: OpeningWithCompany;
}) {
    const { user } = useContext(UserContext);
    const [isApplied, setIsApplied] = useState(isUserApplied);
    const [message, setMessage] = useState("");

    async function handleDelete() {
        try {
            const res = await fetch(`/api/job/${job.id}/apply`, {
                method: "DELETE",
            });
            const data = await res.json();
            // console.log("data", data);

            if (data.success) {
                // console.log(data.message);
                setMessage("Application Withdraw Done");
                setIsApplied(!isApplied);
            } else {
                // console.log(data.message);
                setMessage("Something Went Wrong");
            }
        } catch (error: any) {
            console.log(error.message);
            setMessage("Error in Withdrawl of Application");
        }
    }

    const handleApplyJob = async () => {
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_HOST_URL}/api/job/${job.id}/apply`);
            const data = await res.json();
            // console.log("data job :", data);

            if (data.success) {
                // console.log(data.message);
                setMessage("Apply");
                setIsApplied(true);
            } else {
                // console.log(data.message);
                setMessage("Unable to apply");
            }
        } catch (err: any) {
            console.log(err.message);
            setMessage("error");
            setIsApplied(false);
        }
    };

    return (
        <div>
            {user ? (
                <div>
                    {!isApplied ? (
                        <Button onClick={handleApplyJob} name="Apply">
                            <RocketIcon /> Apply
                        </Button>
                    ) : (
                        <Button onClick={handleDelete} color="ruby" name="Unapply">
                            Withdraw Application
                        </Button>
                    )}
                </div>
            ) : (
                <Button
                    onClick={() => (window.location.href = "/login")}
                    variant="soft"
                    name="login"
                >
                    Login To apply
                </Button>
            )}

            {/* <CallOutMessage message={message} /> */}
        </div>
    );
}
