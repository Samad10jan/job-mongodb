import Image from "next/image";

export default function NotFound(){
    return(
        <div className="flex justify-center items-center"><Image src={"/not-found.png"} alt="not-found" width={500} height={500}/></div>
    )
}