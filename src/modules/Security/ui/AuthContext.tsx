import { createContext, useContext, useEffect, useState } from "react";
import { User } from "../domain/User";
import { DependencyContext } from "../../../app/DependencyContext";
import { useLocation } from 'react-router-dom';

interface AuthContextType {
  currentUser: User | null;
}

export const AuthContext = createContext<AuthContextType>({
  currentUser: null
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {

  const { authService } = useContext(DependencyContext);
  const [user, setUser] = useState<User | null>(null);
  const location = useLocation();

  useEffect(() => {
    const fetchUser = async () => {
      let currentUser = await authService.GetCurrentUser();
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