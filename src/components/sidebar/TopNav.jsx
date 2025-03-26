import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { Sun, Moon, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useTheme } from "@/providers/ThemeProvider";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

/**
 * Header links component for rendering navigation links in the TopNav
 */
const HeaderLinks = ({ links = [] }) => {
  return (
    <>
      {/* Mobile menu dropdown */}
      <div className="md:hidden">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button size="icon" variant="outline">
              <Menu />
              <span className="sr-only">Open menu</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" side="bottom">
            {links.map(({ label, path, isActive }) => (
              <DropdownMenuItem key={`${label}-${path}`} asChild>
                <Link
                  to={path}
                  className={!isActive ? "text-muted-foreground" : ""}
                >
                  {label}
                </Link>
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Desktop links */}
      <nav className="hidden md:flex items-center space-x-4 lg:space-x-6">
        {links.map(({ label, path, isActive }) => (
          <Link
            key={`${label}-${path}`}
            to={path}
            className={`text-sm font-medium transition-colors hover:text-primary ${
              isActive ? "" : "text-muted-foreground"
            }`}
          >
            {label}
          </Link>
        ))}
      </nav>
    </>
  );
};

HeaderLinks.propTypes = {
  links: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      path: PropTypes.string.isRequired,
      isActive: PropTypes.bool,
    })
  ),
};

/**
 * TopNav component for page header with breadcrumbs and theme toggle
 */
const TopNav = ({ title, breadcrumbs, fixed = false }) => {
  const { theme, setTheme } = useTheme();

  return (
    <header
      className={cn(
        "flex items-center justify-between w-full p-4 border-b bg-background",
        fixed && "sticky top-0 z-10"
      )}
    >
      <div className="flex items-center gap-3 sm:gap-4">
        <SidebarTrigger variant="outline" />
        <Separator orientation="vertical" className="h-6" />

        <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4">
          <h1 className="text-xl font-semibold">{title}</h1>

          {breadcrumbs && breadcrumbs.length > 1 && (
            <Breadcrumb className="hidden md:flex">
              <BreadcrumbList>
                {breadcrumbs.map((item, index) => (
                  <React.Fragment key={item.label}>
                    <BreadcrumbItem>
                      {index === breadcrumbs.length - 1 ? (
                        <BreadcrumbPage>{item.label}</BreadcrumbPage>
                      ) : (
                        <BreadcrumbLink asChild>
                          <Link to={item.path}>{item.label}</Link>
                        </BreadcrumbLink>
                      )}
                    </BreadcrumbItem>
                    {index < breadcrumbs.length - 1 && <BreadcrumbSeparator />}
                  </React.Fragment>
                ))}
              </BreadcrumbList>
            </Breadcrumb>
          )}
        </div>
      </div>

      <div className="flex items-center space-x-2">
        {/* Optionally render HeaderLinks if needed */}
        {/* <HeaderLinks links={navLinks} /> */}

        <Button
          variant="ghost"
          size="icon"
          onClick={() => setTheme(theme === "light" ? "dark" : "light")}
          aria-label={
            theme === "light" ? "Switch to dark theme" : "Switch to light theme"
          }
        >
          {theme === "light" ? (
            <Moon className="h-[1.2rem] w-[1.2rem]" />
          ) : (
            <Sun className="h-[1.2rem] w-[1.2rem]" />
          )}
          <span className="sr-only">Toggle theme</span>
        </Button>
      </div>
    </header>
  );
};

TopNav.propTypes = {
  title: PropTypes.string.isRequired,
  breadcrumbs: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      path: PropTypes.string.isRequired,
    })
  ),
  fixed: PropTypes.bool,
};

export default TopNav;
