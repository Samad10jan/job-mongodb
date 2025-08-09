"use client";
import { Button, Card, RadioGroup, Text } from "@radix-ui/themes";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

export default function Sidebar() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const query = searchParams.get("q") || "";
  const jt = searchParams.get("jt") || "";
  const et = searchParams.get("et") || "";

  const [jobType, setJobType] = useState(jt);
  const [employmentType, setEmploymentType] = useState(et);

  function handleSubmit() {
    const url = `/search?q=${query}&jt=${jobType}&et=${employmentType}`;
    router.push(url);
  }

  return (
    <aside>
      <Card className="w-60 h-fit m-2 p-4 space-y-4">
        <div>
          <Text size="2" weight="bold">Job Type</Text>
          <RadioGroup.Root
            value={employmentType}
            onValueChange={(value) => setEmploymentType(value)}
          >
            <RadioGroup.Item value="">All</RadioGroup.Item>
            <RadioGroup.Item value="fulltime">Full Time</RadioGroup.Item>
            <RadioGroup.Item value="parttime">Part Time</RadioGroup.Item>
          </RadioGroup.Root>
        </div>

        <div>
          <Text size="2" weight="bold">Remote Job</Text>
          <RadioGroup.Root
            value={jobType}
            onValueChange={(value) => setJobType(value)}
          >
            <RadioGroup.Item value="">All</RadioGroup.Item>
            <RadioGroup.Item value="remote">Remote</RadioGroup.Item>
            <RadioGroup.Item value="on-site">On-Site</RadioGroup.Item>
          </RadioGroup.Root>
        </div>

        <Button onClick={handleSubmit} className="mt-4 w-full">Filter</Button>
      </Card>
    </aside>
  );
}
