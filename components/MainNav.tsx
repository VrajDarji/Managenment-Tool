"use client";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { useParams, usePathname } from "next/navigation";
const MainNav = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) => {
  const pathname = usePathname();
  const params = useParams();
  const routes = [
    {
      href: `/${params.projectId}`,
      label: "Overview",
      active: pathname === `/${params.projectId}`,
    },
    {
      href: `/${params.projectId}/employees`,
      label: "Employees",
      active: pathname === `/${params.projectId}/employees`,
    },
    {
      href: `/${params.projectId}/task`,
      label: "Tasks",
      active: pathname === `/${params.projectId}/task`,
    },
    {
      href: `/${params.projectId}/settings`,
      label: "Settings",
      active: pathname === `/${params.projectId}/settings`,
    },
  ];
  return (
    <nav className={cn("flex items-center space-x-4 lg:space-x-6", className)}>
      {routes.map((route) => (
        <Link
          href={route.href}
          key={route.href}
          className={cn(
            "text-sm font-medium transition-colors hover:text-primary",
            route.active
              ? "text-black dark:text-white"
              : "text-muted-foreground"
          )}
        >
          {route.label}
        </Link>
      ))}
    </nav>
  );
};
export default MainNav;
