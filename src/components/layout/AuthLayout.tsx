
import { ReactNode } from "react";
import { Link } from "react-router-dom";

interface AuthLayoutProps {
  children: ReactNode;
}

export default function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className="min-h-screen flex flex-col bg-muted/30">
      <div className="container mx-auto px-4 py-8">
        <Link to="/" className="text-2xl font-serif font-bold text-primary flex justify-center mb-8">
          BlogFolio
        </Link>
        <main>{children}</main>
      </div>
    </div>
  );
}
