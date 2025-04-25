import { connectDB } from "@/lib/mongodb";
import { NextResponse } from "next/server";
import User from "../../../../models/User";
import bcrypt from "bcryptjs";

export async function POST(req: Request) {
    try {

        const {name, email, password} = await req.json();
        const hashedPassword = await bcrypt.hash(password, 10);

        await connectDB();
        await User.create({name, email, password: hashedPassword});

        return NextResponse.json({message: "Registered successfully"},
            {status: 201}
        );

    } catch (error) {
        console.log("Error Occurred", error);
        return NextResponse.json({message: "Error occurred"},

            {status: 500}
        );

    }
}