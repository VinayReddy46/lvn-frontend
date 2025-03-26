import { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import PropTypes from "prop-types";

// Expanded dummy users with different admin roles
const dummyUsers = [
  {
    id: "1",
    name: "System Admin",
    email: "admin@example.com",
    password: "admin123",
    role: "system_admin",
    avatar: `https://ui-avatars.com/api/?name=System+Admin&background=random`,
  },
  {
    id: "2",
    name: "Jane User",
    email: "user@example.com",
    password: "user123",
    role: "user",
    avatar: `https://ui-avatars.com/api/?name=Jane+User&background=random`,
  },
  {
    id: "3",
    name: "Org Admin",
    email: "orgadmin@example.com",
    password: "orgadmin123",
    role: "org_admin",
    avatar: `https://ui-avatars.com/api/?name=Org+Admin&background=random`,
  },
];

const AuthContext = createContext(undefined);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("volunteer-user");
    return storedUser ? JSON.parse(storedUser) : null;
  });
  const navigate = useNavigate();

  const isAuthenticated = !!user;
  const isOrgAdmin = !!user && user.role === "org_admin";
  const isSystemAdmin = !!user && user.role === "system_admin";

  const login = async (email, password) => {
    // Simulate API call
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const foundUser = dummyUsers.find(
          (u) => u.email === email && u.password === password
        );

        if (foundUser) {
          // Create a new object without the password
          const { id, name, email, role, avatar } = foundUser;
          const userWithoutPassword = { id, name, email, role, avatar };

          setUser(userWithoutPassword);
          localStorage.setItem(
            "volunteer-user",
            JSON.stringify(userWithoutPassword)
          );
          toast.success(`Welcome back, ${userWithoutPassword.name}!`);
          navigate("/dashboard");
          resolve();
        } else {
          toast.error("Invalid email or password");
          reject(new Error("Invalid email or password"));
        }
      }, 1000);
    });
  };

  const signup = async (name, email, password) => {
    // Use password for validation (would normally be sent to server)
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const userExists = dummyUsers.some((u) => u.email === email);

        if (userExists) {
          toast.error("User with this email already exists");
          reject(new Error("User with this email already exists"));
          return;
        }

        // Password is not stored in local state, would be hashed on server
        if (!password || password.length < 6) {
          toast.error("Password must be at least 6 characters");
          reject(new Error("Invalid password"));
          return;
        }

        const newUser = {
          id: String(dummyUsers.length + 1),
          name,
          email,
          role: "user",
          avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(
            name
          )}&background=random`,
        };

        setUser(newUser);
        localStorage.setItem("volunteer-user", JSON.stringify(newUser));
        toast.success("Account created successfully!");
        navigate("/user-role-selection");
        resolve();
      }, 1000);
    });
  };

  const updateUserRole = (role) => {
    if (user) {
      const updatedUser = { ...user, role };
      setUser(updatedUser);
      localStorage.setItem("volunteer-user", JSON.stringify(updatedUser));
      toast.success(`Role updated to ${role.replace("_", " ")}`);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("volunteer-user");
    toast.success("Logged out successfully");
    navigate("/");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        isOrgAdmin,
        isSystemAdmin,
        login,
        signup,
        logout,
        updateUserRole,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
