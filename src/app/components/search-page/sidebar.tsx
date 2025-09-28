"use client";

import { Button, Card, RadioGroup, Slider, Text } from "@radix-ui/themes";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

export default function Sidebar() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const query = searchParams.get("q") || "";
  const jt = searchParams.get("jt") || "";
  const et = searchParams.get("et") || "";
  // const cp = searchParams.get("cp")||""
  const salg = Number(searchParams.get("slg") || 0); //greater
  const sall = Number(searchParams.get("sll") || 0); // lower

  const [jobType, setJobType] = useState(jt);
  const [employmentType, setEmploymentType] = useState(et);
  const [salary, setSalary] = useState([sall,salg]);
  // const [company, setCompnay] = useState(cp); &cp=${cp}

  function handleSubmit() {
    // console.log(salary[0]);

    const url = `/search?q=${query}&jt=${jobType}&et=${employmentType}&slg=${salary[0]}&sll=${salary[1]}`;
    router.push(url);


  }

  return (
    <aside className="">
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

        <div>
          <Text size="2" weight="bold">Salary Range</Text>

          <Slider
            value={[salary[0], salary[1]]} 
            min={0}
            max={500000}
            step={1000}
            onValueChange={(value) => setSalary(value)} // value is [min, max]
          />

          <Text>
            Selected Range: ₹{salary[0]} - ₹{salary[1]}
          </Text>
        </div>

        {/* <div>
          <Text size="2" weight="bold">By Company</Text>
          <RadioGroup.Root
            value={cp}
            onValueChange={(value) => setCompnay(value)}
          >
            <RadioGroup.Item value="">All</RadioGroup.Item>
            <RadioGroup.Item value="google">Google</RadioGroup.Item>
            <RadioGroup.Item value="ibm">IBM</RadioGroup.Item>
          </RadioGroup.Root>
        </div> */}

        <Button onClick={handleSubmit} className="mt-4 w-full">Filter</Button>
      </Card>
    </aside>
  );
}
