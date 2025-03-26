import React from "react";
import PropTypes from "prop-types";
import { useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { useAuth } from "@/providers/AuthProvider";
import { SidebarProvider } from "@/components/ui/sidebar";
import TopNav from "./TopNav";
import { AppSidebar } from "./AppSidebar";
import { sidebarData, adminSidebarData } from "./sidebar-data";
import { generateBreadcrumbs, getPageTitle } from "./breadcrumbUtils";

/**
 * Main component that provides a properly structured main content area
 */
const Main = ({ children, fixed = true }) => {
  return (
    <main
      className={cn(
        "px-4 py-6",
        fixed && "flex flex-col flex-grow overflow-hidden"
      )}
    >
      {children}
    </main>
  );
};

Main.propTypes = {
  children: PropTypes.node.isRequired,
  fixed: PropTypes.bool,
};

/**
 * AppSidebarLayout component that wraps the main content with AppSidebar
 */
export function AppSidebarLayout({ children }) {
  const location = useLocation();
  const { isSystemAdmin } = useAuth();

  // Generate breadcrumbs from current path
  const breadcrumbs = generateBreadcrumbs(location.pathname);
  const pageTitle = getPageTitle(breadcrumbs);

  // Determine which sidebar data to use based on admin status
  const currentSidebarData = isSystemAdmin ? adminSidebarData : sidebarData;

  return (
    <SidebarProvider>
      <div className="flex h-screen bg-background">
        <AppSidebar data={currentSidebarData} />
        <div className="flex-1 flex flex-col overflow-hidden">
          <TopNav title={pageTitle} breadcrumbs={breadcrumbs} />
          <Main fixed>
            <div className="h-full overflow-y-auto">{children}</div>
          </Main>
        </div>
      </div>
    </SidebarProvider>
  );
}

AppSidebarLayout.propTypes = {
  children: PropTypes.node.isRequired,
};
