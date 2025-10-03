import { Card, Skeleton } from "@radix-ui/themes";

export default function CompanyCardSkeleton() {
    return (
        <Card className="md:!min-w-35 !min-w-25 md:!scale-100 !scale-90 !rounded-xl !shadow-emerald-600 hover:!shadow-2xl/60 !transition-all !duration-300 !flex !flex-col !justify-between !items-center hover:!ring-3 hover:!ring-emerald-600 p-4 gap-3">

           
            <div className="!relative !size-8 md:!size-12 !rounded-full !overflow-hidden">
                <Skeleton className="!w-full !h-full rounded-full" />
            </div>

           
            <Skeleton className="h-5 w-28 md:w-32 rounded-md" />

            
            <Skeleton className="h-5 w-20 md:w-24 rounded-md" />

        </Card>

    )
}