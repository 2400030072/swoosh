import { createContext, useContext, useState } from "react";

const UserContext = createContext(undefined);

export function UserProvider({ children }) {
  const [user, setUser] = useState(null);

  const login = (email, _password, role) => {
    setUser({
      id: `user_${Date.now()}`,
      name: email.split("@")[0],
      email,
      role,
      avatar: `https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop`,
      joinDate: new Date().toISOString().split("T")[0],
    });
  };

  const signup = (name, email, _password, role) => {
    setUser({
      id: `user_${Date.now()}`,
      name,
      email,
      role,
      avatar: `https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop`,
      joinDate: new Date().toISOString().split("T")[0],
    });
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <UserContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        login,
        logout,
        signup,
        setUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
}