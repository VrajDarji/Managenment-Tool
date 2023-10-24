import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
export async function POST(req: Request) {
  try {
    const { userId } = auth();
    const body = await req.json();
    const { name, projectId } = body;
    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    if (!name) {
      return new NextResponse("name requirees", { status: 400 });
    }
    const employee = await prismadb.employees.create({
      data: {
        name,
        projectId,
      },
    });
    return NextResponse.json(employee);
  } catch (err) {
    console.error(err);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
export async function GET(req: Request) {
  return NextResponse.json({ message: "Hii" });
}
