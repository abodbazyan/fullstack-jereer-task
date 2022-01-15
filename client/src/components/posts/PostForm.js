import React, { Component } from "react";
import { connect } from "react-redux";
import { addPost } from "../../actions/postActions";

class PostForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: "",
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  onSubmit(event) {
    event.preventDefault();

    const { user } = this.props.auth;

    const newPost = {
      text: this.state.text,
    };

    this.setState({ text: "" });
    this.props.addPost(newPost);
  }

  render() {
    return (
      <div className="post-form">
        <div className="card card-info">
          <div className="custom-bg-primary card-header ">Say Something...</div>
          <div className="card-body">
            <form className="form" onSubmit={this.onSubmit}>
              <textarea
                name="text"
                cols="30"
                rows="3"
                placeholder="Create a post"
                // value={this.state.text}
                onChange={this.onChange}
                required
              />
              <input
                type="submit"
                className="btn btn-dark my-1"
                value="Submit"
              />
            </form>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { addPost })(PostForm);
