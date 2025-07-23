import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

export default function useAuth({ redirectTo = '/login' } = {}) {
  const token = useSelector(state => state.auth.token);
  return token ? null : <Navigate to={redirectTo} />;
}
