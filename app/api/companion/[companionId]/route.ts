import { currentUser } from "@clerk/nextjs";
import { NextResponse } from "next/server";

import prismadb from "@/lib/prismadb";

export async function PATCH(req: Request, {params}: {params: {companionId: string}}) {
  try {
    const body = await req.json();
    const user = await currentUser();
    const { src, name, description, instructions, seed, categoryId } = body;

    if(!params.companionId){
        return new NextResponse("Companion ID is required", { status: 400 });
    }

    if(!user || !user.id || !user.firstName){
        return new NextResponse("Unauthorized", { status: 401 });
    }

    if(!src || !name|| !description || !instructions || !seed || !categoryId){
        return new NextResponse("Missing required fields", { status: 400 });
    }

    const companion = await prisma?.companioned.update({
        where: {
            id: params.companionId
        },
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