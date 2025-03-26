
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const About = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow pt-32 pb-24 px-6 md:px-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl font-bold mb-6">About Volunteer Network</h1>
          <p className="text-lg text-muted-foreground mb-12">
            Learn about our mission to connect volunteers with meaningful opportunities
            and create positive change in communities worldwide.
          </p>
          
          {/* Placeholder for future implementation */}
          <div className="p-12 rounded-lg border border-dashed border-border flex flex-col items-center justify-center text-center">
            <h3 className="text-xl font-medium mb-4">About Page Coming Soon</h3>
            <p className="text-muted-foreground">
              We're working on crafting our story and mission to share with you.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default About;

