
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Blog } from "@/types";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface BlogFormProps {
  initialData?: Blog;
  onSubmit: (title: string, content: string) => void;
  isEditing?: boolean;
}

export default function BlogForm({ initialData, onSubmit, isEditing = false }: BlogFormProps) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (initialData) {
      setTitle(initialData.title);
      setContent(initialData.content);
    }
  }, [initialData]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    onSubmit(title, content);
    
    if (!isEditing) {
      setTitle("");
      setContent("");
    }
    
    setIsSubmitting(false);
  };

  return (
    <Card className="w-full">
      <CardHeader className="space-y-1">
        <div className="flex items-center gap-2">
          <Button 
            variant="ghost" 
            size="icon" 
            className="h-8 w-8 rounded-full"
            onClick={() => navigate(-1)}
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <CardTitle>{isEditing ? "Edit Blog Post" : "Create New Blog Post"}</CardTitle>
        </div>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter a catchy title"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="content">Content</Label>
            <div className="text-xs text-muted-foreground mb-1">
              Supports Markdown formatting
            </div>
            <Textarea
              id="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Write your blog content here... (Markdown supported)"
              className="min-h-[300px] font-mono"
              required
            />
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button 
            type="button" 
            variant="outline"
            onClick={() => navigate(-1)}
          >
            Cancel
          </Button>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? 
              (isEditing ? "Updating..." : "Publishing...") : 
              (isEditing ? "Update Post" : "Publish Post")
            }
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}
