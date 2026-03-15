import { Routes, Route } from "react-router";
import { AuthLayout } from "./layouts/AuthLayout";
import { DashboardLayout } from "./layouts/DashboardLayout";

import { AuthForm } from "./pages/AuthForm";
import { Dashboard } from "./pages/Dashboard";

function App() {
  return (
    <Routes>

      {/* AUTH ROUTES */}
      <Route path="/" element={<AuthLayout />}>
        <Route index element={<AuthForm />} />
      </Route>

      {/* DASHBOARD */}
      <Route path="/dashboard" element={<DashboardLayout />}>
        <Route index element={<Dashboard />} />
      </Route>

    </Routes>
  );
}

export default App;