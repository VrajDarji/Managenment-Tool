import prismadb from "@/lib/prismadb";
import EmployeeForms from "./components/EmployeeForms";

const Page = async ({
  params,
}: {
  params: { employeesId: string; projectId: string };
}) => {
  const employee = await prismadb.employees.findUnique({
    where: {
      id: params.employeesId,
    },
  });
  const project = await prismadb.project.findMany({
    where: {
      id: params.projectId,
    },
  });
  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <EmployeeForms intialData={employee} project={project} />
      </div>
    </div>
  );
};
export default Page;
