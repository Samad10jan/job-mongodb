import NotFoundComponent from "@/app/components/reusables/notfound";
import EditProfileButton from "@/app/components/userprofilepage/edit-btn";
import { getUserFromCookies } from "@/helper";
import { EnvelopeClosedIcon, GitHubLogoIcon, LinkedInLogoIcon, PersonIcon } from "@radix-ui/react-icons";
import { Avatar, Badge, Button, Card } from "@radix-ui/themes";

export const dynamic = 'force-dynamic';
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
    <div className="!max-w-6xl !mx-auto !mt-6 !px-4 !space-y-6">
     
      <Card className="!overflow-hidden ">
        <div className="!bg-gradient-to-r !from-emerald-600 !to-blue-600 !h-32" />
        <div className="!relative !px-8 !pb-8 !-mt-16 !items-center   !flex !flex-col md:!flex-row md:!items-end !gap-6">
          <Avatar
            src={avatar || ""}
            fallback={user.email[0]?.toUpperCase() || "?"}
            size="9"
            radius="full"
            variant="solid"
            
            className="!ring-4 !ring-white "
          />

          <div className="!flex !flex-col !items-center md:!items-start !flex-1 !space-y-3">
            {(firstName || lastName) && (
              <h1 className="!text-3xl !font-bold">
                {firstName} {lastName}
              </h1>
            )}

            {skills?.length > 0 && (
              <div className="!flex !flex-wrap !gap-2">
                {skills.map((skill, idx) => (
                  <Badge key={idx} color="indigo" className="!px-3 !py-1 !text-sm !font-medium">
                    {skill}
                  </Badge>
                ))}
              </div>
            )}
          </div>

          {/* Edit Profile */}
          <div className="md:!ml-auto">
            <EditProfileButton />
          </div>
        </div>
      </Card>


      <div className="!flex !flex-col md:!flex-row !flex-wrap !gap-6">


        <div className="md:!col-span-2 !space-y-6">

          {/* Bio section later addOn */}

          {/* Skills & Expertise */}
          <Card className="!p-6">
            <h2 className="!text-xl !font-semibold !mb-3">Skills & Expertise</h2>
            <div className="!flex !flex-wrap !gap-2">
              {skills.map((skill, idx) => (
                <Badge
                  key={idx}
                  color="indigo"
                  className="!px-3 !py-1 !text-sm !font-medium"
                >
                  {skill}
                </Badge>
              ))}
            </div>
          </Card>
        </div>


        <Card className="!p-6 !h-fit">
          <h2 className="!text-lg !font-semibold !mb-4">Contact Information</h2>
          <div className="!space-y-2">
            <div className="!flex !items-center !gap-2">
              <EnvelopeClosedIcon className="!w-4 !h-4 !text-gray-500" />
              <span className="!text-sm">{user.email}</span>
            </div>
          </div>

          {(linkedin || github) && (
            <>
              <hr className="!my-4" />
              <h3 className="!text-md !font-semibold !mb-2">Social Links</h3>
              <div className="!space-y-2">
                {linkedin && (
                  <a
                    href={linkedin}
                    target="_blank"
                    className="!flex !items-center !gap-2 !text-blue-600 hover:!underline"
                  >
                    <LinkedInLogoIcon /> LinkedIn
                  </a>
                )}
                {github && (
                  <a
                    href={github}
                    target="_blank"
                    className="!flex !items-center !gap-2 !text-gray-700 hover:!underline"
                  >
                    <GitHubLogoIcon /> GitHub
                  </a>
                )}
              </div>
            </>
          )}
        </Card>
      </div>
    </div>

  );

}
