
"use client"

import { UserContext } from "@/app/(group)/layout";
import { Button } from "@radix-ui/themes";
import { redirect } from "next/navigation";
import { useContext } from "react";


export default function DeleteBtn({ id }) {
    const {user} = useContext(UserContext)
    if(user?.company.id!=id)return null
    

    async function handleDelete() {
        const res = await fetch("http://localhost:3000/api/company/"+id, {
            method: "DELETE",
        })
        console.log(res);
        
        const data = await res.json();
        console.log(data);
        
        if(data.success){
            alert(data.message)
            redirect("/");
        }
        else{
            alert(data.message)
        }

    }
    return (
        <div>
            <Button onClick={handleDelete}>Delete</Button>
        </div>
    )
}