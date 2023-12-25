import { currentUser } from "@clerk/nextjs";
import { NextResponse } from "next/server";

import prismadb from "@/lib/prismadb";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const user = await currentUser();
    const { src, name, description, instructions, seed, categoryId } = body;


    if(!user || !user.id || !user.firstName){
        return new NextResponse("Unauthorized", { status: 401 });
    }

    if(!src || !name|| !description || !instructions || !seed || !categoryId){
        return new NextResponse("Missing required fields", { status: 400 });
    }

    const companion = await prisma?.companioned.create({
        data : {
            categoryId,
            userId: user.id,
            uerName: user.firstName,
            src,
            name,
            description,
            instructions,
            seed
        }
    })
    return NextResponse.json(companion)
  } catch (error) {
    console.log("[COMPANION_POST]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
