import React, { useState } from "react";
import "./LoginSignUp.css";
import { useNavigate } from "react-router-dom";

const LoginSignUp = () => {
  const [active, setActive] = useState(false);
  const navigate = useNavigate();
  const navigateToBusiness = () => {
    navigate("/business");
  };
  return (
    <div className={`container ${active ? "active" : ""}`}>
      <div className="form-container sign-up">
        <form>
          <h1>Create Account</h1>

          <div className="social-icons">
            <a href="#">
              <i className="fa-brands fa-google"></i>
            </a>
            <a href="#">
              <i className="fa-brands fa-apple"></i>
            </a>
            <a href="#">
              <i className="fa-solid fa-envelope"></i>
            </a>
            <a href="#">
              <i className="fa-brands fa-facebook-f"></i>
            </a>
          </div>

          <input type="text" placeholder="Name" />
          <input type="email" placeholder="Email" />
          <input type="password" placeholder="Password" />
          <input type=" Comfirm password" placeholder="Confirm Password" />
          <button>Sign Up</button>
        </form>
      </div>

      <div className="form-container sign-in">
        <form>
          <h1>Sign In</h1>

          <div className="social-icons">
            <a href="#">
              <i className="fa-brands fa-google"></i>
            </a>
            <a href="#">
              <i className="fa-brands fa-apple"></i>
            </a>
            <a href="#">
              <i className="fa-solid fa-envelope"></i>
            </a>
            <a href="#">
              <i className="fa-brands fa-facebook-f"></i>
            </a>
          </div>

          <span>or use your email password</span>
          <input type="email" placeholder="Email" />
          <input type="password" placeholder="Password" />
          <a href="#">Forgot password?</a>
          <button>Sign In</button>
          <button
            type="button"
            onClick={navigateToBusiness}
            className="nav-btn"
          >
            Login as Business owner
          </button>
        </form>
      </div>

      <div className="toggle-container">
        <div className="toggle">
          <div className="toggle-panel toggle-left">
            <h1>Welcome Back!</h1>
            <p>To keep connected, please login</p>
            <button className="hidden" onClick={() => setActive(false)}>
              Sign In
            </button>
          </div>

          <div className="toggle-panel toggle-right">
            <h1>Hello, Friend!</h1>
            <p>Enter your details to review your products and vendors</p>
            <button className="hidden" onClick={() => setActive(true)}>
              Sign Up
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginSignUp;
