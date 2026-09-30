import { useContext } from 'react';
import { DependencyContext } from '../../../context/DependencyContext';
import { useLocation, useNavigate } from 'react-router';

export function NavigationListener() {
    const { authEventBus } = useContext(DependencyContext);
    const navigate = useNavigate();
    const location = useLocation();

    authEventBus.SubscribeToDenyAccess(() => {
          navigate('/login', {replace: true,state: { from: location }});
    });

    authEventBus.SubscribeToEmailVerificationRequired(() => {
        navigate('/emailverification', {replace: true,state: { from: location }});
    });
    
    return null;
}