import { ChatBubbleIcon, DownloadIcon, FileTextIcon, PersonIcon } from "@radix-ui/react-icons";
import { Badge, Button, Card, Heading, Tabs, Text } from "@radix-ui/themes";

export default function ProfileOverviewTab() {
    return (
        <div>
            <Tabs.Root defaultValue="overview" >
                <Tabs.List className="flex gap-2 bg-gray-100 p-1 rounded-lg">
                    <Tabs.Trigger
                        value="overview"
                        className="flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-md text-sm data-[state=active]:bg-white data-[state=active]:shadow"
                    >
                        <PersonIcon /> Overview
                    </Tabs.Trigger>
                    <Tabs.Trigger
                        value="application"
                        className="flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-md text-sm data-[state=active]:bg-white data-[state=active]:shadow"
                    >
                        <FileTextIcon /> Resume
                    </Tabs.Trigger>
                    <Tabs.Trigger
                        value="notes"
                        className="flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-md text-sm data-[state=active]:bg-white data-[state=active]:shadow"
                    >
                        <ChatBubbleIcon /> Notes
                    </Tabs.Trigger>
                </Tabs.List>

                <div className="mt-4 space-y-4">
                    <Tabs.Content value="overview">
                        <Card className="p-6">
                            <Heading size="5" className="mb-2">
                                Education
                            </Heading>
                            <Text>{"aa"}</Text>
                        </Card>
                        <Card className="p-6">
                            <Heading size="5" className="mb-2">
                                Skills
                            </Heading>
                            <div className="flex flex-wrap gap-2">
                                {/* {data.skills.map((skill, i) => (
                                    <Badge key={i} color="blue">
                                        {skill}
                                    </Badge>
                                ))} */}
                            </div>
                        </Card>
                    </Tabs.Content>

                    <Tabs.Content value="application">

                        <Card className="p-6">
                            <Heading size="5" className="mb-2">
                                Resume
                            </Heading>
                            <Button variant="outline" size="2">
                                <DownloadIcon /> Download Resume
                            </Button>
                        </Card>
                    </Tabs.Content>

                    <Tabs.Content value="notes">
                        <Card className="p-6">
                            <Heading size="5" className="mb-2">
                                Internal Notes
                            </Heading>
                            <textarea
                                placeholder="Write a note..."
                                rows={3}
                                className="w-full border rounded p-2 text-sm"
                            />
                            <div className="mt-2">
                                <Button size="2">Save Note</Button>
                            </div>
                        </Card>
                    </Tabs.Content>
                </div>
            </Tabs.Root>
        </div>
    )
}