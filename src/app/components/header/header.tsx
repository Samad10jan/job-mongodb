
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

        <header className={`!sticky !w-[100%] !top-0 !z-[500] !px-4 !py-3 !flex !items-center !justify-between ${isDark ? `bg-black` : `bg-white`} !transition-all *:!transition-all rounded *:scale-80  md:*:!scale-100  `} >

            {
                !(pathName == "/")

                &&

                <button onClick={() => { router.back() }} title="Previous Page" ><ArrowLeftIcon className="relative -top-1 size-5 md:size-10 hover:cursor-pointer hover:text-emerald-600 hover:scale-110 !transition-all " /></button>
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
                        <Link href={"/"} className="text-2xl font-bold sm:block md:hidden block hover:shadow-xl/60 shadow-emerald-500 font-serif ">
                            

                                    <Avatar src={""} fallback="H&" className="!size-20 !p-5 " />
                                
                        </Link>
                    </div>



                    <form className="relative flex items-center mr-5 focus-within:!absolute focus-within:!left-3/12 md:focus-within:!static focus-within:backdrop-blur-sm   focus-within:!max-w-xl focus-within:!scale-125 md:focus-within:!scale-100 md:focus-within:!w-auto focus-within:!z-[44] md:focus-within:!z-0 !text-sm !transition-all focus-within:!rounded" action={`/search`}>
                        <TextField.Root
                            placeholder="Search"
                            name="q"
                            value={searchq}
                            onChange={(e) => setSearchq(e.target.value)}


                        >
                            <TextField.Slot >


                                <MagnifyingGlassIcon height="16" width="16" />


                            </TextField.Slot>
                        </TextField.Root>

                        <IconButton color="green" className="md:!block  !hidden *:mx-auto hover:!ring-2 hover:!ring-cyan-600 !mx-2 !transition-all" radius={"full"}>
                            <MagnifyingGlassIcon width="15" height="15" className="md:!block !hidden" />
                        </IconButton>


                        {suggestions.length > 0 && (
                            <div className={`absolute top-[105%] left-0 w-[100%] md:w-[80%] border-2 border-emerald-600 ring-1 ring-gray-500 ${isDark ? "bg-black text-white" : "bg-white text-black"} shadow-lg rounded-md z-50 overflow-hidden max-h-64`}>
                                {suggestions.map((sugg) => (
                                    <Link
                                        key={sugg.id}
                                        href={`/job/${sugg.id}`}
                                        className="block px-4 py-2 hover:bg-emerald-600 text-sm m-2  rounded  hover:shadow-emerald-600 hover:shadow-xl/40"
                                    >
                                        {sugg.title}
                                    </Link>
                                ))}
                            </div>
                        )}
                    </form>
                </div>



                <div className="flex items-center gap-4 size-fit">
                    <nav className="hidden md:!flex lg:!flex gap-6 text-gray-600 font-medium !text-xs md:textxl">
                        <Link href="/#jobs" className="text-lg font-medium hover:text-emerald-600">Jobs</Link>
                        <Link href="/#companies" className="text-lg font-medium hover:text-emerald-600">Companies</Link>
                        {/* <Link href="/about" className="text-lg font-medium hover:text-emerald-600">About</Link> */}
                        <Link href="/#contact" className="text-lg font-medium hover:text-emerald-600">Contact</Link>
                    </nav>
                    <Button
                        variant="soft"
                        color="green"
                        className="hover:!ring-1 hover:!ring-emerald-600 !rounded-full !size-10 !transition-all  "

                        onClick={() => {
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
                            <Button color="green" className="!text-xs md:text-lg">
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
