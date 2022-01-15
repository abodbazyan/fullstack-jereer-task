import React, { useState, useEffect } from "react";
import Select from "react-select";
import { Link, withRouter } from "react-router-dom";
import { connect, useDispatch } from "react-redux";
import { registerUser } from "../../actions/authActions";

import { options } from "./dropdown-options";

function Register({ auth, error, history }) {
  const [username, setUsername] = useState(null);
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [number, setNumber] = useState(null);
  const [selectedOption, setSelectedOption] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    setErrorMsg(error.errorMsg);

    if (auth.isAuthenticated) history.push("/posts");
  }, [error]);

  const registerSubmitHandler = (event) => {
    event.preventDefault();

    const newUser = {
      username,
      email,
      password,
      number,
      countryCode: selectedOption.value,
    };

    dispatch(registerUser(newUser, history));
  };

  return (
    <section className="container">
      {errorMsg && <div className="alert alert-danger">{errorMsg}</div>}
      <h1 className="large custom-text-primary">Register</h1>
      <p className="lead">
        <i className="fas fa-user"></i> Create Your Account
      </p>
      <form className="form" onSubmit={registerSubmitHandler}>
        <div className="form-group">
          <input
            type="text"
            placeholder="Username"
            name="name"
            required
            onChange={(event) => setUsername(event.target.value)}
          />
        </div>
        <div className="form-group">
          <input
            type="email"
            placeholder="Email Address"
            name="email"
            required
            onChange={(event) => setEmail(event.target.value)}
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="Password"
            name="password"
            minLength="6"
            required
            onChange={(event) => setPassword(event.target.value)}
          />
        </div>
        <div className="form-group">
          <Select
            defaultValue={selectedOption}
            onChange={setSelectedOption}
            options={options}
            placeholder="Country Code"
          />
          <input
            className="mt-1 mb-3"
            type="text"
            placeholder="Phone Number"
            name="phoneNumber"
            required
            onChange={(event) => setNumber(event.target.value)}
          />
        </div>
        <input type="submit" className="btn btn-primary" value="Register" />
      </form>
      <p className="my-1">
        Already have an account? <Link to="/login">Log In</Link>
      </p>
    </section>
  );
}

const mapStateToProps = (state) => ({
  auth: state.auth,
  error: state.error,
});

export default connect(mapStateToProps, { registerUser })(withRouter(Register));
