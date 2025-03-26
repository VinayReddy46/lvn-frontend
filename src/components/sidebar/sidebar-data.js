// @ts-nocheck
import {
  LayoutDashboard,
  Bell,
  Activity,
  Building2,
  Calendar,
  Mail,
  User,
  FileText,
  Settings,
  Users,
  PieChart,
  Shield,
} from "lucide-react";

/**
 * @typedef {Object} Team
 * @property {string} name - Team name
 * @property {Function} logo - Team logo component
 * @property {string} plan - Team plan type
 */

/**
 * @typedef {Object} NavItem
 * @property {string} title - Item title
 * @property {string} url - Item URL
 * @property {Function} [icon] - Item icon component
 * @property {string} [badge] - Badge text/count
 * @property {boolean} [isPrimary] - Whether item is primary
 * @property {NavItem[]} [items] - Subitems
 */

/**
 * @typedef {Object} NavGroup
 * @property {string} title - Group title
 * @property {NavItem[]} items - Group items
 */

/**
 * @typedef {Object} SidebarData
 * @property {Team[]} [teams] - Teams list
 * @property {NavGroup[]} navGroups - Navigation groups
 */

/** @type {SidebarData} */
export const sidebarData = {
  teams: [
    {
      name: "Community Helpers",
      logo: Building2,
      plan: "Non-profit",
    },
  ],
  navGroups: [
    {
      title: "Main Navigation",
      items: [
        {
          title: "Dashboard",
          url: "/dashboard",
          icon: LayoutDashboard,
        },
        {
          title: "Notifications",
          url: "/notifications",
          icon: Bell,
          badge: "3",
        },
        {
          title: "My Activities",
          url: "/activity",
          icon: Activity,
        },
        {
          title: "Opportunities",
          url: "/my-opportunities",
          icon: FileText,
          isPrimary: true,
        },
        {
          title: "Profile",
          url: "/profile",
          icon: User,
        },
      ],
    },
    {
      title: "Organizations",
      items: [
        {
          title: "My Organizations",
          icon: Building2,
          items: [
            {
              title: "Community Helpers",
              url: "/nonprofits/community-helpers",
            },
            {
              title: "Add Organization",
              url: "/create-organization",
            },
          ],
        },
      ],
    },
    {
      title: "Other",
      items: [
        {
          title: "Calendar",
          url: "/calendar",
          icon: Calendar,
        },
        {
          title: "Messages",
          url: "/messages",
          icon: Mail,
        },
        {
          title: "People",
          url: "/people",
          icon: Users,
        },
        {
          title: "Reports",
          url: "/reports",
          icon: PieChart,
        },
        {
          title: "Settings",
          url: "/settings",
          icon: Settings,
        },
      ],
    },
  ],
};

// Admin sidebar data
export const adminSidebarData = {
  teams: [
    {
      name: "System Admin",
      logo: Shield,
      plan: "admin@example.com",
    },
  ],
  navGroups: [
    {
      title: "Admin",
      items: [
        {
          title: "Dashboard",
          url: "/admin/system",
          icon: LayoutDashboard,
        },
        {
          title: "Manage Opportunities",
          url: "/admin/system/opportunities",
          icon: FileText,
          isPrimary: true,
        },
        {
          title: "Manage Organizations",
          url: "/admin/system/organizations",
          icon: Building2,
        },
        {
          title: "Manage Users",
          url: "/admin/system/users",
          icon: Users,
        },
        {
          title: "System Settings",
          url: "/admin/system/settings",
          icon: Settings,
        },
      ],
    },
  ],
};
