"use client";
import { Button, Heading } from "@radix-ui/themes";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

export default function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<{ emails?: string; passwords?: string }>({});
  const [isDisabled, setIsDisabled] = useState(false);
  const [responseObj, setResponseObj] = useState("");
  const router = useRouter();

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsDisabled(true);

    const errObj: { emails?: string; passwords?: string } = {};

    if (email.trim().length === 0) {
      errObj.emails = "Please enter an email";
    }
    if (password.trim().length === 0) {
      errObj.passwords = "Please enter a password";
    }

    if (Object.keys(errObj).length > 0) {
      setError(errObj);
      setIsDisabled(false);
      return;
    } else {
      setError({});
    }

    const userData = { email, password };

    try {
      const res = await fetch("/api/signup", {
        method: "POST",
        body: JSON.stringify(userData),
      });

      const data = await res.json();
      if (data.success) {
        setResponseObj("✅ Sign Up Successful");
        router.push("/");
      } else {
        setResponseObj("❌ Sign Up Unsuccessful");
      }
    } catch (err: any) {
      setResponseObj("⚠️ Something went wrong. Try again later.");
    } finally {
      setIsDisabled(false);
    }
  }

  return (
    <main className="flex justify-center items-center h-screen w-screen bg-[url('/login-image.jpg')] bg-cover bg-center">
      {/* Card */}
      <div className="w-[90%] md:w-[40%] h-auto flex flex-col justify-center items-center text-black backdrop-blur-lg bg-white/70 rounded-2xl shadow-2xl p-8">
        
        <Heading className="mb-6">Create Account</Heading>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-4 w-full"
        >
          <input
            id="email"
            type="email"
            placeholder="Enter your email"
            onChange={(e) => setEmail(e.target.value)}
            className="p-4 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {error.emails && <p className="text-red-500 text-sm">{error.emails}</p>}

          <input
            id="password"
            type="password"
            placeholder="Enter your password"
            onChange={(e) => setPassword(e.target.value)}
            className="p-4 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {error.passwords && <p className="text-red-500 text-sm">{error.passwords}</p>}

          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 transition-all duration-300 p-3 w-full text-white rounded-lg shadow-lg disabled:opacity-50"
            disabled={isDisabled}
          >
            {isDisabled ? "Signing Up..." : "Sign Up"}
          </button>

          {/* Response */}
          {responseObj && (
            <p className="text-center text-red-600 font-medium">{responseObj}</p>
          )}
        </form>

        {/* Link */}
        <div className="mt-4 text-sm">
          Already have an account?{" "}
          <Link href="/login" className="text-blue-700 hover:underline">
            Login
          </Link>
        </div>
      </div>
    </main>
  );
}
