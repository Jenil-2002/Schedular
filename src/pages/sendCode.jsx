import React from "react";
import { Link } from "react-router-dom";

export default function SendCode() {
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
        <div className="title-tag">Start Exploring, Sign Up</div>
      </div>
      <div className="form-login w-100 m-auto">
        <form>
          <h1 className="form-title mb-10">Please Check your Email</h1>
          <p className="form-head">
            We have sent the code to{" "}
            <span className="text-white">77777@gmail.com</span>
          </p>

          <div className="mb-40 d-flex align-items-center justify-content-between inputCode">
            <input
              type="text"
              className="form-control"
              placeholder=""
              defaultValue="2"
            />
            <input
              type="text"
              className="form-control"
              placeholder=""
              defaultValue="0"
            />
            <input
              type="text"
              className="form-control"
              placeholder=""
              defaultValue="3"
            />
            <input
              type="text"
              className="form-control"
              placeholder=""
              defaultValue="1"
            />
            <input
              type="text"
              className="form-control"
              placeholder=""
              defaultValue="0"
            />
          </div>
          <p className="form-head mb-4 text-center">
            Send code again <span className="text-white">00:34</span>
          </p>
          <Link
            to="/changePassword"
            className="btn btn-primary w-100"
            role="button"
          >
            Verification
          </Link>
        </form>
      </div>
    </main>
  );
}
