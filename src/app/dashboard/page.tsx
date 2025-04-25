import UserInfo from "@/components/UserInfo";
import { authOptions } from "@/lib/auth-options";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function Dashboard() {
    const session = await getServerSession(authOptions);

    if (!session) {
      redirect("/login");
    }
    return <UserInfo />;
}