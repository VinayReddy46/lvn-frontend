import React from "react";
import { useNavigate } from "react-router-dom";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Calendar,
  Users,
  Clock,
  Award,
  Building2,
  CheckSquare,
  BarChart3,
} from "lucide-react";
import { useAuth } from "@/providers/AuthProvider";

const OrganizationAdminDashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="container py-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">
            Organization Admin Dashboard
          </h1>
          <p className="text-lg text-muted-foreground">
            Welcome, {user?.name}. Manage your organization and volunteer
            opportunities.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center">
                <Users className="mr-2 h-5 w-5 text-orange-500" />
                Volunteers
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">0</div>
              <p className="text-sm text-muted-foreground">Active volunteers</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center">
                <Calendar className="mr-2 h-5 w-5 text-orange-500" />
                Opportunities
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">0</div>
              <p className="text-sm text-muted-foreground">
                Active volunteer opportunities
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center">
                <Clock className="mr-2 h-5 w-5 text-orange-500" />
                Hours Served
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">0</div>
              <p className="text-sm text-muted-foreground">
                Total volunteer hours
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center">
                <Award className="mr-2 h-5 w-5 text-orange-500" />
                Impact
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">0</div>
              <p className="text-sm text-muted-foreground">
                Community impact score
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card
            className="hover-card-shadow transition-all duration-300 cursor-pointer"
            onClick={() => navigate("/admin/org/opportunities")}
          >
            <CardHeader>
              <CheckSquare className="h-10 w-10 text-orange-500 mb-2" />
              <CardTitle>Manage Opportunities</CardTitle>
              <CardDescription>
                Create and manage volunteer opportunities
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-sm">
                <p>• Create new opportunities</p>
                <p>• Manage existing opportunities</p>
                <p>• Review volunteer registrations</p>
              </div>
              <Button
                variant="ghost"
                className="w-full mt-4 text-orange-500 hover:text-orange-600 hover:bg-orange-50"
              >
                View Opportunities
              </Button>
            </CardContent>
          </Card>

          <Card
            className="hover-card-shadow transition-all duration-300 cursor-pointer"
            onClick={() => navigate("/admin/org/volunteers")}
          >
            <CardHeader>
              <Users className="h-10 w-10 text-orange-500 mb-2" />
              <CardTitle>Manage Volunteers</CardTitle>
              <CardDescription>
                Track and manage volunteer participation
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-sm">
                <p>• View volunteer hours</p>
                <p>• Approve volunteer time logs</p>
                <p>• Review volunteer profiles</p>
              </div>
              <Button
                variant="ghost"
                className="w-full mt-4 text-orange-500 hover:text-orange-600 hover:bg-orange-50"
              >
                View Volunteers
              </Button>
            </CardContent>
          </Card>

          <Card
            className="hover-card-shadow transition-all duration-300 cursor-pointer"
            onClick={() => navigate("/admin/org/organization")}
          >
            <CardHeader>
              <Building2 className="h-10 w-10 text-orange-500 mb-2" />
              <CardTitle>Organization Profile</CardTitle>
              <CardDescription>
                Update your organization details
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-sm">
                <p>• Edit organization details</p>
                <p>• Update mission statement</p>
                <p>• Manage admin team members</p>
              </div>
              <Button
                variant="ghost"
                className="w-full mt-4 text-orange-500 hover:text-orange-600 hover:bg-orange-50"
              >
                View Organization
              </Button>
            </CardContent>
          </Card>
        </div>

        <div className="mt-12">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <BarChart3 className="mr-2 h-5 w-5 text-orange-500" />
                Volunteer Activity
              </CardTitle>
              <CardDescription>Recent volunteer activity</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8 text-muted-foreground">
                <p>No recent volunteer activity to display.</p>
                <p>Create opportunities to get started!</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default OrganizationAdminDashboard;
