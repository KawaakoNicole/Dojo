import React from "react";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

function Signup() {
  const [firstname, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  function handleFistName(e) {
    let fname = e.target.value;
    setFirstName(fname);
  }
  function handleLastName(e) {
    let lname = e.target.value;
    setLastName(lname);
  }
  function handleUserName(e) {
    let username = e.target.value;
    setUserName(username);
  }
  function handlePassword(e) {
    let password = e.target.value;
    setPassword(password);
  }
  function handleEmail(e) {
    let email = e.target.value;
    setEmail(email);
  }

  function handleSubmit(e) {
    e.preventDefault();
    const user = { email, username, password };

    const person = {
      fname: firstname,
      lname: lastname,
      uname: username,
    };
    const personToJSON = JSON.stringify(person);

    localStorage.setItem("person", personToJSON);
 

    // This is the API endpoint which will enable me register a user
    const url = "http://127.0.0.1:8000/auth/register/";

    fetch(url, {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(user),
    })
      .then((res) => {

        navigate("/");
      })
      .catch((err) => {
        console.log("Error: " + err);
      });
     navigate("/");
  }
  return (
    <div className="container mt-5">
      <div className="d-flex justify-content-center align-items-center">
        <form
          method="post"
          action=""
          className="w-50 bg-light p-4 rounded"
          onSubmit={handleSubmit}
        >
          <p className="text-center fs-2 ">ACCOUNT CREATION FORM</p>
          <div className="row">
            <div className="col-6">
              <label htmlFor="" className="form-label mb-0 mt-2">
                First Name
              </label>
              <input
                type="text"
                className="form-control"
                name="firstname"
                value={firstname}
                placeholder="Enter your first name...."
                onChange={handleFistName}
                required
              />
            </div>
            <div class="col-6">
              <label htmlFor="" className="form-label mb-0 mt-2">
                Last Name
              </label>
              <input
                type="text"
                className="form-control"
                name="lastname"
                value={lastname}
                placeholder="Enter your last name...."
                onChange={handleLastName}
                required
              />
            </div>
          </div>
          <div className="row">
            <div class="col">
              <label htmlFor="" className="form-label mb-0 mt-2">
                Username
              </label>
              <input
                type="text"
                className="form-control"
                name="username"
                value={username}
                placeholder="Enter username......"
                onChange={handleUserName}
                required
              />
            </div>
          </div>
          <div className="row">
            <div class="col">
              <label htmlFor="" className="form-label mb-0 mt-2">
                Email
              </label>
              <input
                type="text"
                className="form-control"
                name="email"
                value={email}
                placeholder="Enter your email......"
                onChange={handleEmail}
                required
              />
            </div>
          </div>
          <div className="row">
            <div class="col">
              <label htmlFor="" className="form-label mb-0 mt-2">
                Password
              </label>
              <input
                type="password"
                className="form-control"
                name="password"
                value={password}
                placeholder="Enter your password....."
                onChange={handlePassword}
                required
              />
            </div>
          </div>
          <div className="d-flex justify-content-center align-items-center mt-3">
            <button type="submit" className="btn btn-success">
              Signup
            </button>
          </div>
          <p className="mt-3">
            Already have an account? <Link to="/">Login</Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Signup;
