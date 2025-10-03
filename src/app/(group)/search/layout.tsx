import { Badge, Dialog } from "@radix-ui/themes";
import Sidebar from "../../components/search-page/sidebar";
import { HamburgerMenuIcon, MixerHorizontalIcon } from "@radix-ui/react-icons";

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div>

            <div className="flex gap-7 m-5 ">

                <div className="md:static absolute" >
                    <div className="!hidden md:!block ">

                        <Sidebar />
                    </div>
                    <div className="md:!hidden !block   ">

                        <Dialog.Root  >
                            <Dialog.Trigger className="size-fit">
                                <Badge>
                                    <MixerHorizontalIcon />
                                </Badge>
                            </Dialog.Trigger>
                            <Dialog.Content className="flex justify-center items-center flex-col ">
                                <Dialog.Title>Filters</Dialog.Title>
                                <Sidebar />
                            </Dialog.Content>
                        </Dialog.Root>
                    </div>
                </div>
                <div>
                    {children}
                </div>
            </div>

        </div>
    );
}
