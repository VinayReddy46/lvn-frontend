import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar";
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
}) => (
  <SidebarMenuItem>
    <SidebarMenuButton asChild isActive={isActive} tooltip={label}>
      <Link
        to={to}
        className={cn(
          "relative",
          isPrimary && "bg-accent text-primary",
          isPrimary && isActive && "bg-accent/80"
        )}
        onClick={onClick}
      >
        {Icon && <Icon size={20} />}
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
  icon: PropTypes.elementType,
  label: PropTypes.string.isRequired,
  isActive: PropTypes.bool,
  isPrimary: PropTypes.bool,
  badge: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onClick: PropTypes.func,
};

export default NavItem;
