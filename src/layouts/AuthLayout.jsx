import { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router";
import { getCurrentUser } from "../utils/authAPI";
import { LoadingCard } from "../components/LoadingCard";



export const AuthLayout = () => {
  return <Outlet />;
};