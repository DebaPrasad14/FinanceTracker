import { useEffect, useState } from "react";
import { Route, Navigate } from "react-router-dom";
import { useGlobalContext } from "../../context/GlobalContext";

const ProtectedRoute = ({ element, ...rest }) => {
    const [authenticated, setAuthenticated] = useState(false);
    const { verify } = useGlobalContext();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await verify();
                if (response.status === 200) {
                    setAuthenticated(true);
                } else {
                    setAuthenticated(false);
                }
            } catch (error) {
                console.error("Error verifying authentication:", error);
                setAuthenticated(false);
            }
        };

        fetchData();
    }, [verify]);

    return authenticated ? (
        <Route {...rest} element={element} />
    ) : (
        <Navigate to="/login" replace />
    );
};

export default ProtectedRoute;
