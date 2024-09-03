import React from "react";
import { useState } from "react";
import { createContext } from "react";
import { toast, ToastContainer } from "react-toastify";

const SnackbarsContext = createContext({});

export const SnackbarState = ({ children }) => {
  /*   const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [severity, setSeverity] = useState(); */

  /*   function handleClose(_, reason) {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  } */

  // Toster
  const showToast = (type, message) => {
    switch (type) {
      case "success":
        toast.success(message, {
          // position: "top-right",
          // // autoClose: 5000,
          // hideProgressBar: false,
          // newestOnTop: false,
          // closeOnClick: true,
          // rtl: false,
          // pauseOnFocusLoss: true,
          // draggable: true,
          // pauseOnHover: true,
          // className: "custom-toast",
        });
        break;
      case "error":
        toast.error(message, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          newestOnTop: false,
          closeOnClick: true,
          rtl: false,
          pauseOnFocusLoss: true,
          draggable: true,
          pauseOnHover: true,
          className: "custom-toast",
        });
        break;
      case "info":
      default:
        toast.info(message, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          newestOnTop: false,
          closeOnClick: true,
          rtl: false,
          pauseOnFocusLoss: true,
          draggable: true,
          pauseOnHover: true,
          className: "custom-toast",
        });
    }
  };

  return (
    <>
      <ToastContainer
        position="top-right"
        // autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        className={"custom-toastContainer"}
      />
      <SnackbarsContext.Provider
        value={{
          showToast,
        }}
      >
        {children}
      </SnackbarsContext.Provider>
    </>
  );
};

export default SnackbarsContext;
