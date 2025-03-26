
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/providers/ThemeProvider";
import { AuthProvider } from "@/providers/AuthProvider";
import { ProtectedRoute, OrgAdminRoute, SystemAdminRoute } from "@/components/ProtectedRoute";

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
              <Route path="/user-role-selection" element={<UserRoleSelection />} />
              
              {/* Protected Routes */}
              <Route element={<ProtectedRoute />}>
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/my-opportunities" element={<MyOpportunities />} />
                <Route path="/create-organization" element={<CreateOrganization />} />
                <Route path="/volunteer" element={<Dashboard />} />
                <Route path="/my-registrations" element={<Dashboard />} />
                <Route path="/activity" element={<Dashboard />} />
                <Route path="/notifications" element={<Dashboard />} />
                <Route path="/nonprofits" element={<Dashboard />} />
                <Route path="/causes" element={<Dashboard />} />
              </Route>
              
              {/* Organization Admin Routes */}
              <Route element={<OrgAdminRoute />}>
                <Route path="/admin" element={<OrganizationAdminDashboard />} />
                <Route path="/admin/org/opportunities" element={<Dashboard />} />
                <Route path="/admin/org/volunteers" element={<Dashboard />} />
                <Route path="/admin/org/organization" element={<Dashboard />} />
              </Route>
              
              {/* System Admin Routes */}
              <Route element={<SystemAdminRoute />}>
                <Route path="/admin/system" element={<SystemAdminDashboard />} />
                <Route path="/admin/system/opportunities" element={<ManageOpportunities />} />
                <Route path="/admin/system/organizations" element={<ManageOrganizations />} />
                <Route path="/admin/system/users" element={<ManageUsers />} />
                <Route path="/admin/system/settings" element={<Dashboard />} />
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
