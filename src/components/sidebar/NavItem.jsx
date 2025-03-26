// React is used implicitly by JSX
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import {
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { Badge } from "@/components/ui/badge";

/**
 * NavItem component used for sidebar navigation
 */
export const NavItem = ({
  to,
  icon: Icon,
  label,
  isActive,
  isPrimary,
  badge,
  onClick,
}) => {
  const { setOpenMobile, open } = useSidebar();
  const isCollapsed = !open;

  const handleClick = (e) => {
    // Close sidebar on mobile when item is clicked
    setOpenMobile?.(false);

    // Call the onClick prop if provided
    if (onClick) onClick(e);
  };

  return (
    <SidebarMenuItem>
      <SidebarMenuButton asChild isActive={isActive} tooltip={label}>
        <Link
          to={to}
          className={cn(
            "relative flex items-center gap-2 w-full px-3 py-2 text-sm rounded-md",
            isActive && "bg-accent text-accent-foreground font-medium",
            isPrimary && "text-primary",
            isPrimary && isActive && "bg-primary/10",
            isCollapsed && "justify-center px-1"
          )}
          onClick={handleClick}
        >
          {Icon && (
            <Icon
              size={18}
              className={cn("shrink-0", isCollapsed && "mx-auto")}
            />
          )}
          <span className={cn("truncate", isCollapsed && "hidden")}>
            {label}
          </span>
          {badge && !isCollapsed && (
            <Badge
              variant="secondary"
              className={cn(
                "ml-auto text-xs rounded-full px-1.5 py-0.5",
                isPrimary && "bg-primary/20 text-primary"
              )}
            >
              {badge}
            </Badge>
          )}
        </Link>
      </SidebarMenuButton>
    </SidebarMenuItem>
  );
};

NavItem.propTypes = {
  to: PropTypes.string.isRequired,
  icon: PropTypes.elementType,
  label: PropTypes.string.isRequired,
  isActive: PropTypes.bool,
  isPrimary: PropTypes.bool,
  badge: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onClick: PropTypes.func,
};

export default NavItem;
