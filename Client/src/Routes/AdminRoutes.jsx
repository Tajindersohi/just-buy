import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';

const AdminRoute = () => {
  const user = useSelector((state) => state.auth.user);

  if (!user || user.userRole !== 'admin') {
    return <Navigate to="/admin/login" />;
  }

  return <Outlet />;
};

export default AdminRoute;
