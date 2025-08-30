import { Badge, Card } from "@radix-ui/themes";
import Image from "next/image";
import Link from "next/link";
import { Company, Opening } from "../../../../generated/prisma";

export default function CompanyCard({
    company,
}: {
    company: Company & { jobs: Opening[] };
}) {
    return (
        <Link href={`/company/${company.id}`}>



            <Card className=" max-w-35 rounded-2xl shadow-emerald-600 hover:shadow-2xl/60  transition-all duration-300  p-5 flex flex-col justify-between min-h-full hover:ring-3 hover:ring-emerald-600 ">
             
                <div className="flex flex-col items-center  gap-4 mb-4">
                    <div className="relative w-14 h-14 rounded-full overflow-hidden ">
                        {company.logoUrl ? (
                            <Image
                                src={company.logoUrl}
                                alt={`${company.title} logo`}
                                fill
                                className="object-cover"
                            />
                        ) : (
                            <span className="flex items-center justify-center w-full h-full text-xs">
                                No Logo
                            </span>
                        )}
                    </div>
                    <h2 className="text-lg font-semibold turncate ">
                        {company.title}
                    </h2>
                </div>
               
             
                    <Badge className="turncate">
                        {company.jobs.length > 0
                            ? `${company.jobs.length} opening${company.jobs.length > 1 ? "s" : ""}`
                            : "No openings"}
                    </Badge>

                
            </Card>
        </Link>
    );
}
