import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  Home,
  Bell,
  Briefcase,
  Activity,
  Building2,
  PieChart,
  User,
  LogOut,
  ChevronDown,
  ChevronUp,
  Plus,
  Settings,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useAuth } from "@/providers/AuthProvider";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
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

const NavItem = ({ to, icon: Icon, label, isActive, isPrimary }) => (
  <SidebarMenuItem>
    <SidebarMenuButton asChild isActive={isActive}>
      <Link
        to={to}
        className={cn(
          isPrimary && "bg-orange-50 text-orange-500",
          isPrimary && isActive && "bg-orange-100"
        )}
      >
        <Icon size={20} />
        <span>{label}</span>
      </Link>
    </SidebarMenuButton>
  </SidebarMenuItem>
);

export function AppSidebarContent() {
  const { user, isAuthenticated, isOrgAdmin, isSystemAdmin, logout } =
    useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [expandedGroups, setExpandedGroups] = React.useState({
    organizations: true,
    networks: false,
  });

  const toggleGroup = (group) => {
    setExpandedGroups((prev) => ({
      ...prev,
      [group]: !prev[group],
    }));
  };

  // Gets initials from user name
  const getInitials = (name) => {
    return name
      .split(" ")
      .map((part) => part[0])
      .join("")
      .toUpperCase()
      .substring(0, 2);
  };

  if (!isAuthenticated) return null;

  return (
    <Sidebar collapsible="icon" >
      <SidebarHeader  className="p-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="text-orange-500 font-bold text-2xl">
            POINT
          </Link>
          <SidebarTrigger />
        </div>

        <div className="mt-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="w-full justify-between pl-2 pr-3 py-2 h-auto"
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
                <ChevronDown size={16} />
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
            className="w-full mt-4 gap-2 text-orange-500 border-orange-500 hover:bg-orange-50"
          >
            <Plus size={16} />
            Add Hours
          </Button>
        )}
      </SidebarHeader>

      <SidebarContent className="px-2">
        {isOrgAdmin && (
          <SidebarGroup>
            <div
              className="flex items-center justify-between px-2 py-1 cursor-pointer"
              onClick={() => toggleGroup("organizations")}
            >
              <SidebarGroupLabel>My Organizations</SidebarGroupLabel>
              {expandedGroups.organizations ? (
                <ChevronUp size={16} />
              ) : (
                <ChevronDown size={16} />
              )}
            </div>
            {expandedGroups.organizations && (
              <SidebarGroupContent>
                <div className="flex items-center gap-2 p-2 cursor-pointer hover:bg-slate-100 rounded-md">
                  <div className="bg-slate-200 rounded-full p-1">
                    <Plus size={16} />
                  </div>
                  <span className="text-sm">Add Organization</span>
                </div>
              </SidebarGroupContent>
            )}
          </SidebarGroup>
        )}

        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              <NavItem
                to="/dashboard"
                icon={Home}
                label="Home"
                isActive={location.pathname === "/dashboard"}
              />
              <NavItem
                to="/notifications"
                icon={Bell}
                label="Notifications"
                isActive={location.pathname === "/notifications"}
              />
              <NavItem
                to="/volunteer"
                icon={Briefcase}
                label="Volunteer"
                isActive={location.pathname === "/volunteer"}
                isPrimary={true}
              />
              <NavItem
                to="/my-registrations"
                icon={Activity}
                label="My Registrations"
                isActive={location.pathname === "/my-registrations"}
              />
              <NavItem
                to="/activity"
                icon={Activity}
                label="Activity"
                isActive={location.pathname === "/activity"}
              />
              <NavItem
                to="/nonprofits"
                icon={Building2}
                label="Nonprofits"
                isActive={location.pathname === "/nonprofits"}
              />
              <NavItem
                to="/causes"
                icon={PieChart}
                label="Causes"
                isActive={location.pathname === "/causes"}
              />
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="py-4 px-6">
        <div className="text-xs text-muted-foreground text-center">
          © {new Date().getFullYear()} VolunteerNetwork
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}

export function AppSidebarLayout({ children }) {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <AppSidebarContent />
        <main className="flex-1 overflow-auto">{children}</main>
      </div>
    </SidebarProvider>
  );
}
