import { ReactNode, useContext } from 'react'
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../../../../Context/Context';

interface ProtectedRouteProps {
    children: ReactNode;
  }

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { loginData } = useContext(AuthContext);

  if(loginData?.role=='user'){

  return  <Navigate to={'/home'}/>
  }

  if (localStorage.getItem('token') || loginData?.role === 'admin') {
    return <>{children}</>;
  } else {
    return <Navigate to="/login" />;
  }

}