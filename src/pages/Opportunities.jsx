
import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Search, Calendar, MapPin, Clock, Filter, Users } from 'lucide-react';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Slider } from '@/components/ui/slider';
import { useAuth } from '@/providers/AuthProvider';

// Dummy data for volunteer opportunities
const dummyOpportunities = [
  {
    id: 1,
    title: "Community Garden Cleanup",
    organization: "Green Earth Initiative",
    description: "Help clean up and maintain our community garden. Tasks include weeding, planting, and general maintenance.",
    location: "Central Park, New York",
    date: "2023-10-15",
    time: "10:00 AM - 2:00 PM",
    category: "Environment",
    spotsAvailable: 8,
    image: "https://images.unsplash.com/photo-1530836369250-ef72a3f5cda8?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80"
  },
  {
    id: 2,
    title: "Food Bank Volunteer",
    organization: "City Food Bank",
    description: "Assist in sorting and packaging food items for distribution to those in need. No experience necessary.",
    location: "Downtown Food Bank, Chicago",
    date: "2023-10-18",
    time: "9:00 AM - 12:00 PM",
    category: "Food Security",
    spotsAvailable: 5,
    image: "https://images.unsplash.com/photo-1593113646773-028c64a8f1b8?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80"
  },
  {
    id: 3,
    title: "After-School Tutoring",
    organization: "Education For All",
    description: "Provide homework help and tutoring to elementary school students. Subjects include math, reading, and science.",
    location: "Lincoln Elementary School, Boston",
    date: "2023-10-20",
    time: "3:30 PM - 5:30 PM",
    category: "Education",
    spotsAvailable: 10,
    image: "https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80"
  },
  {
    id: 4,
    title: "Animal Shelter Assistant",
    organization: "Happy Paws Rescue",
    description: "Help with daily care of shelter animals including feeding, walking dogs, and socializing with cats.",
    location: "Happy Paws Shelter, San Francisco",
    date: "2023-10-22",
    time: "1:00 PM - 4:00 PM",
    category: "Animal Welfare",
    spotsAvailable: 6,
    image: "https://images.unsplash.com/photo-1548199973-03cce0bbc87b?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80"
  },
  {
    id: 5,
    title: "Senior Companion Program",
    organization: "Elder Care Foundation",
    description: "Spend time with elderly residents at a local nursing home. Activities include conversation, games, and reading.",
    location: "Sunny Side Nursing Home, Miami",
    date: "2023-10-25",
    time: "2:00 PM - 4:00 PM",
    category: "Senior Care",
    spotsAvailable: 12,
    image: "https://images.unsplash.com/photo-1516307365426-bea591f05011?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80"
  },
  {
    id: 6,
    title: "Beach Cleanup Project",
    organization: "Ocean Guardians",
    description: "Join us for a day of cleaning up the shoreline to protect marine life and improve beach conditions.",
    location: "Venice Beach, Los Angeles",
    date: "2023-10-28",
    time: "8:00 AM - 12:00 PM",
    category: "Environment",
    spotsAvailable: 20,
    image: "https://images.unsplash.com/photo-1566864222010-d45675442c31?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80"
  }
];

const categories = [
  "All Categories",
  "Environment",
  "Food Security",
  "Education",
  "Animal Welfare",
  "Senior Care",
  "Health",
  "Homeless Support",
  "Arts & Culture"
];

const Opportunities = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All Categories');
  const [showFilters, setShowFilters] = useState(false);
  const [distance, setDistance] = useState([25]);
  const [isRemote, setIsRemote] = useState(false);
  const { isAuthenticated } = useAuth();

  // Filter opportunities based on search term, category, and other filters
  const filteredOpportunities = dummyOpportunities.filter((opportunity) => {
    // Search term filter
    const matchesSearch = opportunity.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         opportunity.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         opportunity.organization.toLowerCase().includes(searchTerm.toLowerCase());
    
    // Category filter
    const matchesCategory = selectedCategory === 'All Categories' || opportunity.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow pt-32 pb-24 px-6 md:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
            <div>
              <h1 className="text-4xl font-bold mb-2">Volunteer Opportunities</h1>
              <p className="text-lg text-muted-foreground">
                Discover meaningful volunteer opportunities in your community
              </p>
            </div>
            <div className="relative w-full md:w-auto">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input 
                type="search" 
                placeholder="Search opportunities..." 
                className="pl-10 pr-4 w-full md:w-[300px]"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          
          <div className="mb-8 flex flex-wrap gap-2">
            {categories.map((category) => (
              <Badge 
                key={category} 
                variant={selectedCategory === category ? "default" : "outline"} 
                className="cursor-pointer"
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </Badge>
            ))}
            <Button 
              variant="outline" 
              size="sm" 
              className="gap-2"
              onClick={() => setShowFilters(!showFilters)}
            >
              <Filter size={16} />
              Filters
            </Button>
          </div>
          
          {showFilters && (
            <Card className="mb-8">
              <CardContent className="pt-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="distance">Distance (miles)</Label>
                    <div className="flex items-center gap-2">
                      <Slider 
                        id="distance"
                        min={0} 
                        max={100} 
                        step={5} 
                        value={distance} 
                        onValueChange={setDistance} 
                      />
                      <span className="w-12 text-center">{distance}</span>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="remote">Remote Only</Label>
                    <div className="flex items-center space-x-2">
                      <Switch 
                        id="remote" 
                        checked={isRemote} 
                        onCheckedChange={setIsRemote} 
                      />
                      <Label htmlFor="remote" className="cursor-pointer">
                        {isRemote ? "Yes" : "No"}
                      </Label>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
          
          {filteredOpportunities.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredOpportunities.map((opportunity) => (
                <Card key={opportunity.id} className="overflow-hidden hover-card-shadow">
                  <div className="h-48 overflow-hidden">
                    <img 
                      src={opportunity.image} 
                      alt={opportunity.title} 
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                    />
                  </div>
                  <CardHeader className="p-4 pb-2">
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-xl">{opportunity.title}</CardTitle>
                        <CardDescription>{opportunity.organization}</CardDescription>
                      </div>
                      <Badge>{opportunity.category}</Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="p-4 pt-0 space-y-3">
                    <p className="text-sm text-muted-foreground line-clamp-2">
                      {opportunity.description}
                    </p>
                    <div className="flex flex-col space-y-2 text-sm">
                      <div className="flex items-center">
                        <MapPin size={16} className="mr-2 text-muted-foreground" />
                        <span>{opportunity.location}</span>
                      </div>
                      <div className="flex items-center">
                        <Calendar size={16} className="mr-2 text-muted-foreground" />
                        <span>{new Date(opportunity.date).toLocaleDateString('en-US', { 
                          weekday: 'long', 
                          year: 'numeric', 
                          month: 'long', 
                          day: 'numeric' 
                        })}</span>
                      </div>
                      <div className="flex items-center">
                        <Clock size={16} className="mr-2 text-muted-foreground" />
                        <span>{opportunity.time}</span>
                      </div>
                      <div className="flex items-center">
                        <Users size={16} className="mr-2 text-muted-foreground" />
                        <span>{opportunity.spotsAvailable} spots available</span>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="p-4 pt-0">
                    <Button className="w-full button-animation">
                      {isAuthenticated ? "Apply Now" : "Sign In to Apply"}
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-xl font-medium">No opportunities found matching your criteria</p>
              <p className="text-muted-foreground mt-2">Try adjusting your search or filters</p>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Opportunities;

