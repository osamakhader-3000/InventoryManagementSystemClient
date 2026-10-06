import { useContext } from 'react';
import { AuthContext } from '../../../../context/AuthContext.tsx';
import { Navigate, Outlet } from 'react-router';
import { UserEmailVerificationStatus } from '../../domain/User.ts';

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