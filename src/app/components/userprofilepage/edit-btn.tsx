"use client";

import { ThContext } from "@/app/components/context/theme-context";
import { Button, Dialog, Flex, Text, TextField } from "@radix-ui/themes";
import { FormEvent, useContext, useState } from "react";
import { UserContext } from "../context/user-context";

export default function EditProfileButton() {
  const { isDark } = useContext(ThContext);
  const { user } = useContext(UserContext)

  if (!user) return null;
  const [avatar, setAvatar] = useState(user?.details?.avatar ?? "");
  const [firstName, setFirstName] = useState(user?.details?.firstName ?? "");
  const [lastName, setLastName] = useState(user?.details?.lastName ?? "");
  const [address, setAddress] = useState(user?.details?.address ?? "");
  const [education, setEducation] = useState(user?.details?.education ?? "");
  const [skillsInput, setSkillsInput] = useState(user?.details?.skills?.join(", ") ?? "");
  const [linkedin, setLinkedin] = useState(user?.details?.linkedin ?? "");
  const [github, setGithub] = useState(user?.details?.github ?? "");
  const [phone, setPhone] = useState<number | undefined>(user?.details?.phone || undefined);
  const [experience, setExp] = useState<number | undefined>(user?.details?.experience || undefined);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setLoading(true)

    const payload = {
      avatar: avatar,
      firstName: firstName.trim(),
      lastName: lastName.trim(),
      address: address.trim(),
      education: education.trim(),
      skills: skillsInput
        .split(",")
        .map((s: string) => s.trim())
        .filter(Boolean),
      phone: phone,
      experience: experience,
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
      setLoading(false)
    } catch (err) {
      console.error(err);
      setMessage("Something went wrong");
      setLoading(false)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog.Root>
      <Dialog.Trigger>
        <Button >Edit profile</Button>
      </Dialog.Trigger>

      <Dialog.Content
        minWidth="500px"
        className={`!backdrop-blur-sm !border-0 !rounded-3xl !shadow-2xl !overflow-hidden min-h-screen ${isDark ? "bg-gray-800/95" : "bg-white/95"
          }`}
      >
        <div className="absolute inset-0 bg-gradient-to-br "></div>

        <div className="relative z-10">
          <Dialog.Title className="!text-center !mb-2">
            <Text size="7" weight="bold">Edit Profile</Text>
          </Dialog.Title>

          <Dialog.Description size="4" className="!text-center !mb-3">
            Update your information and social links
          </Dialog.Description>

          <form onSubmit={handleSubmit} className="space-y-4">
            <TextField.Root
              placeholder="First Name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="!border-slate-200/50 !rounded-xl focus:!ring-2 focus:!ring-blue-500/20"
              required
            />

            <TextField.Root
              placeholder="Last Name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className="!border-slate-200/50 !rounded-xl focus:!ring-2 focus:!ring-blue-500/20"
              required
            />

            <TextField.Root
              placeholder="Avatar URL"
              value={avatar}
              onChange={(e) => setAvatar(e.target.value)}
              className="!border-slate-200/50 !rounded-xl focus:!ring-2 focus:!ring-blue-500/20"
            />

            <TextField.Root
              placeholder="Phone"
              type="tel"
              value={phone ?? ""}
              onChange={(e) => setPhone(e.target.value ? Number(e.target.value) : undefined)}
              className="!border-slate-200/50 !rounded-xl focus:!ring-2 focus:!ring-blue-500/20"
            />

            <TextField.Root
              placeholder="Experience (Years)"
              type="number"
              value={experience ?? ""}
              onChange={(e) => setExp(e.target.value ? Number(e.target.value) : undefined)}
              className="!border-slate-200/50 !rounded-xl focus:!ring-2 focus:!ring-blue-500/20"
            />

            <TextField.Root
              placeholder="Education"
              value={education}
              onChange={(e) => setEducation(e.target.value)}
              className="!border-slate-200/50 !rounded-xl focus:!ring-2 focus:!ring-blue-500/20"
            />

            <TextField.Root
              placeholder="Skills (comma separated)"
              value={skillsInput}
              onChange={(e) => setSkillsInput(e.target.value)}
              className="!border-slate-200/50 !rounded-xl focus:!ring-2 focus:!ring-blue-500/20"
            />

            <TextField.Root
              placeholder="LinkedIn URL"
              type="url"
              value={linkedin}
              onChange={(e) => setLinkedin(e.target.value)}
              className="!border-slate-200/50 !rounded-xl focus:!ring-2 focus:!ring-blue-500/20"
            />

            <TextField.Root
              placeholder="GitHub URL"
              type="url"
              value={github}
              onChange={(e) => setGithub(e.target.value)}
              className="!border-slate-200/50 !rounded-xl focus:!ring-2 focus:!ring-blue-500/20"
            />

            <Flex gap="3" mt="6" justify="end" className="border-t border-slate-200/50 pt-6">
              <Dialog.Close>
                <Button type="button" variant="soft" className="!font-semibold !rounded-xl">
                  Cancel
                </Button>
              </Dialog.Close>
         

                <Button type="submit" disabled={loading} className={`!bg-gradient-to-r ${loading&&"cursor-not-allowed"} !from-blue-500 !to-purple-600 !text-white !rounded-xl`}>
                  {loading ?"loading...": `Save Changes`  }
                </Button>
              

            </Flex>
          </form>
        </div>
      </Dialog.Content>
    </Dialog.Root>
  );
}