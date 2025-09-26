
"use client";
import { ArrowLeftIcon, MagnifyingGlassIcon, MoonIcon, SunIcon, } from "@radix-ui/react-icons";
import { Avatar, Button, IconButton, TextField, } from "@radix-ui/themes";
import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import AvatarMenu from "./avatar-menu";

import { usePathname, useRouter } from "next/navigation";
import { ThContext } from "../context/theme-context";


import { setUserDark } from "@/helper";
import { Job } from "../../../../generated/prisma";
import { UserContext } from "../context/user-context";



export default function Header() {

    const { isDark, setIsDark }: any = useContext(ThContext);
    const { user } = useContext(UserContext);
    const [suggestions, setSuggestions] = useState<Job[]>([]);
    // const params= useSearchParams()
    //  const q = params?.get("q") ||""
    const [searchq, setSearchq] = useState("");
   
   
    const pathName = usePathname()
    const router = useRouter()

    useEffect(() => {
        async function getSuggesstion() {
            const res = await fetch(
                "/api/sugesstions?q=" + searchq
            );
            const data = await res.json();
            if (data.success) {
                setSuggestions(data.data);
            }
        }

        // debouncing
        // useEffect on change of searchq it will firts call return statement(clerr x time and yes setTimeout return some time) then if user will have waited 1000ms then getSugesstion() fun will run
        let x: any;
        //getSuggestions only if when any input but delay 300ms
        if (searchq) {
            x = setTimeout(() => {
                getSuggesstion();
            }, 300);
        } else {
            setSuggestions([]);
        }

        return () => {
            if (x) clearTimeout(x);
        };
    }, [searchq]);

    return (

        <header className={`sticky w-[100%] top-0 z-[500] px-4 py-3 flex items-center justify-between ${isDark ? `bg-black shadow-xl/40 shadow-emerald-500 transition-shadow` : `bg-white`} !transition-all rounded`} >

            {
                !(pathName == "/")

                &&

                <button onClick={() => { router.back() }} title="Previous Page" ><ArrowLeftIcon className="relative -top-1 size-5 md:size-10 hover:cursor-pointer hover:text-emerald-600 hover:scale-110 transition-all " /></button>
            }
            <div className="md:max-w-7xl max-w-xl mx-auto flex justify-between items-center  pb-2 grow">


                <div className="flex items-center gap-6 ">
                    <div className="">
                        <Link
                            href="/"
                            className="text-2xl font-bold sm:hidden md:block hidden "
                        >
                            HireStack
                        </Link>
                        <Link href={"/"} className="text-2xl font-bold sm:block md:hidden block hover:shadow-xl/60 shadow-emerald-500 ">
                            <Avatar src={""} fallback={"HS"} />
                        </Link>
                    </div>



                    <form className="relative flex items-center" action={`/search`}>
                        <TextField.Root
                            placeholder="Search jobs…"
                            name="q"
                            value={searchq}
                            onChange={(e) => setSearchq(e.target.value)}
                            className="min-w-[50%] focus-within:!w-[100%] "

                        >
                            <TextField.Slot>


                                <MagnifyingGlassIcon height="16" width="16" className="md:!block  !hidden" />


                            </TextField.Slot>
                        </TextField.Root>

                        <IconButton color="green" className="md:!block  !hidden *:mx-auto hover:!ring-2 hover:!ring-cyan-600 !mx-2 !transition-all" radius={"full"}>
                            <MagnifyingGlassIcon width="15" height="15" />
                        </IconButton>


                        {suggestions.length > 0 && (
                            <div className="absolute top-[105%] left-0 w-[80%] bg-white shadow-lg rounded-md z-50 overflow-hidden max-h-64">
                                {suggestions.map((sugg) => (
                                    <Link
                                        key={sugg.id}
                                        href={`/job/${sugg.id}`}
                                        className="block px-4 py-2 hover:bg-emerald-100 text-black text-sm  hover:shadow-emerald-600 hover:shadow-xl/40"
                                    >
                                        {sugg.title}
                                    </Link>
                                ))}
                            </div>
                        )}
                    </form>
                </div>



                <div className="flex items-center gap-4 size-fit">
                    <nav className="hidden md:flex gap-6 text-gray-600 font-medium !text-xs">
                        <Link href="/#jobs" className="text-lg font-medium hover:text-emerald-600">Jobs</Link>
                        <Link href="/#companies" className="text-lg font-medium hover:text-emerald-600">Companies</Link>
                        <Link href="/about" className="text-lg font-medium hover:text-emerald-600">About</Link>
                        <Link href="/#contact" className="text-lg font-medium hover:text-emerald-600">Contact</Link>
                    </nav>
                    <Button
                        variant="soft"
                        color="green"
                        className="hover:!ring-1 hover:!ring-emerald-600 !rounded-full !size-10 !transition-all  "

                        onClick={async () => {
                            setIsDark(!isDark)
                            setUserDark(!isDark) //cookies set function
                        }}

                    >
                        {isDark ? <MoonIcon />
                            :
                            <SunIcon />

                        }
                    </Button>

                    {user?.email ? (
                        <AvatarMenu user={user} />
                    ) : (
                        <Link href="/login">
                            <Button variant="solid" color="green">
                                Log In
                            </Button>
                        </Link>
                    )}
                </div>
            </div>
            <div className="scroll-watcher bg-gradient-to-r from-emerald-700 to-emerald-600"></div>

        </header >

    );
}
