import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import Forms from "./components/client";

interface SettingPageProps {
  params: {
    projectId: string;
  };
}
const SettingPage: React.FC<SettingPageProps> = async ({ params }) => {
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
  return (
    <div className="flex-col w-full gap-8">
      <div className="flex space-y-4 w-full p-8 pt-6">
        <Forms intialData={project} />
      </div>
    </div>
  );
};
export default SettingPage;
