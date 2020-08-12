import React, { Component } from "react";
import Axios from "axios";

export default class Posts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      page: 1,
      limit: 5,
    };
    this.loadMore = this.loadMore.bind(this);
  }

  componentDidMount() {
    Axios.get(
      `${process.env.REACT_APP_URL_API}/post?page=${this.state.page}&limit=${this.state.limit}`
    )
      .then((res) => {
        this.setState({
          items: res.data.data.posts,
        });
      })
      .catch((e) => {
        console.log(e);
      });
  }

  loadMore() {
    this.setState((old) => {
      return { limit: old.limit + 5 };
    });

    Axios.get(
      `${process.env.REACT_APP_URL_API}/post?page=${this.state.page}&limit=${this.state.limit}`
    )
      .then((res) => {
        this.setState({
          items: res.data.data.posts,
        });
      })
      .catch((e) => {
        console.log(e);
      });
  }

  render() {
    return (
      <div className="wrapper-loadmore">
        <h1>Data Posts</h1>
        {this.state.items
          .slice(0, this.state.limit)
          .map(({ id, author, title, created_at, url }) => {
            return (
              <div className="card" key={id}>
                <h1>{title}</h1>
                <div className="wrapper-text">
                  <h5>{author.name}</h5>|<h5>{created_at}</h5>
                </div>
                <a href={url}>baca</a>
              </div>
            );
          })}
        {this.state.limit >= this.state.items.length && (
          <button type="button" onClick={this.loadMore}>
            load more
          </button>
        )}
      </div>
    );
  }
}
