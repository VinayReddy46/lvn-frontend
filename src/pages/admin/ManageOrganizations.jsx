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
  ExternalLink,
  MapPin,
  Globe,
  Users,
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

// Dummy data for organizations
const dummyOrganizations = [
  {
    id: 1,
    name: "Green Earth Initiative",
    description: "Environmental conservation through community engagement",
    category: "Environment",
    location: "New York, NY",
    website: "https://example.com/green-earth",
    status: "Verified",
    opportunities: 3,
    volunteers: 1200,
    contactPerson: "Jane Smith",
    contactEmail: "jane@greenearthinitiative.org",
    logo: "https://images.unsplash.com/photo-1567427017947-545c5f8d16ad?ixlib=rb-1.2.1&auto=format&fit=crop&w=90&q=80",
  },
  {
    id: 2,
    name: "City Food Bank",
    description: "Working to end hunger in our community",
    category: "Food Security",
    location: "Chicago, IL",
    website: "https://example.com/food-bank",
    status: "Verified",
    opportunities: 2,
    volunteers: 850,
    contactPerson: "Michael Johnson",
    contactEmail: "michael@cityfoodbank.org",
    logo: "https://images.unsplash.com/photo-1551650975-87deedd944c3?ixlib=rb-1.2.1&auto=format&fit=crop&w=90&q=80",
  },
  {
    id: 3,
    name: "Education For All",
    description:
      "Promoting access to quality education for underprivileged children",
    category: "Education",
    location: "Boston, MA",
    website: "https://example.com/education",
    status: "Verified",
    opportunities: 1,
    volunteers: 650,
    contactPerson: "Sarah Williams",
    contactEmail: "sarah@educationforall.org",
    logo: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?ixlib=rb-1.2.1&auto=format&fit=crop&w=90&q=80",
  },
  {
    id: 4,
    name: "Happy Paws Rescue",
    description: "Rescuing and rehabilitating abandoned and abused animals",
    category: "Animal Welfare",
    location: "San Francisco, CA",
    website: "https://example.com/happy-paws",
    status: "Pending",
    opportunities: 1,
    volunteers: 320,
    contactPerson: "David Brown",
    contactEmail: "david@happypawsrescue.org",
    logo: "https://images.unsplash.com/photo-1548199973-03cce0bbc87b?ixlib=rb-1.2.1&auto=format&fit=crop&w=90&q=80",
  },
  {
    id: 5,
    name: "Elder Care Foundation",
    description: "Improving the quality of life for seniors",
    category: "Senior Care",
    location: "Miami, FL",
    website: "https://example.com/elder-care",
    status: "Pending",
    opportunities: 1,
    volunteers: 430,
    contactPerson: "Robert Davis",
    contactEmail: "robert@eldercare.org",
    logo: "https://images.unsplash.com/photo-1493894473891-10fc1e5dbd22?ixlib=rb-1.2.1&auto=format&fit=crop&w=90&q=80",
  },
  {
    id: 6,
    name: "Ocean Guardians",
    description:
      "Protecting marine ecosystems through beach cleanups and education",
    category: "Environment",
    location: "Los Angeles, CA",
    website: "https://example.com/ocean-guardians",
    status: "Rejected",
    opportunities: 0,
    volunteers: 0,
    contactPerson: "Lisa Chen",
    contactEmail: "lisa@oceanguardians.org",
    logo: "https://images.unsplash.com/photo-1566864222010-d45675442c31?ixlib=rb-1.2.1&auto=format&fit=crop&w=90&q=80",
  },
  {
    id: 7,
    name: "Helping Hands Shelter",
    description: "Providing shelter and resources for homeless individuals",
    category: "Homeless Support",
    location: "Seattle, WA",
    website: "https://example.com/helping-hands",
    status: "Inactive",
    opportunities: 0,
    volunteers: 280,
    contactPerson: "Mark Wilson",
    contactEmail: "mark@helpinghands.org",
    logo: "https://images.unsplash.com/photo-1469571486292-b53926c9118f?ixlib=rb-1.2.1&auto=format&fit=crop&w=90&q=80",
  },
];

const getStatusBadgeClass = (status) => {
  switch (status) {
    case "Verified":
      return "bg-green-100 text-green-800 dark:bg-green-800/20 dark:text-green-400";
    case "Pending":
      return "bg-yellow-100 text-yellow-800 dark:bg-yellow-800/20 dark:text-yellow-400";
    case "Rejected":
      return "bg-red-100 text-red-800 dark:bg-red-800/20 dark:text-red-400";
    case "Inactive":
      return "bg-gray-100 text-gray-800 dark:bg-gray-800/20 dark:text-gray-400";
    default:
      return "bg-gray-100 text-gray-800 dark:bg-gray-800/20 dark:text-gray-400";
  }
};

const ManageOrganizations = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("all");

  // Filter organizations based on search term and active tab
  const filteredOrganizations = dummyOrganizations.filter((org) => {
    // Search term filter
    const matchesSearch =
      org.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      org.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      org.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      org.location.toLowerCase().includes(searchTerm.toLowerCase());

    // Tab filter
    const matchesTab =
      activeTab === "all" ||
      (activeTab === "verified" && org.status === "Verified") ||
      (activeTab === "pending" && org.status === "Pending") ||
      (activeTab === "rejected" && org.status === "Rejected") ||
      (activeTab === "inactive" && org.status === "Inactive");

    return matchesSearch && matchesTab;
  });

  const handleStatusChange = (orgId, newStatus) => {
    // In a real app, this would update the status in the database
    toast.success(`Organization status updated to ${newStatus}`);
  };

  const handleDeleteOrganization = (orgId) => {
    // In a real app, this would delete the organization from the database
    toast.success("Organization successfully deleted");
  };

  return (
    <div className="container py-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
          <div>
            <h1 className="text-4xl font-bold mb-2">Manage Organizations</h1>
            <p className="text-lg text-muted-foreground">
              Verify, edit, and manage partner organizations
            </p>
          </div>
          <Button className="gap-2">
            <PlusCircle className="h-4 w-4" />
            Add New Organization
          </Button>
        </div>

        <Card className="mb-8">
          <CardContent className="pt-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-grow">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search organizations..."
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
          <TabsList className="grid grid-cols-5 w-full md:w-[800px]">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="verified">Verified</TabsTrigger>
            <TabsTrigger value="pending">Pending</TabsTrigger>
            <TabsTrigger value="rejected">Rejected</TabsTrigger>
            <TabsTrigger value="inactive">Inactive</TabsTrigger>
          </TabsList>

          <TabsContent value={activeTab} className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Partner Organizations</CardTitle>
                <CardDescription>
                  {activeTab === "all" && "All organizations in the system"}
                  {activeTab === "verified" && "Verified partner organizations"}
                  {activeTab === "pending" &&
                    "Organizations pending verification"}
                  {activeTab === "rejected" &&
                    "Organizations that were rejected"}
                  {activeTab === "inactive" && "Inactive organizations"}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Organization</TableHead>
                      <TableHead>Details</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Stats</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredOrganizations.length > 0 ? (
                      filteredOrganizations.map((org) => (
                        <TableRow key={org.id}>
                          <TableCell>
                            <div className="flex items-center space-x-3">
                              <div className="bg-background rounded-full p-1 shadow-sm">
                                <img
                                  src={org.logo}
                                  alt={`${org.name} logo`}
                                  className="w-10 h-10 rounded-full object-cover"
                                />
                              </div>
                              <div>
                                <div className="font-medium">{org.name}</div>
                                <Badge variant="outline" className="mt-1">
                                  {org.category}
                                </Badge>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center text-sm">
                              <MapPin className="h-3.5 w-3.5 mr-1 text-muted-foreground" />
                              {org.location}
                            </div>
                            <div className="flex items-center text-sm mt-1">
                              <Globe className="h-3.5 w-3.5 mr-1 text-muted-foreground" />
                              <a
                                href={org.website}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-primary hover:underline truncate max-w-[180px] inline-block"
                              >
                                {org.website.replace(/^https?:\/\//, "")}
                              </a>
                            </div>
                            <div className="text-sm text-muted-foreground mt-1 truncate max-w-[200px]">
                              Contact: {org.contactPerson}
                            </div>
                          </TableCell>
                          <TableCell>
                            <span
                              className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusBadgeClass(
                                org.status
                              )}`}
                            >
                              {org.status}
                            </span>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center text-sm">
                              <Users className="h-3.5 w-3.5 mr-1 text-muted-foreground" />
                              {org.volunteers.toLocaleString()} volunteers
                            </div>
                            <div className="text-sm text-muted-foreground mt-1">
                              {org.opportunities} active opportunities
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
                                  Edit Organization
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                  <ExternalLink className="h-4 w-4 mr-2" />
                                  View Opportunities
                                </DropdownMenuItem>

                                {org.status === "Pending" && (
                                  <>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem
                                      onClick={() =>
                                        handleStatusChange(org.id, "Verified")
                                      }
                                    >
                                      <CheckCircle className="h-4 w-4 mr-2" />
                                      Verify Organization
                                    </DropdownMenuItem>
                                    <DropdownMenuItem
                                      onClick={() =>
                                        handleStatusChange(org.id, "Rejected")
                                      }
                                    >
                                      <XCircle className="h-4 w-4 mr-2" />
                                      Reject
                                    </DropdownMenuItem>
                                  </>
                                )}

                                {org.status === "Verified" && (
                                  <DropdownMenuItem
                                    onClick={() =>
                                      handleStatusChange(org.id, "Inactive")
                                    }
                                  >
                                    <XCircle className="h-4 w-4 mr-2" />
                                    Mark as Inactive
                                  </DropdownMenuItem>
                                )}

                                {(org.status === "Inactive" ||
                                  org.status === "Rejected") && (
                                  <DropdownMenuItem
                                    onClick={() =>
                                      handleStatusChange(org.id, "Verified")
                                    }
                                  >
                                    <CheckCircle className="h-4 w-4 mr-2" />
                                    Restore as Verified
                                  </DropdownMenuItem>
                                )}

                                <DropdownMenuSeparator />
                                <DropdownMenuItem
                                  onClick={() =>
                                    handleDeleteOrganization(org.id)
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
                        <TableCell colSpan={5} className="text-center py-6">
                          <p className="text-muted-foreground">
                            No organizations found
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

export default ManageOrganizations;
