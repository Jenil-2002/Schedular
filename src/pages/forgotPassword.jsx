import React from "react";
import { Link } from "react-router-dom";

export default function ForgotPassword() {
  return (
    <main className="d-flex align-items-center justify-content-center flex-column flex-md-row min-vh-100 bg-main forgetPwd-screen">
      <div className="login-img-col">
        <div className="login-img">
          <img
            src="assets/images/forgotPwd-bg.png"
            alt="Unlock your access now"
            className="w-100"
          />
        </div>
        <div className="tagline">Resource Manager</div>
        <div className="title-tag">Unlock Your Access Now</div>
      </div>
      <div className="form-login w-100 m-auto">
        <form className="">
          <h1 className="form-title mb-10">Forget password</h1>
          <p className="form-head">
            Enter your email to send reset password link
          </p>

          <div className="mb-20">
            <label className="form-label mb-3" for="">
              Email
            </label>
            <input
              type="email"
              className="form-control"
              placeholder="Enter your email"
            />
          </div>
          <Link to="/sendcode" className="btn btn-primary w-100" type="submit">
            Send Code
          </Link>
        </form>
      </div>
    </main>
  );
}
