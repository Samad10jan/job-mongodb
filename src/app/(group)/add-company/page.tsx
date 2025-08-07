"use client";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

export default function Page() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter()

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    const company = {
      title: title,
      description: description,
    };
    try {
      const res = await fetch("http://localhost:3000/api/company", {
        method: "POST",
        body: JSON.stringify(company),
      });
      console.log(res);

      const data = await res.json();
      console.log(data);

      if (data.success) {
        alert("ok done company");
        router.push("/")
        
      } else alert(data.message);
    } catch (err) {
      console.log(err.message);
      alert("Something Went wrong");
    } finally {
      setLoading(false);
      router.refresh()
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
    </div>
  );
}
