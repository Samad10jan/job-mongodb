import NotFoundComponent from "@/app/components/reusables/notfound";
import EditProfileButton from "@/app/components/userprofilepage/edit-btn";
import { getUserFromCookies } from "@/helper";
import { EnvelopeClosedIcon, GitHubLogoIcon, LinkedInLogoIcon, PersonIcon } from "@radix-ui/react-icons";
import { Avatar, Badge, Button, Card } from "@radix-ui/themes";

export default async function UserProfilePage() {
  let user = null;
  try {
    user = await getUserFromCookies();
  } catch (err) {
    console.error("Failed to fetch user:", err);
  }

  if (!user) return <NotFoundComponent message="User not found" />;

  // Destructure user details
  const {
    avatar,
    firstName = "",
    lastName = "",
    address = "",
    education = "",
    skills = [],
    linkedin = "",
    github = "",
    phone,
    experience,
  } = user.details ?? {};


  return (
    <div className="py-8 px-4">
      <div className="max-w-4xl mx-auto">

        <Card className="relative overflow-hidden rounded-3xl shadow-xl">
          <div className="p-8">
            <div className="flex flex-col md:flex-row gap-8">

              <div className="flex flex-col items-center text-center gap-6 md:w-1/3">
                <div className="relative">
                  <Avatar
                    src={avatar || ""}
                    fallback={user.email[0] || <PersonIcon />}
                    size="9"
                    className="!ring-2 ring-emerald-400 shadow-lg shadow-emerald-600"
                  />
                  
                </div>

                <div className="flex flex-col gap-2">
                  <h1 className="text-3xl font-bold ">
                    {firstName} {lastName}
                  </h1>
                  <div className="flex items-center justify-center gap-2 ">
                    <EnvelopeClosedIcon className="!w-4 !h-4" />
                    <p className="text-sm">{user.email}</p>
                  </div>
                </div>

                <EditProfileButton />
              </div>

              
              <div className="flex flex-col gap-8 md:w-2/3">

                <div>

                  <div className="flex items-center gap-3 mb-4">
                    <div className="h-8 w-1 bg-blue-500 rounded-full" />
                    <h2 className="text-2xl font-bold ">Skills & Expertise</h2>
                  </div>

                  <div className="flex flex-wrap gap-3">

                    {skills.map((skill, idx) => (
                      <Badge
                        key={idx}
                        size="3"
                        color="indigo"
                        className="!px-4 !py-2 !rounded-xl !text-sm !font-semibold"
                      >
                        {skill}
                      </Badge>
                    ))}

                  </div>
                </div>

               
                {(linkedin || github) && (
                  <div>
                    <div className="flex items-center gap-3 mb-4">
                      <div className="h-8 w-1 bg-emerald-500 rounded-full" />
                      <h2 className="text-2xl font-bold ">Connect</h2>
                    </div>
                    <div className="flex flex-col md:flex-row gap-4">
                      {linkedin && (
                        <Button
                          variant="soft"
                          size="3"
                          className="flex-1"
                          asChild
                        >
                          <a href={linkedin} target="_blank" rel="noopener noreferrer" className="flex items-center justify-start gap-3">
                            <LinkedInLogoIcon className="w-5 h-5" />
                            <span className="font-semibold">LinkedIn</span>
                          </a>
                        </Button>
                      )}
                      {github && (
                        <Button
                          variant="soft"
                          size="3"
                          className="flex-1"
                          asChild
                        >
                          <a href={github} target="_blank" rel="noopener noreferrer" className="flex items-center justify-start gap-3">
                            <GitHubLogoIcon className="w-5 h-5" />
                            <span className="font-semibold">GitHub</span>
                          </a>
                        </Button>
                      )}
                    </div>
                  </div>
                )}

              </div>
            </div>
          </div>
        </Card>

        {/* Additional Info Cards
        <div className="flex flex-col md:flex-row gap-6 mt-6">
          <Card className="flex-1 shadow-lg">
            <div className="p-6">
              <h3 className="text-lg font-bold  mb-3">About Me</h3>
              <p className=" text-sm leading-relaxed">
                Passionate developer crafting innovative solutions with modern technologies.
                Always learning, always building.
              </p>
            </div>
          </Card>
          <Card className="flex-1 shadow-lg">
            <div className="p-6">
              <h3 className="text-lg font-bold  mb-3">Availability</h3>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-emerald-400 rounded-full" />
                <p className=" text-sm">Available for new opportunities</p>
              </div>
            </div>
          </Card>
        </div> */}
      </div>
    </div>
  );


}
