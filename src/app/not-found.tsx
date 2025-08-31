"use client"
import { Button } from "@radix-ui/themes";
import Image from "next/image";
import { redirect } from "next/navigation";

export default function NotFound() {
    
    return (

        <div className="flex flex-col items-center">
            <Button className="hover:!ring-1 hover:!ring-gray-500 hover:!bg-emerald-600 hover:!scale-110 !transition-all !rounded-2xl !bg-emerald-400 !text-white !p-3 !my-5" onClick={()=>{redirect("/")}}>Go Home</Button>

            <Image src={"/not-found.png"} alt="not-found" width={500} height={500} /></div>
    )
}