"use client";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { FormEvent, useState } from "react";
import { Spinner } from "@radix-ui/themes";
import CallOutMessage from "@/app/components/reusables/call-out";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<{ emails?: string; passwords?: string }>({});
  const [isDisabled, setIsDisabled] = useState(false);
  const [responseObj, setResponseObj] = useState("");
  const router = useRouter();

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setIsDisabled(true);

    // client-side validation
    const errObj: { emails?: string; passwords?: string } = {};

    if (email.trim().length === 0) {
      errObj.emails = "Please enter some email";
    }
    if (password.trim().length === 0) {
      errObj.passwords = "Please enter some password";
    }

    if (Object.keys(errObj).length > 0) {
      setError(errObj);
      setIsDisabled(false);
      return;
    } else {
      setError({});
    }

    // send data to API
    let resObj;
    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      const user = data.user;

      if (data.success) {
        resObj = `${user.role} logged in successfully!`;
        router.push("/");
      } else {
        resObj = `Unable to log in. Please check your credentials.`;
      }
    } catch (err: any) {
      console.log(err.message);
      resObj = `Sorry, there was an error on our side. Please try again.`;
    } finally {
      setIsDisabled(false);
    }

    setResponseObj(resObj);
  }

  return (
    <main className="flex justify-center items-center h-screen w-screen bg-[url('/login-image.jpg')] bg-cover bg-center">
  
   
      <div className="w-[90%] md:w-[40%] h-auto flex flex-col justify-center items-center text-black backdrop-blur-lg bg-white/70 rounded-2xl shadow-2xl p-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Welcome Back</h1>
          <p className="text-gray-600">Please sign in to your account</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full">
          {/* Email field */}
          <div className="space-y-2">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email Address
            </label>
            <input
              id="email"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all duration-200 ${
                error.emails ? "border-red-500 bg-red-50" : "border-gray-300 bg-white"
              }`}
            />
            {error.emails && (
              <p className="text-red-500 text-sm flex items-center gap-1">
                <span>⚠️</span> {error.emails}
              </p>
            )}
          </div>

          {/* Password field */}
          <div className="space-y-2">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              id="password"
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all duration-200 ${
                error.passwords ? "border-red-500 bg-red-50" : "border-gray-300 bg-white"
              }`}
            />
            {error.passwords && (
              <p className="text-red-500 text-sm flex items-center gap-1">
                <span>⚠️</span> {error.passwords}
              </p>
            )}
          </div>

          {/* Submit button */}
          <button
            type="submit"
            disabled={isDisabled}
            className={`w-full py-3 px-4 rounded-lg font-semibold text-white transition-all duration-200 ${
              isDisabled
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700 active:bg-blue-800 hover:shadow-lg transform hover:-translate-y-0.5"
            }`}
          >
            {isDisabled ? (
              <span className="flex items-center justify-center gap-2">
                <Spinner size={"1"}/>
                Signing in...
              </span>
            ) : (
              "Sign In"
            )}
          </button>

          {/* Response message */}
          {responseObj && (
            <div className="mt-4">
              <CallOutMessage message={responseObj} />
            </div>
          )}
        </form>

        {/* Footer */}
        <div className="mt-8 text-center">
          <p className="text-gray-600">
            New user?{" "}
            <Link
              href="/signup"
              className="text-blue-600 hover:text-blue-700 font-semibold hover:underline transition-colors"
            >
              Create Account
            </Link>
          </p>
        </div>

        {/* Forgot password */}
        <div className="mt-4 text-center">
          <Link
            href="/forgot-password"
            className="text-sm text-gray-500 hover:text-gray-700 hover:underline transition-colors"
          >
            Forgot your password?
          </Link>
        </div>
      </div>
    </main>
  );
}
