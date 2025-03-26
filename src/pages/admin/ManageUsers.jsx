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
  ShieldCheck,
  Shield,
  User,
  Mail,
  CalendarClock,
  Clock,
  UserCog,
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

// Dummy data for users
const dummyUsers = [
  {
    id: 1,
    name: "John Smith",
    email: "john.smith@example.com",
    role: "user",
    status: "Active",
    createdAt: "2023-03-15",
    lastActive: "2023-09-25",
    totalHours: 32,
    interests: ["Environment", "Education"],
    skills: ["Teaching", "Gardening"],
    avatar:
      "https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-1.2.1&auto=format&fit=crop&w=90&q=80",
  },
  {
    id: 2,
    name: "Jane Doe",
    email: "jane.doe@example.com",
    role: "user",
    status: "Active",
    createdAt: "2023-04-10",
    lastActive: "2023-09-28",
    totalHours: 45,
    interests: ["Animal Welfare", "Senior Care"],
    skills: ["Event Planning", "First Aid"],
    avatar:
      "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-1.2.1&auto=format&fit=crop&w=90&q=80",
  },
  {
    id: 3,
    name: "Michael Johnson",
    email: "michael.johnson@example.com",
    role: "admin",
    status: "Active",
    createdAt: "2023-01-20",
    lastActive: "2023-09-30",
    totalHours: 18,
    interests: ["Food Security", "Homeless Support"],
    skills: ["Web Development", "Marketing"],
    avatar:
      "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-1.2.1&auto=format&fit=crop&w=90&q=80",
  },
  {
    id: 4,
    name: "Sarah Williams",
    email: "sarah.williams@example.com",
    role: "user",
    status: "Inactive",
    createdAt: "2023-05-05",
    lastActive: "2023-07-15",
    totalHours: 12,
    interests: ["Education", "Arts & Culture"],
    skills: ["Teaching", "Art"],
    avatar:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-1.2.1&auto=format&fit=crop&w=90&q=80",
  },
  {
    id: 5,
    name: "David Brown",
    email: "david.brown@example.com",
    role: "user",
    status: "Active",
    createdAt: "2023-06-12",
    lastActive: "2023-09-27",
    totalHours: 28,
    interests: ["Environment", "Food Security"],
    skills: ["Cooking", "Gardening"],
    avatar:
      "https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?ixlib=rb-1.2.1&auto=format&fit=crop&w=90&q=80",
  },
  {
    id: 6,
    name: "Emily Davis",
    email: "emily.davis@example.com",
    role: "user",
    status: "Pending",
    createdAt: "2023-09-10",
    lastActive: "2023-09-10",
    totalHours: 0,
    interests: ["Animal Welfare", "Health"],
    skills: ["Veterinary Care", "First Aid"],
    avatar:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-1.2.1&auto=format&fit=crop&w=90&q=80",
  },
  {
    id: 7,
    name: "Robert Wilson",
    email: "robert.wilson@example.com",
    role: "admin",
    status: "Active",
    createdAt: "2023-02-25",
    lastActive: "2023-09-29",
    totalHours: 15,
    interests: ["Homeless Support", "Senior Care"],
    skills: ["Management", "Counseling"],
    avatar:
      "https://images.unsplash.com/photo-1552374196-c4e7ffc6e126?ixlib=rb-1.2.1&auto=format&fit=crop&w=90&q=80",
  },
];

const getStatusBadgeClass = (status) => {
  switch (status) {
    case "Active":
      return "bg-green-100 text-green-800 dark:bg-green-800/20 dark:text-green-400";
    case "Inactive":
      return "bg-gray-100 text-gray-800 dark:bg-gray-800/20 dark:text-gray-400";
    case "Pending":
      return "bg-yellow-100 text-yellow-800 dark:bg-yellow-800/20 dark:text-yellow-400";
    default:
      return "bg-gray-100 text-gray-800 dark:bg-gray-800/20 dark:text-gray-400";
  }
};

const getRoleBadgeClass = (role) => {
  switch (role) {
    case "admin":
      return "bg-purple-100 text-purple-800 dark:bg-purple-800/20 dark:text-purple-400";
    case "user":
      return "bg-blue-100 text-blue-800 dark:bg-blue-800/20 dark:text-blue-400";
    default:
      return "bg-gray-100 text-gray-800 dark:bg-gray-800/20 dark:text-gray-400";
  }
};

const ManageUsers = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("all");

  // Filter users based on search term and active tab
  const filteredUsers = dummyUsers.filter((user) => {
    // Search term filter
    const matchesSearch =
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase());

    // Tab filter
    const matchesTab =
      activeTab === "all" ||
      (activeTab === "active" && user.status === "Active") ||
      (activeTab === "inactive" && user.status === "Inactive") ||
      (activeTab === "pending" && user.status === "Pending") ||
      (activeTab === "admins" && user.role === "admin");

    return matchesSearch && matchesTab;
  });

  const handleRoleChange = (userId, newRole) => {
    toast.success(`User role updated to ${newRole}`);
  };

  const handleStatusChange = (userId, newStatus) => {
    toast.success(`User status updated to ${newStatus}`);
  };

  const handleDeleteUser = (userId) => {
    toast.success("User successfully deleted");
  };

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-grow pt-32 pb-24 px-6 md:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
            <div>
              <h1 className="text-4xl font-bold mb-2">Manage Users</h1>
              <p className="text-lg text-muted-foreground">
                View and manage user accounts and permissions
              </p>
            </div>
            <Button className="gap-2">
              <PlusCircle className="h-4 w-4" />
              Add New User
            </Button>
          </div>

          <Card className="mb-8">
            <CardContent className="pt-6">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="relative flex-grow">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder="Search users by name or email..."
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
            <TabsList className="grid grid-cols-5 w-full md:w-[700px]">
              <TabsTrigger value="all">All Users</TabsTrigger>
              <TabsTrigger value="active">Active</TabsTrigger>
              <TabsTrigger value="inactive">Inactive</TabsTrigger>
              <TabsTrigger value="pending">Pending</TabsTrigger>
              <TabsTrigger value="admins">Admins</TabsTrigger>
            </TabsList>

            <TabsContent value={activeTab} className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>User Accounts</CardTitle>
                  <CardDescription>
                    {activeTab === "all" &&
                      "All registered users in the system"}
                    {activeTab === "active" && "Currently active users"}
                    {activeTab === "inactive" && "Inactive user accounts"}
                    {activeTab === "pending" &&
                      "Users with pending verification"}
                    {activeTab === "admins" &&
                      "Users with administrator privileges"}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>User</TableHead>
                        <TableHead>Contact</TableHead>
                        <TableHead>Status & Role</TableHead>
                        <TableHead>Activity</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredUsers.length > 0 ? (
                        filteredUsers.map((user) => (
                          <TableRow key={user.id}>
                            <TableCell>
                              <div className="flex items-center space-x-3">
                                <div className="bg-background rounded-full p-1 shadow-sm">
                                  <img
                                    src={user.avatar}
                                    alt={`${user.name} avatar`}
                                    className="w-10 h-10 rounded-full object-cover"
                                  />
                                </div>
                                <div>
                                  <div className="font-medium">{user.name}</div>
                                  <div className="flex flex-wrap gap-1 mt-1">
                                    {user.interests
                                      .slice(0, 2)
                                      .map((interest) => (
                                        <Badge
                                          key={interest}
                                          variant="outline"
                                          className="text-xs"
                                        >
                                          {interest}
                                        </Badge>
                                      ))}
                                  </div>
                                </div>
                              </div>
                            </TableCell>
                            <TableCell>
                              <div className="flex items-center text-sm">
                                <Mail className="h-3.5 w-3.5 mr-1 text-muted-foreground" />
                                <span className="truncate max-w-[180px]">
                                  {user.email}
                                </span>
                              </div>
                              <div className="flex flex-wrap gap-1 mt-1">
                                {user.skills.map((skill) => (
                                  <span
                                    key={skill}
                                    className="text-xs text-muted-foreground"
                                  >
                                    {skill}
                                  </span>
                                ))}
                              </div>
                            </TableCell>
                            <TableCell>
                              <div className="space-y-1">
                                <span
                                  className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusBadgeClass(
                                    user.status
                                  )}`}
                                >
                                  {user.status}
                                </span>
                                <span
                                  className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getRoleBadgeClass(
                                    user.role
                                  )}`}
                                >
                                  {user.role === "admin"
                                    ? "Administrator"
                                    : "Volunteer"}
                                </span>
                              </div>
                            </TableCell>
                            <TableCell>
                              <div className="flex items-center text-sm">
                                <CalendarClock className="h-3.5 w-3.5 mr-1 text-muted-foreground" />
                                Last active:{" "}
                                {new Date(user.lastActive).toLocaleDateString()}
                              </div>
                              <div className="flex items-center text-sm mt-1">
                                <Clock className="h-3.5 w-3.5 mr-1 text-muted-foreground" />
                                Hours: {user.totalHours}
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
                                    View Profile
                                  </DropdownMenuItem>
                                  <DropdownMenuItem>
                                    <Edit className="h-4 w-4 mr-2" />
                                    Edit User
                                  </DropdownMenuItem>

                                  <DropdownMenuSeparator />
                                  <DropdownMenuItem>
                                    <UserCog className="h-4 w-4 mr-2" />
                                    Manage Access
                                  </DropdownMenuItem>

                                  {user.role === "user" ? (
                                    <DropdownMenuItem
                                      onClick={() =>
                                        handleRoleChange(user.id, "admin")
                                      }
                                    >
                                      <ShieldCheck className="h-4 w-4 mr-2" />
                                      Make Admin
                                    </DropdownMenuItem>
                                  ) : (
                                    <DropdownMenuItem
                                      onClick={() =>
                                        handleRoleChange(user.id, "user")
                                      }
                                    >
                                      <Shield className="h-4 w-4 mr-2" />
                                      Remove Admin
                                    </DropdownMenuItem>
                                  )}

                                  {user.status === "Active" ? (
                                    <DropdownMenuItem
                                      onClick={() =>
                                        handleStatusChange(user.id, "Inactive")
                                      }
                                    >
                                      <User className="h-4 w-4 mr-2" />
                                      Deactivate User
                                    </DropdownMenuItem>
                                  ) : (
                                    <DropdownMenuItem
                                      onClick={() =>
                                        handleStatusChange(user.id, "Active")
                                      }
                                    >
                                      <User className="h-4 w-4 mr-2" />
                                      Activate User
                                    </DropdownMenuItem>
                                  )}

                                  <DropdownMenuSeparator />
                                  <DropdownMenuItem
                                    onClick={() => handleDeleteUser(user.id)}
                                    className="text-destructive"
                                  >
                                    <Trash2 className="h-4 w-4 mr-2" />
                                    Delete User
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
                              No users found
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
      </main>
    </div>
  );
};

export default ManageUsers;
