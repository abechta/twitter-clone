import axios from 'axios';
import { useEffect, useState } from 'react';
import Post from '../components/Post';
import './Home.css';
import AddPost from '../components/AddPost';
import FollowRecommendations from '../components/FollowRecommendations';

const Home = (props) => {
  const [posts, setPosts] = useState([]);

  const getLetestPosts = () => {
    axios
      .post('https://akademia108.pl/api/social-app/post/latest')
      .then((res) => {
        setPosts(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const getNextPosts = () => {
    axios
      .post('https://akademia108.pl/api/social-app/post/older-then', {
        date: posts[posts.length - 1].created_at,
      })
      .then((res) => {
        setPosts(posts.concat(res.data));
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const getPrevPosts = () => {
    axios
      .post('https://akademia108.pl/api/social-app/post/newer-then', {
        date: posts[0].created_at,
      })
      .then((res) => {
        setPosts(res.data.concat(posts));
      })
      .catch((err) => {
        console.error(err);
      });
  };

  useEffect(() => {
    getLetestPosts();
  }, [props.user]);

  return (
    <div className="home">
      {props.user && <AddPost getPrevPosts={getPrevPosts} />}
      {props.user && (
        <FollowRecommendations
          user={props.user}
          getLetestPosts={getLetestPosts}
          posts={posts}
        />
      )}
      <div className="postList">
        {posts.map((post) => {
          return (
            <Post
              post={post}
              key={post.id}
              user={props.user}
              setPosts={setPosts}
              getLetestPosts={getLetestPosts}
            />
          );
        })}
        <button className="btn loadMore" onClick={getNextPosts}>
          Load more
        </button>
      </div>
    </div>
  );
};

export default Home;
