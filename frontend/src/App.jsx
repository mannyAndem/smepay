import { Route, Routes } from "react-router-dom";
import Dashboard from "./pages/Dashboard/Dashboard";
import Invoice from "./pages/Invoice/Invoice";
import Signup from "./pages/Signup/Signup";
import Login from "./pages/Login/Login";
import ProtectedRoute from "./features/authentication/ProtectedRoute";
import Landing from "./pages/Landing/Landing";
import CreateInvoiceModal from "./pages/Dashboard/pages/Overview/components/CreateInvoiceModal";

function App() {
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
