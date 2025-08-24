import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { app } from '../config/firebase';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';


const useAuthentication = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(null);
    const auth = getAuth(app);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setIsAuthenticated(!!user); 
        });
        return () => unsubscribe(); 
    }, [auth]);

    return isAuthenticated;
};


const ProtectedRoutes = ({ Component }) => {
    const navigate = useNavigate();
    const isAuthenticated = useAuthentication();

    useEffect(() => {
        if (isAuthenticated === false) {
            navigate('/signin');
        }
    }, [isAuthenticated]);

    if (isAuthenticated === null) {
        return null;
    }

    return <Component />;
};

export default ProtectedRoutes;