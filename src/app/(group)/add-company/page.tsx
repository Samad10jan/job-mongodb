"use client";
import { UserContext } from "@/app/components/context/user-context";
import CallOutMessage from "@/app/components/reusables/call-out";
import { useRouter } from "next/navigation";
import { FormEvent, useContext, useState } from "react";
import { Role } from "../../../../generated/prisma";
import NotFoundComponent from "@/app/components/reusables/notfound";


export default function Page() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const router = useRouter();
  const { user } = useContext(UserContext);
  
  if (user?.role !== Role.recruiter) {
    // router.back()
    return (<NotFoundComponent message="Recruiters Only Page"/>)
  }

  if (user?.company) {
    // router.back()
    return (<NotFoundComponent message="One Recruiter One Company Rule"/>)
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    const company = {
      title: title,
      description: description,
    };
    try {
      const res = await fetch("/api/company", {
        method: "POST",
        body: JSON.stringify(company),
      });

      const data = await res.json();

      if (data.success) {
        setMessage("ok done company");
        router.push("/");
      } else {
        setMessage(data.message);
      }
    } catch (err: any) {
      console.log(err.message);
      setMessage("Something Went wrong");
    } finally {
      setLoading(false);
      router.refresh();
    }
  }

  return (
    <div className="max-w-md mx-auto p-4 bg-white shadow rounded text-black mt-8">
      <h1 className="text-xl font-semibold mb-4">Add Your Company</h1>

      <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
        <input
          placeholder="Enter Company Name"
          onChange={(e) => {
            setTitle(e.target.value);
          }}
          className="border p-2 rounded"
        />
        <input
          placeholder="Enter Company Description"
          onChange={(e) => {
            setDescription(e.target.value);
          }}
          className="border p-2 rounded"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 disabled:opacity-50"
          disabled={loading}
        >
          {loading ? "Submitting..." : "Add Your Company"}
        </button>
      </form>

      <CallOutMessage message={message} />
    </div>
  );
}
