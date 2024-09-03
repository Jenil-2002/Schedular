import React from 'react'
import { Link } from 'react-router-dom'

export default function ChangePassword() {
  return (
    <main
    className="d-flex align-items-center justify-content-center flex-column flex-md-row min-vh-100 bg-main forgetPwd-screen">
    <div className="login-img-col">
        <div className="login-img">
            <img src="assets/images/forgotPwd-bg.png" alt="Unlock your access now" className="w-100" /> 
        </div>
        <div className="tagline">Resource Manager</div>
        <div className="title-tag">Ready, Set, Sign Up</div>
    </div>
    <div className="form-login w-100 m-auto">
        <form className="">
            <div className="text-center mb-40">
                <img src="assets/images/verifiedCheck.svg" alt="Done!" className="checkImg" />
            </div>
            <h1 className="form-title mb-10 text-center">Password Changed!</h1>
            <p className="form-head text-center mb-40 mx-60">Your password has been successfully reset. Click below to
                log in.
            </p>
            <Link to="/login" className="btn btn-primary w-100" >Login</Link>
        </form>
    </div>
</main>
  )
}
