import { useContext,useState,useEffect } from 'react';
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { DependencyContext } from '../../context/DependencyContext';
import generalstyles from '../../Presentation/SharedStyles.module.css';

const ProtectedRoute = () => {

  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null);
    const {userService: authService} = useContext(DependencyContext);
    const {authEventBus} = useContext(DependencyContext);
    const location = useLocation();
    
    useEffect(() => {
      const checkAuth = async () => {
        try {

        

          let userLogginStatus = await authService.CheckLoggedIn();
          setIsLoggedIn(userLogginStatus.IsLoggedIn);
          if(!userLogginStatus.IsLoggedIn)
          {

            if(userLogginStatus.Expired)
              authEventBus.UnauthorizedAccessAttempted();

            if(!userLogginStatus.Expired)
              authEventBus.FailedLoginAttempted();
          
          }
        } catch (error) {
          setIsLoggedIn(false);
        }
      };
      setIsLoggedIn(true);
      //checkAuth();
    }, [location.pathname]);
    
    // Show loading state while checking authentication  
    if (isLoggedIn === null) {
      return (
      <div className={generalstyles.container}>
        <p>Loading the application...</p>
        <p>Please wait while we verify your authentication status.</p>
      </div>
    );
    }

  return isLoggedIn ?<Outlet />: <Navigate to="/login" replace state={{ from: location }}/>;
};

export default ProtectedRoute;
