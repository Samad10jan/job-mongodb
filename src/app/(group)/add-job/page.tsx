"use client";

import { UserContext } from "@/app/components/context/user-context";
import CallOutMessage from "@/app/components/reusables/call-out";
import NotFoundComponent from "@/app/components/reusables/notfound";
import { useRouter } from "next/navigation";
import { useContext, useState } from "react";

export default function AddJob() {
    const { user } = useContext(UserContext);
    const router = useRouter();

    if (!user?.id?.length) {
        return <NotFoundComponent message="Must Have Company to Post a Job" />;
    }

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [location, setLocation] = useState("");
    const [salary, setSalary] = useState("");
    const [jobType, setJobType] = useState("");
    const [employmentType, setEmploymentType] = useState("");

    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");
    const [error, setError] = useState({
        titleE: "",
        descriptionE: "",
        salaryE: "",
        jobTypeE: "",
        employmentTypeE: "",
        locationE: "",
    });

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setLoading(true);
        setMessage("");

        const err = {
            titleE: "",
            descriptionE: "",
            salaryE: "",
            jobTypeE: "",
            employmentTypeE: "",
            locationE: "",
        };

        // ✅ Validation checks
        if (title.trim().length < 3)
            err.titleE = "Job title must be at least 3 characters long.";

        if (description.trim().length < 20)
            err.descriptionE = "Job description must be at least 20 characters long.";

        if (location.trim().length < 2)
            err.locationE = "Please enter a valid location.";

        const parsedSalary = Number.parseInt(salary);
        if (isNaN(parsedSalary) || parsedSalary < 20000)
            err.salaryE = "Salary must be a number and at least ₹20,000.";

        if (!jobType)
            err.jobTypeE = "Please select a job type (Onsite, Remote, or Hybrid).";

        if (!employmentType)
            err.employmentTypeE = "Please select an employment type (Full-time, Part-time, or Contract).";

        // ✅ Update error state
        setError(err);

        // ✅ Stop submission if there are any errors
        if (Object.values(err).some((val) => val !== "")) {
            setLoading(false);
            return;
        }

        const payload = {
            title,
            description,
            location,
            salary: parsedSalary,
            job_type: jobType,
            employment_type: employmentType,
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
                setError({
                    titleE: "",
                    descriptionE: "",
                    locationE: "",
                    salaryE: "",
                    jobTypeE: "",
                    employmentTypeE: "",
                });
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
        <div className="!h-full !py-10">
            <div className="max-w-3xl mx-10 md:mx-auto p-6 rounded-lg shadow-2xl shadow-emerald-600 ring-8 ring-emerald-600">
                <h2 className="text-2xl font-semibold mb-6 text-center">Post a Job</h2>

                <form onSubmit={handleSubmit} className="space-y-4">

                    {/* Job Title */}
                    <div>
                        <label className="block mb-1 text-sm font-medium">Job Title</label>
                        <input
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className={`w-full border rounded p-2 ${error.titleE ? "border-red-500" : ""}`}
                            placeholder="Enter job title"
                        />
                        {error.titleE && <p className="text-red-500 text-sm mt-1">{error.titleE}</p>}
                    </div>

                    {/* Description */}
                    <div>
                        <label className="block mb-1 text-sm font-medium">Job Description</label>
                        <textarea
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            className={`w-full border rounded p-2 ${error.descriptionE ? "border-red-500" : ""}`}
                            placeholder="Enter job description"
                            rows={4}
                        />
                        {error.descriptionE && <p className="text-red-500 text-sm mt-1">{error.descriptionE}</p>}
                    </div>

                    {/* Location */}
                    <div>
                        <label className="block mb-1 text-sm font-medium">Location</label>
                        <input
                            type="text"
                            value={location}
                            onChange={(e) => setLocation(e.target.value)}
                            className={`w-full border rounded p-2 ${error.locationE ? "border-red-500" : ""}`}
                            placeholder="City, State"
                        />
                        {error.locationE && <p className="text-red-500 text-sm mt-1">{error.locationE}</p>}
                    </div>

                    {/* Salary */}
                    <div>
                        <label className="block mb-1 text-sm font-medium">Salary</label>
                        <input
                            type="number"
                            value={salary}
                            onChange={(e) => setSalary(e.target.value)}
                            className={`w-full border rounded p-2 ${error.salaryE ? "border-red-500" : ""}`}
                            placeholder="Enter salary ($)"
                        />
                        {error.salaryE && <p className="text-red-500 text-sm mt-1">{error.salaryE}</p>}
                    </div>

                    {/* Job Type */}
                    <div>
                        <label className="block mb-1 text-sm font-medium">Job Type</label>
                        <select
                        title="emptype"
                            value={jobType}
                            onChange={(e) => setJobType(e.target.value)}
                            className={`w-full border rounded p-2 *:text-black ${error.jobTypeE ? "border-red-500" : ""}`}
                        >
                            <option value="">Select Job Type</option>
                            <option value="onsite">Onsite</option>
                            <option value="remote">Remote</option>
                            <option value="hybrid">Hybrid</option>
                        </select>
                        {error.jobTypeE && <p className="text-red-500 text-sm mt-1">{error.jobTypeE}</p>}
                    </div>

                    {/* Employment Type */}
                    <div>
                        <label className="block mb-1 text-sm font-medium">Employment Type</label>
                        <select
                        title="emptype"
                            value={employmentType}
                            onChange={(e) => setEmploymentType(e.target.value)}
                            className={`w-full border rounded p-2 *:text-black ${error.employmentTypeE ? "border-red-500" : ""}`}
                        >
                            <option value="">Select Employment Type</option>
                            <option value="fulltime">Full-time</option>
                            <option value="parttime">Part-time</option>
                            <option value="contract">Contract</option>
                        </select>
                        {error.employmentTypeE && <p className="text-red-500 text-sm mt-1">{error.employmentTypeE}</p>}
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-emerald-600 text-white py-2 rounded hover:bg-emerald-700 transition-colors"
                    >
                        {loading ? "Submitting..." : "Post Job"}
                    </button>
                </form>

                <CallOutMessage message={message} />
            </div>
        </div>
    );
}
