import React from "react";
import PropTypes from "prop-types";
import { useLocation } from "react-router-dom";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
} from "@/components/ui/sidebar";
import NavItem from "./NavItem";
import CollapsibleGroup from "./CollapsibleGroup";

/**
 * SidebarNav component that renders the navigation structure from the sidebar data
 */
const SidebarNav = ({ data }) => {
  const location = useLocation();

  return (
    <>
      {data.navGroups.map((group, index) => (
        <SidebarGroup key={`group-${index}`}>
          {group.title && <SidebarGroupLabel>{group.title}</SidebarGroupLabel>}
          <SidebarMenu>
            {group.items.map((item, itemIndex) => {
              // If item has sub-items, render as a collapsible group
              if (item.items && item.items.length > 0) {
                return (
                  <CollapsibleGroup
                    key={`item-${itemIndex}`}
                    groupTitle={item.title}
                    item={item}
                    defaultExpanded={item.items.some(
                      (subItem) => location.pathname === subItem.url
                    )}
                  />
                );
              }

              // Otherwise render as a simple nav item
              return (
                <NavItem
                  key={`item-${itemIndex}`}
                  to={item.url}
                  icon={item.icon}
                  label={item.title}
                  isActive={location.pathname === item.url}
                  isPrimary={item.isPrimary}
                  badge={item.badge}
                />
              );
            })}
          </SidebarMenu>
        </SidebarGroup>
      ))}
    </>
  );
};

SidebarNav.propTypes = {
  data: PropTypes.shape({
    teams: PropTypes.array,
    navGroups: PropTypes.arrayOf(
      PropTypes.shape({
        title: PropTypes.string,
        items: PropTypes.array.isRequired,
      })
    ).isRequired,
  }).isRequired,
};

export default SidebarNav;
