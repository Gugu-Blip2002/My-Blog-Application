
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Layout from "@/components/layout/Layout";
import BlogCard from "@/components/blog/BlogCard";
import { useBlog } from "@/context/BlogContext";

export default function HomePage() {
  const { blogs, isLoading } = useBlog();
  const [featuredBlogs, setFeaturedBlogs] = useState(blogs.slice(0, 3));
  
  useEffect(() => {
    // Get the latest 3 blogs for featured section
    setFeaturedBlogs(blogs.slice(0, 3));
  }, [blogs]);

  return (
    <Layout>
      {/* Hero Section */}
      <section className="bg-muted/50 py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold mb-6">
              Share Your Stories with the World
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-8">
              A modern platform for bloggers, thinkers, and storytellers.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link to="/blogs">
                <Button size="lg" variant="default">
                  Explore Blogs
                </Button>
              </Link>
              <Link to="/register">
                <Button size="lg" variant="outline">
                  Start Writing
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Blogs Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl md:text-3xl font-serif font-bold">
              Featured Posts
            </h2>
            <Link to="/blogs" className="text-sm text-primary hover:underline">
              View all posts
            </Link>
          </div>
          
          {isLoading ? (
            <div className="text-center py-12">Loading featured posts...</div>
          ) : featuredBlogs.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredBlogs.map((blog) => (
                <BlogCard key={blog.id} blog={blog} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-muted-foreground mb-4">No blog posts available yet.</p>
              <Link to="/create">
                <Button>Create Your First Post</Button>
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-primary text-primary-foreground py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-serif font-bold mb-4">
              Ready to share your story?
            </h2>
            <p className="mb-6 opacity-90">
              Join our community of writers and readers. Create an account to start writing your own blog posts.
            </p>
            <Link to="/register">
              <Button variant="secondary" size="lg">
                Get Started
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
}
