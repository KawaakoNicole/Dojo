import React from "react";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailerror, setEmailError] = useState(null);
  const [passworderror, setPasswordError] = useState(null);
  const [invaliddetails, setInvalidDetails] = useState(null);

  const navigate = useNavigate();

  function handleEmail(e) {
    let email = e.target.value;
    setEmail(email);
  }
  function handlePassword(e) {
    let password = e.target.value;
    setPassword(password);
  }

  function handleLogin(e) {
    e.preventDefault();
    const credentials = { email, password };

    let url = "http://127.0.0.1:8000/auth/login/";
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials),
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        console.log(data)
        if (data.email === email) {


        // Setting the email in session
        const personalEmail = {
          email: email
        };
        const pemail = JSON.stringify(personalEmail);

        localStorage.setItem("email", pemail);

          navigate("/home");
        } else {
          setEmailError(data.email);
          setPasswordError(data.password);
          setInvalidDetails(data.detail)
          navigate("/");
        }

      })
      .catch((err) => {
        console.log(err);
      });

  }
  return (
    <div className="container mt-5">
      <div className="d-flex justify-content-center align-items-center">
        <form
          action=""
          className="w-50 bg-light rounded p-4"
          onSubmit={handleLogin}
          method="post"
        >
          <p className="text-center h4">Login form</p>

          {emailerror || passworderror || invaliddetails != null ? (
            <p className="p-2 bg-light text-danger fs-5 w-100 rounded border">
              {" "}
              {emailerror || passworderror || invaliddetails}
            </p>
          ) : (
            <p className="p-2 bg-light text-danger w-100 rounded"></p>
          )}

          <div className="row">
            <div className="col col-12">
              <label className="form-label mb-0 mt-2" htmlFor="">
                Username
              </label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter your email as username..."
                onChange={handleEmail}
                value={email}
                required
                name="username"
              />
            </div>
          </div>
          <div className="row">
            <div className="col col-12">
              <label className="form-label mb-0 mt-2" htmlFor="">
                Password
              </label>
              <input
                type="password"
                className="form-control"
                placeholder="Enter your password..."
                onChange={handlePassword}
                required
                value={password}
                name="password"
              />
            </div>
          </div>
          <div className="d-flex justify-content-center align-items-center mt-3">
            <button type="submit" className="btn btn-primary">
              Login
            </button>
          </div>
          
            <p className="mt-3">Don't have an account? <Link to="/signup">Signup</Link></p>
          
        </form>
      </div>
    </div>
  );
}

export default Login;
