import { createContext, useContext, useState, useEffect } from "react";

// Create the context
const AuthContext = createContext(null);

const USERS_KEY = "app_users";        // stores all registered users
const CURRENT_USER_KEY = "app_current_user"; // stores the logged-in user

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // On first load, check if a user session already exists in localStorage
  useEffect(() => {
    const storedUser = localStorage.getItem(CURRENT_USER_KEY);
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  // Helper: get all registered users from localStorage
  const getUsers = () => {
    const users = localStorage.getItem(USERS_KEY);
    return users ? JSON.parse(users) : [];
  };

  /**
   * Register a new user
   * Returns { success: boolean, message: string }
   */
  const register = ({ name, email, password }) => {
    const users = getUsers();

    const emailExists = users.some(
      (u) => u.email.toLowerCase() === email.toLowerCase()
    );
    if (emailExists) {
      return { success: false, message: "This email is already registered" };
    }

    const newUser = { name, email, password };
    const updatedUsers = [...users, newUser];
    localStorage.setItem(USERS_KEY, JSON.stringify(updatedUsers));

    return { success: true, message: "Account created successfully" };
  };

  /**
   * Log in an existing user
   * Returns { success: boolean, message: string }
   */
  const login = ({ email, password }) => {
    const users = getUsers();
    const foundUser = users.find(
      (u) =>
        u.email.toLowerCase() === email.toLowerCase() &&
        u.password === password
    );

    if (!foundUser) {
      return { success: false, message: "Invalid email or password" };
    }

    const sessionUser = { name: foundUser.name, email: foundUser.email };
    localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(sessionUser));
    setUser(sessionUser);

    return { success: true, message: "Logged in successfully" };
  };

  // Log out the current user
  const logout = () => {
    localStorage.removeItem(CURRENT_USER_KEY);
    setUser(null);
  };

  const value = {
    user,
    isAuthenticated: !!user,
    loading,
    register,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// Custom hook for easy access to the auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};