import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth-options";

export default async function UserInfo() {
        const session = await getServerSession(authOptions);
    
        if (!session) {
            redirect("/login");
        }
    
    return (
        <div>
            <div>
      <h1 className="text-2xl font-semibold mb-4">Welcome back {session.user?.name} 👋</h1>
      <p>This is your dashboard overview.</p>
    </div>
        </div>
    )
}