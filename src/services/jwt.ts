//@ts-nocheck
import jwt from "jsonwebtoken";


export function createToken(data:{id?:string}){
    console.log("data",data.id);
    
    const token = jwt.sign(data.id,process.env.KEY as string)
    return token;
}

export function verifyToken(token:string){
    try{

        const verifytoken = jwt.verify(token,process.env.KEY)
        console.log(verifytoken);
        
        return verifytoken;
    }catch(err){
        console.log(err.message);
        return null
        
    }
}