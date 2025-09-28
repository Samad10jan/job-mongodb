"use client"
import { logOutUser } from "@/helper";
import { ExternalLinkIcon } from "@radix-ui/react-icons";
import { Button } from "@radix-ui/themes";


export default function LogOut(){
    
    // const tokenEmail= cookie.get("token")?.value
    return(
        
        <Button onClick={logOutUser}><ExternalLinkIcon />LogOut</Button>
        
    )
}