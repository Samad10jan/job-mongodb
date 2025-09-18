import { ChatBubbleIcon, DownloadIcon, FileTextIcon, PersonIcon } from "@radix-ui/react-icons";
import { Badge, Button, Card, Heading, Tabs, Text } from "@radix-ui/themes";
import { UserDetails } from "../../../../generated/prisma";

export default function ProfileOverviewTab({userDetails}:{
    userDetails: UserDetails | undefined
}) {
    return (
        <div>
            <Tabs.Root defaultValue="overview" >
                <Tabs.List className="flex gap-2">
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
                </Tabs.List>
                <div className="mt-4 space-y-4">
                    <Tabs.Content value="overview">
                        <Card className="p-6">
                            <Heading size="5" className="mb-2">
                                Education
                            </Heading>
                            <Text>
                                {userDetails?.education && userDetails.education.trim() 
                                    ? userDetails.education 
                                    : "No information"
                                }
                            </Text>
                        </Card>
                        <Card className="p-6">
                            <Heading size="5" className="mb-2">
                                Skills
                            </Heading>
                            <div className="flex flex-wrap gap-2">
                                {userDetails?.skills && userDetails.skills.length > 0 ? (
                                    userDetails.skills.map((skill, i) => (
                                        <Badge key={i} color="blue">
                                            {skill}
                                        </Badge>
                                    ))
                                ) : (
                                    <Text>No information</Text>
                                )}
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
                </div>
            </Tabs.Root>
        </div>
    )
}