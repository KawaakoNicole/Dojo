import React from "react";
import {Link, useNavigate }from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  const details = localStorage.getItem("person");
  const JsontoPerson = JSON.parse(details);


  function handleLogout(){
    localStorage.removeItem("person")
    navigate("/")
  }


  return (
    <header className="d-flex justify-content-around align-content-center w-100 bg-dark p-3">
      <div>
        {JsontoPerson ? (
          <Link to="/home">
            <p className="text-light fs-4">
              Nicole <span className="text-danger">TODO</span>
            </p>
          </Link>
        ) : (
          <p className="text-light fs-4">
            Nicole <span className="text-danger">TODO</span>
          </p>
        )}
      </div>

      {JsontoPerson ? (
        <div className="d-flex">
          <button
            class="btn btn btn-outline-primary me-3 ps-4 pe-4"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      ) : (
        <div className="d-flex">
          <Link to="/">
            <button class="btn btn btn-outline-primary me-3 ps-4 pe-4">
              Login
            </button>
          </Link>
          <Link to="/signup">
            <button class="btn btn-outline-secondary ps-4 pe-4 ">
              Create Account
            </button>
          </Link>
        </div>
      )}
    </header>
  );
}

export default Navbar;
