
import { Navigate } from "react-router-dom";
import { Iparam } from "../types/types"
import useAuth from "../hooks/useContext";

const AuthorizationProvider = ({ children }) => {
  const { currentUser }: Iparam | any = useAuth();

  if (currentUser && currentUser === "loading") return <div>loading...</div>;

  if (!currentUser) {
    return <Navigate to="/login" />;
  }

  return <div>
    {children}
  </div>;
};

export default AuthorizationProvider;