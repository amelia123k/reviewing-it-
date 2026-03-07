import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import "./LoginSignUp.css";

const LoginSignUp = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const { loginUser } = useAuth();

  const handleSubmit = () => {
    setError("");

    if (!email || !password) {
      setError("Please fill in all fields.");
      return;
    }
    if (!isLogin && !name) {
      setError("Please enter your full name.");
      return;
    }
    if (!isLogin && password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    if (!isLogin && password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    setLoading(true);
    setTimeout(() => {
      // Save the user's name into AuthContext
      loginUser(isLogin ? email.split("@")[0] : name, email);
      setLoading(false);
      navigate("/dashboard");
    }, 800);
  };

  return (
    <div className="auth-viewport">
      <div className="auth-card">
        <div className="wave-wrapper">
          <div className="header-text">
            <h1>{isLogin ? "Welcome Back!" : "Hello Friend!"}</h1>
            <p>
              {isLogin
                ? "Sign in to continue reviewing vendors"
                : "Create your account to get started"}
            </p>
          </div>
          <svg
            className="wave-svg"
            viewBox="0 0 1200 120"
            preserveAspectRatio="none"
          >
            <path
              d="M0,0 C150,100 350,100 600,50 C850,0 1050,0 1200,50 L1200,0 L0,0 Z"
              fill="url(#waveGradient)"
            />
            <defs>
              <linearGradient
                id="waveGradient"
                x1="0%"
                y1="0%"
                x2="100%"
                y2="0%"
              >
                <stop offset="0%" stopColor="#1dbf73" />
                <stop offset="50%" stopColor="#16a863" />
                <stop offset="100%" stopColor="#1dbf73" />
              </linearGradient>
            </defs>
          </svg>
        </div>

        <div className="auth-body">
          {!isLogin && (
            <input
              type="text"
              placeholder="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          )}
          <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
          />
          {!isLogin && (
            <input
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          )}

          {error && <p className="auth-error">{error}</p>}

          <button
            className="primary-btn"
            onClick={handleSubmit}
            disabled={loading}
          >
            {loading ? "Please wait..." : isLogin ? "Sign In" : "Sign Up"}
          </button>

          <p className="forgot-password">Forgot Password?</p>

          <div className="social-icons">
            <i className="fa-brands fa-google"></i>
            <i className="fa-brands fa-apple"></i>
            <i className="fa-solid fa-envelope"></i>
            <i className="fa-brands fa-facebook-f"></i>
          </div>

          <p className="switch-text">
            {isLogin ? "New here?" : "Already have an account?"}
            <span
              onClick={() => {
                setIsLogin(!isLogin);
                setError("");
              }}
            >
              {isLogin ? " Sign Up" : " Sign In"}
            </span>
          </p>

          <p className="nav" onClick={() => navigate("/signup")}>
            Register as Business
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginSignUp;
