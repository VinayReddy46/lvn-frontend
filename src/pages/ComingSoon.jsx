import { useLocation, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Construction, Clock } from "lucide-react";
import { useEffect } from "react";

const ComingSoon = () => {
  const location = useLocation();
  const path = location.pathname.split("/").pop();
  const pageName = path.charAt(0).toUpperCase() + path.slice(1);

  useEffect(() => {
    // Log for analytics purposes
    console.info(`User visited coming soon page: ${location.pathname}`);
  }, [location.pathname]);

  return (
    <div className="container py-10 max-w-4xl mx-auto">
      <div className="text-center space-y-8 animate-fade-in">
        <div className="flex flex-col items-center justify-center gap-3">
          <div className="bg-primary/10 p-6 rounded-full inline-flex">
            <Construction className="h-16 w-16 text-primary" />
          </div>
          <h1 className="text-4xl font-bold mt-6">{pageName} Coming Soon</h1>
          <p className="text-xl text-muted-foreground max-w-xl">
            We're working hard to bring you this feature. Please check back
            soon!
          </p>
        </div>

        <div className="flex items-center justify-center gap-2 text-muted-foreground">
          <Clock className="h-5 w-5" />
          <span>Feature in development</span>
        </div>

        <div className="mt-8 grid gap-8 md:grid-cols-2 max-w-2xl mx-auto">
          <div className="bg-card border rounded-xl p-6 text-left">
            <h3 className="text-lg font-medium mb-2">What to expect</h3>
            <p className="text-muted-foreground">
              The {pageName.toLowerCase()} feature will enhance your volunteer
              experience with powerful tools to manage your activities and
              engagement.
            </p>
          </div>
          <div className="bg-card border rounded-xl p-6 text-left">
            <h3 className="text-lg font-medium mb-2">In the meantime</h3>
            <p className="text-muted-foreground">
              You can explore other available features or visit your dashboard
              to check current opportunities.
            </p>
          </div>
        </div>

        <div className="mt-8">
          <Link to="/dashboard">
            <Button variant="default" size="lg" className="gap-2">
              <ArrowLeft size={18} />
              Return to Dashboard
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ComingSoon;
