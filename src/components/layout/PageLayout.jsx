import { useLocation } from "react-router-dom";
import PropTypes from "prop-types";
import { cn } from "@/lib/utils";
import { TopNav } from "@/components/sidebar";
import {
  generateBreadcrumbs,
  getPageTitle,
} from "@/components/sidebar/breadcrumbUtils";

/**
 * Main content component with proper styling and structure
 */
export function Main({ children, className, fixed = true }) {
  return (
    <main
      className={cn(
        "w-full p-4 flex-1",
        fixed && "fixed-main flex flex-col flex-grow overflow-hidden",
        className
      )}
    >
      <div className="h-full w-full overflow-y-auto">{children}</div>
    </main>
  );
}

Main.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  fixed: PropTypes.bool,
};

/**
 * Page layout that includes TopNav and main content area
 * This will be used for each page in the protected routes
 */
export function PageLayout({ children, className }) {
  const location = useLocation();

  // Generate breadcrumbs and page title from the current path
  const breadcrumbs = generateBreadcrumbs(location.pathname);
  const pageTitle = getPageTitle(breadcrumbs);

  return (
    <>
      <TopNav title={pageTitle} breadcrumbs={breadcrumbs} fixed />
      <Main className={className}>{children}</Main>
    </>
  );
}

PageLayout.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};
