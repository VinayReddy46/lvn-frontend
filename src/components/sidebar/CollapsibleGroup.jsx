import React, { useState } from "react";
import PropTypes from "prop-types";
import { useLocation } from "react-router-dom";
import { ChevronDown, ChevronUp } from "lucide-react";
import {
  SidebarGroupContent,
  SidebarGroupLabel,
} from "@/components/ui/sidebar";
import NavItem from "./NavItem";

/**
 * CollapsibleGroup component for nested sidebar navigation
 */
const CollapsibleGroup = ({ groupTitle, item, defaultExpanded = false }) => {
  const [expanded, setExpanded] = useState(defaultExpanded);
  const location = useLocation();

  // Check if any sub-item is active to highlight parent
  const isParentActive = item.items?.some(
    (subItem) =>
      location.pathname === subItem.url ||
      location.pathname.startsWith(`${subItem.url}/`)
  );

  return (
    <>
      <div
        className="flex items-center justify-between px-3 py-2 cursor-pointer rounded-md hover:bg-accent"
        onClick={() => setExpanded(!expanded)}
        aria-expanded={expanded}
      >
        <SidebarGroupLabel className="font-medium">
          {groupTitle || item.title}
        </SidebarGroupLabel>
        {expanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
      </div>

      {expanded && (
        <SidebarGroupContent>
          {item.items?.map((subItem, subIndex) => (
            <div
              key={subIndex}
              className="flex items-center gap-2 p-2 cursor-pointer hover:bg-accent rounded-md ml-2"
            >
              {subItem.url ? (
                <NavItem
                  to={subItem.url}
                  icon={subItem.icon}
                  label={subItem.title}
                  isActive={location.pathname === subItem.url}
                  isPrimary={subItem.isPrimary}
                  badge={subItem.badge}
                />
              ) : (
                <>
                  <div className="bg-accent rounded-full p-1">
                    {subItem.icon && <subItem.icon size={14} />}
                  </div>
                  <span className="text-sm">{subItem.title}</span>
                </>
              )}
            </div>
          ))}
        </SidebarGroupContent>
      )}
    </>
  );
};

CollapsibleGroup.propTypes = {
  groupTitle: PropTypes.string,
  item: PropTypes.shape({
    title: PropTypes.string.isRequired,
    icon: PropTypes.elementType,
    items: PropTypes.arrayOf(
      PropTypes.shape({
        title: PropTypes.string.isRequired,
        url: PropTypes.string,
        icon: PropTypes.elementType,
        isPrimary: PropTypes.bool,
        badge: PropTypes.string,
      })
    ),
  }).isRequired,
  defaultExpanded: PropTypes.bool,
};

export default CollapsibleGroup;
