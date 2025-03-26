import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, X, Search, User, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "@/components/ThemeToggle";
import { useAuth } from "@/providers/AuthProvider";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user, isAuthenticated, isOrgAdmin, isSystemAdmin, logout } =
    useAuth();
  const navigate = useNavigate();

  // Determine if user has any admin role
  const isAdmin = isOrgAdmin || isSystemAdmin;

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Handle resize to close mobile menu on desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768 && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [mobileMenuOpen]);

  // Handle click outside mobile menu to close it
  useEffect(() => {
    if (!mobileMenuOpen) return;

    const handleClickOutside = (e) => {
      const target = e.target;
      if (!target.closest("nav") && !target.closest(".mobile-menu")) {
        setMobileMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [mobileMenuOpen]);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 py-4 px-4 sm:px-6 md:px-8",
        isScrolled
          ? "bg-background/95 backdrop-blur-md shadow-sm"
          : "bg-transparent"
      )}
    >
      <nav className="max-w-7xl mx-auto flex justify-between items-center">
        <Link to="/" className="flex items-center space-x-2 group">
          <div className="w-9 h-9 sm:w-10 sm:h-10 bg-primary rounded-lg flex items-center justify-center overflow-hidden transition-transform duration-300 group-hover:scale-110">
            <span className="text-primary-foreground font-bold text-lg">
              VN
            </span>
          </div>
          <span
            className={cn(
              "text-lg sm:text-xl font-semibold transition-all duration-300",
              isScrolled ? "text-foreground" : "text-foreground"
            )}
          >
            VolunteerNetwork
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-4 lg:space-x-6">
          <Link
            to="/opportunities"
            className="text-foreground/90 hover:text-primary transition-colors text-sm lg:text-base"
          >
            Opportunities
          </Link>
          <Link
            to="/organizations"
            className="text-foreground/90 hover:text-primary transition-colors text-sm lg:text-base"
          >
            Organizations
          </Link>
          <Link
            to="/about"
            className="text-foreground/90 hover:text-primary transition-colors text-sm lg:text-base"
          >
            About
          </Link>
          <Link
            to="/contact"
            className="text-foreground/90 hover:text-primary transition-colors text-sm lg:text-base"
          >
            Contact
          </Link>
          {isAuthenticated && (
            <Link
              to="/dashboard"
              className="text-foreground/90 hover:text-primary transition-colors text-sm lg:text-base"
            >
              Dashboard
            </Link>
          )}
          {isAdmin && (
            <Link
              to="/admin"
              className="text-foreground/90 hover:text-primary transition-colors text-sm lg:text-base"
            >
              Admin
            </Link>
          )}
        </div>

        <div className="hidden md:flex items-center space-x-3">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search opportunities..."
              className="pl-9 w-[180px] lg:w-[220px] focus:w-[240px] lg:focus:w-[300px] transition-all duration-300"
            />
          </div>

          <ThemeToggle />

          {isAuthenticated ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="gap-2 relative">
                  <User size={18} />
                  <span>{user?.name.split(" ")[0]}</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="end"
                className="w-56 mt-1"
                sideOffset={8}
              >
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => navigate("/profile")}>
                  Profile
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => navigate("/dashboard")}>
                  Dashboard
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => navigate("/my-opportunities")}>
                  My Opportunities
                </DropdownMenuItem>
                {isAdmin && (
                  <>
                    <DropdownMenuSeparator />
                    <DropdownMenuLabel>Admin</DropdownMenuLabel>
                    <DropdownMenuItem onClick={() => navigate("/admin")}>
                      Admin Dashboard
                    </DropdownMenuItem>
                  </>
                )}
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={logout} className="text-destructive">
                  <LogOut className="mr-2 h-4 w-4" />
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <>
              <Link to="/login">
                <Button variant="ghost" className="gap-2">
                  <User size={18} />
                  <span className="hidden sm:inline">Login</span>
                </Button>
              </Link>

              <Link to="/signup">
                <Button className="button-animation">Sign Up</Button>
              </Link>
            </>
          )}
        </div>

        {/* Mobile menu button */}
        <div className="md:hidden flex items-center space-x-2">
          <ThemeToggle />
          <button
            className="flex items-center p-1 rounded-md hover:bg-accent"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
          >
            {mobileMenuOpen ? (
              <X className="h-6 w-6 text-foreground" />
            ) : (
              <Menu className="h-6 w-6 text-foreground" />
            )}
          </button>
        </div>
      </nav>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <div className="mobile-menu md:hidden fixed inset-0 top-16 bg-background z-40 animate-in fade-in-0 duration-200">
          <div className="flex flex-col p-6 space-y-5">
            <div className="relative mb-4">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search opportunities..."
                className="pl-10"
              />
            </div>

            <Link
              to="/opportunities"
              className="text-base font-medium py-2 border-b border-border"
              onClick={() => setMobileMenuOpen(false)}
            >
              Opportunities
            </Link>
            <Link
              to="/organizations"
              className="text-base font-medium py-2 border-b border-border"
              onClick={() => setMobileMenuOpen(false)}
            >
              Organizations
            </Link>
            <Link
              to="/about"
              className="text-base font-medium py-2 border-b border-border"
              onClick={() => setMobileMenuOpen(false)}
            >
              About
            </Link>
            <Link
              to="/contact"
              className="text-base font-medium py-2 border-b border-border"
              onClick={() => setMobileMenuOpen(false)}
            >
              Contact
            </Link>

            {isAuthenticated ? (
              <>
                <Link
                  to="/dashboard"
                  className="text-base font-medium py-2 border-b border-border"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Dashboard
                </Link>
                {isAdmin && (
                  <Link
                    to="/admin"
                    className="text-base font-medium py-2 border-b border-border"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Admin
                  </Link>
                )}

                <Button
                  variant="outline"
                  className="w-full justify-center gap-2 mt-4"
                  onClick={() => {
                    logout();
                    setMobileMenuOpen(false);
                  }}
                >
                  <LogOut size={18} />
                  <span>Logout</span>
                </Button>
              </>
            ) : (
              <div className="flex flex-col space-y-3 pt-4">
                <Link to="/login" onClick={() => setMobileMenuOpen(false)}>
                  <Button
                    variant="outline"
                    className="w-full justify-center gap-2"
                  >
                    <User size={18} />
                    <span>Login</span>
                  </Button>
                </Link>

                <Link to="/signup" onClick={() => setMobileMenuOpen(false)}>
                  <Button className="w-full justify-center">Sign Up</Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
