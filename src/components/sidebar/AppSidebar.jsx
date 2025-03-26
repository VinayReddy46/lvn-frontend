import React from "react";
import PropTypes from "prop-types";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { LogOut, Plus, User, Settings } from "lucide-react";
import { cn } from "@/lib/utils";
import { useAuth } from "@/providers/AuthProvider";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarProvider,
  SidebarTrigger,
  SidebarRail,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import SidebarNav from "./SidebarNav";
import TopNav from "./TopNav";
import { sidebarData, adminSidebarData } from "./sidebar-data";
import { generateBreadcrumbs, getPageTitle } from "./breadcrumbUtils";

/**
 * Helper function to get user initials from name
 * @param {string} name - User name
 * @returns {string} User initials
 */
const getInitials = (name) => {
  return name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .toUpperCase()
    .substring(0, 2);
};

/**
 * AppSidebar component for the application sidebar
 */
export function AppSidebar() {
  const { user, isAuthenticated, isOrgAdmin, isSystemAdmin, logout } =
    useAuth();
  const navigate = useNavigate();

  // If not authenticated, don't render sidebar
  if (!isAuthenticated) return null;

  // Determine which sidebar data to use based on admin status
  const currentSidebarData = isSystemAdmin ? adminSidebarData : sidebarData;

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader className="p-4 border-b">
        <div className="flex items-center justify-between">
          <Link to="/" className="text-primary font-bold text-2xl">
            LVN
          </Link>
          <SidebarTrigger />
        </div>

        <div className="mt-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="w-full justify-between pl-2 pr-3 py-2 h-auto hover:bg-accent"
              >
                <div className="flex items-center gap-3">
                  <Avatar className="h-10 w-10 border border-gray-200">
                    <AvatarImage
                      src={
                        user?.avatar ||
                        `https://ui-avatars.com/api/?name=${
                          user?.name || "User"
                        }&background=random`
                      }
                    />
                    <AvatarFallback>
                      {user?.name ? getInitials(user.name) : "U"}
                    </AvatarFallback>
                  </Avatar>
                  <div className="text-left">
                    <p className="font-medium text-sm">{user?.name}</p>
                    <p className="text-xs text-muted-foreground truncate max-w-[150px]">
                      {user?.email}
                    </p>
                  </div>
                </div>
                <Settings size={16} />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-[225px]">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() => navigate("/profile")}
                className="flex items-center gap-2"
              >
                <User size={16} />
                <span>Manage Account</span>
              </DropdownMenuItem>
              {isOrgAdmin && (
                <DropdownMenuItem
                  onClick={() => navigate("/admin")}
                  className="flex items-center gap-2"
                >
                  <Settings size={16} />
                  <span>Switch to Admin View</span>
                </DropdownMenuItem>
              )}
              {isSystemAdmin && (
                <DropdownMenuItem
                  onClick={() => navigate("/admin/system")}
                  className="flex items-center gap-2"
                >
                  <Settings size={16} />
                  <span>Switch to System Admin</span>
                </DropdownMenuItem>
              )}
              <DropdownMenuItem
                onClick={logout}
                className="flex items-center gap-2 text-destructive"
              >
                <LogOut size={16} />
                <span>Logout</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {isOrgAdmin && (
          <Button
            variant="outline"
            className="w-full mt-4 gap-2 text-primary border-primary hover:bg-accent"
          >
            <Plus size={16} />
            Add Hours
          </Button>
        )}
      </SidebarHeader>

      <SidebarContent className="px-2">
        <SidebarNav data={currentSidebarData} />
      </SidebarContent>

      <SidebarFooter className="p-4 border-t">
        <div className="space-y-2">
          <div className="text-xs text-muted-foreground">
            <p>Version 1.0.0</p>
            <p className="mt-1">© 2023 LVN. All rights reserved.</p>
          </div>
        </div>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}

/**
 * AppSidebarLayout component that wraps the main content with AppSidebar
 */
export function AppSidebarLayout({ children }) {
  const location = useLocation();

  // Generate breadcrumbs from current path
  const breadcrumbs = generateBreadcrumbs(location.pathname);
  const pageTitle = getPageTitle(breadcrumbs);

  return (
    <SidebarProvider>
      <div className="flex h-screen bg-background">
        <AppSidebar />
        <div className="flex-1 flex flex-col overflow-hidden">
          <TopNav title={pageTitle} breadcrumbs={breadcrumbs} />
          <main className="flex-1 overflow-y-auto p-6">{children}</main>
        </div>
      </div>
    </SidebarProvider>
  );
}

AppSidebarLayout.propTypes = {
  children: PropTypes.node.isRequired,
};
