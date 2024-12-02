import { Navigate } from "react-router-dom";
import { useBanco } from "../contexts/BancoContext";
import { ReactNode, useEffect } from "react";

interface ProtectedRouteProps {
    children: JSX.Element;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
    const { isLoggedIn } = useBanco();

    return isLoggedIn ? children : <Navigate to="/" />;
};

export default ProtectedRoute;
