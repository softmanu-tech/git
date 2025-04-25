'use client'
import Link from "next/link";
import { useState } from "react";

import { useRouter } from "next/navigation";

export default function RegisterPage() { 

  const[name,setName]=useState("")
  const[email,setEmail]=useState("")
  const[password,setPassword]=useState("")
  const[error,setError]=useState("")

  const router = useRouter();

  const handleSubmit = async(e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!name || !email || !password) {
      setError("Please fill all the fields");
      return;
    }
    try {
      const resUserExists = await fetch("/api/userExists", {
        method: "POST",
        headers: {
          "Content-Type" : "application/json",
          
        },
        body: JSON.stringify({
          email
        }),
      });

      const {user} = await resUserExists.json();
      if(user){
        setError("User already exists");
        return;
      }



      const res =await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type" : "application/json",
          
        },
        body: JSON.stringify({
          name,
          email,
          password
        }),
        });

        if (res.ok) {
          const form = e.target as HTMLFormElement;
          form.reset()
          router.push("/login");
        } else {
          console.log("User Registration Failed");
        }

    }catch(error){
      console.log("Error Occurred", error);
    }
  }


  console.log("Name :",name)
    return(
        <div className="grid place-items-center justify-center h-screen ">
      <div className="shadow-lg p-5 rounded-lg border-t-5 border-blue-500">
      <h1 className="text-xl font-bold my-4">Register</h1>

      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
      <input onChange={(e) => setName(e.target.value)} type="text" placeholder="Full Name"
        className="w-[400px] border border-gray-200 py-2 px-6 bg-zinc-100/40"
        
        />
        <input onChange={(e) => setEmail(e.target.value)} type="text" placeholder="Email"
        className="w-[400px] border border-gray-200 py-2 px-6 bg-zinc-100/40"
        
        />
        <input onChange={(e) => setPassword(e.target.value)}type="password" 
        placeholder="Password" 
        className="w-[400px] border border-gray-200 py-2 px-6 bg-zinc-100/40"
        
        />
        <button
        className="bg-blue-500 text-white hover:bg-blue-800 font-bold cursor-pointer px-6 py-2"
        >Register</button>
      { error && (
        <div className="bg-red-500 text-white w-fit text-sm py-1 px-3 rounded-md mt-2">
        {error}
      </div>
      )
          
      }

        <Link className="text-sm text-slate-500 mt-3 text-right" href={"/login"}>
          Already have an account? <span className="underline hover:text-blue-500">Login</span>
        </Link>

      </form>

   

      </div>
    </div>
    )
}