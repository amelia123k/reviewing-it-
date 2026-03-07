import { useState } from "react";
import "./BusinessSignUp.css";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const BusinessSignUp = () => {
  const [active, setActive] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { loginVendor } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [bizName, setBizName] = useState("");
  const [phone, setPhone] = useState("");
  const [signupEmail, setSignupEmail] = useState("");
  const [location, setLocation] = useState("");
  const [category, setCategory] = useState("");
  const [signupPassword, setSignupPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSignIn = () => {
    setError("");
    if (!email || !password) {
      setError("Please fill in all fields.");
      return;
    }
    setLoading(true);
    setTimeout(() => {
      loginVendor(email.split("@")[0], email);
      setLoading(false);
      navigate("/vendor-dashboard");
    }, 800);
  };

  const handleSignUp = () => {
    setError("");
    if (
      !bizName ||
      !phone ||
      !signupEmail ||
      !location ||
      !category ||
      !signupPassword
    ) {
      setError("Please fill in all fields.");
      return;
    }
    if (signupPassword !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    if (signupPassword.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }
    setLoading(true);
    setTimeout(() => {
      loginVendor(bizName, signupEmail);
      setLoading(false);
      navigate("/vendor-dashboard");
    }, 800);
  };

  return (
    <div className="business-container">
      {!active && (
        <div className="business-form-container">
          <form onSubmit={(e) => e.preventDefault()}>
            <h1>Welcome!</h1>
            <div className="business-social-icons">
              <i className="fa-brands fa-google"></i>
              <i className="fa-brands fa-apple"></i>
              <i className="fa-solid fa-envelope"></i>
              <i className="fa-brands fa-facebook-f"></i>
            </div>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSignIn()}
            />
            <a href="#" className="forgot">
              Forgot password?
            </a>
            {error && <p className="biz-error">{error}</p>}
            <button
              type="button"
              className="primary-btn"
              onClick={handleSignIn}
              disabled={loading}
            >
              {loading ? "Please wait..." : "Sign In"}
            </button>
            <p className="switch-text">
              Don't have a business account?
              <span
                onClick={() => {
                  setActive(true);
                  setError("");
                }}
              >
                {" "}
                Sign Up
              </span>
            </p>
            <p className="nav" onClick={() => navigate("/login")}>
              Login as Customer
            </p>
          </form>
        </div>
      )}

      {active && (
        <div className="business-form-container">
          <form onSubmit={(e) => e.preventDefault()}>
            <h1>Create Business Account</h1>
            <div className="business-social-icons">
              <i className="fa-brands fa-google"></i>
              <i className="fa-brands fa-apple"></i>
              <i className="fa-solid fa-envelope"></i>
              <i className="fa-brands fa-facebook-f"></i>
            </div>
            <input
              type="text"
              placeholder="Business Name"
              value={bizName}
              onChange={(e) => setBizName(e.target.value)}
            />
            <input
              type="number"
              placeholder="WhatsApp Number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
            <input
              type="email"
              placeholder="Email"
              value={signupEmail}
              onChange={(e) => setSignupEmail(e.target.value)}
            />
            <input
              type="text"
              placeholder="Location (Buea, Molyko)"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
            <input
              type="text"
              placeholder="Business Category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            />
            <input
              type="password"
              placeholder="Password"
              value={signupPassword}
              onChange={(e) => setSignupPassword(e.target.value)}
            />
            <input
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            {error && <p className="biz-error">{error}</p>}
            <button
              type="button"
              className="primary-btn"
              onClick={handleSignUp}
              disabled={loading}
            >
              {loading ? "Please wait..." : "Sign Up"}
            </button>
            <p className="switch-text">
              Already have an account?
              <span
                onClick={() => {
                  setActive(false);
                  setError("");
                }}
              >
                {" "}
                Sign In
              </span>
            </p>
          </form>
        </div>
      )}
    </div>
  );
};

export default BusinessSignUp;
