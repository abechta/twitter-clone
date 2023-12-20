import { useEffect, useState } from 'react';
import './FollowRecommendations.css';
import axios from 'axios';

const FollowRecommendations = (props) => {
  const [recommendation, setRecommendation] = useState([]);

  const getRecommendations = () => {
    axios
      .post('https://akademia108.pl/api/social-app/follows/recommendations')
      .then((res) => {
        setRecommendation(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const follow = (id) => {
    axios
      .post('https://akademia108.pl/api/social-app/follows/follow', {
        leader_id: id,
      })
      .then((res) => {
        props.getLetestPosts();
      })
      .catch((err) => {
        console.error(err);
      });
  };

  useEffect(() => {
    getRecommendations();
  }, [props.posts]);
  console.log(recommendation);
  return (
    <div className="follow">
      {recommendation.map((recommendation) => {
        return (
          <div className="follower" key={recommendation.id}>
            <img
              src={recommendation.avatar_url}
              alt={recommendation.username}
            ></img>
            <h3>{recommendation.username}</h3>
            <button
              className="btn"
              onClick={() => {
                follow(recommendation.id);
              }}
            >
              Follow
            </button>
          </div>
        );
      })}
    </div>
  );
};

export default FollowRecommendations;
