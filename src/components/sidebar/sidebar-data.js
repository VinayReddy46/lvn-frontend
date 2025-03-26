// @ts-nocheck
import {
  Home,
  Bell,
  Activity,
  Building2,
  PieChart,
  Calendar,
  Hand,
  Mail,
  Users,
  Settings,
  Briefcase,
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
    {
      name: "City Food Bank",
      logo: Building2,
      plan: "Charity",
    },
  ],
  navGroups: [
    {
      title: "Main Navigation",
      items: [
        {
          title: "Dashboard",
          url: "/dashboard",
          icon: Home,
        },
        {
          title: "Notifications",
          url: "/notifications",
          icon: Bell,
          badge: "3",
        },
        {
          title: "My Activities",
          url: "/activities",
          icon: Activity,
        },
        {
          title: "Opportunities",
          url: "/opportunities",
          icon: Hand,
          isPrimary: true,
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
              url: "/organizations/community-helpers",
            },
            {
              title: "City Food Bank",
              url: "/organizations/city-food-bank",
            },
            {
              title: "Add Organization",
              url: "/organizations/add",
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
          title: "Organizations",
          url: "/organizations",
          icon: Building2,
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
  navGroups: [
    {
      title: "Admin",
      items: [
        {
          title: "Dashboard",
          url: "/admin",
          icon: Home,
        },
        {
          title: "Manage Opportunities",
          url: "/admin/system/opportunities",
          icon: Calendar,
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
      ],
    },
  ],
};
