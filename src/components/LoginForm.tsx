'use client'
import Link from "next/link";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!email || !password) {
      setError("Please fill all the fields");
      return;
    }
    
    setIsLoading(true);
    try {
      const res = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });
      if (res?.error) {
        setError("Invalid Credentials");
        setIsLoading(false);
        return;
      }
      router.replace("dashboard");
    } catch (error) {
      console.log("Error Occurred", error);
      setIsLoading(false);
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen px-4 py-6">
      <div className="shadow-lg p-5 rounded-lg border-t-4 border-blue-500 w-full max-w-md">
        <h1 className="text-xl font-bold my-4">Enter the details</h1>

        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <input 
            onChange={(e) => setEmail(e.target.value)} 
            type="text" 
            placeholder="Email"
            className="w-full border border-gray-200 py-2 px-6 bg-zinc-100/40 rounded"
            disabled={isLoading}
          />
          <input 
            onChange={(e) => setPassword(e.target.value)} 
            type="password" 
            placeholder="Password" 
            className="w-full border border-gray-200 py-2 px-6 bg-zinc-100/40 rounded"
            disabled={isLoading}
          />
          <button
            className="bg-blue-500 text-white hover:bg-blue-800 font-bold cursor-pointer px-6 py-2 rounded disabled:opacity-70 disabled:cursor-not-allowed flex justify-center"
            disabled={isLoading}
          >
            {isLoading ? (
              <div className="flex items-center">
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Logging in...
              </div>
            ) : "Login"}
          </button>
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