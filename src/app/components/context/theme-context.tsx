
"use client"
import { Theme } from "@radix-ui/themes";
import { createContext, ReactNode, useState } from "react";
export const ThContext=createContext<{
    isDark:boolean,
    setIsDark:(x:boolean)=>void
}>({isDark:false,setIsDark:()=>{}});

export default function ThemeContext ({children,isdark}:{children:ReactNode,isdark:boolean}){ 
  
   const [isDark,setIsDark]=useState(isdark);
  
    return(
        <ThContext.Provider value={{isDark,setIsDark}}>
        <Theme appearance={isDark?"dark":"light"} accentColor="green">
            {children}
        </Theme>
        </ThContext.Provider>
    )

}