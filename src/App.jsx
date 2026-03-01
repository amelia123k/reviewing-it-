import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

// Landing Page
import LandingPage from "./components/LandingPage/LandingPage";

// Auth Pages
import LoginSignUp from "./components/LoginSignUp/LoginSignUp";
import BusinessSignUp from "./components/BusinessSignUp/BusinessSignUp";

// User Dashboard Pages
import Dashboard from "./pages/Dashboard";
import MyReviews from "./pages/MyReviews";
import SavedVendors from "./pages/SavedVendors";
import ReportedVendors from "./pages/ReportedVendors";
import Settings from "./pages/Settings";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Home — Landing Page */}
        <Route path="/" element={<LandingPage />} />

        {/* Authentication */}
        <Route path="/user" element={<LoginSignUp />} />
        <Route path="/business" element={<BusinessSignUp />} />

        {/* User Dashboard Routes */}
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/reviews" element={<MyReviews />} />
        <Route path="/saved" element={<SavedVendors />} />
        <Route path="/reports" element={<ReportedVendors />} />
        <Route path="/settings" element={<Settings />} />

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
