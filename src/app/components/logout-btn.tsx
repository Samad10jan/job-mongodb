
"use client"
import { ExternalLinkIcon } from "@radix-ui/react-icons";
import { Button } from "@radix-ui/themes";

import Link from "next/link";
import { useRouter } from "next/navigation";

export default function LogOut(){
    
    // const tokenEmail= cookie.get("token")?.value

    async function handleClick(){
        
       
        
    }
    return(
        
        <Link href={"/login"}><Button onClick={handleClick}><ExternalLinkIcon />LogOut</Button></Link>
        
    )
}