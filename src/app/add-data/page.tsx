// import prismaClient from "@/services/prisma";
// import data from "../data";
// // tempopry add function createMany
// export default function PAge(){
//     async function addData(){
//         "use server"
//         const newData = data.data.map((elem)=>{
//             return({
//                 title: elem.job_title,
//                 description: elem.job_description,
//                 salary:2000,
//                 location:elem.job_location,
//                 job_type:"remote",
//                 employment_type:"parttime"

//             })
//         }) 
//         const res = await prismaClient.opening.createMany({
//             data:newData
//         })
//     }
//     return(
        
//         <button onClick={addData}>Go</button>
//     )
// }