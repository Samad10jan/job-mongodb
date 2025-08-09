import JobCard from "@/app/components/cards/job-card";
import { getUserFromCookies } from "@/helper";
import prismaClient from "@/services/prisma";
import { Heading } from "@radix-ui/themes";

export default async function AppliedApp(){
    const user= await getUserFromCookies();
    console.log(user);
    
    if(!user){
        return<div>User Not Found</div>
    }

    const res = await prismaClient.application.findMany({
        where:{
            user_id:user?.id
        },
        include:{
            job:
            {
                include:{
                    company:{
                        include:{
                            owner:true
                        }
                    }
                }
            }
        }

    })
    if(!res.length){
        return<div>Unable to get Application for {user.email}</div>
    }

    return(
        <div>
            <Heading>Applied Application</Heading>

            <div className="flex flex-wrap justify-center ">
                {
                    res.map((apply)=>{
                        return(
                            <div key={apply.id}>
                                {/* <div>{apply.job.title}</div>
                                 */}
                                 <JobCard item={apply.job}/>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}