
import React from 'react';
import { Calendar, Search, Clock, Award, Users, MessageSquare } from 'lucide-react';
import { cn } from '@/lib/utils';

const features = [
  {
    icon: Search,
    title: "Find Opportunities",
    description: "Search and filter volunteer opportunities based on your interests, skills, and availability.",
    color: "bg-blue-500/10 text-blue-500"
  },
  {
    icon: Users,
    title: "Connect with Organizations",
    description: "Build relationships with local nonprofits and community organizations that share your values.",
    color: "bg-purple-500/10 text-purple-500"
  },
  {
    icon: Calendar,
    title: "Manage Your Schedule",
    description: "Keep track of upcoming volunteer events and manage your availability with our calendar system.",
    color: "bg-green-500/10 text-green-500"
  },
  {
    icon: Clock,
    title: "Track Your Hours",
    description: "Log and verify your volunteer hours for each project, building a comprehensive service record.",
    color: "bg-amber-500/10 text-amber-500"
  },
  {
    icon: MessageSquare,
    title: "Communicate Effectively",
    description: "Our integrated messaging system ensures smooth communication between volunteers and organizations.",
    color: "bg-pink-500/10 text-pink-500"
  },
  {
    icon: Award,
    title: "Showcase Your Impact",
    description: "Build a profile highlighting your contributions, skills, and the positive change you've created.",
    color: "bg-cyan-500/10 text-cyan-500"
  }
];

const FeatureSection = () => {
  return (
    <section className="py-24 px-6 md:px-8 bg-secondary/50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Everything You Need to Make a Difference</h2>
          <p className="text-muted-foreground text-lg">
            Our platform offers comprehensive tools designed to make volunteering easier, more accessible, and more impactful.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="bg-card rounded-xl p-6 hover-card-shadow border border-border/50"
            >
              <div className={cn("w-12 h-12 rounded-lg flex items-center justify-center mb-5", feature.color)}>
                <feature.icon className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeatureSection;

