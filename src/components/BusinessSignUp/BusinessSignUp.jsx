import React, { useState } from "react";
import "./BusinessSignUp.css";
import { useNavigate } from "react-router-dom";

const BusinessSignUp = () => {
  const [active, setActive] = useState(false);
  const navigate = useNavigate();

  const navigateToUser = () => {
    navigate("/user");
  };

  return (
    <div className="business-container">
      {/* SIGN IN */}
      {!active && (
        <div className="business-form-container">
          <form>
            <h1>Welcome!</h1>

            <div className="business-social-icons">
              <i className="fa-brands fa-google"></i>
              <i className="fa-brands fa-apple"></i>
              <i className="fa-solid fa-envelope"></i>
              <i className="fa-brands fa-facebook-f"></i>
            </div>

            <input type="email" placeholder="Email" />
            <input type="password" placeholder="Password" />

            <a href="#" className="forgot">Forgot password?</a>

            <button type="button" className="primary-btn">
              Sign In
            </button>

            <p className="switch-text">
              Don’t have a business account?
              <span onClick={() => setActive(true)}> Sign Up</span>
            </p>

            <p className="nav" onClick={navigateToUser}>
              Login as Customer
            </p>
          </form>
        </div>
      )}

      {/* SIGN UP */}
      {active && (
        <div className="business-form-container">
          <form>
            <h1>Create Business Account</h1>

            <div className="business-social-icons">
              <i className="fa-brands fa-google"></i>
              <i className="fa-brands fa-apple"></i>
              <i className="fa-solid fa-envelope"></i>
              <i className="fa-brands fa-facebook-f"></i>
            </div>

            <input type="text" placeholder="Business Name" />
            <input type="number" placeholder="WhatsApp Number" />
            <input type="email" placeholder="Email" />
            <input type="text" placeholder="Location (Buea, Molyko)" />
            <input type="text" placeholder="Business Category" />
            <input type="password" placeholder="Password" />
            <input type="password" placeholder="Confirm Password" />

            <button type="button" className="primary-btn">
              Sign Up
            </button>

            <p className="switch-text">
              Already have an account?
              <span onClick={() => setActive(false)}> Sign In</span>
            </p>
          </form>
        </div>
      )}
    </div>
  );
};

export default BusinessSignUp;