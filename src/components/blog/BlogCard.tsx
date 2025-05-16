
import { formatDistanceToNow } from "date-fns";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Blog } from "@/types";
import { Link } from "react-router-dom";

interface BlogCardProps {
  blog: Blog;
  showAuthor?: boolean;
  className?: string;
}

export default function BlogCard({ blog, showAuthor = true, className = "" }: BlogCardProps) {
  const formattedDate = formatDistanceToNow(new Date(blog.createdAt), { addSuffix: true });

  return (
    <Card className={`overflow-hidden transition-all hover:shadow-md ${className}`}>
      <Link to={`/blogs/${blog.id}`}>
        <CardHeader className="p-4 pb-2">
          <CardTitle className="text-xl font-serif hover:text-primary transition-colors">
            {blog.title}
          </CardTitle>
          {showAuthor && (
            <CardDescription className="flex items-center text-sm">
              <span className="font-medium">
                {blog.author.name}
              </span>
              <span className="mx-2">•</span>
              <span>{formattedDate}</span>
            </CardDescription>
          )}
        </CardHeader>
        <CardContent className="p-4 pt-2">
          <p className="text-muted-foreground line-clamp-3">
            {blog.excerpt}
          </p>
        </CardContent>
        <CardFooter className="p-4 pt-0">
          <p className="text-sm text-primary">Read more</p>
        </CardFooter>
      </Link>
    </Card>
  );
}
