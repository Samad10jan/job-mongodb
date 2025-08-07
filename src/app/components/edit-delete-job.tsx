"use client"

import { useContext } from "react";
import { Button } from "@radix-ui/themes";
import { UserContext } from "../(group)/layout"
import EditJob from "./edit-job-btn";

export default function EditDelJob({ job }) {
    const { user } = useContext(UserContext);
    // only that current user can se this viewcomponent if, current user company is equal to current job company matlab current userowner company hogi tabhi to 
    if (user?.company?.id === job?.company?.id) {

        async function hnadleDelete() {

            try {
                const res = await fetch("http://localhost:3000/api/job/" + job.id,
                    {
                        method: "DELETE"

                    }
                )
                if (res.success) {

                    alert(res.message);


                }
                else {
                    alert(res.message);

                }
            } catch (err) {


            }

        }



        return (
            <div className="flex gap-2 mt-2">
                <Button
                    className="bg-red-600 text-white hover:bg-red-700 transition"
                    onClick={hnadleDelete}
                >
                    Delete Job
                </Button>
                {/* <Button 
                    className="bg-green-600 text-white hover:bg-green-700 transition"
                
                >
                    Update
                </Button> */}
                <EditJob job={job} />
            </div>
        );
    }

    return null;
}
