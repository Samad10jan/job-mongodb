"use client";
import { UserContext } from "@/app/components/context/user-context";
import CallOutMessage from "@/app/components/reusables/call-out";
import { useRouter } from "next/navigation";
import { FormEvent, useContext, useState } from "react";
import { Role } from "../../../../generated/prisma";
import NotFoundComponent from "@/app/components/reusables/notfound";
import { Card } from "@radix-ui/themes";

export default function Page() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const router = useRouter();
  const { user } = useContext(UserContext);

  if (user?.role !== Role.recruiter) {
    return <NotFoundComponent message="Recruiters Only Page" />;
  }

  if (user?.company) {
    return <NotFoundComponent message="One Recruiter One Company Rule" />;
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    // Simple validation
    if (!title.trim() || !description.trim()) {
      setMessage("Company name and description are required.");
      return;
    }

    setLoading(true);
    const company = { title, description };

    try {
      const res = await fetch("/api/company", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(company),
      });

      const data = await res.json();

      if (data.success) {
        setMessage("Company created successfully!");
        router.push("/");
      } else {
        setMessage(data.message || "Failed to create company");
      }
    } catch (err: any) {
      console.error(err.message);
      setMessage("Something went wrong");
    } finally {
      setLoading(false);
      router.refresh();
    }
  }

  return (
    <Card className="!max-w-2xl !mx-auto !p-6 !shadow-lg !rounded-2xl !mt-10 !transition-all">
      <h1 className="text-2xl font-bold mb-6 text-center">
        Add Your Company
      </h1>

      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        {/* Company Name */}
        <div className="flex flex-col">
          <label
            htmlFor="companyName"
            className="text-sm font-medium mb-1"
          >
            Company Name <span className="text-red-500">*</span>
          </label>
          <input
            id="companyName"
            type="text"
            placeholder="Enter Company Name"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="border px-3 py-2 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            required
          />
        </div>

        {/* Company Description */}
        <div className="flex flex-col">
          <label
            htmlFor="companyDesc"
            className="text-sm font-medium mb-1"
          >
            Company Description <span className="text-red-500">*</span>
          </label>
          <textarea
            id="companyDesc"
            placeholder="Enter Company Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={3}
            className="border px-3 py-2 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none resize-none"
            required
          />
        </div>

       
        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition disabled:opacity-50"
        >
          {loading ? "Submitting..." : "Add Your Company"}
        </button>
      </form>

     
      <div className="mt-4">
        <CallOutMessage message={message} />
      </div>
    </Card>
  );
}
