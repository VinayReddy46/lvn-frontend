
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight, Heart, Clock, Star } from 'lucide-react';

const HeroSection = () => {
  return (
    <section className="hero-section pt-32 pb-24 md:py-36 px-6 md:px-8">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
        <div className="space-y-8 md:pr-12 max-w-2xl">
          <div className="space-y-4">
            <div className="bg-primary/10 w-fit px-4 py-2 rounded-full">
              <p className="text-primary font-medium text-sm">Make an impact in your community</p>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
              Connect, <span className="text-gradient">Volunteer</span>, and Create Positive Change
            </h1>
            <p className="text-lg text-muted-foreground">
              Join our platform to discover local volunteer opportunities, 
              connect with organizations, and track your impact in making the world a better place.
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <Link to="/signup">
              <Button size="lg" className="button-animation gap-2 text-base px-6">
                Get Started
                <ArrowRight size={18} />
              </Button>
            </Link>
            <Link to="/opportunities">
              <Button size="lg" variant="outline" className="text-base px-6">
                Browse Opportunities
              </Button>
            </Link>
          </div>
          
          <div className="flex flex-wrap gap-8 pt-4">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                <Heart className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="font-medium">500+</p>
                <p className="text-sm text-muted-foreground">Organizations</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                <Clock className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="font-medium">10,000+</p>
                <p className="text-sm text-muted-foreground">Volunteer Hours</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                <Star className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="font-medium">2,000+</p>
                <p className="text-sm text-muted-foreground">Opportunities</p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="relative">
          <div className="aspect-video relative shadow-2xl shadow-primary/20 rounded-2xl overflow-hidden animate-float">
            <div className="absolute inset-0 bg-gradient-to-tr from-primary/30 to-blue-600/20 mix-blend-overlay"></div>
            <img 
              src="https://images.unsplash.com/photo-1559027615-cd4628902d4a?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80" 
              alt="Volunteers working together" 
              className="w-full h-full object-cover"
            />
          </div>
          <div className="absolute -bottom-6 -left-6 glass-effect p-4 rounded-lg shadow-lg max-w-xs animate-fade-in">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                <Star className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="font-medium text-sm">Join 5,000+ volunteers</p>
                <p className="text-xs text-muted-foreground">Making a difference every day</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;

