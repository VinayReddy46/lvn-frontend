import React from "react";
import PropTypes from "prop-types";
import { Link, useNavigate } from "react-router-dom";
import { LogOut, Plus, User, Settings, ChevronsUpDown } from "lucide-react";
import { useAuth } from "@/providers/AuthProvider";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
  useSidebar,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
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
  DropdownMenuShortcut,
} from "@/components/ui/dropdown-menu";
import SidebarNav from "./SidebarNav";
import { sidebarData, adminSidebarData } from "./sidebar-data";
import { cn } from "@/lib/utils";

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
  const { isMobile, open } = useSidebar();
  const isCollapsed = !open;
  const [activeTeam, setActiveTeam] = React.useState(
    teams[0] || { name: "Organization", plan: "Default" }
  );

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-primary/10 text-primary">
                {activeTeam.logo ? (
                  <activeTeam.logo className="size-4" />
                ) : (
                  <span className="font-semibold text-sm">
                    {activeTeam.name?.[0] || "O"}
                  </span>
                )}
              </div>
              {!isCollapsed && (
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">
                    {activeTeam.name}
                  </span>
                  {activeTeam.plan && (
                    <span className="truncate text-xs text-muted-foreground">
                      {activeTeam.plan}
                    </span>
                  )}
                </div>
              )}
              {!isCollapsed && <ChevronsUpDown className="ml-auto size-4" />}
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
            align="start"
            side={isMobile ? "bottom" : "right"}
            sideOffset={4}
          >
            <DropdownMenuLabel className="text-xs text-muted-foreground">
              Organizations
            </DropdownMenuLabel>
            {teams.map((team, index) => (
              <DropdownMenuItem
                key={team.name}
                onClick={() => setActiveTeam(team)}
                className="gap-2 p-2"
              >
                <div className="flex size-6 items-center justify-center rounded-sm border">
                  {team.logo ? (
                    <team.logo className="size-4 shrink-0" />
                  ) : (
                    <span className="text-xs font-medium">{team.name[0]}</span>
                  )}
                </div>
                <span>{team.name}</span>
                <DropdownMenuShortcut>⌘{index + 1}</DropdownMenuShortcut>
              </DropdownMenuItem>
            ))}
            <DropdownMenuSeparator />
            <DropdownMenuItem className="gap-2 p-2">
              <div className="flex size-6 items-center justify-center rounded-md border bg-background">
                <Plus className="size-4" />
              </div>
              <div className="font-medium text-muted-foreground">
                Add Organization
              </div>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
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
  const { isMobile, open } = useSidebar();
  const isCollapsed = !open;
  const navigate = useNavigate();
  const { logout, isOrgAdmin, isSystemAdmin } = useAuth();

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <Avatar className="h-8 w-8 rounded-lg">
                <AvatarImage
                  src={
                    user?.avatar ||
                    `https://ui-avatars.com/api/?name=${
                      user?.name || "User"
                    }&background=random`
                  }
                />
                <AvatarFallback className="rounded-lg">
                  {user?.name ? getInitials(user.name) : "U"}
                </AvatarFallback>
              </Avatar>
              {!isCollapsed && (
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">{user?.name}</span>
                  <span className="truncate text-xs text-muted-foreground">
                    {user?.email}
                  </span>
                </div>
              )}
              {!isCollapsed && <ChevronsUpDown className="ml-auto size-4" />}
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
            align="end"
            side={isMobile ? "bottom" : "right"}
            sideOffset={4}
          >
            <DropdownMenuLabel className="p-0 font-normal">
              <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                <Avatar className="h-8 w-8 rounded-lg">
                  <AvatarImage
                    src={
                      user?.avatar ||
                      `https://ui-avatars.com/api/?name=${
                        user?.name || "User"
                      }&background=random`
                    }
                  />
                  <AvatarFallback className="rounded-lg">
                    {user?.name ? getInitials(user.name) : "U"}
                  </AvatarFallback>
                </Avatar>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">{user?.name}</span>
                  <span className="truncate text-xs text-muted-foreground">
                    {user?.email}
                  </span>
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
      </SidebarMenuItem>
    </SidebarMenu>
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
  const { user, isOrgAdmin, isSystemAdmin } = useAuth();
  const { open } = useSidebar();
  const isCollapsed = !open;

  // If user is not logged in, don't render anything
  if (!user) return null;

  // Determine which sidebar data to use based on user role
  let currentData;
  if (props.data) {
    // If data is explicitly passed, use it (for specific layout components)
    currentData = props.data;
  } else if (isSystemAdmin) {
    // For system admins
    currentData = adminSidebarData;
  } else if (isOrgAdmin) {
    // For organization admins - fallback to regular sidebar data for now
    // This could be replaced with a specific org admin sidebar data
    currentData = sidebarData;
  } else {
    // For regular users
    currentData = sidebarData;
  }

  return (
    <Sidebar collapsible="icon" variant="floating" {...props}>
      <SidebarHeader className="border-b">
        <div className="flex items-center justify-between mb-4">
          <Link
            to="/"
            className={`text-primary font-bold ${
              isCollapsed ? "flex justify-center" : "text-2xl"
            }`}
          >
            {isCollapsed ? (
              <div className="flex items-center justify-center w-8 h-8 rounded-md bg-primary/10">
                <span className="text-primary font-bold">L</span>
              </div>
            ) : (
              "LVN"
            )}
          </Link>
        </div>

        <NavUser user={user} />

        {isOrgAdmin && (
          <Button
            variant="outline"
            className={cn(
              "w-full mt-4 gap-2 text-primary border-primary hover:bg-accent",
              isCollapsed && "p-0 h-8 w-8 flex justify-center items-center"
            )}
          >
            <Plus size={16} className="shrink-0" />
            {!isCollapsed && <span>Add Hours</span>}
          </Button>
        )}
      </SidebarHeader>

      <SidebarContent>
        <SidebarNav data={currentData} />
      </SidebarContent>

      <SidebarFooter className="border-t">
        <TeamSwitcher teams={currentData.teams || []} />
        <div className="text-xs text-muted-foreground mt-4 group-data-[collapsible=icon]:hidden">
          <p>Version 1.0.0</p>
          <p className="mt-1">© 2023 LVN. All rights reserved.</p>
        </div>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}

AppSidebar.propTypes = {
  data: PropTypes.object,
};
