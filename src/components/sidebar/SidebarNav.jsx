// React is used implicitly by JSX
import PropTypes from "prop-types";
import { useLocation } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  useSidebar,
} from "@/components/ui/sidebar";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import NavItem from "./NavItem";

/**
 * Check if a nav item is active based on current location
 * @param {string} pathname - Current path
 * @param {Object} item - Navigation item
 * @param {boolean} mainNav - Whether this is a main navigation item
 * @returns {boolean} Whether the item is active
 */
const isNavItemActive = (pathname, item, mainNav = false) => {
  return (
    pathname === item.url ||
    pathname.split("?")[0] === item.url ||
    !!item?.items?.filter((i) => i.url === pathname).length ||
    (mainNav &&
      pathname.split("/")[1] !== "" &&
      pathname.split("/")[1] === item?.url?.split("/")[1])
  );
};

/**
 * Collapsible menu component
 */
const CollapsibleMenu = ({ item, isMainActive }) => {
  const location = useLocation();
  const { setOpenMobile } = useSidebar();

  return (
    <Collapsible
      asChild
      defaultOpen={isMainActive}
      className="group/collapsible w-full"
    >
      <li>
        <CollapsibleTrigger className="w-full">
          <div className="flex items-center justify-between px-3 py-2 cursor-pointer rounded-md hover:bg-accent w-full text-sm">
            <div className="flex items-center gap-2">
              {item.icon && <item.icon size={18} />}
              <span>{item.title}</span>
            </div>
            <ChevronRight className="h-4 w-4 transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
          </div>
        </CollapsibleTrigger>
        <CollapsibleContent>
          <ul className="mx-3.5 min-w-0 translate-x-px flex flex-col gap-1 border-l border-border px-2.5 py-0.5">
            {item.items?.map((subItem, idx) => (
              <li key={`${subItem.title}-${idx}`} className="flex items-center">
                <NavItem
                  to={subItem.url}
                  icon={subItem.icon}
                  label={subItem.title}
                  isActive={location.pathname === subItem.url}
                  isPrimary={subItem.isPrimary}
                  badge={subItem.badge}
                  onClick={() => setOpenMobile(false)}
                />
              </li>
            ))}
          </ul>
        </CollapsibleContent>
      </li>
    </Collapsible>
  );
};

/**
 * Dropdown menu for collapsed sidebar
 */
const CollapsedDropdownMenu = ({ item }) => {
  const location = useLocation();
  const { setOpenMobile } = useSidebar();

  const isActive = isNavItemActive(location.pathname, item, true);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className="flex items-center justify-between px-3 py-2 cursor-pointer rounded-md hover:bg-accent w-full text-sm">
          <div className="flex items-center gap-2">
            {item.icon && <item.icon size={18} />}
            <span>{item.title}</span>
          </div>
          <ChevronRight className="h-4 w-4" />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent side="right" align="start" sideOffset={4}>
        <DropdownMenuLabel>
          {item.title} {item.badge ? `(${item.badge})` : ""}
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        {item.items?.map((subItem, idx) => (
          <DropdownMenuItem
            key={`${subItem.title}-${idx}`}
            className={`flex items-center gap-2 ${
              location.pathname === subItem.url ? "bg-accent" : ""
            }`}
            onClick={() => setOpenMobile(false)}
          >
            {subItem.icon && <subItem.icon size={16} />}
            <span>{subItem.title}</span>
            {subItem.badge && (
              <span className="ml-auto text-xs">{subItem.badge}</span>
            )}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

/**
 * SidebarNav component that renders the navigation structure from the sidebar data
 */
const SidebarNav = ({ data }) => {
  const location = useLocation();
  const { open, setOpenMobile } = useSidebar();
  const isCollapsed = !open;

  return (
    <>
      {data.navGroups.map((group, index) => (
        <SidebarGroup key={`group-${index}`}>
          {group.title && !isCollapsed && (
            <SidebarGroupLabel>{group.title}</SidebarGroupLabel>
          )}
          <SidebarMenu>
            {group.items.map((item, itemIndex) => {
              // Check if this item is active (including its subitems)
              const isMainActive = isNavItemActive(
                location.pathname,
                item,
                true
              );

              // If item has sub-items
              if (item.items && item.items.length > 0) {
                // If sidebar is collapsed, show dropdown
                if (isCollapsed) {
                  return (
                    <NavItem
                      key={`item-${itemIndex}`}
                      to={item.url || item.items[0].url}
                      icon={item.icon}
                      label={item.title}
                      isActive={isMainActive}
                      isPrimary={item.isPrimary}
                      badge={item.badge}
                      onClick={() => setOpenMobile(false)}
                    />
                  );
                }

                // Otherwise show collapsible menu
                return (
                  <CollapsibleMenu
                    key={`item-${itemIndex}`}
                    item={item}
                    isMainActive={isMainActive}
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
                  onClick={() => setOpenMobile(false)}
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
