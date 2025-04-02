import { Navigate, Outlet } from "react-router-dom";

export const PrivateRoute: React.FC = () => {
    const token = localStorage.getItem("token");
    return token ? <Outlet /> : <Navigate to="/" />;
};