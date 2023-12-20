import { useState } from 'react';
import './Login.css';
import axios from 'axios';
import { Navigate } from 'react-router-dom';

const Login = (props) => {
  const [formData, setFormData] = useState({
    username: '',
    userpass: '',
  });

  const [loginMessage, setloginMessage] = useState('');

  const handlerInputChange = (e) => {
    const target = e.target;
    const name = target.name;

    setFormData({
      ...formData,
      [name]: target.value,
    });
  };

  const handlerSubmit = (e) => {
    e.preventDefault();
    axios
      .post('https://akademia108.pl/api/social-app/user/login', {
        username: formData.username,
        password: formData.userpass,
      })
      .then((res) => {
        if (Array.isArray(res.data.username)) {
          setloginMessage(res.data.username[0]);
        } else if (Array.isArray(res.data.password)) {
          setloginMessage(res.data.password[0]);
        } else if (res.data.error) {
          setloginMessage('Incorret username or pass');
        } else {
          setloginMessage('');
          props.setUser(res.data);
          localStorage.setItem('user', JSON.stringify(res.data));
        }
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <div className="login">
      {props.user && <Navigate to="/" />}
      <form onSubmit={handlerSubmit}>
        {loginMessage && <h2>{loginMessage}</h2>}
        <input
          type="text"
          name="username"
          placeholder="User name"
          value={formData.username}
          onChange={handlerInputChange}
        ></input>
        <input
          type="password"
          name="userpass"
          placeholder="User pass"
          value={formData.userpass}
          onChange={handlerInputChange}
        ></input>
        <button className="btn">Login</button>
      </form>
    </div>
  );
};

export default Login;
