import { Badge, Card } from "@radix-ui/themes";
import Image from "next/image";
import Link from "next/link";
import { Company, Opening } from "../../../../generated/prisma";
import { GlobeIcon } from "@radix-ui/react-icons";
import { Suspense } from "react";
import CompanyCardSkeleton from "../loading-skeletons/company-card-skeleton";

export default function CompanyCard({
    company,
}: {
    company: Company & { jobs: Opening[] };
}) {

    return (
        <Suspense fallback={<CompanyCardSkeleton />}>

            <Link href={`/company/${company.id}`} title="company card">



                <Card className=" md:!min-w-35 !min-w-25 md:!scale-100 !scale-90  !rounded-xl !shadow-emerald-600 hover:!shadow-2xl/60 !transition-all !duration-300 !flex !flex-col !justify-between !items-center hover:!ring-3 hover:!ring-emerald-600 ">


                    <div className="!relative !size-8 md:!size-12 !rounded-full !overflow-hidden ">
                        {company.logoUrl ? (
                            <Image
                                src={company.logoUrl}
                                alt={`${company.title} logo`}
                                fill
                                className="object-cover"
                                title="company logo"
                            />
                        ) : (
                            <span className="!flex !items-center !justify-center !w-full !h-full !text-xs">
                                <GlobeIcon />
                            </span>
                        )}
                    </div>
                    <h2 className="!text-lg !font-semibold !turncate ">
                        {company.title}
                    </h2>



                    <Badge className="turncate">
                        {company.jobs.length > 0
                            ? `${company.jobs.length} opening${company.jobs.length > 1 ? "s" : ""}`
                            : "No openings"}
                    </Badge>


                </Card>
            </Link>
        </Suspense>
    );
}
