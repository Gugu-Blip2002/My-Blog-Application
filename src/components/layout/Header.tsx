
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";

export default function Header() {
  const { isAuthenticated, logout } = useAuth();
  const location = useLocation();
  
  // Don't render header on auth pages
  if (location.pathname === "/login" || location.pathname === "/register") {
    return null;
  }
  
  return (
    <header className="border-b">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link to="/" className="text-2xl font-serif font-bold text-primary">
          BlogFolio
        </Link>
        
        <nav className="flex items-center space-x-4">
          <Link to="/" className="text-sm font-medium hover:text-primary transition-colors">
            Home
          </Link>
          <Link to="/blogs" className="text-sm font-medium hover:text-primary transition-colors">
            Blogs
          </Link>
          
          {isAuthenticated ? (
            <>
              <Link to="/dashboard" className="text-sm font-medium hover:text-primary transition-colors">
                Dashboard
              </Link>
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => logout()}
              >
                Logout
              </Button>
              <Link to="/create">
                <Button size="sm">
                  Create Post
                </Button>
              </Link>
            </>
          ) : (
            <>
              <Link to="/login">
                <Button variant="outline" size="sm">
                  Login
                </Button>
              </Link>
              <Link to="/register">
                <Button size="sm">
                  Sign Up
                </Button>
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}
