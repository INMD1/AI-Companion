import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { userId } = auth();
    
    //사용자가 입력한 정보를 볼수 있다.
    const body = await request.json();

    //생성된 봇의 정보를 불려옴
    const data = await prisma?.companioned.findMany({
      where: {
        userId: userId,
      },
    });

    
    console.log(data);
    return new NextResponse("Yes i ma", { status: 200 });
  } catch (error) {
    console.log("adasdd" + error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
