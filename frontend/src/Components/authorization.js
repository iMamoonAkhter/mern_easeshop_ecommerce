import { useContext } from "react"
import { AppContext } from "../AppContext"
import { Navigate } from "react-router-dom"

export const AdminRoute = ({ children }) => {
    const { userCredentials } = useContext(AppContext);
    
    if (!userCredentials || userCredentials.role !== 'admin') {
        return <Navigate to="/login" />;
    }

    return children;
};

export function AuthenticatedUserRoute({ children }) {
    const { userCredentials } = useContext(AppContext)

    if (!userCredentials) {
        return <Navigate to="/login" />
    }

    return children
}


export function VisitorRoute({ children }) {
    const { userCredentials } = useContext(AppContext)

    if (userCredentials) {
        return <Navigate to="/" />
    }

    return children
}