import prismadb from "@/lib/prismadb";
import { Client } from "./components/client";
import { EmployeeColumn } from "./components/columns";
import { format } from "date-fns";
const page = async ({ params }: { params: { projectId: string } }) => {
  const employees = await prismadb.employees.findMany({
    where: {
      projectId: params.projectId,
    },
    include: {
      project: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
  const formatted: EmployeeColumn[] = employees.map((e) => ({
    id: e.id,
    name: e.name,
    projectName: e.project.name,
    createdAt: format(e.createdAt, "MMM do,yyyy"),
  }));
  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <Client data={formatted} />
      </div>
    </div>
  );
};
export default page;
