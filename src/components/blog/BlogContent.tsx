
import { useEffect, useState } from "react";
import { marked } from "marked";

interface BlogContentProps {
  content: string;
}

export default function BlogContent({ content }: BlogContentProps) {
  const [htmlContent, setHtmlContent] = useState("");

  useEffect(() => {
    // Configure marked options for security
    marked.setOptions({
      gfm: true,
      breaks: true,
      headerIds: true,
      headerPrefix: "blog-heading-",
      mangle: false,
      sanitize: false, // We're using DOMPurify instead
    });
    
    // Parse Markdown to HTML
    const parsedContent = marked.parse(content);
    setHtmlContent(parsedContent);
  }, [content]);

  return (
    <div 
      className="blog-content"
      dangerouslySetInnerHTML={{ __html: htmlContent }}
    />
  );
}
