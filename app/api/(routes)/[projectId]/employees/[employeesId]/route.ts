import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import prismadb from "@/lib/prismadb";
export async function PATCH(
  req: Request,
  { params }: { params: { employeesId: string } }
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
    const Employee_Update = await prismadb.employees.updateMany({
      where: {
        id: params.employeesId,
      },
      data: {
        name,
        projectId,
      },
    });
    return NextResponse.json(Employee_Update);
  } catch (err) {
    console.log(err);
    return new NextResponse("error", { status: 500 });
  }
}
export async function DELETE(
  req: Request,
  { params }: { params: { employeesId: string } }
) {
  try {
    const { userId } = auth();
    if (!userId) {
      return new NextResponse("Unauthenticated", { status: 401 });
    }
    const Employee_Delete = await prismadb.employees.deleteMany({
      where: {
        id: params.employeesId,
      },
    });
    return NextResponse.json(Employee_Delete);
  } catch (err) {
    console.log(err);
    return new NextResponse("error", { status: 500 });
  }
}
