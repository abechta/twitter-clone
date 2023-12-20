import { Link } from 'react-router-dom';
import './Navbar.css';
import axios from 'axios';

const Navbar = (props) => {
  const handlerLogout = (e) => {
    e.preventDefault();

    axios
      .post('https://akademia108.pl/api/social-app/user/logout')
      .then((res) => {
        console.log(res.data.message);
        if (res.data.message) {
          props.setUser(null);
          localStorage.setItem('user', null);
        }
      })
      .catch((err) => {
        props.setUser(null);
        localStorage.setItem('user', null);
        console.error(err);
      });
  };

  return (
    <nav className="mainNav">
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        {!props.user && (
          <li>
            <Link to="/login">Login</Link>
          </li>
        )}
        {!props.user && (
          <li>
            <Link to="/signup">Sign Up</Link>
          </li>
        )}

        {props.user && (
          <li>
            <Link to="/" onClick={handlerLogout}>
              Logout
            </Link>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
