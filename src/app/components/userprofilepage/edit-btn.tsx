"use client";

import { ThContext } from "@/app/components/context/theme-context";
import { Button, Dialog, Flex, Text, TextField } from "@radix-ui/themes";
import { FormEvent, useContext } from "react";

export default function EditProfileButton(props: any) {
  const { isDark } = useContext(ThContext);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();

    const payload = {
      avatar: props.avatar,
      firstName: props.firstName.trim(),
      lastName: props.lastName.trim(),
      address: props.address.trim(),
      education: props.education.trim(),
      skills: props.skillsInput
        .split(",")
        .map((s: string) => s.trim())
        .filter(Boolean),
      phone: props.phone,
      experience: props.experience,
      linkedin: props.linkedin.trim(),
      github: props.github.trim(),
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
        props.setMessage("Update failed");
      }
    } catch (err) {
      console.error(err);
      props.setMessage("Something went wrong");
    }
  }

  return (
    <Dialog.Root>
      <Dialog.Trigger>
        <Button>Edit profile</Button>
      </Dialog.Trigger>

      <Dialog.Content
        minWidth="500px"
        className={`!backdrop-blur-sm !border-0 !rounded-3xl !shadow-2xl !overflow-hidden min-h-screen ${
          isDark ? "bg-gray-800/95" : "bg-white/95"
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
              value={props.firstName}
              onChange={(e) => props.setFirstName(e.target.value)}
              className="!border-slate-200/50 !rounded-xl focus:!ring-2 focus:!ring-blue-500/20"
              required
            />

            <TextField.Root
              placeholder="Last Name"
              value={props.lastName}
              onChange={(e) => props.setLastName(e.target.value)}
              className="!border-slate-200/50 !rounded-xl focus:!ring-2 focus:!ring-blue-500/20"
              required
            />

            <TextField.Root
              placeholder="Avatar URL"
              value={props.avatar}
              onChange={(e) => props.setAvatar(e.target.value)}
              className="!border-slate-200/50 !rounded-xl focus:!ring-2 focus:!ring-blue-500/20"
            />

            <TextField.Root
              placeholder="Phone"
              type="tel"
              value={props.phone ?? ""}
              onChange={(e) => props.setPhone(e.target.value ? Number(e.target.value) : undefined)}
              className="!border-slate-200/50 !rounded-xl focus:!ring-2 focus:!ring-blue-500/20"
            />

            <TextField.Root
              placeholder="Experience (Years)"
              type="number"
              value={props.experience ?? ""}
              onChange={(e) => props.setExp(e.target.value ? Number(e.target.value) : undefined)}
              className="!border-slate-200/50 !rounded-xl focus:!ring-2 focus:!ring-blue-500/20"
            />

            <TextField.Root
              placeholder="Education"
              value={props.education}
              onChange={(e) => props.setEducation(e.target.value)}
              className="!border-slate-200/50 !rounded-xl focus:!ring-2 focus:!ring-blue-500/20"
            />

            <TextField.Root
              placeholder="Skills (comma separated)"
              value={props.skillsInput}
              onChange={(e) => props.setSkillsInput(e.target.value)}
              className="!border-slate-200/50 !rounded-xl focus:!ring-2 focus:!ring-blue-500/20"
            />

            <TextField.Root
              placeholder="LinkedIn URL"
              type="url"
              value={props.linkedin}
              onChange={(e) => props.setLinkedin(e.target.value)}
              className="!border-slate-200/50 !rounded-xl focus:!ring-2 focus:!ring-blue-500/20"
            />

            <TextField.Root
              placeholder="GitHub URL"
              type="url"
              value={props.github}
              onChange={(e) => props.setGithub(e.target.value)}
              className="!border-slate-200/50 !rounded-xl focus:!ring-2 focus:!ring-blue-500/20"
            />

            <Flex gap="3" mt="6" justify="end" className="border-t border-slate-200/50 pt-6">
              <Dialog.Close>
                <Button type="button" variant="soft" className="!font-semibold !rounded-xl">
                  Cancel
                </Button>
              </Dialog.Close>

              <Button type="submit" className="!bg-gradient-to-r !from-blue-500 !to-purple-600 !text-white !rounded-xl">
                Save Changes
              </Button>
            </Flex>
          </form>
        </div>
      </Dialog.Content>
    </Dialog.Root>
  );
}