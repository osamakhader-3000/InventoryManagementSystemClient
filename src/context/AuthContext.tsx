import { createContext, useContext, useEffect, useState } from "react";
import { User } from "../modules/Security/domain/User";
import { DependencyContext } from "./DependencyContext";
import { useLocation } from 'react-router-dom';

interface AuthContextType {
  currentUser: User | null;
}

export const AuthContext = createContext<AuthContextType>({
  currentUser: null
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {

  const { userService } = useContext(DependencyContext);
  const [user, setUser] = useState<User | null>(null);
  const location = useLocation();

  useEffect(() => {
    const fetchUser = async () => {
      let currentUser = await userService.GetCurrentUser();
      if (currentUser)      
        setUser(currentUser);
      
    };

    fetchUser();
  }, [location.pathname]);

  return (
    <AuthContext.Provider value={{ currentUser: user }}>
      {children}
    </AuthContext.Provider>
  );
};