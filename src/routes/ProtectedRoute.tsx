import { Navigate } from "react-router-dom";
import { useBanco } from "../contexts/BancoContext";;

interface ProtectedRouteProps {
    children: JSX.Element;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
    const { isLoggedIn } = useBanco();

    return isLoggedIn ? children : <Navigate to="/" />;
};

export default ProtectedRoute;
