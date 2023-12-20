import { Link, Navigate } from 'react-router-dom';
import './SignUp.css';
import { useState } from 'react';
import axios from 'axios';

const SingUp = (props) => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [errors, setErrors] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [signUpMessage, setSignUpMessage] = useState('');

  const [signUpDone, setSignUpDone] = useState(false);

  const validate = () => {
    let validationErr = {
      username: false,
      email: false,
      password: false,
      confirmPassword: false,
    };
    //user name
    if (formData.username.trim().length < 4) {
      validationErr.username = true;
      setErrors((prevErr) => {
        return {
          ...prevErr,
          username: 'User name should have at least 4 characters',
        };
      });
    } else if (!/^[^\s]*$/.test(formData.username.trim())) {
      validationErr.username = true;
      setErrors((prevErr) => {
        return {
          ...prevErr,
          username: 'User name shouldnt stay empty',
        };
      });
    } else {
      validationErr.username = false;
      setErrors((prevErr) => {
        return {
          ...prevErr,
          username: '',
        };
      });
    }

    //email
    if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(formData.email.trim())
    ) {
      validationErr.email = true;
      setErrors((prevErr) => {
        return {
          ...prevErr,
          email: 'There is no valid email',
        };
      });
    } else {
      validationErr.email = false;
      setErrors((prevErr) => {
        return {
          ...prevErr,
          email: '',
        };
      });
    }

    // pass

    if (formData.password.trim().length < 6) {
      validationErr.password = true;
      setErrors((prevErr) => {
        return {
          ...prevErr,
          password: 'User password should have at least 6 characters',
        };
      });
    } else if (!/^[^\s]*$/.test(formData.password.trim())) {
      validationErr.password = true;
      setErrors((prevErr) => {
        return {
          ...prevErr,
          password: 'User password shouldnt stay empty',
        };
      });
    } else if (
      !/[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]+/.test(formData.password.trim())
    ) {
      validationErr.password = true;
      setErrors((prevErr) => {
        return {
          ...prevErr,
          password: 'User password should have at least one special character',
        };
      });
    } else {
      validationErr.password = false;
      setErrors((prevErr) => {
        return {
          ...prevErr,
          password: '',
        };
      });
    }

    //confirm pass

    if (formData.confirmPassword.trim() !== formData.password.trim()) {
      validationErr.confirmPassword = true;
      setErrors((prevErr) => {
        return {
          ...prevErr,
          confirmPassword: 'Password are different ',
        };
      });
    } else {
      validationErr.confirmPassword = false;
      setErrors((prevErr) => {
        return {
          ...prevErr,
          confirmPassword: '',
        };
      });
    }

    return (
      !validationErr.username &&
      !validationErr.email &&
      !validationErr.password &&
      !validationErr.confirmPassword
    );
  };

  const handlerSingupChange = (e) => {
    const target = e.target;
    const name = target.name;

    setFormData({
      ...formData,
      [name]: target.value,
    });
  };

  const handlerSubmit = (e) => {
    e.preventDefault();

    if (!validate()) {
      return;
    }

    axios
      .post('https://akademia108.pl/api/social-app/user/signup', {
        username: formData.username,
        email: formData.email,
        password: formData.password,
      })
      .then((res) => {
        let resData = res.data;

        if (resData.signedup) {
          setSignUpMessage('Account created');
          setSignUpDone(true);
        } else {
          if (resData.message.username) {
            setSignUpMessage(resData.message.username[0]);
          } else if (resData.message.email) {
            setSignUpMessage(resData.message.email[0]);
          }
        }
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <div className="sing-up">
      {props.user && <Navigate to="/" />}
      <form onSubmit={handlerSubmit}>
        {signUpMessage && <h2>{signUpMessage}</h2>}
        <input
          type="text"
          name="username"
          placeholder="User name"
          onChange={handlerSingupChange}
        ></input>
        {errors.username && <p>{errors.username}</p>}
        <input
          type="email"
          name="email"
          placeholder="User email"
          onChange={handlerSingupChange}
        ></input>
        {errors.email && <p>{errors.email}</p>}
        <input
          type="password"
          name="password"
          placeholder="User pass"
          onChange={handlerSingupChange}
        ></input>
        {errors.password && <p>{errors.password}</p>}
        <input
          type="password"
          name="confirmPassword"
          placeholder="Confirm pass"
          onChange={handlerSingupChange}
        ></input>
        {errors.confirmPassword && <p>{errors.confirmPassword}</p>}
        <button className="btn" disabled={signUpDone}>
          Sign Up
        </button>
        {signUpDone && (
          <div>
            <Link to="/login" className="btn">
              Go to login
            </Link>
          </div>
        )}
      </form>
    </div>
  );
};

export default SingUp;
