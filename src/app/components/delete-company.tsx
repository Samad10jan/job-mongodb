"use client"
import { Button } from "@radix-ui/themes";
import { redirect } from "next/navigation";

export default function DeleteBtn({ id }) {

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