
"use client"
import { createContext, ReactNode, useState } from "react";
import { Company, User } from "../../../../generated/prisma";
import { UwC } from "@/app/(group)/layout";
export const UserContext = createContext<{
    user?:User&{company:Company}|null
}>({})

export default function UserContextProvider ({children,user}:{
    children:ReactNode,
    user:UwC|null
}){
    //  const isDarkk= getUserDark()
  
//   const [user, setUser] = useState<UwC|null>(null);
//   console.log("a",cu);
  
//   if(!user) setUser(null)
  
    return(
        <UserContext.Provider value={{user}}>
       
            {children}
        
        </UserContext.Provider>
    )

}