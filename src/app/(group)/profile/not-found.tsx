// "use client"
import Image from "next/image";

export default function NotFound() {
    // const router = useRouter()
    return (
        <div className="flex justify-center items-center">
            {/* <Button variant="soft" onClick={() => { router.back() }} className="text-center font-mono">No User Here Go Back</Button> */}
            <Image src={"/not-found.png"} alt="not-found" width={500} height={500} />
        </div>
    )
}