"use client"
import { Company, User } from "../../../generated/prisma";
// import prismaClient from "@/services/prisma";
// import { cookies } from "next/headers";
import Header from "../components/header";
import { createContext, useContext, useEffect, useState } from "react";
import ThemeContext, { ThContext } from "../components/theme-context";

type UwC=User&{company:Company}

export const UserContext = createContext<{

    user?: User&{company:Company}|null,
    setUser?: (value:UwC)=>void 
}>({ })

// const {isDark,setIsDark}= useContext(ThContext)

export default function Layout({ children }) {

    const [user, setUser] = useState<User|null>(null);

    useEffect(() => {
        async function getUser() {
            const res = await fetch("http://localhost:3000/api/current-user");
            
            const data = await res.json();
            
        // console.log("A:",data.data);
            if (data) {

                
                //phle sirf user la rhe the current user se abb  user + company ( agar FindUnique ownerid == userid then sending with data of company associated with that user in company model in fild userId )
                // jis ke pass company hai wohi add kare new job
                // extra -> or jis ke pass company nahi wo add kar saake

                setUser(data.data)
                // console.log(data.user);

            }
        }
        getUser();
    }, [])


// console.log(user);

    // const user={}
    // const user = await prismaClient.user.findUnique({
    //     where: {
    //         email: tokenEmail
    //     }
    // })

    return (
        <div>
            <ThemeContext>
            <UserContext.Provider value={{ user, setUser }}>

                <Header/>

                {children}
            </UserContext.Provider>
            </ThemeContext>
        </div>
    )


}