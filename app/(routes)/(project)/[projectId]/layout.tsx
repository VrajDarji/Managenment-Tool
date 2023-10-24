import Navbar from "@/components/Navbar";
import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
export default async function DashBoard({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { projectId: string };
}) {
  const { userId } = auth();
  if (!userId) {
    redirect("/sign-in");
  }
  const project = await prismadb.project.findFirst({
    where: {
      id: params.projectId,
      userId,
    },
  });
  if (!project) {
    redirect("/");
  }
  return (
    <>
      <Navbar />
      {children}
    </>
  );
}
