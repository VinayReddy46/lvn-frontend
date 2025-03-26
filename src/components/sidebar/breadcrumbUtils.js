/**
 * Generates breadcrumbs based on the current path
 * @param {string} pathname - Current path from location.pathname
 * @returns {Array<{label: string, path: string}>} Array of breadcrumb items
 */
export const generateBreadcrumbs = (pathname) => {
  const pathnames = pathname.split("/").filter((x) => x);

  // Build breadcrumb array
  const breadcrumbs = [];
  let currentPath = "";

  // Always add home
  breadcrumbs.push({ label: "Home", path: "/" });

  // Add segments
  pathnames.forEach((segment) => {
    currentPath += `/${segment}`;

    // Format the segment for display (capitalize, replace hyphens, etc.)
    const formattedLabel = segment
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");

    breadcrumbs.push({ label: formattedLabel, path: currentPath });
  });

  return breadcrumbs;
};

/**
 * Gets the current page title from the last breadcrumb
 * @param {Array<{label: string, path: string}>} breadcrumbs - Array of breadcrumb items
 * @returns {string} Page title
 */
export const getPageTitle = (breadcrumbs) => {
  return breadcrumbs[breadcrumbs.length - 1]?.label || "Dashboard";
};
