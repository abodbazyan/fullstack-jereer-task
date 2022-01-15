import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import { connect, useDispatch } from "react-redux";
import { logoutUser } from "../../actions/authActions";

class Navbar extends Component {
  onLogoutClicked(event) {
    event.preventDefault();
    this.props.logoutUser();
    this.props.history.push("/");
  }

  render() {
    const { isAuthenticated, user } = this.props.auth;

    const authLinks = (
      <ul>
        <li>
          <a
            href="#"
            className="nav-link"
            onClick={this.onLogoutClicked.bind(this)}
          >
            Log out
          </a>
        </li>
      </ul>
    );

    const guestLinks = (
      <ul>
        <li>
          <Link to="/register">Register</Link>
        </li>
        <li>
          <Link to="/login">Login</Link>
        </li>
      </ul>
    );

    return (
      <div>
        <nav className="navbar bg-dark">
          <h1>
            <Link to="/">
              <i className="fas fa-code"></i> JereerBlog
            </Link>
          </h1>
          {isAuthenticated ? authLinks : guestLinks}
        </nav>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { logoutUser })(withRouter(Navbar));
