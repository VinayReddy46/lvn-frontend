
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Quote } from 'lucide-react';

const testimonials = [
  {
    id: "volunteers",
    title: "Volunteers",
    items: [
      {
        name: "Sarah Johnson",
        role: "Regular Volunteer",
        avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
        quote: "This platform has transformed how I give back to my community. I've connected with amazing organizations and found opportunities that perfectly match my skills and availability."
      },
      {
        name: "Michael Chen",
        role: "Student Volunteer",
        avatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
        quote: "As a student balancing classes and volunteering, this platform has been incredibly helpful. I can easily track my hours and find opportunities that fit my schedule."
      },
      {
        name: "Jessica Rodriguez",
        role: "Professional Volunteer",
        avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
        quote: "I've been able to apply my professional skills to meaningful projects. The ability to search for opportunities based on specific skills has been game-changing for me."
      }
    ]
  },
  {
    id: "organizations",
    title: "Organizations",
    items: [
      {
        name: "David Williams",
        role: "Community Center Director",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
        quote: "Our community center has seen a 50% increase in volunteer participation since joining this platform. The tools for managing volunteers and tracking hours have streamlined our operations."
      },
      {
        name: "Emily Taylor",
        role: "Nonprofit Founder",
        avatar: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
        quote: "As a small nonprofit, we used to struggle with volunteer recruitment. Now we can easily connect with passionate individuals who share our mission and values."
      },
      {
        name: "Robert Kim",
        role: "Event Coordinator",
        avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
        quote: "The messaging system and volunteer management tools have made coordinating our community events so much easier. We can quickly communicate with all volunteers and ensure everyone is prepared."
      }
    ]
  }
];

const TestimonialsSection = () => {
  return (
    <section className="py-24 px-6 md:px-8 bg-gradient-to-b from-background to-secondary/50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Hear From Our Community</h2>
          <p className="text-muted-foreground text-lg">
            Discover how our platform has impacted volunteers and organizations in creating meaningful change.
          </p>
        </div>
        
        <Tabs defaultValue="volunteers" className="w-full">
          <div className="flex justify-center mb-12">
            <TabsList className="grid w-full max-w-md grid-cols-2">
              <TabsTrigger value="volunteers">Volunteers</TabsTrigger>
              <TabsTrigger value="organizations">Organizations</TabsTrigger>
            </TabsList>
          </div>
          
          {testimonials.map((group) => (
            <TabsContent key={group.id} value={group.id} className="mt-0">
              <div className="grid md:grid-cols-3 gap-8">
                {group.items.map((testimonial, i) => (
                  <div key={i} className="bg-card p-6 rounded-xl shadow-md border border-border/50 glass-effect">
                    <Quote className="h-8 w-8 text-primary/30 mb-4" />
                    <p className="text-foreground mb-6 italic">{testimonial.quote}</p>
                    <div className="flex items-center gap-3">
                      <Avatar className="h-12 w-12 border-2 border-primary/20">
                        <AvatarImage src={testimonial.avatar} alt={testimonial.name} />
                        <AvatarFallback>{testimonial.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-semibold">{testimonial.name}</p>
                        <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </section>
  );
};

export default TestimonialsSection;

