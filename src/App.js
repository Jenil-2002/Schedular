/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import Scheduler from "./components/Scheduler";
import { Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import AuthGuard from "./auth/AuthGuard";
import ForgotPassword from "./pages/forgotPassword";
import SendCode from "./pages/sendCode";
import ChangePassword from "./pages/changePassword";
import Signup from "./pages/signup";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <Routes>
      <Route
        path="/"
        element={
          <AuthGuard isAuthenticated={isAuthenticated}>
            <Scheduler />
          </AuthGuard>
        }
      ></Route>
      <Route path="/login" element={<Login setIsAuthenticated={setIsAuthenticated} />} />
      <Route path="/signup" element={<Signup setIsAuthenticated={setIsAuthenticated} />} />
      <Route path="/forgotPassword" element={<ForgotPassword setIsAuthenticated={setIsAuthenticated} />} />
      <Route path="/sendcode" element={<SendCode setIsAuthenticated={setIsAuthenticated} />} />
      <Route path="/changePassword" element={<ChangePassword setIsAuthenticated={setIsAuthenticated} />} />
    </Routes>
  );
}

export default App;
