import React, { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth } from "@/providers/AuthProvider";
import {
  Calendar,
  Clock,
  MapPin,
  MoreHorizontal,
  FileText,
  Eye,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// Dummy data for applied opportunities
const appliedOpportunities = [
  {
    id: 1,
    title: "Community Garden Cleanup",
    organization: "Green Earth Initiative",
    location: "Central Park, New York",
    date: "2023-10-15",
    time: "10:00 AM - 2:00 PM",
    status: "Approved",
    applicationDate: "2023-09-20",
  },
  {
    id: 2,
    title: "Food Bank Volunteer",
    organization: "City Food Bank",
    location: "Downtown Food Bank, Chicago",
    date: "2023-10-18",
    time: "9:00 AM - 12:00 PM",
    status: "Pending",
    applicationDate: "2023-09-25",
  },
  {
    id: 3,
    title: "Senior Companion Program",
    organization: "Elder Care Foundation",
    location: "Sunny Side Nursing Home, Miami",
    date: "2023-10-25",
    time: "2:00 PM - 4:00 PM",
    status: "Pending",
    applicationDate: "2023-09-28",
  },
];

// Dummy data for completed opportunities
const completedOpportunities = [
  {
    id: 4,
    title: "Beach Cleanup Project",
    organization: "Ocean Guardians",
    location: "Venice Beach, Los Angeles",
    date: "2023-09-28",
    time: "8:00 AM - 12:00 PM",
    hoursLogged: 4,
    status: "Verified",
    feedback: "Great work! Thanks for your help with the beach cleanup.",
  },
  {
    id: 5,
    title: "After-School Tutoring",
    organization: "Education For All",
    location: "Lincoln Elementary School, Boston",
    date: "2023-09-20",
    time: "3:30 PM - 5:30 PM",
    hoursLogged: 2,
    status: "Verified",
    feedback: "The students really appreciated your help with their homework.",
  },
  {
    id: 6,
    title: "Animal Shelter Assistant",
    organization: "Happy Paws Rescue",
    location: "Happy Paws Shelter, San Francisco",
    date: "2023-09-15",
    time: "1:00 PM - 4:00 PM",
    hoursLogged: 3,
    status: "Pending",
    feedback: null,
  },
];

const getStatusBadgeClass = (status) => {
  switch (status) {
    case "Approved":
      return "bg-green-100 text-green-800 dark:bg-green-800/20 dark:text-green-400";
    case "Pending":
      return "bg-yellow-100 text-yellow-800 dark:bg-yellow-800/20 dark:text-yellow-400";
    case "Rejected":
      return "bg-red-100 text-red-800 dark:bg-red-800/20 dark:text-red-400";
    case "Verified":
      return "bg-blue-100 text-blue-800 dark:bg-blue-800/20 dark:text-blue-400";
    default:
      return "bg-gray-100 text-gray-800 dark:bg-gray-800/20 dark:text-gray-400";
  }
};

const MyOpportunities = () => {
  const { user } = useAuth();

  return (
    <div className="container py-8 max-w-7xl">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">My Opportunities</h1>
        <p className="text-lg text-muted-foreground">
          Track and manage your volunteer applications and activities
        </p>
      </div>

      <Tabs defaultValue="applied" className="space-y-6">
        <TabsList className="grid w-full grid-cols-2 md:w-[400px]">
          <TabsTrigger value="applied">Applied Opportunities</TabsTrigger>
          <TabsTrigger value="completed">Completed Opportunities</TabsTrigger>
        </TabsList>

        <TabsContent value="applied" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Applied Opportunities</CardTitle>
              <CardDescription>
                Track the status of your volunteer applications
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Opportunity</TableHead>
                    <TableHead>Date & Time</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {appliedOpportunities.map((opportunity) => (
                    <TableRow key={opportunity.id}>
                      <TableCell>
                        <div className="font-medium">{opportunity.title}</div>
                        <div className="text-sm text-muted-foreground">
                          {opportunity.organization}
                        </div>
                        <div className="text-sm text-muted-foreground flex items-center mt-1">
                          <MapPin className="h-3.5 w-3.5 mr-1" />
                          {opportunity.location}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center">
                          <Calendar className="h-4 w-4 mr-1 text-muted-foreground" />
                          {new Date(opportunity.date).toLocaleDateString()}
                        </div>
                        <div className="flex items-center text-sm text-muted-foreground mt-1">
                          <Clock className="h-3.5 w-3.5 mr-1" />
                          {opportunity.time}
                        </div>
                        <div className="text-xs text-muted-foreground mt-1">
                          Applied on:{" "}
                          {new Date(
                            opportunity.applicationDate
                          ).toLocaleDateString()}
                        </div>
                      </TableCell>
                      <TableCell>
                        <span
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusBadgeClass(
                            opportunity.status
                          )}`}
                        >
                          {opportunity.status}
                        </span>
                      </TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>
                              <Eye className="h-4 w-4 mr-2" />
                              View Details
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <FileText className="h-4 w-4 mr-2" />
                              View Application
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="completed" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Completed Opportunities</CardTitle>
              <CardDescription>
                View your volunteer history and logged hours
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Opportunity</TableHead>
                    <TableHead>Date & Hours</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {completedOpportunities.map((opportunity) => (
                    <TableRow key={opportunity.id}>
                      <TableCell>
                        <div className="font-medium">{opportunity.title}</div>
                        <div className="text-sm text-muted-foreground">
                          {opportunity.organization}
                        </div>
                        <div className="text-sm text-muted-foreground flex items-center mt-1">
                          <MapPin className="h-3.5 w-3.5 mr-1" />
                          {opportunity.location}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center">
                          <Calendar className="h-4 w-4 mr-1 text-muted-foreground" />
                          {new Date(opportunity.date).toLocaleDateString()}
                        </div>
                        <div className="flex items-center text-sm text-muted-foreground mt-1">
                          <Clock className="h-3.5 w-3.5 mr-1" />
                          {opportunity.time}
                        </div>
                        <div className="text-sm font-medium mt-1">
                          Hours logged: {opportunity.hoursLogged}
                        </div>
                      </TableCell>
                      <TableCell>
                        <span
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusBadgeClass(
                            opportunity.status
                          )}`}
                        >
                          {opportunity.status}
                        </span>
                        {opportunity.feedback && (
                          <div className="text-xs text-muted-foreground mt-2 max-w-[200px] truncate">
                            Feedback: {opportunity.feedback}
                          </div>
                        )}
                      </TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>
                              <Eye className="h-4 w-4 mr-2" />
                              View Details
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <FileText className="h-4 w-4 mr-2" />
                              Download Certificate
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default MyOpportunities;
