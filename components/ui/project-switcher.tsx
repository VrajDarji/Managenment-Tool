"use client";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { useProjectModal } from "@/hooks/use-project-modal";
import { Project } from "@prisma/client";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "./button";
import {
  Check,
  ChevronsUpDownIcon,
  PlusCircle,
  Store as StoreIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "./command";
type PopoverTriggerProps = React.ComponentPropsWithoutRef<
  typeof PopoverTrigger
>;

interface ProjectSwitcherProps extends PopoverTriggerProps {
  items: Project[];
}

export default function ProjectSwitcher({
  className,
  items = [],
}: ProjectSwitcherProps) {
  const storeModal = useProjectModal();
  const params = useParams();
  const router = useRouter();

  const formattedItems = items.map((item) => ({
    label: item.name,
    value: item.id,
  }));
  const currentProject = formattedItems.find(
    (item) => item.value === params.projectId
  );

  const [open, setOpen] = useState(false);

  const onProjectSelect = (project: { value: string; label: string }) => {
    setOpen(false);
    router.push(`/${project.value}`);
  };
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          role="combobox"
          aria-expanded={open}
          aria-label="Select a store"
          className={cn("w-[200px] justify-between", className)}
        >
          <StoreIcon className="mr-2 h-4 w-4" />
          {currentProject?.label}
          <ChevronsUpDownIcon className="ml-auto h-4 w-4 shrink-0 opacity-50 " />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandList>
            <CommandInput placeholder="Search store... " />
            <CommandEmpty>No Project Found</CommandEmpty>
            <CommandGroup heading="Stores">
              {formattedItems.map((project) => (
                <CommandItem
                  key={project.value}
                  onSelect={() => onProjectSelect(project)}
                  className="text-sm"
                >
                  <StoreIcon className="mr-2 h-4 v-4" />
                  {project.label}
                  <Check
                    className={cn(
                      "ml-auto h-4 v-4",
                      currentProject?.value === project.value
                        ? "opacity-100"
                        : "opacity-0"
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
          <CommandSeparator />
          <CommandList>
            <CommandGroup>
              <CommandItem
                onSelect={() => {
                  setOpen(false);
                  storeModal.onOpen();
                }}
              >
                <PlusCircle className="mr-2 h-5 w-5" />
                Create Project
              </CommandItem>
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
