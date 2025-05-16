
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import BlogForm from "@/components/blog/BlogForm";
import { useAuth } from "@/context/AuthContext";
import { useBlog } from "@/context/BlogContext";
import { Blog } from "@/types";

export default function EditBlogPage() {
  const { id } = useParams<{ id: string }>();
  const { isAuthenticated, user } = useAuth();
  const { getBlogById, updateBlog } = useBlog();
  const [blog, setBlog] = useState<Blog | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
      return;
    }

    if (id) {
      const blogData = getBlogById(id);
      
      if (blogData) {
        if (user && blogData.author.id === user.id) {
          setBlog(blogData);
        } else {
          // Not the author, redirect
          navigate("/dashboard");
        }
      } else {
        // Blog not found
        navigate("/dashboard");
      }
    }
    
    setIsLoading(false);
  }, [id, isAuthenticated, user, getBlogById, navigate]);

  const handleUpdateBlog = (title: string, content: string) => {
    if (id) {
      updateBlog(id, title, content);
      navigate(`/blogs/${id}`);
    }
  };

  if (isLoading || !isAuthenticated || !blog) {
    return null; // Redirect will happen in useEffect
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto">
          <BlogForm 
            initialData={blog} 
            onSubmit={handleUpdateBlog}
            isEditing
          />
        </div>
      </div>
    </Layout>
  );
}
