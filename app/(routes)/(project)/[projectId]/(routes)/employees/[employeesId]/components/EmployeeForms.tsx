"use client";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { zodResolver } from "@hookform/resolvers/zod";
import { Employees, Project } from "@prisma/client";
import { Trash } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import toast from "react-hot-toast";
import axios from "axios";
import AlertModal from "@/components/modals/alert-modal";

const formSchema = z.object({
  name: z.string().min(1),
  projectId: z.string().min(1),
});
type EmployeeFormValues = z.infer<typeof formSchema>;
interface EmployeeFormProps {
  intialData: Employees | null;
  project: Project[];
}
const EmployeeForms: React.FC<EmployeeFormProps> = ({
  intialData,
  project,
}) => {
  const form = useForm<EmployeeFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: intialData || {
      name: "",
      projectId: "",
    },
  });
  const title = intialData ? "Edit Employee" : "Create Employee";
  const desc = intialData
    ? "Edit an existing Employee"
    : "Create a new Employee";
  const toastMsg = intialData ? "Employee Updated" : "Employee Created";
  const action = intialData ? "Save changes" : "Create";
  const params = useParams();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const onSubmit = async (data: EmployeeFormValues) => {
    try {
      setLoading(true);
      if (intialData) {
        await axios.patch(
          `/api/${params.projectId}/employees/${params.employeesId}`,
          data
        );
      } else {
        await axios.post(`/api/${params.projectId}/employees`, data);
      }
      router.refresh();
      router.push(`/${params.projectId}/employees`);
      toast.success(toastMsg);
    } catch (err) {
      console.log(err);
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };
  const onDelete = async () => {
    try {
      setLoading(true);
      await axios.delete(
        `/api/${params.projectId}/employees/${params.employeesId}`
      );
      router.refresh();
      router.push(`/${params.projectId}/employees`);
      toast.success("Employee Deleted");
    } catch (err) {
      console.log(err);
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
      setOpen(false);
    }
  };
  return (
    <>
      <AlertModal
        isOpen={open}
        onClose={() => setOpen(false)}
        loading={loading}
        onConfirm={() => {
          onDelete();
        }}
      />
      <div className="flex items-center justify-between w-full mb-2">
        <Heading title={title} desc={desc} />
        {intialData && (
          <Button
            variant={"destructive"}
            size={"sm"}
            onClick={() => {
              setOpen(true);
            }}
          >
            <Trash className="h-4 w-4" />
          </Button>
        )}
      </div>
      <Separator className="mb-3" />
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 w-full"
        >
          <div className="grid grid-cols-3 gap-8">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="Employee Name"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="projectId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Project</FormLabel>
                  <Select
                    disabled={loading}
                    onValueChange={field.onChange}
                    value={field.value}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue
                          defaultValue={field.value}
                          placeholder="Select a Project"
                        />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {project.map((e) => (
                        <SelectItem key={e.id} value={e.id}>
                          {e.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button disabled={loading} type="submit" className="ml-auto">
            {action}
          </Button>
        </form>
      </Form>
      <Separator className="my-4" />
    </>
  );
};
export default EmployeeForms;
