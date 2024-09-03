import React from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Signup({ setIsAuthenticated }) {
  const navigate = useNavigate();

  const handleSignup = async () => {
    console.log("first");
    setIsAuthenticated(true);
    navigate("/");
  };
  return (
    <main className="d-flex align-items-center justify-content-center flex-column flex-md-row min-vh-100 bg-main">
      <div className="login-img-col">
        <div className="login-img">
          <img
            src="assets/images/login-img.png"
            alt="Login"
            className="w-100"
          />
        </div>
        <div className="tagline">Resource Manager</div>
        <div className="title-tag">Discover More, Sign Up Now</div>
      </div>
      <div className="form-login w-100 m-auto">
        <form className="">
          <h1 className="form-title mb-10">Sign in</h1>
          <p className="form-head">Enter the fields below to get started</p>

          <div className="row g-20">
            <div className="col-md-6">
              <input
                className="form-control"
                id="firstName"
                type="text"
                placeholder="First Name"
              />
            </div>
            <div className="col-md-6">
              <input
                className="form-control"
                id="lastName"
                type="text"
                placeholder="Last Name"
              />
            </div>
            <div className="col-md-12">
              <input
                className="form-control"
                id="email"
                type="email"
                placeholder="Email"
              />
            </div>

            <div className="col-md-12">
              <div className="input-group password-field">
                <input
                  className="form-control"
                  id="currentPassword"
                  type="password"
                  placeholder="Password"
                />
                <span
                  toggle="#currentPassword"
                  className="field-icon toggle-password text-primary-hover"
                >
                  <svg
                    id="eye"
                    className="d-none"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <path
                      d="M12 14C13.1046 14 14 13.1046 14 12C14 10.8954 13.1046 10 12 10C10.8954 10 10 10.8954 10 12C10 13.1046 10.8954 14 12 14Z"
                      stroke="#ADAFB0"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M22 12C19.333 16.667 16 19 12 19C8 19 4.667 16.667 2 12C4.667 7.333 8 5 12 5C16 5 19.333 7.333 22 12Z"
                      stroke="#ADAFB0"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <svg
                    id="eye-off"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <path
                      d="M3 3L21 21"
                      stroke="#ADAFB0"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M10.5825 10.5879C10.2072 10.9629 9.99628 11.4716 9.99609 12.0022C9.99591 12.5327 10.2065 13.0416 10.5815 13.4169C10.9565 13.7922 11.4653 14.0031 11.9958 14.0033C12.5263 14.0035 13.0352 13.7929 13.4105 13.4179"
                      stroke="#ADAFB0"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M9.363 5.365C10.2204 5.11972 11.1082 4.99684 12 5C16 5 19.333 7.333 22 12C21.222 13.361 20.388 14.524 19.497 15.488M17.357 17.349C15.726 18.449 13.942 19 12 19C8 19 4.667 16.667 2 12C3.369 9.605 4.913 7.825 6.632 6.659"
                      stroke="#ADAFB0"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
              </div>
            </div>
            <div className="col-md-12">
              <div className="input-group password-field">
                <input
                  className="form-control"
                  id="confirmPassword"
                  type="password"
                  placeholder="Confirm Password"
                />
                <span
                  toggle="#confirmPassword"
                  className="field-icon toggle-password text-primary-hover"
                >
                  <svg
                    id="eye"
                    className="d-none"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <path
                      d="M12 14C13.1046 14 14 13.1046 14 12C14 10.8954 13.1046 10 12 10C10.8954 10 10 10.8954 10 12C10 13.1046 10.8954 14 12 14Z"
                      stroke="#ADAFB0"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M22 12C19.333 16.667 16 19 12 19C8 19 4.667 16.667 2 12C4.667 7.333 8 5 12 5C16 5 19.333 7.333 22 12Z"
                      stroke="#ADAFB0"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <svg
                    id="eye-off"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <path
                      d="M3 3L21 21"
                      stroke="#ADAFB0"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M10.5825 10.5879C10.2072 10.9629 9.99628 11.4716 9.99609 12.0022C9.99591 12.5327 10.2065 13.0416 10.5815 13.4169C10.9565 13.7922 11.4653 14.0031 11.9958 14.0033C12.5263 14.0035 13.0352 13.7929 13.4105 13.4179"
                      stroke="#ADAFB0"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M9.363 5.365C10.2204 5.11972 11.1082 4.99684 12 5C16 5 19.333 7.333 22 12C21.222 13.361 20.388 14.524 19.497 15.488M17.357 17.349C15.726 18.449 13.942 19 12 19C8 19 4.667 16.667 2 12C3.369 9.605 4.913 7.825 6.632 6.659"
                      stroke="#ADAFB0"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
              </div>
            </div>
            <div className="col-md-12">
              <button
                className="btn btn-primary w-100 mb-40"
                type="button"
                onClick={handleSignup}
              >
                Create Account
              </button>
            </div>
          </div>

          <div className="continueWith">
            <p className="d-inline-flex justify-content-center align-items-center px-40">
              or continue with
            </p>
          </div>

          <Link
            to="#"
            className="btn btn-light btn-login-continue w-100 d-flex align-items-center mb-3"
          >
            <div className="icon me-20">
              <img src="assets/images/google.svg" alt="Google" />
            </div>
            Continue with Google
          </Link>
          <Link
            to="#"
            className="btn btn-light btn-login-continue w-100 d-flex align-items-center mb-4"
          >
            <div className="icon me-20">
              <img src="assets/images/microsoft.svg" alt="Microsoft" />
            </div>
            Continue with Microsoft
          </Link>
          <p className="text-center">
            Have an account?{" "}
            <Link to="/login" className="text-white fw-semibold">
              Login
            </Link>
          </p>
        </form>
      </div>
    </main>
  );
}
