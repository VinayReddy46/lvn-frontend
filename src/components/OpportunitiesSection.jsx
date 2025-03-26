
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MapPin, Calendar, Clock, ArrowRight, Users } from 'lucide-react';

// Mock data for demonstration
const opportunitiesData = [
  {
    id: 1,
    title: "Community Garden Cleanup",
    organization: "Green City Initiative",
    location: "Riverdale Park",
    date: "June 15, 2023",
    time: "9:00 AM - 1:00 PM",
    spots: 5,
    categories: ["Environment", "Outdoors"],
    image: "https://images.unsplash.com/photo-1592150621744-aca64f48394a?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
  },
  {
    id: 2,
    title: "Food Bank Assistant",
    organization: "City Food Bank",
    location: "Downtown Community Center",
    date: "June 18, 2023",
    time: "2:00 PM - 5:00 PM",
    spots: 8,
    categories: ["Food Security", "Community Service"],
    image: "https://images.unsplash.com/photo-1593113598332-cd59a93e6f6a?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
  },
  {
    id: 3,
    title: "Youth Mentor Program",
    organization: "Bright Future Foundation",
    location: "Westside Community School",
    date: "Ongoing",
    time: "Flexible Hours",
    spots: 10,
    categories: ["Education", "Youth"],
    image: "https://images.unsplash.com/photo-1529390079861-591de354faf5?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
  }
];

const OpportunitiesSection = () => {
  return (
    <section className="py-24 px-6 md:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Featured Opportunities</h2>
            <p className="text-muted-foreground text-lg max-w-2xl">
              Discover meaningful volunteer opportunities in your community and start making an impact today.
            </p>
          </div>
          <Link to="/opportunities">
            <Button variant="outline" className="gap-2">
              View All
              <ArrowRight size={16} />
            </Button>
          </Link>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {opportunitiesData.map((opportunity) => (
            <Card key={opportunity.id} className="overflow-hidden hover-card-shadow border-border/50">
              <div className="relative h-48 overflow-hidden">
                <img 
                  src={opportunity.image} 
                  alt={opportunity.title} 
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                />
                <div className="absolute top-4 left-4 flex gap-2">
                  {opportunity.categories.map((category, index) => (
                    <Badge key={index} variant="secondary" className="bg-white/80 backdrop-blur-sm text-foreground">
                      {category}
                    </Badge>
                  ))}
                </div>
              </div>
              
              <CardHeader className="pt-5 pb-2">
                <div className="text-sm text-primary font-medium">{opportunity.organization}</div>
                <h3 className="text-xl font-semibold leading-tight">{opportunity.title}</h3>
              </CardHeader>
              
              <CardContent className="space-y-3 pb-3">
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">{opportunity.location}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">{opportunity.date}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">{opportunity.time}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">{opportunity.spots} spots remaining</span>
                </div>
              </CardContent>
              
              <CardFooter>
                <Button className="w-full gap-2 button-animation">
                  Apply Now
                  <ArrowRight size={16} />
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default OpportunitiesSection;

