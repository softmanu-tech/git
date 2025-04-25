'use client'
import Link from "next/link";
import { useState } from "react";
import {signIn} from "next-auth/react";
import { useRouter } from "next/navigation";

export default function LoginPage () {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!email || !password) {
      setError("Please fill all the fields");
      return;
    }
    try {
      const res = await signIn("credentials", {
       email,
       password,
       redirect: false,
      });
      if (res?.error) {
        setError("Invalid Credentials");
        return;
      }
      router.replace("dashboard");
      
    }catch(error){
      console.log("Error Occurred", error);
    }
  }
    return(
        <div className="grid place-items-center justify-center h-screen ">
      <div className="shadow-lg p-5 rounded-lg border-t-5 border-blue-500">
      <h1 className="text-xl font-bold my-4">Enter the details</h1>

      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <input onChange={(e) => setEmail(e.target.value)} type="text" placeholder="Email"
        className="w-[400px] border border-gray-200 py-2 px-6 bg-zinc-100/40"
        
        />
        <input onChange={(e) => setPassword(e.target.value)} type="password" 
        placeholder="Password" 
        className="w-[400px] border border-gray-200 py-2 px-6 bg-zinc-100/40"
        
        />
        <button
        className="bg-blue-500 text-white hover:bg-blue-800 font-bold cursor-pointer px-6 py-2"
        >Login</button>
        {error && (
          <div className="bg-red-500 text-white w-fit text-sm py-1 px-3 rounded-md mt-2">
          {error}
        </div>
        )}

        <Link className="text-sm text-slate-500 mt-3 text-right" href={"/register"}>
          Don&apos;t have an account? <span className="underline hover:text-blue-500">Register</span>
        </Link>

      </form>

   

      </div>
    </div>
    )
}