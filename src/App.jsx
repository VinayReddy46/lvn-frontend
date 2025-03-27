import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/providers/ThemeProvider";
import { AuthProvider } from "@/providers/AuthProvider";
import {
  UserProtectedRoute,
  OrgAdminProtectedRoute,
  SystemAdminProtectedRoute,
} from "@/components/layout/ProtectedRoutes";
import { RouteComponent } from "@/components/layout/RouteComponent";
import { PageLayout } from "@/components/layout/PageLayout";

// Public Routes
import Index from "./pages/Index";
import Opportunities from "./pages/Opportunities";
import Organizations from "./pages/Organizations";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import UserRoleSelection from "./pages/UserRoleSelection";
import NotFound from "./pages/NotFound";

// Protected Routes
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import MyOpportunities from "./pages/MyOpportunities";
import CreateOrganization from "./pages/CreateOrganization";

// Organization Admin Routes
import OrganizationAdminDashboard from "./pages/admin/OrganizationAdminDashboard";

// System Admin Routes
import SystemAdminDashboard from "./pages/admin/SystemAdminDashboard";
import ManageOpportunities from "./pages/admin/ManageOpportunities";
import ManageOrganizations from "./pages/admin/ManageOrganizations";
import ManageUsers from "./pages/admin/ManageUsers";

// Import the ComingSoon component
import ComingSoon from "./pages/ComingSoon";

// Wrap each page component with the PageLayout
const withPageLayout = (Component) => {
  const WrappedComponent = (props) => (
    <PageLayout>
      <Component {...props} />
    </PageLayout>
  );
  WrappedComponent.displayName = `withPageLayout(${
    Component.displayName || Component.name || "Component"
  })`;
  return WrappedComponent;
};

// Create wrapped components with PageLayout
const WrappedDashboard = withPageLayout(Dashboard);
const WrappedProfile = withPageLayout(Profile);
const WrappedMyOpportunities = withPageLayout(MyOpportunities);
const WrappedCreateOrganization = withPageLayout(CreateOrganization);
const WrappedOrgAdminDashboard = withPageLayout(OrganizationAdminDashboard);
const WrappedSystemAdminDashboard = withPageLayout(SystemAdminDashboard);
const WrappedManageOpportunities = withPageLayout(ManageOpportunities);
const WrappedManageOrganizations = withPageLayout(ManageOrganizations);
const WrappedManageUsers = withPageLayout(ManageUsers);
const WrappedComingSoon = withPageLayout(ComingSoon);

const App = () => (
  <BrowserRouter>
    <ThemeProvider defaultTheme="light">
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <AuthProvider>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Index />} />
            <Route path="/opportunities" element={<Opportunities />} />
            <Route path="/organizations" element={<Organizations />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route
              path="/user-role-selection"
              element={<UserRoleSelection />}
            />

            {/* All Protected Routes with Sidebar */}
            <Route element={<RouteComponent />}>
              {/* User Protected Routes */}
              <Route element={<UserProtectedRoute />}>
                <Route path="/dashboard" element={<WrappedDashboard />} />
                <Route path="/profile" element={<WrappedProfile />} />
                <Route
                  path="/my-opportunities"
                  element={<WrappedMyOpportunities />}
                />
                <Route
                  path="/create-organization"
                  element={<WrappedCreateOrganization />}
                />

                {/* Simple placeholder routes */}
                <Route path="/activity" element={<WrappedComingSoon />} />
                <Route path="/notifications" element={<WrappedComingSoon />} />
                <Route path="/nonprofits" element={<WrappedComingSoon />} />
                <Route path="/causes" element={<WrappedComingSoon />} />
                <Route path="/calendar" element={<WrappedComingSoon />} />
                <Route path="/messages" element={<WrappedComingSoon />} />
                <Route path="/people" element={<WrappedComingSoon />} />
                <Route path="/reports" element={<WrappedComingSoon />} />
                <Route path="/settings" element={<WrappedComingSoon />} />
              </Route>

              {/* Organization Admin Routes */}
              <Route element={<OrgAdminProtectedRoute />}>
                <Route path="/admin" element={<WrappedOrgAdminDashboard />} />
                <Route
                  path="/admin/org/opportunities"
                  element={<WrappedComingSoon />}
                />
                <Route
                  path="/admin/org/volunteers"
                  element={<WrappedComingSoon />}
                />
                <Route
                  path="/admin/org/organization"
                  element={<WrappedComingSoon />}
                />
                <Route
                  path="/admin/notifications"
                  element={<WrappedComingSoon />}
                />
                <Route path="/admin/calendar" element={<WrappedComingSoon />} />
                <Route path="/admin/messages" element={<WrappedComingSoon />} />
                <Route path="/admin/reports" element={<WrappedComingSoon />} />
                <Route path="/admin/settings" element={<WrappedComingSoon />} />
              </Route>

              {/* System Admin Routes */}
              <Route element={<SystemAdminProtectedRoute />}>
                <Route
                  path="/admin/system"
                  element={<WrappedSystemAdminDashboard />}
                />
                <Route
                  path="/admin/system/opportunities"
                  element={<WrappedManageOpportunities />}
                />
                <Route
                  path="/admin/system/organizations"
                  element={<WrappedManageOrganizations />}
                />
                <Route
                  path="/admin/system/users"
                  element={<WrappedManageUsers />}
                />
                <Route
                  path="/admin/system/settings"
                  element={<WrappedComingSoon />}
                />
                <Route
                  path="/admin/system/access"
                  element={<WrappedComingSoon />}
                />
                <Route
                  path="/admin/system/reports"
                  element={<WrappedComingSoon />}
                />
                <Route
                  path="/admin/system/notifications"
                  element={<WrappedComingSoon />}
                />
              </Route>
            </Route>

            {/* Catch All */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AuthProvider>
      </TooltipProvider>
    </ThemeProvider>
  </BrowserRouter>
);

export default App;
