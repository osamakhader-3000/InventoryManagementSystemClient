import { useContext, useEffect, useRef } from 'react';
import { DependencyContext } from '../../../app/DependencyContext';
import { useLocation, useNavigate } from 'react-router';

export function NavigationListener() {
    const { authEventBus } = useContext(DependencyContext);
    const navigate = useNavigate();
    const location = useLocation();

    // Keep the latest location so the handlers don't need to resubscribe on every navigation.
    const locationRef = useRef(location);
    locationRef.current = location;

    useEffect(() => {
        const onDenyAccess = () => {
            navigate('/login', { replace: true, state: { from: locationRef.current } });
        };
        const onEmailVerificationRequired = () => {
            navigate('/emailverification', { replace: true, state: { from: locationRef.current } });
        };

        authEventBus.SubscribeToDenyAccess(onDenyAccess);
        authEventBus.SubscribeToEmailVerificationRequired(onEmailVerificationRequired);

        return () => {
            authEventBus.UnsubscribeToDenyAccess(onDenyAccess);
            authEventBus.UnsubscribeToEmailVerificationRequired(onEmailVerificationRequired);
        };
    }, [authEventBus, navigate]);

    return null;
}
