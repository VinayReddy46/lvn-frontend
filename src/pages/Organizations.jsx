
import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Search, MapPin, Globe, Users, ExternalLink } from 'lucide-react';

// Dummy data for partner organizations
const dummyOrganizations = [
  {
    id: 1,
    name: "Green Earth Initiative",
    description: "A non-profit organization dedicated to environmental conservation through community engagement and education.",
    category: "Environment",
    location: "New York, NY",
    website: "https://example.com/green-earth",
    volunteerCount: 1200,
    logo: "https://images.unsplash.com/photo-1567427017947-545c5f8d16ad?ixlib=rb-1.2.1&auto=format&fit=crop&w=90&q=80",
    image: "https://images.unsplash.com/photo-1492496913980-501348b61469?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80"
  },
  {
    id: 2,
    name: "City Food Bank",
    description: "Working to end hunger in our community by providing food assistance to those in need and addressing the root causes of food insecurity.",
    category: "Food Security",
    location: "Chicago, IL",
    website: "https://example.com/food-bank",
    volunteerCount: 850,
    logo: "https://images.unsplash.com/photo-1551650975-87deedd944c3?ixlib=rb-1.2.1&auto=format&fit=crop&w=90&q=80",
    image: "https://images.unsplash.com/photo-1488521787991-ed7bbafc3f4a?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80"
  },
  {
    id: 3,
    name: "Education For All",
    description: "Promoting access to quality education for underprivileged children through tutoring, mentorship, and educational resources.",
    category: "Education",
    location: "Boston, MA",
    website: "https://example.com/education",
    volunteerCount: 650,
    logo: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?ixlib=rb-1.2.1&auto=format&fit=crop&w=90&q=80",
    image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80"
  },
  {
    id: 4,
    name: "Happy Paws Rescue",
    description: "Rescuing and rehabilitating abandoned and abused animals, and finding them loving forever homes.",
    category: "Animal Welfare",
    location: "San Francisco, CA",
    website: "https://example.com/happy-paws",
    volunteerCount: 320,
    logo: "https://images.unsplash.com/photo-1548199973-03cce0bbc87b?ixlib=rb-1.2.1&auto=format&fit=crop&w=90&q=80",
    image: "https://images.unsplash.com/photo-1548199973-03cce0bbc87b?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80"
  },
  {
    id: 5,
    name: "Elder Care Foundation",
    description: "Improving the quality of life for seniors through companionship, assistance with daily activities, and community engagement.",
    category: "Senior Care",
    location: "Miami, FL",
    website: "https://example.com/elder-care",
    volunteerCount: 430,
    logo: "https://images.unsplash.com/photo-1493894473891-10fc1e5dbd22?ixlib=rb-1.2.1&auto=format&fit=crop&w=90&q=80",
    image: "https://images.unsplash.com/photo-1493894473891-10fc1e5dbd22?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80"
  },
  {
    id: 6,
    name: "Ocean Guardians",
    description: "Protecting marine ecosystems through beach cleanups, education, and advocacy for sustainable ocean policies.",
    category: "Environment",
    location: "Los Angeles, CA",
    website: "https://example.com/ocean-guardians",
    volunteerCount: 580,
    logo: "https://images.unsplash.com/photo-1566864222010-d45675442c31?ixlib=rb-1.2.1&auto=format&fit=crop&w=90&q=80",
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

const Organizations = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All Categories');

  // Filter organizations based on search term and category
  const filteredOrganizations = dummyOrganizations.filter((org) => {
    // Search term filter
    const matchesSearch = org.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         org.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    // Category filter
    const matchesCategory = selectedCategory === 'All Categories' || org.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow pt-32 pb-24 px-6 md:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
            <div>
              <h1 className="text-4xl font-bold mb-2">Partner Organizations</h1>
              <p className="text-lg text-muted-foreground">
                Connect with organizations making a difference in your community
              </p>
            </div>
            <div className="relative w-full md:w-auto">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input 
                type="search" 
                placeholder="Search organizations..." 
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
          </div>
          
          {filteredOrganizations.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredOrganizations.map((org) => (
                <Card key={org.id} className="overflow-hidden hover-card-shadow">
                  <div className="h-48 overflow-hidden relative">
                    <img 
                      src={org.image} 
                      alt={org.name} 
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                    />
                    <div className="absolute top-4 left-4 bg-background rounded-full p-1 shadow-md">
                      <img 
                        src={org.logo} 
                        alt={`${org.name} logo`} 
                        className="w-12 h-12 rounded-full object-cover"
                      />
                    </div>
                  </div>
                  <CardHeader className="p-4 pb-2">
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-xl">{org.name}</CardTitle>
                        <CardDescription className="flex items-center">
                          <MapPin size={14} className="mr-1" />
                          {org.location}
                        </CardDescription>
                      </div>
                      <Badge>{org.category}</Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="p-4 pt-0 space-y-3">
                    <p className="text-sm text-muted-foreground line-clamp-3">
                      {org.description}
                    </p>
                    <div className="flex items-center text-sm">
                      <Users size={16} className="mr-2 text-muted-foreground" />
                      <span>{org.volunteerCount.toLocaleString()} volunteers</span>
                    </div>
                  </CardContent>
                  <CardFooter className="p-4 pt-0 flex justify-between">
                    <Button variant="outline" className="gap-2" asChild>
                      <a href={org.website} target="_blank" rel="noopener noreferrer">
                        <Globe size={16} />
                        Website
                      </a>
                    </Button>
                    <Button className="gap-2">
                      <span>View Opportunities</span>
                      <ExternalLink size={16} />
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-xl font-medium">No organizations found matching your criteria</p>
              <p className="text-muted-foreground mt-2">Try adjusting your search or filters</p>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Organizations;

