import { authOptions } from "@/lib/auth-options";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function SettingsPage() {
    const session = await getServerSession(authOptions);

    if (!session) {
      redirect("/login");
    }
    return (
      <div>
        <h1 className="text-2xl font-semibold mb-4">Settings</h1>
        <p>Configure your preferences.</p>
      </div>
    );
  }
  