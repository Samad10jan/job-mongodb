
"use client";
import { Badge, Button, Dialog, Flex, Spinner} from "@radix-ui/themes";
import { useContext, useEffect, useState } from "react";
import { Application, Company, Opening, User } from "../../../../generated/prisma";
import { UserContext } from "../context/user-context";
import Link from "next/link";



export default function ViewApplicants({ job }:{job:Opening & {company:Company}}) 
{
  const {user} = useContext(UserContext) 
  const [applicants, setApplicants] = useState<(Application &{user:User})[]>([]);
  const [isLoading,setLoading] =useState(true)
  const [viewApplicants,setViewApplicants]= useState(false)
  
  

  useEffect(() => {
    async function getApplicants() {
      setLoading(true)
      try {
        const res = await fetch(
          `/api/job/${job.id}/applicants`
        );

        const data = await res.json();
        // console.log("data", data.data);

        if (data.success) {
        //   alert(data.message);
          setApplicants(data.data);
          setLoading(false);
          
          
        }
      } catch (err:any) {
        console.log(err.message);
        alert("Error occured");
      }
    }
    getApplicants();
    
    // console.log(applicants);
    
  }, [viewApplicants]);

  // only that current user can se this viewcomponent whos current user company is equal to current job company 

  if(user?.company?.id != job.company.id){
    return null
    
  }

  async function handleDelete(id:string){
    try{
      const res = await fetch(`/api/job/${id}/applicants`,{
        method:"DELETE"
      })
      const data = await res.json()
      console.log("data",data);
      
      if(data.success){
        alert(data.message)

      }else{
        alert("Something went wrong")
        
      }
    }catch(err:any){
      console.log(err.message);
      alert("Some Error Occured while deleting")
      

    }

  }

  return (
    <Dialog.Root>
      <Dialog.Trigger>
        <Button onClick={()=>setViewApplicants(!viewApplicants)}>View Applicants</Button>
      </Dialog.Trigger>

      <Dialog.Content maxWidth="450px" className="rounded-lg shadow-lg">
        <Dialog.Title className="text-xl font-semibold mb-2">Applicants</Dialog.Title>

        <Dialog.Description size="2" mb="4" className="text-gray-500">
          Current Applicants
        </Dialog.Description>
        {
          isLoading &&<Spinner size={"3"}/>
        }

        <Flex direction="column" gap="2">
          {applicants.map((applicant) => (
            <div key={applicant.id} > 
           <Link href={"/profile/"+applicant.user_id}>
            <Badge key={applicant.id} className="text-base px-3 py-2">
              {applicant.user.email}
            </Badge>
           </Link>
            <Button onClick={()=>handleDelete(applicant.id)}>Delete</Button>
            </div>
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
