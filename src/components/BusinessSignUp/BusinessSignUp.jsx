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
    <div className={`business-container ${active ? "business-active" : ""}`}>
      <div className="business-form-container business-sign-in">
        <form>
          <h1>Sign In</h1>

          <div className="business-social-icons">
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

          <input type="email" placeholder="Email" />
          <input type="password" placeholder="Password" />

          <button type="button">Sign In</button>

          <button
            type="button"
            onClick={navigateToUser}
            className="business-nav-btn"
          >
            Login as Customer
          </button>
        </form>
      </div>

      <div className="business-form-container business-sign-up">
        <form>
          <h1>Create Account</h1>

          <div className="business-social-icons">
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
          <input type="number" placeholder="Business WhatsApp Number" />
          <input type="email" placeholder="Email" />
          <input type="text" placeholder="Location e.g Buea, Molyko" />
          <input type="text" placeholder="Business Category" />
          <input type="password" placeholder="Password" />
          <input type="password" placeholder="Confirm Password" />
          <button type="button">Sign Up</button>
        </form>
      </div>

      <div className="business-toggle-container">
        <div className="business-toggle">
          <div className="business-toggle-panel">
            {active ? (
              <>
                <h1>Hello, Business Owner!</h1>
                <p>Enter your details and start your journey</p>
                <button onClick={() => setActive(false)}>Sign In</button>
              </>
            ) : (
              <>
                <h1>Welcome Back!</h1>
                <p>To keep connected, please sign in</p>
                <button onClick={() => setActive(true)}>Sign Up</button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BusinessSignUp;
