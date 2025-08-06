import Image from "next/image";

export default function Loading(){
    return(
        <div><Image src={"/Book.gif"} alt="Loading..." width={200} height={200}/></div>
    )
}