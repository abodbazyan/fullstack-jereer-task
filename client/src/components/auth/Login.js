import React, { useState, useEffect } from "react";
import { Link, withRouter } from "react-router-dom";
import { connect, useDispatch } from "react-redux";
import { loginUser } from "../../actions/authActions";

function Login({ auth, error, history }) {
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    setErrorMsg(error.errorMsg);

    if (auth.isAuthenticated) history.push("/posts");
  }, [error]);

  const loginSubmitHandler = (event) => {
    event.preventDefault();

    const user = {
      email,
      password,
    };

    dispatch(loginUser(user, history));
  };

  return (
    <section className="container">
      {errorMsg && <div className="alert alert-danger">{errorMsg}</div>}
      <h1 className="large custom-text-primary">Log In</h1>
      <p className="lead">
        <i className="fas fa-user"></i> Log into Your Account
      </p>
      <form className="form" onSubmit={loginSubmitHandler}>
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
            required
            onChange={(event) => setPassword(event.target.value)}
          />
        </div>
        <input type="submit" className="btn btn-primary" value="Log in" />
      </form>
      <p className="my-1">
        Don't have an account? <Link to="register">Register</Link>
      </p>
    </section>
  );
}

const mapStateToProps = (state) => ({
  auth: state.auth,
  error: state.error,
});

export default connect(mapStateToProps, { loginUser })(withRouter(Login));
