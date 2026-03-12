import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ChatProvider }   from "./context/ChatContext";
import { AuthProvider }   from "./context/AuthContext";
import LandingPage        from "./components/LandingPage/LandingPage";
import LoginSignUp        from "./components/LoginSignUp/LoginSignUp";
import BusinessSignUp     from "./components/BusinessSignUp/BusinessSignUp";
import Dashboard          from "./pages/Dashboard";
import SearchPage         from "./pages/Searchpage";
import Messages           from "./pages/Vendor/Messages";
import MyReviews          from "./pages/MyReviews";
import SavedVendors       from "./pages/SavedVendors";
import ReportedVendors    from "./pages/ReportedVendors";
import Settings           from "./pages/Settings";
import VendorDashboard    from "./pages/Vendor/VendorDashboard";

function App() {
  return (
    <AuthProvider>
      <ChatProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/"                 element={<LandingPage />} />
            <Route path="/search"           element={<SearchPage />} />
            <Route path="/login"            element={<LoginSignUp />} />
            <Route path="/signup"           element={<BusinessSignUp />} />
            <Route path="/dashboard"        element={<Dashboard />} />
            <Route path="/messages"         element={<Messages />} />
            <Route path="/reviews"          element={<MyReviews />} />
            <Route path="/saved"            element={<SavedVendors />} />
            <Route path="/reports"          element={<ReportedVendors />} />
            <Route path="/settings"         element={<Settings />} />
            <Route path="/vendor-dashboard" element={<VendorDashboard />} />
            <Route path="*"                 element={<Navigate to="/" replace />} />
          </Routes>
        </BrowserRouter>
      </ChatProvider>
    </AuthProvider>
  );
}

export default App;