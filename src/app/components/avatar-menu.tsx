import { Avatar, Button, DropdownMenu } from "@radix-ui/themes";

import Link from "next/link";
import LogOut from "./logout-btn";
import Image from "next/image";


export default function AvatarMenu({ user }) {


    return (
        <div className="hover:cursor-pointer ">
            <DropdownMenu.Root >

                <DropdownMenu.Trigger >

{ user.avatar ?

                    <Avatar
                    size={"4"}
                    src={user?.avatar}
                    fallback={"User"}
                    
                    />:
                    <p>User</p>
                }

                </DropdownMenu.Trigger>


                <DropdownMenu.Content className=" relative right-1.5">
                    {user?.email && <DropdownMenu.Item>{user?.email}</DropdownMenu.Item>
                    }
                    {
                        (user?.company?.id)

                        &&
                        <div>
                            <DropdownMenu.Separator />
                           <Link href={"/add-job"}> <DropdownMenu.Item shortcut="⌘ A">Add Job</DropdownMenu.Item></Link>

                            <Link href={"/company/" + user?.company?.id}> <DropdownMenu.Item shortcut="⌘ D">MY Company</DropdownMenu.Item></Link>
                        </div>
                    }
                    {
                        (!user?.company)

                        &&

                        <Link href={"/add-company"}><DropdownMenu.Item shortcut="⌘ D">Add Company</DropdownMenu.Item></Link>
                    }
                    <DropdownMenu.Separator />
                    <DropdownMenu.Item shortcut="⌘ N">Archive</DropdownMenu.Item>

                    <DropdownMenu.Sub>
                        <DropdownMenu.SubTrigger>More</DropdownMenu.SubTrigger>
                        <DropdownMenu.SubContent>
                            <DropdownMenu.Item>Applied</DropdownMenu.Item>
                            <DropdownMenu.Item>Settings</DropdownMenu.Item>

                            <DropdownMenu.Separator />
                            <DropdownMenu.Item></DropdownMenu.Item>
                        </DropdownMenu.SubContent>
                    </DropdownMenu.Sub>

                    <DropdownMenu.Separator />
                    <DropdownMenu.Item>Share</DropdownMenu.Item>
                    <DropdownMenu.Item>Add to favorites</DropdownMenu.Item>
                    <DropdownMenu.Separator />
                    {
                        (user?.id.length > 0)

                            &&
                            <div>
                                <LogOut />
                            </div>
                            
                    }

                </DropdownMenu.Content>
            </DropdownMenu.Root>
        </div>
    )
}