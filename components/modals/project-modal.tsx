import { useProjectModal } from "@/hooks/use-project-modal";
import { useState } from "react";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { Modal } from "../ui/modal";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import axios from "axios";
const formSchema = z.object({
  name: z.string().min(1),
});
const ProjectModal = () => {
  const ProjectModal = useProjectModal();
  const [loading, setLoading] = useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
    },
  });
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setLoading(true);
      const response = await axios.post("/api/projects", values);
      console.log(response.data);
      window.location.assign(`/${response.data.id}`);
      toast.success("Project Created");
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };
  return (
    <Modal
      title="Add Project"
      desc="Add a new project to manage"
      isOpen={ProjectModal.isOpen}
      onClose={ProjectModal.onClose}
    >
      <div className="space-y-4 py-4 pb-4">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="Project Name"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="pt-6 space-x-2 flex items-center justify-end w-full">
              <Button
                disabled={loading}
                variant={"outline"}
                onClick={ProjectModal.onClose}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={loading}>
                Continue
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </Modal>
  );
};
export default ProjectModal;
