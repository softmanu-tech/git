import { authOptions } from "@/lib/auth-options";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function Profile() {
    const session = await getServerSession(authOptions);

    if (!session) {
      redirect("/login");
    }
    return (
        <div>
      <h1 className="text-2xl font-semibold mb-4">Your Profile</h1>
      <p>Manage your user information here.</p>
    </div>
    )
}