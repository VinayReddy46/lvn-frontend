import React, { useState } from "react";
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
import {
  PlusCircle,
  Search,
  Filter,
  MoreHorizontal,
  Edit,
  Trash2,
  Eye,
  CheckCircle,
  XCircle,
  Calendar,
  MapPin,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { toast } from "sonner";

// Dummy data for opportunities
const dummyOpportunities = [
  {
    id: 1,
    title: "Community Garden Cleanup",
    organization: "Green Earth Initiative",
    location: "Central Park, New York",
    date: "2023-10-15",
    category: "Environment",
    status: "Active",
    spotsAvailable: 8,
    applicants: 4,
  },
  {
    id: 2,
    title: "Food Bank Volunteer",
    organization: "City Food Bank",
    location: "Downtown Food Bank, Chicago",
    date: "2023-10-18",
    category: "Food Security",
    status: "Active",
    spotsAvailable: 5,
    applicants: 2,
  },
  {
    id: 3,
    title: "After-School Tutoring",
    organization: "Education For All",
    location: "Lincoln Elementary School, Boston",
    date: "2023-10-20",
    category: "Education",
    status: "Active",
    spotsAvailable: 10,
    applicants: 5,
  },
  {
    id: 4,
    title: "Senior Companion Program",
    organization: "Elder Care Foundation",
    location: "Sunny Side Nursing Home, Miami",
    date: "2023-10-25",
    category: "Senior Care",
    status: "Pending",
    spotsAvailable: 12,
    applicants: 0,
  },
  {
    id: 5,
    title: "Animal Shelter Assistant",
    organization: "Happy Paws Rescue",
    location: "Happy Paws Shelter, San Francisco",
    date: "2023-10-22",
    category: "Animal Welfare",
    status: "Pending",
    spotsAvailable: 6,
    applicants: 0,
  },
  {
    id: 6,
    title: "Beach Cleanup Project",
    organization: "Ocean Guardians",
    location: "Venice Beach, Los Angeles",
    date: "2023-10-28",
    category: "Environment",
    status: "Inactive",
    spotsAvailable: 20,
    applicants: 8,
  },
  {
    id: 7,
    title: "Homeless Shelter Helper",
    organization: "Helping Hands Shelter",
    location: "Downtown Shelter, Seattle",
    date: "2023-10-30",
    category: "Homeless Support",
    status: "Inactive",
    spotsAvailable: 15,
    applicants: 0,
  },
];

const getStatusBadgeClass = (status) => {
  switch (status) {
    case "Active":
      return "bg-green-100 text-green-800 dark:bg-green-800/20 dark:text-green-400";
    case "Pending":
      return "bg-yellow-100 text-yellow-800 dark:bg-yellow-800/20 dark:text-yellow-400";
    case "Inactive":
      return "bg-red-100 text-red-800 dark:bg-red-800/20 dark:text-red-400";
    default:
      return "bg-gray-100 text-gray-800 dark:bg-gray-800/20 dark:text-gray-400";
  }
};

const ManageOpportunities = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("all");

  // Filter opportunities based on search term and active tab
  const filteredOpportunities = dummyOpportunities.filter((opportunity) => {
    // Search term filter
    const matchesSearch =
      opportunity.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      opportunity.organization
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      opportunity.category.toLowerCase().includes(searchTerm.toLowerCase());

    // Tab filter
    const matchesTab =
      activeTab === "all" ||
      (activeTab === "active" && opportunity.status === "Active") ||
      (activeTab === "pending" && opportunity.status === "Pending") ||
      (activeTab === "inactive" && opportunity.status === "Inactive");

    return matchesSearch && matchesTab;
  });

  const handleStatusChange = (opportunityId, newStatus) => {
    // In a real app, this would update the status in the database
    toast.success(`Opportunity status updated to ${newStatus}`);
  };

  const handleDeleteOpportunity = (opportunityId) => {
    // In a real app, this would delete the opportunity from the database
    toast.success("Opportunity successfully deleted");
  };

  return (
    <div className="container py-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
          <div>
            <h1 className="text-4xl font-bold mb-2">Manage Opportunities</h1>
            <p className="text-lg text-muted-foreground">
              Create, edit, and manage volunteer opportunities
            </p>
          </div>
          <Button className="gap-2">
            <PlusCircle className="h-4 w-4" />
            Add New Opportunity
          </Button>
        </div>

        <Card className="mb-8">
          <CardContent className="pt-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-grow">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search opportunities..."
                  className="pl-10 w-full"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <Button variant="outline" className="gap-2 shrink-0">
                <Filter className="h-4 w-4" />
                Filter
              </Button>
            </div>
          </CardContent>
        </Card>

        <Tabs
          defaultValue="all"
          onValueChange={setActiveTab}
          className="space-y-6"
        >
          <TabsList className="grid grid-cols-4 w-full md:w-[600px]">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="active">Active</TabsTrigger>
            <TabsTrigger value="pending">Pending Approval</TabsTrigger>
            <TabsTrigger value="inactive">Inactive</TabsTrigger>
          </TabsList>

          <TabsContent value={activeTab} className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Volunteer Opportunities</CardTitle>
                <CardDescription>
                  {activeTab === "all" &&
                    "All volunteer opportunities in the system"}
                  {activeTab === "active" &&
                    "Currently active volunteer opportunities"}
                  {activeTab === "pending" &&
                    "Opportunities pending admin approval"}
                  {activeTab === "inactive" &&
                    "Inactive or past volunteer opportunities"}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Opportunity</TableHead>
                      <TableHead>Organization</TableHead>
                      <TableHead>Date & Location</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Spots</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredOpportunities.length > 0 ? (
                      filteredOpportunities.map((opportunity) => (
                        <TableRow key={opportunity.id}>
                          <TableCell className="font-medium">
                            <div>{opportunity.title}</div>
                            <Badge variant="outline" className="mt-1">
                              {opportunity.category}
                            </Badge>
                          </TableCell>
                          <TableCell>{opportunity.organization}</TableCell>
                          <TableCell>
                            <div className="flex items-center">
                              <Calendar className="h-4 w-4 mr-1 text-muted-foreground" />
                              {new Date(opportunity.date).toLocaleDateString()}
                            </div>
                            <div className="flex items-center text-sm text-muted-foreground mt-1">
                              <MapPin className="h-3.5 w-3.5 mr-1" />
                              {opportunity.location}
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
                          <TableCell>
                            <div>{opportunity.spotsAvailable} available</div>
                            <div className="text-sm text-muted-foreground">
                              {opportunity.applicants} applicants
                            </div>
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
                                  <Edit className="h-4 w-4 mr-2" />
                                  Edit Opportunity
                                </DropdownMenuItem>

                                {opportunity.status === "Pending" && (
                                  <DropdownMenuItem
                                    onClick={() =>
                                      handleStatusChange(
                                        opportunity.id,
                                        "Active"
                                      )
                                    }
                                  >
                                    <CheckCircle className="h-4 w-4 mr-2" />
                                    Approve
                                  </DropdownMenuItem>
                                )}

                                {opportunity.status === "Active" && (
                                  <DropdownMenuItem
                                    onClick={() =>
                                      handleStatusChange(
                                        opportunity.id,
                                        "Inactive"
                                      )
                                    }
                                  >
                                    <XCircle className="h-4 w-4 mr-2" />
                                    Mark as Inactive
                                  </DropdownMenuItem>
                                )}

                                {opportunity.status === "Inactive" && (
                                  <DropdownMenuItem
                                    onClick={() =>
                                      handleStatusChange(
                                        opportunity.id,
                                        "Active"
                                      )
                                    }
                                  >
                                    <CheckCircle className="h-4 w-4 mr-2" />
                                    Reactivate
                                  </DropdownMenuItem>
                                )}

                                <DropdownMenuSeparator />
                                <DropdownMenuItem
                                  onClick={() =>
                                    handleDeleteOpportunity(opportunity.id)
                                  }
                                  className="text-destructive"
                                >
                                  <Trash2 className="h-4 w-4 mr-2" />
                                  Delete
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={6} className="text-center py-6">
                          <p className="text-muted-foreground">
                            No opportunities found
                          </p>
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default ManageOpportunities;
