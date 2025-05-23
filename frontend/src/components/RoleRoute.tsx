import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

type RoleRouteProps = {
  children: JSX.Element;
  allowedRoles: Array<'admin' | 'cliente'>;
};

const RoleRoute = ({ children, allowedRoles }: RoleRouteProps) => {
  const { user, isAuthenticated } = useAuth();

  if (!isAuthenticated || !user) {
    return <Navigate to="/login" replace />;
  }

  if (!allowedRoles.includes(user.role)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return children;
};

export default RoleRoute;
