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
          isPrimary && "bg-accent text-primary",
          isPrimary && isActive && "bg-accent/80"
        )}
        onClick={onClick}
      >
        <Icon size={20} />
        <span>{label}</span>
        {badge && (
          <Badge
            variant="secondary"
            className="absolute right-2 bg-accent text-primary hover:bg-accent/80"
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

export function AppSidebar() {
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
            className="w-full mt-4 gap-2 text-primary border-primary hover:bg-accent"
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
                to="/my-opportunities"
                icon={Briefcase}
                label="My Opportunities"
                isActive={location.pathname === "/my-opportunities"}
                isPrimary={true}
              />
              <NavItem
                to="/activity"
                icon={Activity}
                label="Activity"
                isActive={location.pathname === "/activity"}
              />
              <NavItem
                to="/organizations"
                icon={Building2}
                label="Organizations"
                isActive={location.pathname === "/organizations"}
              />
              <NavItem
                to="/opportunities"
                icon={Calendar}
                label="Opportunities"
                isActive={location.pathname === "/opportunities"}
              />
              {isSystemAdmin && (
                <>
                  <NavItem
                    to="/admin/system/opportunities"
                    icon={Calendar}
                    label="Manage Opportunities"
                    isActive={
                      location.pathname === "/admin/system/opportunities"
                    }
                  />
                  <NavItem
                    to="/admin/system/organizations"
                    icon={Building2}
                    label="Manage Organizations"
                    isActive={
                      location.pathname === "/admin/system/organizations"
                    }
                  />
                  <NavItem
                    to="/admin/system/users"
                    icon={Users}
                    label="Manage Users"
                    isActive={location.pathname === "/admin/system/users"}
                  />
                </>
              )}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <div className="py-2 px-3">
            <SidebarGroupLabel className="font-medium text-muted-foreground">
              Explore
            </SidebarGroupLabel>
          </div>
          <SidebarGroupContent>
            <SidebarMenu>
              <NavItem
                to="/causes"
                icon={Hand}
                label="Browse Causes"
                isActive={location.pathname === "/causes"}
              />
              <NavItem
                to="/nonprofits"
                icon={Building2}
                label="Discover Nonprofits"
                isActive={location.pathname === "/nonprofits"}
              />
              <NavItem
                to="/contact"
                icon={Mail}
                label="Contact Support"
                isActive={location.pathname === "/contact"}
              />
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="p-4 border-t">
        <div className="space-y-2">
          <div className="text-xs text-muted-foreground">
            <p>Version 1.0.0</p>
            <p className="mt-1">© 2023 LVN. All rights reserved.</p>
          </div>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}

export function AppSidebarLayout({ children }) {
  return (
    <SidebarProvider>
      <div className="grid lg:grid-cols-[280px_1fr] h-screen">
        <AppSidebar />
        <main className="overflow-auto">{children}</main>
      </div>
    </SidebarProvider>
  );
}

AppSidebarLayout.propTypes = {
  children: PropTypes.node.isRequired,
};
