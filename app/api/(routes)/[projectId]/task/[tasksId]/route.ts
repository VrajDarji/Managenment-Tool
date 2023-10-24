import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import prismadb from "@/lib/prismadb";
export async function PATCH(
  req: Request,
  { params }: { params: { taskId: string } }
) {
  try {
    const { userId } = auth();
    const body = await req.json();
    const { name, projectId } = body;
    if (!userId) {
      return new NextResponse("Unauthenticated", { status: 401 });
    }
    if (!name) {
      return new NextResponse("no name", { status: 400 });
    }
    const Task_Update = await prismadb.tasks.updateMany({
      where: {
        id: params.taskId,
      },
      data: {
        name,
        projectId,
      },
    });
    return NextResponse.json(Task_Update);
  } catch (err) {
    console.log(err);
    return new NextResponse("error", { status: 500 });
  }
}
export async function DELETE(
  req: Request,
  { params }: { params: { taskId: string } }
) {
  try {
    const { userId } = auth();
    if (!userId) {
      return new NextResponse("Unauthenticated", { status: 401 });
    }
    const Task_Delete = await prismadb.tasks.deleteMany({
      where: {
        id: params.taskId,
      },
    });
    return NextResponse.json(Task_Delete);
  } catch (err) {
    console.log(err);
    return new NextResponse("error", { status: 500 });
  }
}
