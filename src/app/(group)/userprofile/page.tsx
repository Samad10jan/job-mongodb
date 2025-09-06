"use client";

import { useContext, useEffect, useState } from "react";
import { UserContext } from "@/app/components/context/user-context";
import { Avatar, Box, Button, Card, Dialog, Flex, Text, TextField } from "@radix-ui/themes";
import NotFoundComponent from "@/app/components/reusables/notfound";
import { GitHubLogoIcon, LinkedInLogoIcon, PersonIcon } from "@radix-ui/react-icons";

export default function UserProfilePage() {
  const { user } = useContext(UserContext);
  const [open, setOpen] = useState(false);

  if (!user) return <div>No user</div>;

  // Local form state
  const [avatar, setAvatar] = useState(user.details?.avatar ?? "");
  const [firstName, setFirstName] = useState(user.details?.firstName ?? "");
  const [lastName, setLastName] = useState(user.details?.lastName ?? "");
  const [address, setAddress] = useState(user.details?.address ?? "");
  const [education, setEducation] = useState(user.details?.education ?? "");
  const [skillsInput, setSkillsInput] = useState(
    user.details?.skills?.join(", ") ?? ""
  );
  const [linkedin, setLinkedin] = useState(user.details?.linkedin ?? "");
  const [github, setGithub] = useState(user.details?.github ?? "");
  const [phone, setPhone] = useState<number | undefined>(user?.details?.phone||undefined);
  const [experience, setExp] = useState<number | undefined>(
    user?.details?.experience||undefined
  );

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
        setOpen(false);
        window.location.href = "/userprofile";
      } else {
        alert("Update failed");
      }
    } catch (err) {
      console.error(err);
      alert("Something went wrong");
    }
  }

  return (
    <Box className="min-h-screen py-8 px-4 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <Box className="max-w-2xl mx-auto">
       
        <Card size="4" className="relative backdrop-blur-sm bg-white/90 shadow-2xl border-0 rounded-3xl overflow-hidden">
         
          <Box className="absolute top-6 right-6 z-10">
            <Dialog.Root open={open} onOpenChange={setOpen}>
              <Dialog.Trigger>
               <Button>Edit profile</Button>
              </Dialog.Trigger>
              
              <Dialog.Content 
                maxWidth="600px" 
                className="!bg-white/95 !backdrop-blur-sm !border-0 !rounded-3xl !shadow-2xl !overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/3 via-purple-500/3 to-pink-500/3"></div>
                
                <div className="relative z-10">
                  <Dialog.Title className="!text-center !mb-2">
                    <Text size="7" weight="bold" className="bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
                      ✨ Edit Profile
                    </Text>
                  </Dialog.Title>
                  
                  <Dialog.Description size="4" className="!text-center !mb-6 !text-slate-600">
                    Update your information and social links
                  </Dialog.Description>

                  <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Names */}
                    <div className="space-y-2">
                      <Text size="3" weight="medium" className="text-slate-700">Name</Text>
                      <Flex gap="4">
                        <TextField.Root
                          placeholder="First Name"
                          value={firstName}
                          onChange={(e) => setFirstName(e.target.value)}
                          className="flex-1 !bg-white/70 !backdrop-blur-sm !border-slate-200/50 !rounded-xl focus:!ring-2 focus:!ring-blue-500/20 !transition-all !duration-300"
                          required
                        />
                        <TextField.Root
                          placeholder="Last Name"
                          value={lastName}
                          onChange={(e) => setLastName(e.target.value)}
                          className="flex-1 !bg-white/70 !backdrop-blur-sm !border-slate-200/50 !rounded-xl focus:!ring-2 focus:!ring-blue-500/20 !transition-all !duration-300"
                          required
                        />
                      </Flex>
                    </div>

                    <div className="space-y-2">
                      <Text size="3" weight="medium" className="text-slate-700">Avatar URL</Text>
                      <TextField.Root
                        placeholder="https://example.com/avatar.jpg"
                        type="url"
                        value={avatar}
                        onChange={(e) => setAvatar(e.target.value)}
                        className="!bg-white/70 !backdrop-blur-sm !border-slate-200/50 !rounded-xl focus:!ring-2 focus:!ring-blue-500/20 !transition-all !duration-300"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Text size="3" weight="medium" className="text-slate-700">Phone</Text>
                        <TextField.Root
                          placeholder="Phone Number"
                          type="tel"
                          value={phone ?? ""}
                          onChange={(e) =>
                            setPhone(e.target.value ? Number(e.target.value) : undefined)
                          }
                          className="!bg-white/70 !backdrop-blur-sm !border-slate-200/50 !rounded-xl focus:!ring-2 focus:!ring-blue-500/20 !transition-all !duration-300"
                        />
                      </div>

                      <div className="space-y-2">
                        <Text size="3" weight="medium" className="text-slate-700">Experience</Text>
                        <TextField.Root
                          placeholder="Years"
                          type="number"
                          value={experience ?? ""}
                          onChange={(e) =>
                            setExp(e.target.value ? Number(e.target.value) : undefined)
                          }
                          className="!bg-white/70 !backdrop-blur-sm !border-slate-200/50 !rounded-xl focus:!ring-2 focus:!ring-blue-500/20 !transition-all !duration-300"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Text size="3" weight="medium" className="text-slate-700">Education</Text>
                      <TextField.Root
                        placeholder="Ex: B.Tech Computer Science"
                        value={education}
                        onChange={(e) => setEducation(e.target.value)}
                        className="!bg-white/70 !backdrop-blur-sm !border-slate-200/50 !rounded-xl focus:!ring-2 focus:!ring-blue-500/20 !transition-all !duration-300"
                      />
                    </div>

                    <div className="space-y-2">
                      <Text size="3" weight="medium" className="text-slate-700">Skills</Text>
                      <TextField.Root
                        placeholder="Ex: React, Node.js, MongoDB (comma separated)"
                        value={skillsInput}
                        onChange={(e) => setSkillsInput(e.target.value)}
                        className="!bg-white/70 !backdrop-blur-sm !border-slate-200/50 !rounded-xl focus:!ring-2 focus:!ring-blue-500/20 !transition-all !duration-300"
                      />
                    </div>

                    <div className="space-y-4">
                      <Text size="4" weight="medium" className="text-slate-700">Social Links</Text>
                      <div className="space-y-3">
                        <TextField.Root
                          placeholder="https://linkedin.com/in/yourprofile"
                          type="url"
                          value={linkedin}
                          onChange={(e) => setLinkedin(e.target.value)}
                          className="!bg-white/70 !backdrop-blur-sm !border-slate-200/50 !rounded-xl focus:!ring-2 focus:!ring-blue-500/20 !transition-all !duration-300"
                        />

                        <TextField.Root
                          placeholder="https://github.com/yourusername"
                          type="url"
                          value={github}
                          onChange={(e) => setGithub(e.target.value)}
                          className="!bg-white/70 !backdrop-blur-sm !border-slate-200/50 !rounded-xl focus:!ring-2 focus:!ring-blue-500/20 !transition-all !duration-300"
                        />
                      </div>
                    </div>

                    {/* Actions */}
                    <Flex gap="3" mt="6" justify="end" className="border-t border-slate-200/50 pt-6">
                      <Dialog.Close>
                        <Button
                          type="button"
                          variant="soft"
                          className="!bg-slate-100 hover:!bg-slate-200 !text-slate-700 !font-semibold !rounded-xl !transition-all !duration-300 hover:!scale-105"
                        >
                          Cancel
                        </Button>
                      </Dialog.Close>
                      
                      <Button 
                        type="submit" 
                        className="!bg-gradient-to-r !from-blue-500 !to-purple-600 hover:!from-blue-600 hover:!to-purple-700 !text-white !font-semibold !rounded-xl !shadow-lg hover:!shadow-xl !transition-all !duration-300 hover:!scale-105"
                      >
                        💾 Save Changes
                      </Button>
                    </Flex>
                  </form>
                </div>
              </Dialog.Content>
            </Dialog.Root>
          </Box>

          <Box className="relative z-10">
            <Flex direction="column" align="center" gap="4" className="text-center pt-6">
              <Avatar
                src={user.details?.avatar || ""}
                fallback={user.email[0] || <PersonIcon/>}
                size="9"
                className="ring-4 ring-white/50 shadow-2xl"
              />
              
              <div className="flex flex-col gap-3">
                <Text size="7" weight="bold" className="bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
                  {user.details?.firstName} {user.details?.lastName}
                </Text>
                <Text size="4" className="text-slate-600 font-medium">
                  {user.email}
                </Text>
              </div>

              {/* Quick Info Pills */}
              <Flex wrap="wrap" gap="3" justify="center" className="mt-4">
                {user.details?.phone && (
                  <div className="px-4 py-2 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 border border-blue-200/50 rounded-full backdrop-blur-sm">
                    <Text size="3" className="text-blue-700 font-medium">
                      📞 {user.details.phone}
                    </Text>
                  </div>
                )}
                {user.details?.experience && (
                  <div className="px-4 py-2 bg-gradient-to-r from-emerald-500/10 to-teal-500/10 border border-emerald-200/50 rounded-full backdrop-blur-sm">
                    <Text size="3" className="text-emerald-700 font-medium">
                      💼 {user.details.experience} years
                    </Text>
                  </div>
                )}
                {user.details?.education && (
                  <div className="px-4 py-2 bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-200/50 rounded-full backdrop-blur-sm">
                    <Text size="3" className="text-purple-700 font-medium">
                      🎓 {user.details.education}
                    </Text>
                  </div>
                )}
              </Flex>
            </Flex>

            <Box mt="8" className="space-y-8 px-6 pb-6">
              {user.details?.skills?.length > 0 && (
                <Box>
                  <Text size="5" weight="bold" className="text-slate-800 mb-4 flex items-center gap-2">
                    🚀 Skills & Expertise
                  </Text>
                  <Flex wrap="wrap" gap="2">
                    {user.details.skills.map((skill: string, idx: number) => (
                      <div
                        key={idx}
                        className="px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-full text-sm font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 cursor-default"
                      >
                        {skill}
                      </div>
                    ))}
                  </Flex>
                </Box>
              )}

              {(user.details?.linkedin || user.details?.github) && (
                <Box>
                  <Text size="5" weight="bold" className="text-slate-800 mb-4 flex items-center gap-2">
                    🌐 Connect With Me
                  </Text>
                  <Flex direction="column" gap="3">
                    {user.details?.linkedin && (
                      <Button 
                        variant="soft" 
                        className="justify-start gap-3 !bg-gradient-to-r !from-blue-500/10 !to-blue-600/10 hover:!from-blue-500/20 hover:!to-blue-600/20 !border !border-blue-200/50 !transition-all !duration-300 hover:!scale-102 !shadow-sm hover:!shadow-md"
                        asChild
                      >
                        <a
                          href={user.details.linkedin}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <LinkedInLogoIcon className="text-blue-600" /> 
                          <span className="font-semibold text-blue-700">LinkedIn Profile</span>
                        </a>
                      </Button>
                    )}
                    {user.details?.github && (
                      <Button 
                        variant="soft" 
                        className="justify-start gap-3 !bg-gradient-to-r !from-slate-500/10 !to-slate-600/10 hover:!from-slate-500/20 hover:!to-slate-600/20 !border !border-slate-200/50 !transition-all !duration-300 hover:!scale-102 !shadow-sm hover:!shadow-md"
                        asChild
                      >
                        <a
                          href={user.details.github}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <GitHubLogoIcon className="text-slate-700" /> 
                          <span className="font-semibold text-slate-700">GitHub Repository</span>
                        </a>
                      </Button>
                    )}
                  </Flex>
                </Box>
              )}
            </Box>
          </Box>
        </Card>
      </Box>
    </Box>
  );
}