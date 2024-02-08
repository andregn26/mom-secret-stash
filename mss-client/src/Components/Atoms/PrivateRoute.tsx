import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "@/context/auth.context";

type PrivateRouteProps = {
    children: React.ReactNode
}

export const PrivateRoute = ({ children }: PrivateRouteProps) => {
    const { isLoggedIn, isLoading } = useContext(AuthContext);

    if (isLoading) {
        return <p>Loading...</p>;
    }

    if (!isLoggedIn) {
        return <Navigate to="/login" />;
    } else {
        return children;
    }
};