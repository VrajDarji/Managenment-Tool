"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { Project } from "@prisma/client";
import { useParams, useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useState } from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Heading } from "@/components/ui/heading";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Trash } from "lucide-react";
import { Button } from "@/components/ui/button";
import AlertModal from "@/components/modals/alert-modal";
import toast from "react-hot-toast";
import axios from "axios";

interface FormsProps {
  intialData: Project | null;
}
const formSchema = z.object({
  name: z.string().min(1),
});
type FormValues = z.infer<typeof formSchema>;
const Forms: React.FC<FormsProps> = ({ intialData }) => {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: intialData || { name: "" },
  });
  const params = useParams();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const onSubmit = async (data: FormValues) => {
    try {
      setLoading(true);
      await axios.patch(`/api/projects/${params.projectId}`, data);
      router.refresh();
      toast.success("Project Updated");
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
     await axios.delete(`/api/projects/${params.projectId}`);
     router.refresh();
     toast.success("Project Deleted");
     router.push(``)
   } catch (err) {
     console.log(err);
     toast.error("Something went wrong");
   } finally {
     setLoading(false);
   }
 };
  return (
    <div className="w-full">
      <AlertModal
        isOpen={open}
        onClose={() => {
          setOpen(false);
        }}
        loading={loading}
        onConfirm={() => {
          onDelete();
        }}
      />
      <div className="flex items-center justify-between w-full mb-2">
        <Heading title="Settings" desc="Manage Project preferences" />
        <Button
          variant={"destructive"}
          size={"sm"}
          onClick={() => {
            setOpen(true);
          }}
          disabled={loading}
        >
          <Trash className="h-4 w-4" />
        </Button>
      </div>
      <Separator />
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
                      placeholder="Store Name"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button disabled={loading} type="submit" className="ml-auto">
            Save changes
          </Button>
        </form>
      </Form>
      <Separator className="my-4" />
    </div>
  );
};
export default Forms;
