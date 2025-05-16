
import { useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Layout from "@/components/layout/Layout";
import BlogCard from "@/components/blog/BlogCard";
import { useAuth } from "@/context/AuthContext";
import { useBlog } from "@/context/BlogContext";

export default function DashboardPage() {
  const { isAuthenticated, user } = useAuth();
  const { userBlogs, isLoading } = useBlog();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    }
  }, [isAuthenticated, navigate]);

  if (!isAuthenticated || !user) {
    return null; // Redirect will happen in useEffect
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-5xl mx-auto">
          {/* Welcome Card */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="text-2xl">Welcome, {user.name}!</CardTitle>
              <CardDescription>
                Manage your blog posts and create new content
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-wrap gap-4">
              <Link to="/create">
                <Button>Create New Post</Button>
              </Link>
              <Link to="/blogs">
                <Button variant="outline">View All Posts</Button>
              </Link>
            </CardContent>
          </Card>

          {/* User's Blog Posts */}
          <h2 className="text-xl font-serif font-bold mb-4">Your Blog Posts</h2>
          
          {isLoading ? (
            <div className="text-center py-12">Loading your posts...</div>
          ) : userBlogs.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {userBlogs.map((blog) => (
                <BlogCard 
                  key={blog.id} 
                  blog={blog} 
                  showAuthor={false}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <p className="text-muted-foreground mb-4">You haven't created any blog posts yet.</p>
              <Link to="/create">
                <Button>Create Your First Post</Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}
