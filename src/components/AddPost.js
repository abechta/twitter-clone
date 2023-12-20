import { useState } from 'react';
import './AddPost.css';
import axios from 'axios';

const AddPost = (props) => {
  const [postData, setPostData] = useState('');

  const getPostContent = (e) => {
    setPostData(e.target.value);
  };

  const addPost = (e) => {
    e.preventDefault();

    if (!postData) {
      return;
    } else {
      axios
        .post('https://akademia108.pl/api/social-app/post/add', {
          content: postData,
        })
        .then((res) => {
          props.getPrevPosts();
          setPostData('');
        })
        .catch((err) => {
          console.error(err);
        });
    }
  };

  return (
    <form className="add-form" onSubmit={addPost}>
      <textarea
        placeholder="Add post"
        onChange={getPostContent}
        value={postData}
      ></textarea>
      <button className="btn">Add</button>
    </form>
  );
};
export default AddPost;
