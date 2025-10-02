import { Company, Opening } from "../../../../generated/prisma";
import CompanyCard from "../cards/company-card";

export default function CompanyList({
  companys,
}: {
  companys: (Company & { jobs: Opening[] })[];
}) {
  return (
    <section className="!my-5 !h-full">
      {/* Heading */}
      <h1 className="text-center font-bold text-3xl mb-7 ">
        Explore By Compnaies
      </h1>

      {/* Responsive Grid */}
      <div className="!flex !flex-wrap !justify-center  !gap-4 ">
        {companys.map((company) => (
          <CompanyCard key={company.id} company={company} />
        ))}
      </div>
    </section>
  );
}
