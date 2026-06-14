import { VerifyCookie } from "api/authentication";
import axios from "axios";
import { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";

const ProtextAdmin = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const ress = await VerifyCookie()
        setIsAuthenticated(true);
      } catch (err) {
        setIsAuthenticated(false);
      }
    };

    checkAuth();
  }, []);

  // While waiting for the server to respond
  if (isAuthenticated === null) {
    return (
      <div className="h-screen w-full flex items-center justify-center font-lao">
        ກຳລັງກວດສອບສິດ...
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

export default ProtextAdmin;
