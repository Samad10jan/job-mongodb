"use client"

import { useContext, useState } from "react"
import { UserContext } from "../layout";
import { useRouter } from "next/navigation";

export default function AddJob() {
    const [jobTitle, setJobTitle] = useState("");
    const [jobDescription, setDescription] = useState("");
    const [jobLocation, setJobLocation] = useState("");
    const [jobSalary, setJobSalary] = useState("");
    const [jobType, setJobType] = useState("");
    const [employementType, setEmployementType] = useState("");
    const [loading, setLoading] = useState(false);
    const { user } = useContext(UserContext);

    async function handleSubmit(e: React.FormEvent) {
        const router =useRouter()
        e.preventDefault();
        setLoading(true);

        const salaryNum = Number.parseInt(jobSalary);

        const data = {
            title: jobTitle,
            description: jobDescription,
            location: jobLocation,
            salary: salaryNum,
            job_type: jobType, // e.g., onsite, remote
            employment_type: employementType, // e.g., fulltime, parttime
           
            company_id: user?.company?.id,
        };

        try {
            const res = await fetch("/api/job", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data),
            });

            const result = await res.json();

            if (res.ok) {
                alert(result.message || "Job posted successfully");
               router.push("/")
                
            } else {
                alert(result.message || "Failed to post job");
            }
        } catch (error) {
            console.error("Error submitting job:", error);
            alert("An error occurred while submitting the job.");
        } finally {
            
            setLoading(false);
            router.refresh()
        }
    }

    return (
        <div className="max-w-md mx-auto p-4 bg-white shadow rounded text-black mt-8">
            <h2 className="text-xl font-semibold mb-4">Add a New Job</h2>
            <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
                <input
                    placeholder="Job Title"
                    type="text"
                    value={jobTitle}
                    onChange={(e) => setJobTitle(e.target.value)}
                    className="border p-2 rounded"
                    required
                />
                <textarea
                    placeholder="Job Description"
                    value={jobDescription}
                    onChange={(e) => setDescription(e.target.value)}
                    className="border p-2 rounded"
                    required
                />
                <input
                    placeholder="Job Location"
                    type="text"
                    value={jobLocation}
                    onChange={(e) => setJobLocation(e.target.value)}
                    className="border p-2 rounded"
                    required
                />
                <input
                    placeholder="Salary"
                    type="number"
                    value={jobSalary}
                    onChange={(e) => setJobSalary(e.target.value)}
                    className="border p-2 rounded"
                    required
                />
                <select
                    value={jobType}
                    onChange={(e) => setJobType(e.target.value)}
                    className="border p-2 rounded"
                    required
                >
                    <option value="">Select Job Type</option>
                    <option value="onsite">Onsite</option>
                    <option value="remote">Remote</option>
                    <option value="hybrid">Hybrid</option>
                </select>
                <select
                    value={employementType}
                    onChange={(e) => setEmployementType(e.target.value)}
                    className="border p-2 rounded"
                    required
                >
                    <option value="">Select Employment Type</option>
                    <option value="fulltime">Full-time</option>
                    <option value="parttime">Part-time</option>
                    <option value="contract">Contract</option>
                </select>

                <button
                    type="submit"
                    className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 "
                    disabled={loading}
                >
                    {loading ? "Submitting..." : "Post Job"}
                </button>
            </form>
        </div>
    );
}
