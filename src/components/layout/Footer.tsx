
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";

export default function Footer() {
  const location = useLocation();
  
  // Don't render footer on auth pages
  if (location.pathname === "/login" || location.pathname === "/register") {
    return null;
  }

  return (
    <footer className="bg-muted mt-auto">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <Link to="/" className="text-xl font-serif font-bold text-primary">
              BlogFolio
            </Link>
            <p className="mt-2 text-sm text-muted-foreground">
              A place to share your thoughts and ideas with the world.
            </p>
          </div>
          
          <div>
            <h3 className="text-sm font-medium">Quick Links</h3>
            <div className="mt-2 flex flex-col space-y-2">
              <Link to="/" className="text-sm text-muted-foreground hover:text-foreground">
                Home
              </Link>
              <Link to="/blogs" className="text-sm text-muted-foreground hover:text-foreground">
                All Blogs
              </Link>
              <Link to="/create" className="text-sm text-muted-foreground hover:text-foreground">
                Create Blog
              </Link>
            </div>
          </div>
          
          <div>
            <h3 className="text-sm font-medium">About</h3>
            <div className="mt-2 flex flex-col space-y-2">
              <p className="text-sm text-muted-foreground">
                This is a demo blog application built with React, TypeScript, and Tailwind CSS.
              </p>
              <p className="text-sm text-muted-foreground">
                Features include authentication, blog creation, and responsive design.
              </p>
            </div>
          </div>
        </div>
        
        <div className="mt-8 border-t pt-4">
          <p className="text-center text-sm text-muted-foreground">
            © {new Date().getFullYear()} BlogFolio. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
