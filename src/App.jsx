import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
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

const queryClient = new QueryClient();

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

const App = () => (
  <QueryClientProvider client={queryClient}>
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
                  <Route path="/activity" element={<WrappedDashboard />} />
                  <Route path="/notifications" element={<WrappedDashboard />} />
                  <Route path="/nonprofits" element={<WrappedDashboard />} />
                  <Route path="/causes" element={<WrappedDashboard />} />
                  <Route path="/calendar" element={<WrappedDashboard />} />
                  <Route path="/messages" element={<WrappedDashboard />} />
                  <Route path="/people" element={<WrappedDashboard />} />
                  <Route path="/reports" element={<WrappedDashboard />} />
                  <Route path="/settings" element={<WrappedDashboard />} />
                </Route>

                {/* Organization Admin Routes */}
                <Route element={<OrgAdminProtectedRoute />}>
                  <Route path="/admin" element={<WrappedOrgAdminDashboard />} />
                  <Route
                    path="/admin/org/opportunities"
                    element={<WrappedDashboard />}
                  />
                  <Route
                    path="/admin/org/volunteers"
                    element={<WrappedDashboard />}
                  />
                  <Route
                    path="/admin/org/organization"
                    element={<WrappedDashboard />}
                  />
                  <Route
                    path="/admin/notifications"
                    element={<WrappedDashboard />}
                  />
                  <Route
                    path="/admin/calendar"
                    element={<WrappedDashboard />}
                  />
                  <Route
                    path="/admin/messages"
                    element={<WrappedDashboard />}
                  />
                  <Route path="/admin/reports" element={<WrappedDashboard />} />
                  <Route
                    path="/admin/settings"
                    element={<WrappedDashboard />}
                  />
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
                    element={<WrappedDashboard />}
                  />
                  <Route
                    path="/admin/system/access"
                    element={<WrappedDashboard />}
                  />
                  <Route
                    path="/admin/system/reports"
                    element={<WrappedDashboard />}
                  />
                  <Route
                    path="/admin/system/notifications"
                    element={<WrappedDashboard />}
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
  </QueryClientProvider>
);

export default App;
