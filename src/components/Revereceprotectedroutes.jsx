import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { app } from "../config/firebase";

const ReverseProtectedRoutes = ({ Component }) => {
  const navigate = useNavigate();
  const auth = getAuth(app);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {  
        navigate("/dashboard");
      } else {
        setIsLoading(false);
      }
    });
    return () => unsubscribe();
  }, [auth, navigate]);


  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="flex space-x-2 animate-pulse">
          <div className="w-4 h-4 bg-[#00c38b] rounded-full"></div>
          <div className="w-4 h-4 bg-[#00c38b] rounded-full"></div>
          <div className="w-4 h-4 bg-[#00c38b] rounded-full"></div>
        </div>
      </div>
    );
  }

  return <Component />;
};

export default ReverseProtectedRoutes;