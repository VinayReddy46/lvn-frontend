
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const Contact = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow pt-32 pb-24 px-6 md:px-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl font-bold mb-6">Contact Us</h1>
          <p className="text-lg text-muted-foreground mb-12">
            Have questions or feedback? We'd love to hear from you.
            Use the form below to get in touch with our team.
          </p>
          
          {/* Placeholder for future implementation */}
          <div className="p-12 rounded-lg border border-dashed border-border flex flex-col items-center justify-center text-center">
            <h3 className="text-xl font-medium mb-4">Contact Form Coming Soon</h3>
            <p className="text-muted-foreground">
              We're working on implementing a contact form to make it easy for you to reach us.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Contact;

