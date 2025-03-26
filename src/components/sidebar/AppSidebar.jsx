import React from "react";
import PropTypes from "prop-types";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { LogOut, Plus, User, Settings, ChevronsUpDown } from "lucide-react";
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
  useSidebar,
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
  DropdownMenuGroup,
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
 * TeamSwitcher component for organization selection
 */
const TeamSwitcher = ({ teams = [] }) => {
  const { isMobile } = useSidebar();
  const [activeTeam, setActiveTeam] = React.useState(
    teams[0] || { name: "Organization", plan: "Default" }
  );

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="w-full justify-between h-auto pl-2 pr-3 py-2 hover:bg-accent"
        >
          <div className="flex items-center gap-3">
            <div className="bg-primary/10 rounded-full p-2 flex items-center justify-center">
              {activeTeam.logo ? (
                <activeTeam.logo size={18} className="text-primary" />
              ) : (
                <span className="text-primary font-semibold text-sm">
                  {activeTeam.name?.[0] || "O"}
                </span>
              )}
            </div>
            <div className="text-left overflow-hidden">
              <p className="font-medium text-sm truncate">{activeTeam.name}</p>
              {activeTeam.plan && (
                <p className="text-xs text-muted-foreground truncate">
                  {activeTeam.plan}
                </p>
              )}
            </div>
          </div>
          <ChevronsUpDown size={16} />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="w-[225px]"
        align={isMobile ? "center" : "start"}
        side={isMobile ? "bottom" : "right"}
      >
        <DropdownMenuLabel>Organizations</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {teams.map((team) => (
          <DropdownMenuItem
            key={team.name}
            onClick={() => setActiveTeam(team)}
            className="flex items-center gap-2 cursor-pointer"
          >
            <div className="bg-accent rounded-full p-1 flex items-center justify-center">
              {team.logo ? (
                <team.logo size={16} />
              ) : (
                <span className="text-foreground font-semibold text-xs">
                  {team.name[0]}
                </span>
              )}
            </div>
            <span>{team.name}</span>
          </DropdownMenuItem>
        ))}
        <DropdownMenuSeparator />
        <DropdownMenuItem className="flex items-center gap-2 cursor-pointer">
          <div className="bg-primary/10 rounded-full p-1">
            <Plus size={16} className="text-primary" />
          </div>
          <span>Add Organization</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

TeamSwitcher.propTypes = {
  teams: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      logo: PropTypes.elementType,
      plan: PropTypes.string,
    })
  ),
};

/**
 * NavUser component for user menu in the sidebar
 */
const NavUser = ({ user }) => {
  const { isMobile } = useSidebar();
  const navigate = useNavigate();
  const { logout, isOrgAdmin, isSystemAdmin } = useAuth();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="w-full justify-between h-auto pl-2 pr-3 py-2 hover:bg-accent"
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
            <div className="text-left overflow-hidden">
              <p className="font-medium text-sm truncate">{user?.name}</p>
              <p className="text-xs text-muted-foreground truncate max-w-[150px]">
                {user?.email}
              </p>
            </div>
          </div>
          <ChevronsUpDown size={16} />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="w-[225px]"
        align={isMobile ? "center" : "end"}
        side={isMobile ? "bottom" : "right"}
        sideOffset={4}
      >
        <DropdownMenuLabel className="p-0 font-normal">
          <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
            <Avatar className="h-8 w-8">
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
            <div className="grid flex-1 text-left text-sm leading-tight">
              <span className="truncate font-semibold">{user?.name}</span>
              <span className="truncate text-xs">{user?.email}</span>
            </div>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
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
        </DropdownMenuGroup>

        <DropdownMenuSeparator />

        <DropdownMenuItem
          onClick={logout}
          className="flex items-center gap-2 text-destructive"
        >
          <LogOut size={16} />
          <span>Logout</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

NavUser.propTypes = {
  user: PropTypes.shape({
    name: PropTypes.string,
    email: PropTypes.string,
    avatar: PropTypes.string,
  }),
};

/**
 * AppSidebar component for the application sidebar
 */
export function AppSidebar({ ...props }) {
  const { user, isAuthenticated, isOrgAdmin } = useAuth();

  // If not authenticated, don't render sidebar
  if (!isAuthenticated) return null;

  // Determine which sidebar data to use based on admin status
  const currentData = props.data || sidebarData;

  return (
    <Sidebar collapsible="icon" variant="floating" {...props}>
      <SidebarHeader className="p-4 border-b">
        <div className="flex items-center justify-between mb-4">
          <Link to="/" className="text-primary font-bold text-2xl">
            LVN
          </Link>
          <SidebarTrigger />
        </div>

        <NavUser user={user} />

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
        <SidebarNav data={currentData} />
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

AppSidebar.propTypes = {
  data: PropTypes.object,
};

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
  const { isAuthenticated, isSystemAdmin } = useAuth();

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
