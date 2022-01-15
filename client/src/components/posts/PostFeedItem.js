import React, { Component } from "react";
// import formatDate from "../../utils/formatDate";

class PostFeedItem extends Component {
  render() {
    const {
      post: {
        text,
        userId: { username, createdAt },
      },
    } = this.props;

    return (
      <div className="card mt-4">
        <div className="card-body">
          <h6
            className="card-title text-secondary fst-italic text-decoration-underline"
            style={{ cursor: "pointer" }}
          >
            @{username}
          </h6>
          <p className="card-text ms-4">{text}</p>
          <div className="text-muted" style={{ fontSize: "12px" }}>
            <small>
              Created at: {createdAt}
              {/*{formatDate(createdAt)}*/}
            </small>
          </div>
        </div>
      </div>
    );
  }
}

export default PostFeedItem;
