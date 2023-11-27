import { Route, Routes } from "react-router-dom";
import Dashboard from "./pages/Dashboard/Dashboard";
import Invoice from "./pages/Invoice/Invoice";
import Signup from "./pages/Signup/Signup";
import Login from "./pages/Login/Login";
import ProtectedRoute from "./features/authentication/ProtectedRoute";
import Landing from "./pages/Landing/Landing";

function App() {
  // Preventing users from accessing site in mobile.
  const minimumWidth = 768;

  if (window.innerWidth < minimumWidth) {
    return (
      <div className="flex justify-center items-center bg-gray h-screen">
        <h1 className="text-center text-2xl text-dark">
          Welcome to <span className="text-blue font-semibold">SMEPAY</span>
          <br /> Please open this site in a desktop.
        </h1>
      </div>
    );
  }

  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/invoices/:id" element={<Invoice />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/login" element={<Login />} />

      {/* Protected dashboard route */}
      <Route
        path="/dashboard/*"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

export default App;
