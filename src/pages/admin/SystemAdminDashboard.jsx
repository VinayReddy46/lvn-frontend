import React, { useState, useEffect } from "react";
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
  Users,
  Building2,
  CheckSquare,
  ListChecks,
  UserCheck,
  BarChart3,
  Shield,
  Settings,
} from "lucide-react";
import { useAuth } from "@/providers/AuthProvider";

const SystemAdminDashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="container py-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">System Admin Dashboard</h1>
          <p className="text-lg text-muted-foreground">
            Welcome, {user?.name}. Manage the entire volunteer platform.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center">
                <Users className="mr-2 h-5 w-5 text-primary" />
                Total Users
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">253</div>
              <p className="text-sm text-muted-foreground">
                +25 new users this month
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center">
                <Building2 className="mr-2 h-5 w-5 text-primary" />
                Total Organizations
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">42</div>
              <p className="text-sm text-muted-foreground">+5 new this month</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center">
                <CheckSquare className="mr-2 h-5 w-5 text-primary" />
                Total Opportunities
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">127</div>
              <p className="text-sm text-muted-foreground">82 spots filled</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card
            className="hover-card-shadow transition-all duration-300 cursor-pointer"
            onClick={() => navigate("/admin/system/users")}
          >
            <CardHeader>
              <UserCheck className="h-10 w-10 text-primary mb-2" />
              <CardTitle>Manage Users</CardTitle>
              <CardDescription>Oversee all user accounts</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-sm">
                <p>• View all user profiles</p>
                <p>• Manage roles and permissions</p>
                <p>• Review user activities</p>
              </div>
              <Button variant="ghost" className="w-full mt-4">
                View Users
              </Button>
            </CardContent>
          </Card>

          <Card
            className="hover-card-shadow transition-all duration-300 cursor-pointer"
            onClick={() => navigate("/admin/system/organizations")}
          >
            <CardHeader>
              <Building2 className="h-10 w-10 text-primary mb-2" />
              <CardTitle>Organizations</CardTitle>
              <CardDescription>Manage all organizations</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-sm">
                <p>• Review all organizations</p>
                <p>• Verify organization details</p>
                <p>• Approve or reject applications</p>
              </div>
              <Button variant="ghost" className="w-full mt-4">
                View Organizations
              </Button>
            </CardContent>
          </Card>

          <Card
            className="hover-card-shadow transition-all duration-300 cursor-pointer"
            onClick={() => navigate("/admin/system/opportunities")}
          >
            <CardHeader>
              <ListChecks className="h-10 w-10 text-primary mb-2" />
              <CardTitle>Opportunities</CardTitle>
              <CardDescription>
                Manage all volunteer opportunities
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-sm">
                <p>• Review all opportunities</p>
                <p>• Approve/reject opportunity listings</p>
                <p>• Monitor opportunity engagements</p>
              </div>
              <Button variant="ghost" className="w-full mt-4">
                View Opportunities
              </Button>
            </CardContent>
          </Card>

          <Card
            className="hover-card-shadow transition-all duration-300 cursor-pointer"
            onClick={() => navigate("/admin/system/settings")}
          >
            <CardHeader>
              <Settings className="h-10 w-10 text-primary mb-2" />
              <CardTitle>Platform Settings</CardTitle>
              <CardDescription>Configure platform settings</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-sm">
                <p>• General platform settings</p>
                <p>• Email notification settings</p>
                <p>• Security and access controls</p>
              </div>
              <Button variant="ghost" className="w-full mt-4">
                View Settings
              </Button>
            </CardContent>
          </Card>
        </div>

        <div className="mt-12">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Shield className="mr-2 h-5 w-5" />
                Admin Activity Log
              </CardTitle>
              <CardDescription>Recent administrative actions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center pb-4 border-b">
                  <div>
                    <h3 className="font-medium">New Organization Approved</h3>
                    <p className="text-sm text-muted-foreground">
                      Green Earth Initiative was approved
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">Today</p>
                    <p className="text-sm text-muted-foreground">09:45 AM</p>
                  </div>
                </div>

                <div className="flex justify-between items-center pb-4 border-b">
                  <div>
                    <h3 className="font-medium">User Role Updated</h3>
                    <p className="text-sm text-muted-foreground">
                      John Doe promoted to Organization Admin
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">Yesterday</p>
                    <p className="text-sm text-muted-foreground">3:30 PM</p>
                  </div>
                </div>

                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="font-medium">Platform Settings Updated</h3>
                    <p className="text-sm text-muted-foreground">
                      Email notification settings were modified
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">Oct 17, 2023</p>
                    <p className="text-sm text-muted-foreground">11:20 AM</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default SystemAdminDashboard;
