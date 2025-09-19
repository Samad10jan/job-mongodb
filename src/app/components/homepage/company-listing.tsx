import { Company, Opening } from "../../../../generated/prisma";
import CompanyCard from "../cards/company-card";

export default function CompanyList({
  companys,
}: {
  companys: (Company & { jobs: Opening[] })[];
}) {
  return (
    <section className="my-8 mx-4 h-full">
      {/* Heading */}
      <h1 className="text-center font-bold text-3xl mb-8 ">
        Explore By Compnaies
      </h1>

      {/* Responsive Grid */}
      <div className="flex justify-center overflow-auto gap-5 mx-auto p-5 ">
        {companys.map((company) => (
          <CompanyCard key={company.id} company={company} />
        ))}
      </div>
    </section>
  );
}
