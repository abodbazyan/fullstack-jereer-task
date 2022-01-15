import "./custom-bootstrap.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store";

import jwt_decode from "jwt-decode";
import setAuthToken from "./utils/setAuthToken";
import { logoutUser, setCurrentUser } from "./actions/authActions";

import Navbar from "./components/layout/Navbar";
import Landing from "./components/layout/Landing";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import DisplayPosts from "./components/posts/DisplayPosts";

import PrivateRoute from "./components/common/PrivateRoute";

// Check for token
if (localStorage.jereerBlogToken) {
  // Set token to authorization header
  setAuthToken(localStorage.jereerBlogToken);
  // decode user data
  const decoded = jwt_decode(localStorage.jereerBlogToken);
  store.dispatch(setCurrentUser(decoded));
  // Check for expired token
  const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) {
    store.dispatch(logoutUser());
    window.location.href = "/login";
  }
}

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className="App">
          <Navbar />
          <Route exact path="/" component={Landing} />
          <div className="container">
            <Route exact path="/register" component={Register} />
            <Route exact path="/login" component={Login} />
            <Switch>
              <PrivateRoute exact path="/posts" component={DisplayPosts} />
            </Switch>
          </div>
        </div>
      </Router>
    </Provider>
  );
}

export default App;
