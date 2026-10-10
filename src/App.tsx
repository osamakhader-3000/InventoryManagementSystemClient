import './App.css';
import { BrowserRouter, Routes, Route, Navigate} from "react-router-dom"; // Added Navigate
import LoginPage from './modules/Security/ui/login/LoginPage';
import AuthCallback from './modules/Security/ui/callback';
import MainPage from './app/MainPage/MainPage';
import ProtectedRoute from './modules/Security/ui/routes/ProtectedRoute';
import {DependencyProvider} from './app/DependencyContext';
import { ThemeProvider } from './shared/ui/theme/ThemeContext';
import { AuthProvider } from './modules/Security/ui/AuthContext';
import { ErrorMessageListener } from './shared/ui/listeners/ErrorMessageListener';
import { NavigationListener } from './modules/Security/ui/NavigationListener';
import { VerifyEmail } from './modules/Security/ui/verifyemail';
import { NotificationMessageListener } from './shared/ui/listeners/NotificationListener';

function App() {
  
  return (
    <BrowserRouter>      
        <DependencyProvider>
          
            <ThemeProvider>          
              <NavigationListener />
              <NotificationMessageListener />
              <ErrorMessageListener />
              <Routes>
                <Route path="/callback" element={<AuthCallback />} />
                <Route path="/verifyemail" element={<VerifyEmail />} />
                <Route path="/login" element={<LoginPage newAccount={false} />} />
                <Route path="/signup" element={<LoginPage newAccount={true} />} />
                <Route index element={<Navigate to="/assignments" replace />} />                    
                <Route element={<ProtectedRoute />}>
                  <Route path="*" element={<AuthProvider><MainPage /></AuthProvider>} />                   
                </Route>
              </Routes>
            </ThemeProvider>
         
        </DependencyProvider>     
    </BrowserRouter>
  );
}

export default App;