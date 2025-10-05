import { Card, Skeleton } from "@radix-ui/themes";

export default function UserCardSkeleton() {
    return (
        <div className="!max-w-6xl !mx-auto !mt-6 !px-4 !space-y-6">
            {/* Header Card */}
            <Card className="!overflow-hidden">
                {/* Cover banner */}
                <div className="!bg-gradient-to-r !from-emerald-600 !to-blue-600 !h-32" />

                <div className="!relative !px-8 !pb-8 !-mt-16 !flex !flex-col !items-center lg:!flex-row lg:!items-end !gap-6">
                    {/* Avatar Skeleton */}
                    <Skeleton className="!w-24 !h-24 !rounded-full !ring-4 !ring-white !shadow-lg" />

                    <div className="!flex-1 !space-y-3">
                        {/* Name */}
                        <Skeleton className="!h-7 !w-40 !rounded-md" />

                        {/* Skills */}
                        <div className="!flex !flex-wrap !gap-2">
                            {Array.from({ length: 4 }).map((_, idx) => (
                                <Skeleton key={idx} className="!h-6 !w-20 !rounded-md" />
                            ))}
                        </div>
                    </div>

                    {/* Edit Profile Button */}
                    <div className="lg:!ml-auto">
                        <Skeleton className="!h-9 !w-28 !rounded-md" />
                    </div>
                </div>
            </Card>

            {/* Main Content */}
            <div className="!flex !flex-col lg:!flex-row !flex-wrap !gap-6">
                {/* Left section */}
                <div className="lg:!col-span-2 !space-y-6 !flex-1">
                    {/* Skills & Expertise Card */}
                    <Card className="!p-6 !space-y-3">
                        <Skeleton className="!h-6 !w-40 !rounded-md" />
                        <div className="!flex !flex-wrap !gap-2">
                            {Array.from({ length: 6 }).map((_, idx) => (
                                <Skeleton key={idx} className="!h-6 !w-16 !rounded-md" />
                            ))}
                        </div>
                    </Card>
                </div>

                {/* Right section */}
                <Card className="!p-6 !h-fit !space-y-4">
                    <Skeleton className="!h-6 !w-44 !rounded-md" />

                    {/* Contact info */}
                    <div className="!space-y-2">
                        {Array.from({ length: 2 }).map((_, idx) => (
                            <div key={idx} className="!flex !items-center !gap-2">
                                <Skeleton className="!h-4 !w-4 !rounded-full" />
                                <Skeleton className="!h-4 !w-32 !rounded-md" />
                            </div>
                        ))}
                    </div>

                    {/* Social Links */}
                    <Skeleton className="!h-5 !w-32 !rounded-md" />
                    <div className="!space-y-2">
                        {Array.from({ length: 2 }).map((_, idx) => (
                            <div key={idx} className="!flex !items-center !gap-2">
                                <Skeleton className="!h-4 !w-4 !rounded-full" />
                                <Skeleton className="!h-4 !w-20 !rounded-md" />
                            </div>
                        ))}
                    </div>
                </Card>
            </div>
        </div>

    )
}