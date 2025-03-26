
import React from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CalendarDays, Users, Building2, CheckSquare, ListChecks, UserCheck, BarChart3 } from 'lucide-react';
import { useAuth } from '@/providers/AuthProvider';

const AdminDashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow pt-32 pb-24 px-6 md:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-2">Admin Dashboard</h1>
            <p className="text-lg text-muted-foreground">
              Welcome, {user?.name}. Manage the volunteer network platform.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center">
                  <Users className="mr-2 h-5 w-5 text-primary" />
                  Active Volunteers
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">142</div>
                <p className="text-sm text-muted-foreground">
                  +12% from last month
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center">
                  <Building2 className="mr-2 h-5 w-5 text-primary" />
                  Organizations
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">36</div>
                <p className="text-sm text-muted-foreground">
                  +3 new this month
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center">
                  <CheckSquare className="mr-2 h-5 w-5 text-primary" />
                  Active Opportunities
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">89</div>
                <p className="text-sm text-muted-foreground">
                  54 spots filled
                </p>
              </CardContent>
            </Card>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="hover-card-shadow transition-all duration-300 cursor-pointer" onClick={() => navigate('/admin/opportunities')}>
              <CardHeader>
                <ListChecks className="h-10 w-10 text-primary mb-2" />
                <CardTitle>Manage Opportunities</CardTitle>
                <CardDescription>
                  Review, approve, and manage volunteer opportunities.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-sm">
                  <p>• Review pending opportunities</p>
                  <p>• Create new opportunities</p>
                  <p>• Edit or remove existing listings</p>
                </div>
                <Button variant="ghost" className="w-full mt-4">
                  View Opportunities
                </Button>
              </CardContent>
            </Card>
            
            <Card className="hover-card-shadow transition-all duration-300 cursor-pointer" onClick={() => navigate('/admin/organizations')}>
              <CardHeader>
                <Building2 className="h-10 w-10 text-primary mb-2" />
                <CardTitle>Manage Organizations</CardTitle>
                <CardDescription>
                  Add, edit, and verify partner organizations.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-sm">
                  <p>• Review organization applications</p>
                  <p>• Verify organization details</p>
                  <p>• Manage organization accounts</p>
                </div>
                <Button variant="ghost" className="w-full mt-4">
                  View Organizations
                </Button>
              </CardContent>
            </Card>
            
            <Card className="hover-card-shadow transition-all duration-300 cursor-pointer" onClick={() => navigate('/admin/users')}>
              <CardHeader>
                <UserCheck className="h-10 w-10 text-primary mb-2" />
                <CardTitle>Manage Users</CardTitle>
                <CardDescription>
                  Review user accounts and volunteer data.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-sm">
                  <p>• Review volunteer profiles</p>
                  <p>• Verify volunteer hours</p>
                  <p>• Manage user permissions</p>
                </div>
                <Button variant="ghost" className="w-full mt-4">
                  View Users
                </Button>
              </CardContent>
            </Card>
            
            <Card className="hover-card-shadow transition-all duration-300 cursor-pointer">
              <CardHeader>
                <BarChart3 className="h-10 w-10 text-primary mb-2" />
                <CardTitle>Analytics & Reports</CardTitle>
                <CardDescription>
                  Monitor platform activity and generate reports.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-sm">
                  <p>• View volunteer engagement stats</p>
                  <p>• Monitor opportunity applications</p>
                  <p>• Generate impact reports</p>
                </div>
                <Button variant="ghost" className="w-full mt-4">
                  View Analytics
                </Button>
              </CardContent>
            </Card>
          </div>
          
          <div className="mt-12">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <CalendarDays className="mr-2 h-5 w-5" />
                  Upcoming Events
                </CardTitle>
                <CardDescription>
                  Recently added volunteer opportunities
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center pb-4 border-b">
                    <div>
                      <h3 className="font-medium">Community Garden Cleanup</h3>
                      <p className="text-sm text-muted-foreground">Green Earth Initiative</p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">Oct 15, 2023</p>
                      <p className="text-sm text-muted-foreground">8 spots remaining</p>
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-center pb-4 border-b">
                    <div>
                      <h3 className="font-medium">Food Bank Volunteer</h3>
                      <p className="text-sm text-muted-foreground">City Food Bank</p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">Oct 18, 2023</p>
                      <p className="text-sm text-muted-foreground">5 spots remaining</p>
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="font-medium">After-School Tutoring</h3>
                      <p className="text-sm text-muted-foreground">Education For All</p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">Oct 20, 2023</p>
                      <p className="text-sm text-muted-foreground">10 spots remaining</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default AdminDashboard;

