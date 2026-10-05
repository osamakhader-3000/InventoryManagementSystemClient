import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { Navigate, Outlet } from 'react-router';
import { UserEmailVerificationStatus } from '../../modules/Security/User';

export function EmailVerifiedRoute() {
  const { currentUser } = useContext(AuthContext);

  if (
    currentUser &&
    currentUser.emailVerificationStatus === UserEmailVerificationStatus.Unverified
  ) {
    return <Navigate to="/emailverification" replace />;
  }

  return <Outlet />;
}