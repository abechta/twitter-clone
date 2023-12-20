import { useState } from 'react';
import './Post.css';
import axios from 'axios';

const Post = (props) => {
  const [like, setLike] = useState(props.post.likes.length);
  const [deleteModalVis, setDeleteModalVis] = useState(false);
  const [doesUserLike, setDoesUserLike] = useState(
    props.post.likes.filter((like) => like.username === props.user?.username)
      .length !== 0
  );

  const deletePost = (id) => {
    axios
      .post('https://akademia108.pl/api/social-app/post/delete', {
        post_id: id,
      })
      .then((res) => {
        props.setPosts((posts) => {
          return posts.filter((post) => post.id !== res.data.post_id);
        });
      })
      .catch((er) => {
        console.error(er);
      });
  };

  const likePost = (id, isLiked) => {
    axios
      .post(
        'https://akademia108.pl/api/social-app/post/' +
          (isLiked ? 'dislike' : 'like'),
        {
          post_id: id,
        }
      )
      .then(() => {
        setLike(like + (isLiked ? -1 : 1));
        setDoesUserLike(!isLiked);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const unfollow = (id) => {
    axios
      .post('https://akademia108.pl/api/social-app/follows/disfollow', {
        leader_id: id,
      })
      .then((res) => {
        props.getLetestPosts();
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <div className="post">
      <div className="avatar">
        <img src={props.post.user.avatar_url} alt="user avatar"></img>
      </div>
      <div className="post-data">
        <div className="post-meta">
          <div className="author">{props.post.user.username}</div>
          <div className="date">
            {props.post.user.created_at.substring(0, 10)}
          </div>
        </div>
        <div className="postContent">{props.post.content}</div>
        <div className="likes">
          {props.user && (
            <button
              className="btn"
              onClick={() => likePost(props.post.id, doesUserLike)}
            >
              {doesUserLike ? 'Dislike' : 'Like'}
            </button>
          )}

          {like}
          {props.user?.username === props.post.user.username && (
            <button
              className="btn"
              onClick={() => {
                setDeleteModalVis(true);
              }}
            >
              Delete
            </button>
          )}

          {props.user && props.user.username !== props.post.user.username && (
            <button
              className="btn"
              onClick={() => {
                unfollow(props.post.user.id);
              }}
            >
              Unfollow
            </button>
          )}
        </div>
      </div>

      {deleteModalVis && (
        <div className="delete-confirm">
          <h3>Are you sure you want delete Post?</h3>
          <button
            className="btn yes"
            onClick={() => {
              deletePost(props.post.id);
            }}
          >
            YES
          </button>
          <button
            className="btn no"
            onClick={() => {
              setDeleteModalVis(false);
            }}
          >
            NO
          </button>
        </div>
      )}
    </div>
  );
};

export default Post;
