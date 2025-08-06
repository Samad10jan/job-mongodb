"use client";
import { Badge, Button, Card, Dialog, Flex, Spinner, Text } from "@radix-ui/themes";
import { useContext, useEffect, useState } from "react";
import { Application, Company, Opening, User } from "../../../generated/prisma";
import { UserContext } from "../(group)/layout";

export default function ViewApplicants({ job }:{job:Opening & {company:Company}}) 
{
  const {user} = useContext(UserContext) 
  const [applicants, setApplicants] = useState<(Application &{user:User})[]>([]);
  const [isLoading,setLoading] =useState(true)
  

  useEffect(() => {
    async function getApplicants() {
      setLoading(true)
      try {
        const res = await fetch(
          `http://localhost:3000/api/job/${job.id}/applicants`
        );

        const data = await res.json();
        console.log("data", data.data);

        if (data.success) {
        //   alert(data.message);
          setApplicants(data.data);
          setLoading(false);
          
        }
      } catch (err) {
        console.log(err.message);
        alert(data.message);
      }
    }
    getApplicants();
    
    console.log(applicants);
    
  }, []);

  if(user?.company?.id != job.company.id){
    return null
    
  }

  return (
    <Dialog.Root>
      <Dialog.Trigger>
        <Button>View Applicants</Button>
      </Dialog.Trigger>

      <Dialog.Content maxWidth="450px" className="rounded-lg shadow-lg">
        <Dialog.Title className="text-xl font-semibold mb-2">Applicants</Dialog.Title>

        <Dialog.Description size="2" mb="4" className="text-gray-500">
          Current Applicants
        </Dialog.Description>

        <Flex direction="column" gap="2">
          {applicants.map((applicant) => (
            <Badge key={applicant.id} className="text-base px-3 py-2">
              {applicant.user.email}
            </Badge>
          ))}
        </Flex>

        <Flex justify="end" mt="4">
          <Dialog.Close>
            <Button variant="soft" color="gray">
              Close
            </Button>
          </Dialog.Close>
        </Flex>
      </Dialog.Content>
    </Dialog.Root>
  );
}
