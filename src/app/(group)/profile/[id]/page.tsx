import { notFound } from "next/navigation"

export default function UserProfile({params}:{params:{id:string}}){
    const id = params.id

    if(id.trim().length===0){
        notFound();
    }
    try{
        // task1
       // appliedUser.id lene hai
       // check kar na hai ki 
       // current user jo ki owner hai

       // user.company.id===appliedUser.job.company_id
       // then only show , other wise notfound
        // task 2 save job:
        // if login: directly add to user document db
        // else add to local storage and when user login get data from local storage and store it to db
    }catch(error:any){
        console.log(error.message);
        
    }

}