"use client";
import { Button, Dialog, Flex, Text, TextArea, TextField } from "@radix-ui/themes";
import { Company } from "../../../../generated/prisma";
import { useContext, useState } from "react";
import { UserContext } from "../context/user-context";

export default function EditCompanyBtn({ companyInfo }: { companyInfo: Company }) {
  const [name, setName] = useState(companyInfo.title);
  const [description, setDescription] = useState(companyInfo.description || "");
  const [logoUrl, setLogoUrl] = useState(companyInfo?.logoUrl || "");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const { user } = useContext(UserContext);
    
  if (user?.company?.id != companyInfo.id) return null;

  async function handleSave() {
    if (!name.trim() || !description.trim()) {
      setMessage("Company name and description are required.");
      return;
    }

    const obj = {
      id: companyInfo.id,
      title: name,
      description,
      logoUrl,
    };

    try {
      setLoading(true);
      const res = await fetch(`/api/company/${companyInfo.id}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(obj),
      });

      const data = await res.json();

      if (data.success) {
        setMessage("Company updated successfully!");
      } else {
        setMessage(data.message || "Failed to update company.");
      }
    } catch (err: any) {
      console.error(err.message);
      setMessage("Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <Dialog.Root>
      <Dialog.Trigger>
        <Button>Edit</Button>
      </Dialog.Trigger>

      <Dialog.Content  className="">
        <Dialog.Title>Edit Company Details</Dialog.Title>
        <Dialog.Description size="2" mb="4">
          Update your company information below.
        </Dialog.Description>

        <Flex direction="column" gap="3">
          <label>
            <Text as="div" size="2" mb="1" weight="bold">
              Company Name
            </Text>
            <TextField.Root
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter Company Name"
            />
          </label>
          <label>
            <Text as="div" size="2" mb="1" weight="bold">
              Logo URL
            </Text>
            <TextField.Root
              value={logoUrl}
              onChange={(e) => setLogoUrl(e.target.value)}
              placeholder="Paste Logo URL"
            />
          </label>
          <label>
            <Text as="div" size="2" mb="1" weight="bold">
              Description
            </Text>
            <TextArea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="About Company"
              rows={4}
            />
          </label>
        </Flex>

        {message && (
          <Text as="p" size="2" color="red" mt="2">
            {message}
          </Text>
        )}

        <Flex gap="3" mt="4" justify="end">
          <Dialog.Close>
            <Button variant="soft" color="gray">
              Cancel
            </Button>
          </Dialog.Close>
          <Dialog.Close>
            <Button onClick={handleSave} disabled={loading}>
              {loading ? "Saving..." : "Save"}
            </Button>
          </Dialog.Close>
        </Flex>
      </Dialog.Content>
    </Dialog.Root>
  );
}
