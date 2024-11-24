import React from "react";
import {
  BrowserRouter,
  Route,
  Routes,
  useLocation,
  redirect,
} from "react-router-dom";
import Users from "./pages/Users";
import Roles from "./pages/Roles";
import Login from "./pages/Login";
import SideDrawer from "./components/SideDrawer";

const rolePermissions = {
  Admin: ["read", "write", "delete"],
  Editor: ["read", "write"],
  Viewer: ["read"],
};

const hasPermission = (role, requiredPermission) => {
  return rolePermissions[role]?.includes(requiredPermission);
};

// Protected Route component to check for authentication
const ProtectedRoute = ({ role, requiredPermission, children }) => {
  if (hasPermission(role, requiredPermission)) {
    return children;
  } else {
    redirect("/login");
  }
};

function App() {
  // const location = useLocation(); // Get the current location (URL)

  // Check if the current route is the login page
  // const isLoginPage = location.pathname === "/login"; // getting error here.

  return (
    <BrowserRouter>
      <div className="flex h-screen">
        {/* Render SideDrawer only if not on login page */}
        {/* {!isLoginPage && <SideDrawer />} */}
        <SideDrawer />
        {/* Main Content Area */}
        <div className={`flex-1 `}>
          {/* ${isLoginPage ? "p-6" : "ml-64 p-6"} */}
          <Routes>
            <Route path="/login" element={<Login />} />

            {/* Protected Routes for Users and Roles */}
            <Route
              path="/users"
              element={
                <ProtectedRoute role="Admin" requiredPermission="write">
                  <Users />
                </ProtectedRoute>
              }
            />
            <Route
              path="/roles"
              element={
                <ProtectedRoute role="Admin" requiredPermission="write">
                  <Roles />
                </ProtectedRoute>
              }
            />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
