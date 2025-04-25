import { connectDB } from "@/lib/mongodb";
import User from "../../../../models/User";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        const {email} = await req.json();

        await connectDB();
        const user = await User.findOne({email}).select("_id");

        
        console.log("User :",user)
        return NextResponse.json({ user });

                
        
    } catch (error) {
        console.log( error);
    }
}