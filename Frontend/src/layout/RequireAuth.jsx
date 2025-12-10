import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../services/UserContext";

export default function RequireAuth(props) {

  const { user } = useAuth();
  const location = useLocation();

  if (!user) {
    const next = encodeURI(location.pathname)
    return <Navigate to={`/login?next=${next}`} state={{ from: location }} />;
  }

  return props.children
}
