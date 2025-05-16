
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { formatDistanceToNow } from "date-fns";
import { Button } from "@/components/ui/button";
import Layout from "@/components/layout/Layout";
import BlogContent from "@/components/blog/BlogContent";
import { useBlog } from "@/context/BlogContext";
import { useAuth } from "@/context/AuthContext";
import { Blog } from "@/types";
import { Edit, Trash } from "lucide-react";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";

export default function BlogDetailPage() {
  const { id } = useParams<{ id: string }>();
  const { getBlogById, deleteBlog } = useBlog();
  const { user, isAuthenticated } = useAuth();
  const [blog, setBlog] = useState<Blog | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthor, setIsAuthor] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      const blogData = getBlogById(id);
      setBlog(blogData);
      
      if (blogData && isAuthenticated && user) {
        setIsAuthor(blogData.author.id === user.id);
      } else {
        setIsAuthor(false);
      }
      
      setIsLoading(false);
    }
  }, [id, getBlogById, user, isAuthenticated]);

  const handleDelete = () => {
    if (id) {
      deleteBlog(id);
      navigate("/dashboard");
    }
  };

  const handleEdit = () => {
    navigate(`/edit/${id}`);
  };

  if (isLoading) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-12 text-center">
          Loading blog post...
        </div>
      </Layout>
    );
  }

  if (!blog) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-12 text-center">
          <h1 className="text-3xl font-serif font-bold mb-4">Blog Post Not Found</h1>
          <p className="mb-8">The blog post you're looking for doesn't exist or has been removed.</p>
          <Button onClick={() => navigate("/blogs")}>
            Back to All Blogs
          </Button>
        </div>
      </Layout>
    );
  }

  const formattedDate = formatDistanceToNow(new Date(blog.createdAt), { 
    addSuffix: true 
  });

  return (
    <Layout>
      <article className="container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto">
          {/* Blog Header */}
          <header className="mb-8">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold mb-4">
              {blog.title}
            </h1>
            <div className="flex items-center justify-between">
              <div className="flex items-center text-sm text-muted-foreground">
                <span className="font-medium text-foreground">
                  {blog.author.name}
                </span>
                <span className="mx-2">•</span>
                <span>{formattedDate}</span>
              </div>
              
              {isAuthor && (
                <div className="flex items-center space-x-2">
                  <Button 
                    variant="ghost" 
                    size="sm"
                    className="flex items-center gap-1"
                    onClick={handleEdit}
                  >
                    <Edit className="h-4 w-4" />
                    Edit
                  </Button>
                  
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button 
                        variant="ghost" 
                        size="sm"
                        className="flex items-center gap-1 text-destructive hover:text-destructive"
                      >
                        <Trash className="h-4 w-4" />
                        Delete
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                        <AlertDialogDescription>
                          This action cannot be undone. This will permanently delete your
                          blog post and remove it from our servers.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction 
                          onClick={handleDelete}
                          className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                        >
                          Delete
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              )}
            </div>
          </header>
          
          {/* Blog Content */}
          <div className="prose-img:rounded-md">
            <BlogContent content={blog.content} />
          </div>
        </div>
      </article>
    </Layout>
  );
}
