import prismadb from "@/lib/prismadb";
import TaskForms from "./components/TaskForms";
const Page = async ({
  params,
}: {
  params: { taskId: string; projectId: string };
}) => {
  const task = await prismadb.tasks.findUnique({
    where: {
      id: params.taskId,
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
        <TaskForms intialData={task} project={project} />
      </div>
    </div>
  );
};
export default Page;
