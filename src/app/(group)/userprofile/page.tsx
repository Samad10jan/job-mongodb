"use client";

import { ThContext } from "@/app/components/context/theme-context";
import { UserContext } from "@/app/components/context/user-context";
import CallOutMessage from "@/app/components/reusables/call-out";
import NotFoundComponent from "@/app/components/reusables/notfound";
import EditProfileButton from "@/app/components/userprofilepage/edit-btn";
import { GitHubLogoIcon, LinkedInLogoIcon, PersonIcon } from "@radix-ui/react-icons";
import { Avatar, Badge, Box, Button, Card, Dialog, Flex, Text, TextField } from "@radix-ui/themes";
import { useContext, useEffect, useState } from "react";

export default function UserProfilePage() {
  const { user } = useContext(UserContext);
  // const { isDark } = useContext(ThContext);



  if (!user) return <NotFoundComponent message="user not found" />;

  const [avatar, setAvatar] = useState(user.details?.avatar ?? "");
  const [firstName, setFirstName] = useState(user.details?.firstName ?? "");
  const [lastName, setLastName] = useState(user.details?.lastName ?? "");
  const [address, setAddress] = useState(user.details?.address ?? "");
  const [education, setEducation] = useState(user.details?.education ?? "");
  const [skillsInput, setSkillsInput] = useState(user.details?.skills?.join(", ") ?? "");
  const [linkedin, setLinkedin] = useState(user.details?.linkedin ?? "");
  const [github, setGithub] = useState(user.details?.github ?? "");
  const [phone, setPhone] = useState<number | undefined>(user?.details?.phone || undefined);
  const [experience, setExp] = useState<number | undefined>(user?.details?.experience || undefined);
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (user?.details) {
      setAvatar(user.details.avatar ?? "");
      setFirstName(user.details.firstName ?? "");
      setLastName(user.details.lastName ?? "");
      setAddress(user.details.address ?? "");
      setEducation(user.details.education ?? "");
      setSkillsInput(user.details.skills?.join(", ") ?? "");
      setLinkedin(user.details.linkedin ?? "");
      setGithub(user.details.github ?? "");
      setPhone(user.details.phone ?? undefined);
      setExp(user.details.experience ?? undefined);
    }
  }, [user]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const payload = {
      avatar,
      firstName: firstName.trim(),
      lastName: lastName.trim(),
      address: address.trim(),
      education: education.trim(),
      skills: skillsInput
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean),
      phone,
      experience,
      linkedin: linkedin.trim(),
      github: github.trim(),
    };

    try {
      const res = await fetch("/api/current-user", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (data.success) {
        window.location.href = "/userprofile";
      } else {
        setMessage("Update failed");
      }
    } catch (err) {
      console.error(err);
      setMessage("Something went wrong");
    }
  }

  return (
    <Box className={` py-8 px-4 `}>
      <Box className="max-w-2xl mx-auto">
        <Card
          size="4"
          className={`relative backdrop-blur-sm shadow-2xl border-0 rounded-3xl overflow-hidden 
            `}
        >
          <Box className="absolute top-6 right-6 z-10">

            <EditProfileButton
              avatar={avatar}
              firstName={firstName}
              lastName={lastName}
              address={address}
              education={education}
              skillsInput={skillsInput}
              linkedin={linkedin}
              github={github}
              phone={phone}
              experience={experience}
              setAvatar={setAvatar}
              setFirstName={setFirstName}
              setLastName={setLastName}
              setAddress={setAddress}
              setEducation={setEducation}
              setSkillsInput={setSkillsInput}
              setLinkedin={setLinkedin}
              setGithub={setGithub}
              setPhone={setPhone}
              setExp={setExp}
              setMessage={setMessage}
            />
          </Box>


          <Box className="relative z-10">
            <Flex direction="column" align="center" gap="4" className="text-center pt-6">
              <Avatar
                src={user.details?.avatar || ""}
                fallback={user.email[0] || <PersonIcon />}
                size="9"
                className="ring-4 ring-white/50 shadow-2xl"
              />

              <Text
                size="7"
                weight="bold"
                className="bg-gradient-to-r from-indigo-300 via-emerald-500 to-indigo-600 bg-clip-text text-transparent "
              >
                {user.details?.firstName} {user.details?.lastName}
              </Text>


              <Text size="4" className="font-medium">
                {user.email}
              </Text>

              <Flex wrap="wrap" gap="3" justify="center" className="mt-4">
                {user.details?.skills?.map((skill, idx) => (
                  <div
                    key={idx}
                    className="px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-full text-sm font-semibold shadow-lg"
                  >
                    {skill}
                  </div>
                ))}

              </Flex>

              {(user.details?.linkedin || user.details?.github) && (
                <Box mt="6">
                  <Text size="5" weight="bold" className=" mb-4 flex items-center gap-2">
                    Connect With Me
                  </Text>
                  <Flex direction="column" gap="3">
                    {user.details?.linkedin && (
                      <Button
                        variant="soft"
                        className="justify-start gap-3 !bg-gradient-to-r from-blue-500/10 to-blue-600/10 hover:!from-blue-500/20 hover:!to-blue-600/20 !border !border-blue-200/50"
                        asChild
                      >
                        <a href={user.details.linkedin} target="_blank" rel="noopener noreferrer">
                          <LinkedInLogoIcon className="text-blue-600" />
                          <span className="font-semibold text-blue-700">LinkedIn Profile</span>
                        </a>
                      </Button>
                    )}
                    {user.details?.github && (
                      <Button
                        variant="soft"
                        className="justify-start gap-3 !bg-gradient-to-r from-slate-500/10 to-slate-600/10 hover:!from-slate-500/20 hover:!to-slate-600/20 !border !border-slate-200/50"
                        asChild
                      >
                        <a href={user.details.github} target="_blank" rel="noopener noreferrer">
                          <GitHubLogoIcon className="" />
                          <span className="font-semibold ">GitHub Repository</span>
                        </a>
                      </Button>
                    )}
                  </Flex>
                </Box>
              )}
            </Flex>
          </Box>
        </Card>

        <CallOutMessage message={message} />
      </Box>
    </Box>
  );
}
