import { ReactNode, useContext } from 'react'
import { AuthContext } from '../../../../Context/AuthContext';
import { Navigate } from 'react-router-dom';

interface ProtectedRouteProps {
    children: ReactNode;
  }

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { loginData } = useContext(AuthContext);
  console.log(loginData?.role)

  if (localStorage.getItem('token') || loginData) {
    return <>{children}</>;
  } else {
    return <Navigate to="/login" />;
  }
}
