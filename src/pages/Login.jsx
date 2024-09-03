import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link, useNavigate } from "react-router-dom";
export default function Login({ setIsAuthenticated }) {
  const navigate = useNavigate();

  const handleLogin = async () => {
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
        <div className="tagline">Resource Manager </div>
        <div className="title-tag">Where Great Projects Manage</div>
      </div>
      <div className="form-login w-100 m-auto">
        <h1 className="form-title mb-10">Login</h1>
        <p className="form-head">Please enter your details.</p>

        <div className="mb-20">
          <label className="form-label mb-3" htmlFor="">
            Email
          </label>
          <div className="input-group mb-20">
            <span className="input-group-text" id="basic-addon1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                xmlnsXlink="http://www.w3.org/1999/xlink"
                width="24"
                height="21"
                viewBox="0 0 24 21"
                fill="none"
              >
                <rect
                  y="0.944786"
                  width="24"
                  height="19.0945"
                  fill="url(#pattern0_0_148)"
                />
                <defs>
                  <pattern
                    id="pattern0_0_148"
                    patternContentUnits="objectBoundingBox"
                    width="1"
                    height="1"
                  >
                    <use
                      xlinkHref="#image0_0_148"
                      transform="matrix(0.0119048 0 0 0.0147059 -0.0952381 -0.25)"
                    />
                  </pattern>
                  <image
                    id="image0_0_148"
                    width="100"
                    height="100"
                    xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABkCAYAAABw4pVUAAAACXBIWXMAAAsTAAALEwEAmpwYAAAEAklEQVR4nO2dPYgUSRiGy5/g/A0MlDvBTBPFv+BEED0TNVBXUVNDU0MD0dm7SEQEQ0FvYc166vvpXhAMZBMDxcDQRVc5DsRAYRHUFc91jxpnZBVlpruqe2qm3wcKFhb26/2eqnm7h+puYwAAAAAAAAAAAAAAAAAAAMAPSZJkJTPvZk5HmNNTGKnrwYjryfidOysqmzZN1R3EKiQyS6LzGPqDHsisZWEi2laaiPn5+UUkMkqic5CgvU7EORK54HoXXIhluQoRWuwTgfVKWBkiJyBDvT6ercixIDImJyeXEstTCFHPvJQnSZIs8V8dqvshQ4OcvFjVvf5CWP+CEA10Nil/egsh1jEI0VBCbvqvEJGkS1gl3kWGBFtFryCkdyAkMiAkMqIQQiIvSfWoqTmkerTVi/4L6RTTiSTLNpiaQUS/Eut4j1fr1QlpDZa3JHIuyBVp5DQajcVW5IxledPzhWHlQjqFWR8x8+9mSCGibcRyP3df+iWkPdzX9NdVdZUZErIsW25ZL1mW/4r0pN9C2qtFXpDqSTPgMPNhEv3HqxcxCBn00KccoT1QQtqr5d2ghH6jQGjHIYTluWWdyXVwLA+Jsp0mUoiyna1jzDXZdMb1ou9C3O/TNF1XYFlHF/pZO7RJ9FPuj+OJifVRXKkvLNIU+YNYpgYx9LlYaD8jSg91/kZ0QhxJkixzu1Msy4dBCH0qENrutNeKXHN703x6VYiiRZh5kxW5G2voNwqHttwjoi0he5ULnyKtvVyqp63o65iu9EVkuxV9kPOYZizrWSeyjF71TIgisYR+5hnaVfTKVFmkaOgzp6cC/B9HfEN76IT0I/RV9bcCq/OjC+28m6YHUkhVod8oIbT71avKinwNfZZXIUNfSgrtfvaq0iKd0Lcsn/OG/q3bt1dXFdq12wbUZD5gRadzzux/2zcNjbifc4qYdjVDHf/QCfEJ/SpCu5ZCOlg7sTFv6Pc25F4zTTebEhhqIT6hX1Zom7oL6ZAkyRoX4DlD/5tjdCcOpmRqI6QDM+8jkcc5ZDyzIgdNRdROiGNsbPKXHkK/lNDuRi2FdA/98kK7G7UW8n3oVxHa3ai9kA5EtNYN02cgJDIgJDIgJDIgJDIgJDIgJDIgJDIgJDIgJDIgJDIgJDIgJDIgJDIgJDIgJDIgpJZCWP723YKDoV96wHojgBA8BJOCTSoZDbT1BrOcAvSAmfd4C3H3YriHAEOK+glhmQp2MyupHocQ9RMS+ql77oHykKJFs+OyKWMPlGW9iNdVaB4Zc5b1fCmvq1j4NLXWy0pE32PF6M9EvCdW20zTraYq3L7ZpuouvPIoXfi6pxHXE3drXWUiAAAAAAAAAAAAAAAAAAAAzGDxP6y9mflsPprGAAAAAElFTkSuQmCC"
                  />
                </defs>
              </svg>
            </span>
            <input
              type="email"
              className="form-control"
              placeholder="name@example.com"
              defaultValue="superadmin@admin.com"
              required
            />
          </div>
        </div>

        <div className="mb-20">
          <label className="form-label mb-3" htmlFor="">
            Password
          </label>
          <div className="input-group password-field">
            <span className="input-group-text" id="basic-addon1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                xmlnsXlink="http://www.w3.org/1999/xlink"
                width="28"
                height="29"
                viewBox="0 0 28 29"
                fill="none"
              >
                <rect
                  y="0.506653"
                  width="28"
                  height="28.1392"
                  fill="url(#pattern0_0_157)"
                />
                <defs>
                  <pattern
                    id="pattern0_0_157"
                    patternContentUnits="objectBoundingBox"
                    width="1"
                    height="1"
                  >
                    <use
                      xlinkHref="#image0_0_157"
                      transform="matrix(0.01 0 0 0.00995052 0 0.00247389)"
                    />
                  </pattern>
                  <image
                    id="image0_0_157"
                    width="100"
                    height="100"
                    xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABkCAYAAABw4pVUAAAACXBIWXMAAAsTAAALEwEAmpwYAAAFV0lEQVR4nO2dTYgcRRTHyygaVDz4EQUVRfAgfl38TBRFhaCiIhq9iHoyRsSDIX5AyESNIn6gORqCG6OC9rz3/q9nl8WQyOJlDyKeTGLwKCIR8SOYaD50pGbGsBnDVu9Mz1RNz/vBgyVhp1/Vb7umuqr7tXOGYRiGMQbMzMycVFe9nkRWMfAuAVMs+IKgX/lo/4yp1v+JrBKR6/zvxM67UkxMzCyuizxEgJJgH0ObCwkS/M6iEMlX+M+K3Z6RJcuyc0j0VRL9daES5pHzCwMbGo3G2bHbNzJMTMwsJtF1JNhfloj/heAPEl07PT19Suz2Jk0dWMqC7wYmovuMge5hzm+I3e7kaDabJxDwHAkOD0vGnDhEwGqfQ+x+SIIsy04kYFMEEc1jA1vGfkbmO4AEEl+GdoYw8NhKaQ1Tgg966jjBPyz41k9nCdhIoq+3AtjY/jfd07MUwftjOXwxsL4HCdvrkj/GzEuCn8+8hIDHWXRH63cXdCxd68aJOnA7Q/8u3EmijXqeX9Xr8Zj56vYVfGEpR+rArW4c+HB6+gwS/FBsTNefWfX+so5NwAPti8NCx/4+y7LTXdUh0XcKdsguIrqo7OMDuJiB3QWHrjddlSGavLTQtYbgGxE5a1B5+KUTFuwsIOUQEV3iqgqLbg53An7MJifPH3QuAC4k6N4CUt5zVSTLps5j6MHQTIpU7xhWTgQsD83ASPBXkVndyEGizxY4O7YMOy8W/TiYF+szrmqw4OtAww8y8wXDzstPHPx3xfwTDHzpqkSe5+cGL85Et8bKj4CPQkOp359xVYGAh0PDgr9YdPHyWx4ctlQfdFWBgbcDDf7Nr/q6uIuc+8bmmiS0bEHQ6dg5suhngRwnXVUIr77ijdg5suhbgRx3u6rA0J8CjX0qdo4k+dOBM2SvqwoM/DnvF7rII9FzVH008D13wFWF0AzG3zMVO0eRfEUoT1cVTEhimJDEMCGRqdVqi+rAzQy8xKITISEEnSUgixs6G7xab7UF60XkJt9GNwoQcE/RHblRDoLuYta7Xcow8FrsjuJhSmktmOIVlyIk+YuxO4ijidE1LiUAXOlvnYndMRwvjtTz/HKXCiSoJ9ApzcjxqUuBRqNx6kCf5cDIxIGt27adFtuH889XJNAZzSSCG9e6BNaA7gslGv8aA6VEqJ2+L2L7GKtFOR6BRVITAhMSDTtDEsOEJIYJSQwTkhgmJDFMSGKYkMQwIYlhQhLDhAQe3BTRJ1mU2jdJ6Gx7XwYrB1UPy4QcB3+3h98unu/xAV9FjkRfKPvOEBPShS845qs6FN2fIEGeZdnJriRMSBe+MMyCN41EN7uSMCFz8LVHet3JK+txORMyBwI+73lrVXSHKwET0sGX2ejnNiNfziPLsjNdn5iQDv5e2p7Pjv+kUL7M9YkJ6cCq9/YrxH+G6xMT0sH/dfcrRERudH1iQjr48b+fErL2HdLVIS76LAvby8jBzpA5iMgtPQvh/DZXAiakpwJoXcMVsMmVhAnpwq9L+ddWFB+qFLaWdZyOcSVSq9UWMfB8670g86/2rrHV3iEIOaaQJbDS74Ec3Q9p3xT9xKAKaNqQlRgmJDFMSGKYkMQwIYlhQhLDhCSGCUkME5IYJiQxTEhimJDEGBUhVskBCVVy8O837/cGhKpEXfWa2D6sGhCO7sHs95WRXAoUKcxS+RD9xKUCM18xzhXlSHBYRC5zKeG3VcdWCLDapQgDGxb63tlRDvJvlRN92aUMAXe1atom0GE8yBDsFJE73SjQeg6Q8mUkWvNPPcWuBEdlhW+L6Lo6sHRkKlsbhmEYhmEYhmG4+fkXMWiplubI5d0AAAAASUVORK5CYII="
                  />
                </defs>
              </svg>
            </span>
            <input
              className="form-control"
              id="currentPassword"
              type="password"
              defaultValue="secret"
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
        <div className="mb-20 text-end">
          <Link to="/forgotPassword" className="forgotPassword">
            Forgot password
          </Link>
        </div>
        <button
          onClick={handleLogin}
          className="btn btn-primary w-100 mb-40"
          type="button"
        >
          Login
        </button>
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
          You are a new user?{" "}
          <Link to="/signup" className="text-white fw-semibold">
            Create an account
          </Link>
        </p>
      </div>
    </main>
  );
}
