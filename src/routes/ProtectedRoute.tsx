import { Navigate } from "react-router-dom";
import { useBanco } from "../contexts/BancoContext";
import { ReactNode } from "react";

interface ProtectedRouteProps {
    children: ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
    const { isLoggedIn } = useBanco();

    return isLoggedIn ? children : <Navigate to="/" />;
};

export default ProtectedRoute;
