
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

const CallToAction = () => {
  return (
    <section className="py-24 px-6 md:px-8">
      <div className="max-w-5xl mx-auto bg-primary rounded-3xl overflow-hidden relative">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1559027615-cd4628902d4a?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80')] mix-blend-overlay opacity-20"></div>
        <div className="relative z-10 py-16 px-8 md:px-12 text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">
              Ready to Make a Difference in Your Community?
            </h2>
            <p className="text-lg mb-8 text-white/90">
              Join thousands of volunteers and organizations creating positive change. 
              Sign up today to start your volunteering journey.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/signup">
                <Button 
                  size="lg" 
                  variant="secondary" 
                  className="text-primary font-medium button-animation gap-2"
                >
                  Get Started
                  <ArrowRight size={18} />
                </Button>
              </Link>
              <Link to="/opportunities">
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="border-white text-white hover:bg-white/20"
                >
                  Browse Opportunities
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;

