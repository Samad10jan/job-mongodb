"use client";

import { UserContext } from "@/app/components/context/user-context";
import CallOutMessage from "@/app/components/reusables/call-out";
import NotFoundComponent from "@/app/components/reusables/notfound";
import { useRouter } from "next/navigation";
import { useContext, useState } from "react";



export default function AddJob() {
    const { user } = useContext(UserContext);
    const router = useRouter();
   

    if (!user?.id.length) {
        return (
            <NotFoundComponent message="Must Have Company to Post a Job" />
        );
    }
    

    const [formData, setFormData] = useState({
        title: "",
        description: "",
        location: "",
        salary: "",
        jobType: "",
        employmentType: "",
    });

    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");

    function handleChange(
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    ) {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    }

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setLoading(true);

        const payload = {
            title: formData.title,
            description: formData.description,
            location: formData.location,
            salary: Number.parseInt(formData.salary),
            job_type: formData.jobType,
            employment_type: formData.employmentType,
            company_id: user?.company?.id,
        };

        try {
            const res = await fetch("/api/job", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            });

            const result = await res.json();

            if (res.ok) {
                setMessage(result.message || "Job posted successfully!");
                router.push("/");
                router.refresh();
            } else {
                setMessage(result.message || "Failed to post job");
            }
        } catch (error) {
            console.error("Error submitting job:", error);
            setMessage("An error occurred while submitting the job.");
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-6 text-center">Post a Job</h2>

            <form onSubmit={handleSubmit} className="space-y-4">
               
                <div>
                    <label className="block mb-1 text-sm font-medium">Job Title</label>
                    <input
                        type="text"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        className="w-full border rounded p-2"
                        placeholder="Enter job title"
                        required
                    />
                </div>

              
                <div>
                    <label className="block mb-1 text-sm font-medium">Job Description</label>
                    <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        className="w-full border rounded p-2"
                        placeholder="Enter job description"
                        rows={4}
                        required
                    />
                </div>

               
                <div>
                    <label className="block mb-1 text-sm font-medium">Location</label>
                    <input
                        type="text"
                        name="location"
                        value={formData.location}
                        onChange={handleChange}
                        className="w-full border rounded p-2"
                        placeholder="City, State"
                        required
                    />
                </div>

               
                <div>
                    <label className="block mb-1 text-sm font-medium">Salary</label>
                    <input
                        type="number"
                        name="salary"
                        value={formData.salary}
                        onChange={handleChange}
                        className="w-full border rounded p-2"
                        placeholder="Enter salary"
                        required
                    />
                </div>

           
                <div>
                    <label className="block mb-1 text-sm font-medium">Job Type</label>
                    <select
                        name="jobType"
                        value={formData.jobType}
                        onChange={handleChange}
                        title="jobtype"
                        className="w-full border rounded p-2"
                        required
                    >
                        <option value="">Select Job Type</option>
                        <option value="onsite">Onsite</option>
                        <option value="remote">Remote</option>
                        <option value="hybrid">Hybrid</option>
                    </select>
                </div>

               
                <div>
                    <label className="block mb-1 text-sm font-medium">Employment Type</label>
                    <select
                        name="employmentType"
                        value={formData.employmentType}
                        onChange={handleChange}
                        title="employmenttype"
                        className="w-full border rounded p-2"
                        required
                    >
                        <option value="">Select Employment Type</option>
                        <option value="fulltime">Full-time</option>
                        <option value="parttime">Part-time</option>
                        <option value="contract">Contract</option>
                    </select>
                </div>

              
                <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition-colors"
                >
                    {loading ? "Submitting..." : "Post Job"}
                </button>
            </form>

            <CallOutMessage message={message} />
        </div>
    );
}
