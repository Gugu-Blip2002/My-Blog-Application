
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import BlogForm from "@/components/blog/BlogForm";
import { useAuth } from "@/context/AuthContext";
import { useBlog } from "@/context/BlogContext";

export default function CreateBlogPage() {
  const { isAuthenticated } = useAuth();
  const { createBlog } = useBlog();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    }
  }, [isAuthenticated, navigate]);

  const handleCreateBlog = (title: string, content: string) => {
    createBlog(title, content);
    navigate("/dashboard");
  };

  if (!isAuthenticated) {
    return null; // Redirect will happen in useEffect
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto">
          <BlogForm onSubmit={handleCreateBlog} />
        </div>
      </div>
    </Layout>
  );
}
