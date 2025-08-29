import { Skeleton, Spinner } from "@radix-ui/themes";

export default function Loading() {
    return (

        <div className="*:m-5 h-screen">
            <Skeleton className="!h-[50%]" >
                <div >
                    {/* hero section */}



                </div>
            </Skeleton>
            <Skeleton>

                <div className="h-[20vh]">

                    <div>
                        {/* Jobs listing */}
                    </div>

                </div>
            </Skeleton>
            <Skeleton>

                <div className="h-[30vh]">
                   

                        <div>
                            {/* Jobs listing */}
                        </div>
                   
                </div>
            </Skeleton>
        </div>

    )
}