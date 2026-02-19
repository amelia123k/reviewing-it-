
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import LoginSignUp from "./components/LoginSignUp/LoginSignUp";
import BusinessSignUp from "./components/BusinessSignUp/BusinessSignUp";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/user" replace />} />
        <Route path="/user" element={<LoginSignUp />} />
        <Route path="/business" element={<BusinessSignUp />} />
        
      </Routes>
    </BrowserRouter>
  );
}
export default App;
