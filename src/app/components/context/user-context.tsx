
"use client"
import { createContext, ReactNode, useState } from "react";
import { Company, SavedJobs, User, UserDetails } from "../../../../generated/prisma";
import { UwC } from "@/app/(group)/layout";
export const UserContext = createContext<{
    user?:UwC|null
    
}>({})

export default function UserContextProvider ({children,user}:{
    children:ReactNode,
    user:UwC|null
}){
   
   return(
        <UserContext.Provider value={{user}}>
       
            {children}
        
        </UserContext.Provider>
    )

}