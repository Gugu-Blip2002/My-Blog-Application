
import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { useToast } from "@/components/ui/use-toast";
import { Blog, User } from "@/types";
import { useAuth } from "./AuthContext";

interface BlogContextType {
  blogs: Blog[];
  userBlogs: Blog[];
  isLoading: boolean;
  createBlog: (title: string, content: string) => void;
  updateBlog: (id: string, title: string, content: string) => void;
  deleteBlog: (id: string) => void;
  getBlogById: (id: string) => Blog | undefined;
}

const BlogContext = createContext<BlogContextType | undefined>(undefined);

// Generate excerpt from content
const generateExcerpt = (content: string, maxLength: number = 150) => {
  if (content.length <= maxLength) return content;
  return content.substring(0, maxLength).trim() + "...";
};

// Sample blog data for demo purposes
const INITIAL_BLOGS: Blog[] = [
  {
    id: "1",
    title: "Getting Started with React",
    content: `
      # Getting Started with React

      React is a JavaScript library for building user interfaces. It's maintained by Facebook and a community of individual developers and companies.

      ## Why React?

      React allows developers to create large web applications that can change data, without reloading the page. Its main goal is to be fast, simple, and scalable.

      ## Key Features

      - **Component-Based**: Build encapsulated components that manage their own state, then compose them to make complex UIs.
      - **Declarative**: React makes it painless to create interactive UIs. Design simple views for each state in your application.
      - **Learn Once, Write Anywhere**: You can develop new features in React without rewriting existing code.

      ## Getting Started

      To start using React, you need to include it in your project. The easiest way is to use Create React App:

      \`\`\`bash
      npx create-react-app my-app
      cd my-app
      npm start
      \`\`\`

      This will create a new React application and start a development server.
    `,
    excerpt: "React is a JavaScript library for building user interfaces. It's maintained by Facebook and a community of individual developers and companies.",
    author: {
      id: "2",
      email: "jane@example.com",
      name: "Jane Smith",
      createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString()
    },
    createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString()
  },
  {
    id: "2",
    title: "Advanced CSS Techniques",
    content: `
      # Advanced CSS Techniques

      CSS has evolved significantly over the years, and modern CSS offers powerful features that make complex layouts and effects much easier to implement.

      ## CSS Grid Layout

      CSS Grid Layout is a two-dimensional layout system for the web. It lets you lay out items in rows and columns, and has many features that make building complex layouts straightforward.

      \`\`\`css
      .container {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
        grid-gap: 20px;
      }
      \`\`\`

      ## CSS Variables (Custom Properties)

      CSS Variables allow you to define named variables that contain specific values to be reused throughout your document.

      \`\`\`css
      :root {
        --main-bg-color: #f8f9fa;
        --main-text-color: #212529;
        --main-padding: 15px;
      }

      .container {
        background-color: var(--main-bg-color);
        color: var(--main-text-color);
        padding: var(--main-padding);
      }
      \`\`\`

      ## CSS Animations

      CSS Animations make it possible to animate transitions from one CSS style configuration to another.

      \`\`\`css
      @keyframes slide-in {
        0% {
          transform: translateX(-100%);
        }
        100% {
          transform: translateX(0);
        }
      }

      .animated-element {
        animation: slide-in 0.5s forwards;
      }
      \`\`\`
    `,
    excerpt: "CSS has evolved significantly over the years, and modern CSS offers powerful features that make complex layouts and effects much easier to implement.",
    author: {
      id: "1",
      email: "demo@example.com",
      name: "Demo User",
      createdAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString()
    },
    createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString()
  },
  {
    id: "3",
    title: "Introduction to TypeScript",
    content: `
      # Introduction to TypeScript

      TypeScript is a strongly typed programming language that builds on JavaScript, giving you better tooling at any scale.

      ## Why TypeScript?

      TypeScript adds static types to JavaScript, which helps catch errors early in the development process rather than at runtime. It also provides better IDE support, making it easier to work with large codebases.

      ## Key Features

      - **Static Typing**: TypeScript adds type checking to JavaScript, helping catch errors before your code runs.
      - **IDE Support**: Better autocomplete, navigation, and refactoring services.
      - **ECMAScript Compatibility**: TypeScript supports the latest ECMAScript features and compiles down to older JavaScript versions for browser compatibility.

      ## Basic Types

      Here are some of the basic types in TypeScript:

      \`\`\`typescript
      // Basic types
      let isDone: boolean = false;
      let decimal: number = 6;
      let color: string = "blue";
      let list: number[] = [1, 2, 3];
      let x: [string, number] = ["hello", 10]; // Tuple

      // Enum
      enum Color {Red, Green, Blue}
      let c: Color = Color.Green;

      // Any
      let notSure: any = 4;
      notSure = "maybe a string instead";
      notSure = false; // okay, definitely a boolean

      // Void
      function warnUser(): void {
        console.log("This is a warning message");
      }
      \`\`\`

      ## Getting Started

      To start using TypeScript in your project:

      \`\`\`bash
      # Install TypeScript
      npm install -g typescript

      # Create a tsconfig.json file
      tsc --init

      # Compile TypeScript to JavaScript
      tsc
      \`\`\`

      With these basics, you can start building more robust JavaScript applications with TypeScript.
    `,
    excerpt: "TypeScript is a strongly typed programming language that builds on JavaScript, giving you better tooling at any scale.",
    author: {
      id: "2",
      email: "jane@example.com",
      name: "Jane Smith",
      createdAt: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString()
    },
    createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString()
  },
];

export const BlogProvider = ({ children }: { children: ReactNode }) => {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();
  const { user, isAuthenticated } = useAuth();

  useEffect(() => {
    // Load blogs from localStorage or use initial data
    const storedBlogs = localStorage.getItem("blogs");
    
    if (storedBlogs) {
      try {
        setBlogs(JSON.parse(storedBlogs));
      } catch (error) {
        console.error("Failed to parse stored blogs:", error);
        setBlogs(INITIAL_BLOGS);
        localStorage.setItem("blogs", JSON.stringify(INITIAL_BLOGS));
      }
    } else {
      setBlogs(INITIAL_BLOGS);
      localStorage.setItem("blogs", JSON.stringify(INITIAL_BLOGS));
    }
    
    setIsLoading(false);
  }, []);

  // Filter blogs by current user
  const userBlogs = isAuthenticated && user 
    ? blogs.filter(blog => blog.author.id === user.id) 
    : [];

  const getBlogById = (id: string) => {
    return blogs.find(blog => blog.id === id);
  };

  const createBlog = (title: string, content: string) => {
    if (!isAuthenticated || !user) {
      toast({
        title: "Authentication Error",
        description: "You must be logged in to create a blog post.",
        variant: "destructive"
      });
      return;
    }

    const newBlog: Blog = {
      id: Date.now().toString(),
      title,
      content,
      excerpt: generateExcerpt(content),
      author: user,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    const updatedBlogs = [newBlog, ...blogs];
    setBlogs(updatedBlogs);
    localStorage.setItem("blogs", JSON.stringify(updatedBlogs));

    toast({
      title: "Blog Created",
      description: "Your blog post has been published successfully."
    });
  };

  const updateBlog = (id: string, title: string, content: string) => {
    if (!isAuthenticated || !user) {
      toast({
        title: "Authentication Error",
        description: "You must be logged in to update a blog post.",
        variant: "destructive"
      });
      return;
    }

    const blogIndex = blogs.findIndex(blog => blog.id === id);
    
    if (blogIndex === -1) {
      toast({
        title: "Blog Not Found",
        description: "The blog post you're trying to update doesn't exist.",
        variant: "destructive"
      });
      return;
    }

    const blog = blogs[blogIndex];
    
    if (blog.author.id !== user.id) {
      toast({
        title: "Permission Denied",
        description: "You can only edit your own blog posts.",
        variant: "destructive"
      });
      return;
    }

    const updatedBlog = {
      ...blog,
      title,
      content,
      excerpt: generateExcerpt(content),
      updatedAt: new Date().toISOString()
    };

    const updatedBlogs = [...blogs];
    updatedBlogs[blogIndex] = updatedBlog;
    
    setBlogs(updatedBlogs);
    localStorage.setItem("blogs", JSON.stringify(updatedBlogs));
    
    toast({
      title: "Blog Updated",
      description: "Your blog post has been updated successfully."
    });
  };

  const deleteBlog = (id: string) => {
    if (!isAuthenticated || !user) {
      toast({
        title: "Authentication Error",
        description: "You must be logged in to delete a blog post.",
        variant: "destructive"
      });
      return;
    }

    const blog = blogs.find(blog => blog.id === id);
    
    if (!blog) {
      toast({
        title: "Blog Not Found",
        description: "The blog post you're trying to delete doesn't exist.",
        variant: "destructive"
      });
      return;
    }

    if (blog.author.id !== user.id) {
      toast({
        title: "Permission Denied",
        description: "You can only delete your own blog posts.",
        variant: "destructive"
      });
      return;
    }

    const updatedBlogs = blogs.filter(blog => blog.id !== id);
    setBlogs(updatedBlogs);
    localStorage.setItem("blogs", JSON.stringify(updatedBlogs));
    
    toast({
      title: "Blog Deleted",
      description: "Your blog post has been deleted successfully."
    });
  };

  return (
    <BlogContext.Provider
      value={{
        blogs,
        userBlogs,
        isLoading,
        createBlog,
        updateBlog,
        deleteBlog,
        getBlogById
      }}
    >
      {children}
    </BlogContext.Provider>
  );
};

export const useBlog = () => {
  const context = useContext(BlogContext);
  if (context === undefined) {
    throw new Error("useBlog must be used within a BlogProvider");
  }
  return context;
};
