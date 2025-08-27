import { Spinner } from "@radix-ui/themes";

export default function Loading(){
    return(
        <div className="flex justify-center"><Spinner size={"3"}/></div>
    )
}