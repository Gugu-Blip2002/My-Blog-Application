
import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { useToast } from "@/components/ui/use-toast";
import { AuthState, User } from "@/types";

interface AuthContextType extends AuthState {
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string, name: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock user data for demo purposes
const MOCK_USERS = [
  {
    id: "1",
    email: "demo@example.com",
    password: "password",
    name: "Demo User",
    createdAt: new Date().toISOString()
  },
  {
    id: "2",
    email: "jane@example.com",
    password: "password",
    name: "Jane Smith",
    createdAt: new Date().toISOString()
  }
];

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [authState, setAuthState] = useState<AuthState>({
    isAuthenticated: false,
    user: null,
    isLoading: true
  });
  const { toast } = useToast();

  useEffect(() => {
    // Check for stored auth token on component mount
    const storedUser = localStorage.getItem("blogUser");
    if (storedUser) {
      try {
        const user = JSON.parse(storedUser) as User;
        setAuthState({
          isAuthenticated: true,
          user,
          isLoading: false
        });
      } catch (error) {
        console.error("Failed to parse stored user:", error);
        localStorage.removeItem("blogUser");
        setAuthState({
          isAuthenticated: false,
          user: null,
          isLoading: false
        });
      }
    } else {
      setAuthState(prev => ({ ...prev, isLoading: false }));
    }
  }, []);

  const login = async (email: string, password: string) => {
    try {
      // Mock API call - In a real app, this would be an API request
      const user = MOCK_USERS.find(u => u.email === email && u.password === password);
      
      if (!user) {
        throw new Error("Invalid email or password");
      }
      
      const { password: _, ...userWithoutPassword } = user;
      
      // Save to local storage for persistence
      localStorage.setItem("blogUser", JSON.stringify(userWithoutPassword));
      
      setAuthState({
        isAuthenticated: true,
        user: userWithoutPassword,
        isLoading: false
      });
      
      toast({
        title: "Logged in successfully",
        description: `Welcome back, ${userWithoutPassword.name}!`,
      });
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Login failed";
      toast({
        title: "Login failed",
        description: errorMessage,
        variant: "destructive"
      });
      throw error;
    }
  };

  const signup = async (email: string, password: string, name: string) => {
    try {
      // Mock API call - In a real app, this would be an API request
      const existingUser = MOCK_USERS.find(u => u.email === email);
      
      if (existingUser) {
        throw new Error("Email already in use");
      }
      
      // Create new user
      const newUser = {
        id: (MOCK_USERS.length + 1).toString(),
        email,
        name,
        createdAt: new Date().toISOString()
      };
      
      // Save to local storage for persistence
      localStorage.setItem("blogUser", JSON.stringify(newUser));
      
      setAuthState({
        isAuthenticated: true,
        user: newUser,
        isLoading: false
      });
      
      toast({
        title: "Account created",
        description: `Welcome, ${name}!`,
      });
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Signup failed";
      toast({
        title: "Signup failed",
        description: errorMessage,
        variant: "destructive"
      });
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem("blogUser");
    setAuthState({
      isAuthenticated: false,
      user: null,
      isLoading: false
    });
    toast({
      title: "Logged out",
      description: "You have been logged out successfully.",
    });
  };

  return (
    <AuthContext.Provider
      value={{
        ...authState,
        login,
        signup,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
