import { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router";
import { getCurrentUser } from "../utils/authAPI";
import { LoadingCard } from "../components/LoadingCard";

export const DashboardLayout = () => {
  const [user, setUser] = useState(undefined);

  useEffect(() => {
    let isMounted = true;

    const fetchUser = async () => {
      try {
        const data = await getCurrentUser();
        if (isMounted) {
          setUser(data.user || null);
        }
      } catch (error) {
        if (isMounted) {
          setUser(null);
        }
      }
    };

    fetchUser();

    return () => {
      isMounted = false;
    };
  }, []);

  if (user === undefined) {
    return (
      <LoadingCard
        title="Loading your dashboard"
        message="Checking your session and getting everything ready."
      />
    );
  }

  if (!user) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};