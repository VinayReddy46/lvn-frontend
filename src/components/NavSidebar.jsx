import React from "react";
import PropTypes from "prop-types";
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
  Users,
  Calendar,
  Hand,
  Mail,
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
import { Badge } from "@/components/ui/badge";

const NavItem = ({
  to,
  icon: Icon,
  label,
  isActive,
  isPrimary,
  badge,
  onClick,
}) => (
  <SidebarMenuItem>
    <SidebarMenuButton asChild isActive={isActive}>
      <Link
        to={to}
        className={cn(
          "relative",
          isPrimary && "bg-orange-50 text-orange-500",
          isPrimary && isActive && "bg-orange-100"
        )}
        onClick={onClick}
      >
        <Icon size={20} />
        <span>{label}</span>
        {badge && (
          <Badge
            variant="secondary"
            className="absolute right-2 bg-orange-100 text-orange-600 hover:bg-orange-200"
          >
            {badge}
          </Badge>
        )}
      </Link>
    </SidebarMenuButton>
  </SidebarMenuItem>
);

NavItem.propTypes = {
  to: PropTypes.string.isRequired,
  icon: PropTypes.elementType.isRequired,
  label: PropTypes.string.isRequired,
  isActive: PropTypes.bool,
  isPrimary: PropTypes.bool,
  badge: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onClick: PropTypes.func,
};

export function NavSidebar() {
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
    <Sidebar>
      <SidebarHeader className="p-4 border-b">
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
              className="flex items-center justify-between px-3 py-2 cursor-pointer rounded-md hover:bg-accent"
              onClick={() => toggleGroup("organizations")}
            >
              <SidebarGroupLabel className="font-medium">
                My Organizations
              </SidebarGroupLabel>
              {expandedGroups.organizations ? (
                <ChevronUp size={16} />
              ) : (
                <ChevronDown size={16} />
              )}
            </div>
            {expandedGroups.organizations && (
              <SidebarGroupContent>
                <div className="flex items-center gap-2 p-2 cursor-pointer hover:bg-accent rounded-md ml-2">
                  <div className="bg-accent rounded-full p-1">
                    <Building2 size={14} />
                  </div>
                  <span className="text-sm">Community Helpers</span>
                </div>
                <div className="flex items-center gap-2 p-2 cursor-pointer hover:bg-accent rounded-md ml-2">
                  <div className="bg-accent rounded-full p-1">
                    <Building2 size={14} />
                  </div>
                  <span className="text-sm">City Food Bank</span>
                </div>
                <div className="flex items-center gap-2 p-2 cursor-pointer hover:bg-accent rounded-md ml-2">
                  <div className="bg-primary/10 rounded-full p-1">
                    <Plus size={14} className="text-primary" />
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
                badge="3"
              />
              <NavItem
                to="/volunteer"
                icon={Hand}
                label="Volunteer"
                isActive={location.pathname === "/volunteer"}
                isPrimary={true}
              />
              <NavItem
                to="/my-registrations"
                icon={Calendar}
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

        {/* System Admin Only Section */}
        {isSystemAdmin && (
          <SidebarGroup>
            <SidebarGroupLabel className="px-3 font-medium text-orange-500">
              Admin Tools
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                <NavItem
                  to="/admin/system"
                  icon={Settings}
                  label="Admin Dashboard"
                  isActive={location.pathname === "/admin/system"}
                />
                <NavItem
                  to="/admin/system/users"
                  icon={Users}
                  label="Manage Users"
                  isActive={location.pathname === "/admin/system/users"}
                />
                <NavItem
                  to="/admin/system/organizations"
                  icon={Building2}
                  label="Organizations"
                  isActive={location.pathname === "/admin/system/organizations"}
                />
                <NavItem
                  to="/admin/system/opportunities"
                  icon={Briefcase}
                  label="Opportunities"
                  isActive={location.pathname === "/admin/system/opportunities"}
                />
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        )}

        {/* Org Admin Only Section */}
        {isOrgAdmin && !isSystemAdmin && (
          <SidebarGroup>
            <SidebarGroupLabel className="px-3 font-medium text-orange-500">
              Organization Admin
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                <NavItem
                  to="/admin"
                  icon={Settings}
                  label="Org Dashboard"
                  isActive={location.pathname === "/admin"}
                />
                <NavItem
                  to="/admin/org/volunteers"
                  icon={Users}
                  label="Volunteers"
                  isActive={location.pathname === "/admin/org/volunteers"}
                />
                <NavItem
                  to="/admin/org/opportunities"
                  icon={Briefcase}
                  label="Opportunities"
                  isActive={location.pathname === "/admin/org/opportunities"}
                />
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        )}
      </SidebarContent>

      <SidebarFooter className="py-4 px-6 border-t mt-auto">
        <div className="flex items-center justify-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8"
            onClick={() => navigate("/contact")}
          >
            <Mail size={18} />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8"
            onClick={() =>
              window.open("https://github.com/volunteer-network", "_blank")
            }
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
            </svg>
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8"
            onClick={() =>
              window.open("https://twitter.com/volunteer-network", "_blank")
            }
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
            </svg>
          </Button>
        </div>
        <div className="text-xs text-muted-foreground text-center mt-4">
          © {new Date().getFullYear()} VolunteerNetwork
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}

export function NavSidebarLayout({ children }) {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <NavSidebar />
        <main className="flex-1 overflow-auto">{children}</main>
      </div>
    </SidebarProvider>
  );
}

NavSidebarLayout.propTypes = {
  children: PropTypes.node.isRequired,
};
