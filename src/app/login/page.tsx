"use client";
import { Button, Heading } from "@radix-ui/themes";
import { Label } from "@radix-ui/themes/components/context-menu";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState({});
  const [isDisabled, setIsDisabled] = useState(false);
  const router = useRouter();

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setIsDisabled(true);

    // client side checks
    const errObj = {};

    if ((email.trim()).length == 0) {
      errObj.emails = "Please enter Some Email";
    }
    if ((password.trim().length == 0)) {
      errObj.passwords = "Please enter Some password";
    }


    setError(errObj);
    console.log(errObj);

    if ((Object.keys(error)).length == 0) return
    // send data and check if in database or not
    try {

      const res = await fetch("http://localhost:3000/api/login", {
        method: "POST",
        body: JSON.stringify({ email, password }),
      });

      console.log(res);
      const data = await res.json();
      const user = data.user;
      console.log(user);
      if (res.status) {
        alert(`${user.role} Logged in`);
        router.push("/");
      } else {
        alert(`Not Logged in`);
        setIsDisabled(false)

      }
    } catch (err) {
      console.log(err.message);
      alert("Something Went Wrong")

    } finally {
      setIsDisabled(false)

    }
  }

  return (
    <main className="flex justify-between items-center h-screen w-screen  bg-[url(/login-image.jpg)]  ">
      <div className="w-[50%] h-screen flex flex-col justify-around items-center text-black backdrop-blur-sm bg-white">
        <Heading>LOGIN</Heading>
        <form
          onSubmit={handleSubmit}
          className="*:m-5 *:rounded  rounded shadow-xl flex flex-col gap-3 item-center w-[250px] md:w-[35vw] h-[70vh]  "
        >


          <input
            id="email"
            type="email"
            placeholder="Enter your email"
            onChange={(e) => setEmail(e.target.value)}
            className="h-[20%]  p-5"
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

          <Button
            type="submit"
            className="self-center bg-blue-600 p-3 w-[50%]"
            disabled={isDisabled}
          >
            Login
          </Button>
        </form>
        <div>New User? Create Account<Link href={"/signup"} className="text-blue-700"> SignUp</Link></div>
      </div>

      <div></div>
    </main>
  );
}
