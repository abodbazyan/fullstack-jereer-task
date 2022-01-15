import React, { Component } from "react";
import PostFeedItem from "./PostFeedItem";

class PostFeed extends Component {
  render() {
    const { posts } = this.props;

    return posts.map((post) => <PostFeedItem key={post._id} post={post} />);
  }
}

export default PostFeed;
