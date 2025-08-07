"use client";
import { Button, Heading } from "@radix-ui/themes";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

export default function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState({});
  const [isDisabled, setIsDisabled] = useState(false);
  const [responseObj, setResponseObj] = useState("")
  const router = useRouter();

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsDisabled(true);

    const errObj = {};


    if ((email.trim().length == 0)) {
      errObj.emails = "Please enter Some Email";
    }
    if ((password.trim()).length == 0) {
      errObj.passwords = "Please enter Some password";
    }

    if (Object.keys(errObj).length > 0) {

      setError(errObj);
    }
    else {
      setError({})
    }


    setError(errObj);
    const userData = { email, password };

    let resObj;
    try {

      const res = await fetch("/api/signup", {
        method: "POST",
        body: JSON.stringify(userData),
      });

      const data = await res.json();
      console.log(data);

      if (data.success) {
        // alert("SignUp Successful");
        resObj = `SignUp Successful`
        router.push("/");
      }
      else {
        // alert("SignUp Unsuccessful");
        resObj = `SignUp Unsuccessful`
        setIsDisabled(false)
      }
    } catch (err) {
      console.log(err.message);
      // alert("Something Went Wrong Try Again Later ")
      resObj = `Something Went Wrong Try Again Later`

    } finally {
      setIsDisabled(false)

    }
    setResponseObj(resObj)
  }

  return (
    <main className="flex justify-between items-center h-screen w-screen bg-[url(/login-image.jpg)]">
      <div className="w-[50%] h-screen flex flex-col justify-around items-center text-black backdrop-blur-sm bg-white rounded">
        <Heading>SIGN UP</Heading>
        <form
          onSubmit={handleSubmit}
          className="*:m-5 *:rounded rounded shadow-xl flex flex-col gap-3 item-center w-[250px] md:w-[35vw] h-[70vh]"
        >
          <input
            id="email"
            type="email"
            placeholder="Enter your email"
            onChange={(e) => setEmail(e.target.value)}
            className="h-[20%] p-5"
          />
          {error.emails && <p className="text-red-500">{error.emails}</p>}

          <input
            id="password"
            type="password"
            placeholder="Enter your password"
            onChange={(e) => setPassword(e.target.value)}
            className="h-[20%] rounded p-5"
          />
          {error.passwords && <p className="text-red-500">{error.passwords}</p>}

          <button
            type="submit"
            className="self-center bg-blue-600 p-3 w-[50%] h-10 m-5 text-white text-center"
            disabled={isDisabled}
          >
            Sign Up
          </button>
          <div className="text-center text-red-600 font-mono">
            {responseObj.length > 0
              &&
              <Heading >⚠️ {responseObj}</Heading>
            }
          </div>
        </form>
        <div>
          Already have an account?
          <Link href="/login" className="text-blue-700"> Login</Link>
        </div>
      </div>
      <div></div>
    </main>
  );
}
