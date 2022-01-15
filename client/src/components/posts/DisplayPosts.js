import React, { Component } from "react";
import { connect } from "react-redux";
import PostForm from "./PostForm";
import { getPosts } from "../../actions/postActions";
import PostFeed from "./PostFeed";

class DisplayPosts extends Component {
  componentDidMount() {
    this.props.getPosts();
  }

  componentDidUpdate() {
    this.props.getPosts();
  }

  render() {
    const { posts } = this.props.post;

    let postContent;
    if (posts !== null) {
      postContent = <PostFeed posts={posts} />;
    }

    return (
      <div className="feed">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <PostForm />
              {postContent}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  post: state.post,
});

export default connect(mapStateToProps, { getPosts })(DisplayPosts);
