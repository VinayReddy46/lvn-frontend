import React, { useEffect, useState } from "react";
import { useAuth } from "@/providers/AuthProvider";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CalendarDays, Users, Clock, Award, ArrowUpRight } from "lucide-react";
import {
  generateOpportunities,
  generateRegistrations,
} from "@/utils/fakeData.js";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Progress } from "@/components/ui/progress";
import { CustomBadge } from "@/components/ui/custom-badge";

const Dashboard = () => {
  const { user } = useAuth();
  const [upcomingEvents, setUpcomingEvents] = useState([]);
  const [registrations, setRegistrations] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Get dummy data using faker
  useEffect(() => {
    // Simulate API call
    setIsLoading(true);

    setTimeout(() => {
      const opportunities = generateOpportunities(8);
      const regs = generateRegistrations(5);

      // Sort opportunities by date
      const sortedOpportunities = opportunities
        .sort((a, b) => a.date.getTime() - b.date.getTime())
        .slice(0, 3);

      setUpcomingEvents(sortedOpportunities);
      setRegistrations(regs);
      setIsLoading(false);
    }, 800);
  }, []);

  // Calculate stats from fake data
  const hoursVolunteered = registrations
    .filter((reg) => reg.status === "completed")
    .reduce((sum, reg) => sum + reg.opportunity.hours, 0);

  const uniqueOrgs = new Set(
    registrations.map((reg) => reg.opportunity.organization.id)
  ).size;

  // Format date
  const formatDate = (date) => {
    return new Intl.DateTimeFormat("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
    }).format(date);
  };

  // Helper function to determine badge styling
  const getBadgeVariant = (status) => {
    switch (status) {
      case "completed":
        return "secondary";
      case "approved":
        return "default";
      case "pending":
        return "outline";
      default:
        return "destructive";
    }
  };

  // Helper function to determine badge styling for custom badge
  const getCustomBadgeVariant = (status) => {
    switch (status) {
      case "completed":
        return "success";
      case "approved":
        return "info";
      case "pending":
        return "warning";
      default:
        return "destructive";
    }
  };

  return (
    <div className="p-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <h1 className="text-3xl font-bold">
          Welcome back, {user?.name.split(" ")[0]}
        </h1>
        <Button className="bg-orange-500 hover:bg-orange-600 text-white font-medium">
          Find Opportunities
          <ArrowUpRight className="ml-2 h-4 w-4" />
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center">
              <Clock className="mr-2 h-5 w-5 text-orange-500" />
              Hours Volunteered
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{hoursVolunteered}</div>
            <p className="text-sm text-muted-foreground">
              Total hours across all opportunities
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center">
              <CalendarDays className="mr-2 h-5 w-5 text-orange-500" />
              Upcoming Events
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{upcomingEvents.length}</div>
            <p className="text-sm text-muted-foreground">
              Volunteer opportunities you've signed up for
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center">
              <Users className="mr-2 h-5 w-5 text-orange-500" />
              Organizations
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{uniqueOrgs}</div>
            <p className="text-sm text-muted-foreground">
              Organizations you've volunteered with
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center">
              <Award className="mr-2 h-5 w-5 text-orange-500" />
              Impact Score
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">78</div>
            <div className="mt-1">
              <Progress value={78} className="h-2" />
            </div>
            <p className="text-sm text-muted-foreground mt-1">
              Your community impact rating
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader className="pb-3">
            <div className="flex justify-between items-center">
              <CardTitle>Recent Activity</CardTitle>
              <Button variant="link" className="text-orange-500 p-0">
                View all
              </Button>
            </div>
            <CardDescription>
              Your recent volunteer contributions
            </CardDescription>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="space-y-4">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-muted animate-pulse" />
                    <div className="space-y-2 flex-1">
                      <div className="h-4 bg-muted rounded animate-pulse w-3/4" />
                      <div className="h-3 bg-muted rounded animate-pulse w-1/2" />
                    </div>
                  </div>
                ))}
              </div>
            ) : registrations.length > 0 ? (
              <div className="space-y-4">
                {registrations.map((reg, index) => (
                  <div key={reg.id}>
                    <div className="flex gap-4">
                      <Avatar className="h-12 w-12 border border-border">
                        <AvatarImage src={reg.opportunity.organization.logo} />
                        <AvatarFallback>
                          {reg.opportunity.organization.name.substring(0, 2)}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <h4 className="font-medium">{reg.opportunity.title}</h4>
                        <div className="flex flex-wrap items-center gap-2 mt-1">
                          <span className="text-sm text-muted-foreground">
                            {reg.opportunity.organization.name}
                          </span>
                          <span className="text-muted-foreground">•</span>
                          <span className="text-sm text-muted-foreground">
                            {formatDate(reg.opportunity.date)}
                          </span>

                          {/* Using Badge with valid variants */}
                          <Badge
                            variant={getBadgeVariant(reg.status)}
                            className={
                              reg.status === "completed"
                                ? "bg-green-100 text-green-800 hover:bg-green-200"
                                : reg.status === "approved"
                                ? "bg-blue-100 text-blue-800 hover:bg-blue-200"
                                : reg.status === "pending"
                                ? "bg-orange-100 text-orange-800 hover:bg-orange-200"
                                : "bg-red-100 text-red-800 hover:bg-red-200"
                            }
                          >
                            {reg.status.charAt(0).toUpperCase() +
                              reg.status.slice(1)}
                          </Badge>

                          {/* Alternatively, use the CustomBadge component which has the success variant */}
                          {/* 
                          <CustomBadge variant={getCustomBadgeVariant(reg.status)}>
                            {reg.status.charAt(0).toUpperCase() + reg.status.slice(1)}
                          </CustomBadge>
                          */}
                        </div>
                      </div>
                      <div className="text-right">
                        <span className="font-medium text-orange-500">
                          {reg.opportunity.hours} hrs
                        </span>
                      </div>
                    </div>
                    {index < registrations.length - 1 && (
                      <Separator className="mt-4" />
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-muted-foreground">
                <p>You haven't logged any volunteer hours yet.</p>
                <p>Sign up for an opportunity to get started!</p>
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <div className="flex justify-between items-center">
              <CardTitle>Upcoming Opportunities</CardTitle>
              <Button variant="link" className="text-orange-500 p-0">
                View all
              </Button>
            </div>
            <CardDescription>Events you've registered for</CardDescription>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="space-y-4">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="space-y-2">
                    <div className="h-4 bg-muted rounded animate-pulse w-3/4" />
                    <div className="h-3 bg-muted rounded animate-pulse w-1/2" />
                    <div className="h-3 bg-muted rounded animate-pulse w-2/3" />
                  </div>
                ))}
              </div>
            ) : upcomingEvents.length > 0 ? (
              <div className="space-y-4">
                {upcomingEvents.map((event, index) => (
                  <div key={event.id} className="group">
                    <div className="flex flex-col">
                      <h4 className="font-medium group-hover:text-orange-500 transition-colors">
                        {event.title}
                      </h4>
                      <div className="text-sm text-muted-foreground">
                        {event.organization.name}
                      </div>
                      <div className="flex items-center mt-1">
                        <CalendarDays className="h-3.5 w-3.5 text-orange-500 mr-1.5" />
                        <span className="text-xs">
                          {formatDate(event.date)}
                        </span>
                        <span className="mx-1.5 text-xs text-muted-foreground">
                          •
                        </span>
                        <Clock className="h-3.5 w-3.5 text-orange-500 mr-1.5" />
                        <span className="text-xs">
                          {event.startTime} - {event.endTime}
                        </span>
                      </div>
                    </div>
                    {index < upcomingEvents.length - 1 && (
                      <Separator className="mt-4" />
                    )}
                  </div>
                ))}
                <Button variant="outline" className="w-full mt-2">
                  View all events
                </Button>
              </div>
            ) : (
              <div className="text-center py-8 text-muted-foreground">
                <p>You haven't signed up for any opportunities yet.</p>
                <Button variant="outline" className="mt-4">
                  Find opportunities
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
