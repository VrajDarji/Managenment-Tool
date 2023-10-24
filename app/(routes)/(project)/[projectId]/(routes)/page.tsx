import prismadb from "@/lib/prismadb";

const page = async ({ params }: { params: { projectId: string } }) => {
  const project = await prismadb.project.findUnique({
    where: {
      id: params.projectId,
    },
  });
  return <div>{project?.name}</div>;
};
export default page;
