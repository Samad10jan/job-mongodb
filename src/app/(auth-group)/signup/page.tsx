"use client";
import CallOutMessage from "@/app/components/reusables/call-out";
import { Heading, Spinner } from "@radix-ui/themes";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

export default function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [error, setError] = useState<{ emails?: string; passwords?: string, firstName?: string, lastName?: string }>({});
  const [isDisabled, setIsDisabled] = useState(false);
  const [responseObj, setResponseObj] = useState("");
  const router = useRouter();

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsDisabled(true);

    const errObj: { emails?: string; passwords?: string, firstName?: string, lastName?: string } = {};

    if (email.trim().length === 0  ) {
      errObj.emails = "Please enter an email";
    }
    if (password.trim().length === 0 || password.trim().length<8) {
      errObj.passwords = "Please enter a password with atleast 8 characters";
    }
    if (firstName.trim().length === 0 || firstName.trim().length<3) {
      errObj.firstName = "Please enter a first name with atleast 3 characters";
    }
    if (lastName.trim().length === 0 || lastName.trim().length<3) {
      errObj.lastName = "Please enter a last name with atleast 3 characters";
    }

    if (Object.keys(errObj).length > 0) {
      setError(errObj);
      setIsDisabled(false);
      return;
    } else {
      setError({});
    }

 
    const userData = { firstName, lastName, email, password, role };

    try {
      const res = await fetch("/api/signup", {
        method: "POST",
        body: JSON.stringify(userData),
      });

      const data = await res.json();
      if (data.success) {
        setResponseObj("Sign Up Successful");
        router.push("/");
      } else {
        setResponseObj("Sign Up Unsuccessful");
      }
    } catch (err: any) {
      setResponseObj("⚠️ Something went wrong. Try again later.");
    } finally {
      setIsDisabled(false);
    }
  }

  return (
   <main className="flex justify-center items-center bg-[url('/login-image.jpg')] bg-cover bg-center ">
  <div className="w-[90%] md:w-[40%] h-auto flex flex-col justify-center items-center text-black backdrop-blur-lg bg-white/70 rounded-2xl shadow-2xl p-6 my-5">
    {/* Header */}
    <div className="text-center mb-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-2">Create Account</h1>
      <p className="text-gray-600">Please fill in your details to sign up</p>
    </div>

    {/* Form */}
    <form onSubmit={handleSubmit} className="flex flex-col gap-3 w-full">

      {/* First Name */}
      <div className="space-y-2">
        <label htmlFor="firstname" className="block text-sm font-medium text-gray-700">
          First Name
        </label>
        <input
          id="firstname"
          type="text"
          placeholder="Enter your first name"
          onChange={(e) => setFirstName(e.target.value)}
          className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all duration-200 ${
            error?.firstName ? "border-red-500 bg-red-50" : "border-gray-300 bg-white"
          }`}
        />
        {error?.firstName && (
          <p className="text-red-500 text-sm flex items-center gap-1">
            <span></span> {error?.firstName}
          </p>
        )}
      </div>

      {/* Last Name */}
      <div className="space-y-2">
        <label htmlFor="lastname" className="block text-sm font-medium text-gray-700">
          Last Name
        </label>
        <input
          id="lastname"
          type="text"
          placeholder="Enter your last name"
          onChange={(e) => setLastName(e.target.value)}
          className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all duration-200 ${
            error?.lastName ? "border-red-500 bg-red-50" : "border-gray-300 bg-white"
          }`}
        />
        {error?.lastName && (
          <p className="text-red-500 text-sm flex items-center gap-1">
            <span></span> {error?.lastName}
          </p>
        )}
      </div>

      {/* Email */}
      <div className="space-y-2">
        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
          Email Address
        </label>
        <input
          id="email"
          type="email"
          placeholder="Enter your email"
          onChange={(e) => setEmail(e.target.value)}
          className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all duration-200 ${
            error?.emails ? "border-red-500 bg-red-50" : "border-gray-300 bg-white"
          }`}
        />
        {error?.emails && (
          <p className="text-red-500 text-sm flex items-center gap-1">
            <span></span> {error?.emails}
          </p>
        )}
      </div>

      {/* Password */}
      <div className="space-y-2" >
        <label htmlFor="password" className="block text-sm font-medium text-gray-700">
          Password
        </label>
        <input
          id="password"
          type="password"
          placeholder="Enter your password"
          onChange={(e) => setPassword(e.target.value)}
          className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all duration-200 ${
            error?.passwords ? "border-red-500 bg-red-50" : "border-gray-300 bg-white"
          }`}
        />
        {error?.passwords && (
          <p className="text-red-500 text-sm flex items-center gap-1">
            <span></span> {error?.passwords}
          </p>
        )}
      </div>

      {/* Role Selection */}
      <div className="space-y-2">
        <label htmlFor="role" className="block text-sm font-medium text-gray-700">
          Select Role
        </label>
        <select
          id="role"
          title="role"
          value={role}
          onChange={(e) => setRole(e.target.value)}
          className="w-full px-4 py-2 border rounded-lg bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all duration-200 border-gray-300"
        >
          <option value="user">User</option>
          <option value="recruiter">Recruiter</option>
        </select>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isDisabled}
        className={`w-full py-2 px-4 rounded-lg font-semibold text-white transition-all duration-200 ${
          isDisabled
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-blue-600 hover:bg-blue-700 active:bg-blue-800 hover:shadow-lg transform hover:-translate-y-0.5"
        }`}
      >
        {isDisabled ? (
          <span className="flex items-center justify-center gap-2">
            <Spinner size={"1"} />
            Signing Up...
          </span>
        ) : (
          "Sign Up"
        )}
      </button>
    </form>

    {/* Footer */}
    <div className="mt-4 text-center">
      <p className="text-gray-600">
        Already have an account?{" "}
        <Link
          href="/login"
          title="login"
          className="text-blue-600 hover:text-blue-700 font-semibold hover:underline transition-colors"
        >
          Login
        </Link>
      </p>
    </div>

    {/* Response message */}
    {responseObj && (
      <div className="mt-6 w-full">
        <CallOutMessage message={responseObj} />
      </div>
    )}
  </div>
</main>

  );
}
