"use client";

import { Heading } from "@/components/ui/heading";
import { Button } from "@/components/ui/button";
import { TaskColumn, columns } from "./columns";
import { Plus } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { Separator } from "@/components/ui/separator";
import { DataTable } from "@/components/ui/data-table";

interface ClientProps {
  data: TaskColumn[];
}
export const Client: React.FC<ClientProps> = ({ data }) => {
  const router = useRouter();
  const params = useParams();
  return (
    <>
      <div className="flex items-center justify-between">
        <Heading
          title={`Tasks(${data.length})`}
          desc="Manage taskd for your projects"
        />
        <Button
          onClick={() => router.push(`/${params.projectId}/task/new`)}
        >
          <Plus className="mr-2 h-4 w-4" />
          Add New
        </Button>
      </div>
      <Separator className="" />
      <DataTable columns={columns} data={data} searchKey="name" />
    </>
  );
};
