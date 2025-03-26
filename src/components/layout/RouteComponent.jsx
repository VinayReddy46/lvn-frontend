import { Outlet } from "react-router-dom";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/sidebar";
import { cn } from "@/lib/utils";
import Cookies from "js-cookie";

/**
 * Main route component that provides the sidebar layout for all protected routes
 * This component renders the AppSidebar and content area with Outlet for nested routes
 */
export function RouteComponent() {
  const defaultOpen = Cookies.get("sidebar:state") !== "false";

  return (
    <SidebarProvider defaultOpen={defaultOpen}>
      <AppSidebar className="peer" />
      <div
        id="content"
        className={cn(
          "ml-auto w-full max-w-full",
          "peer-data-[state=collapsed]:w-[calc(100%-var(--sidebar-width-icon)-1rem)]",
          "peer-data-[state=expanded]:w-[calc(100%-var(--sidebar-width))]",
          "transition-[width] duration-200 ease-linear",
          "flex h-svh flex-col",
          "group-data-[scroll-locked=1]/body:h-full",
          "group-data-[scroll-locked=1]/body:has-[main.fixed-main]:h-svh"
        )}
      >
        <Outlet />
      </div>
    </SidebarProvider>
  );
}
