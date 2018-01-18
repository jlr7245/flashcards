import React from 'react';
import { Link } from 'react-router-dom';

const Nav = (props) => {
  console.log('nav props ======> ', props);
  return (
    <nav>
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/flashcards">Flashcards</Link></li>
        <li><Link to="/keywords">Keywords</Link></li>
        <li><Link to="/quizzes">Quizzes</Link></li>
        {(props.auth) ? (
          <React.Fragment>
            <li><Link to="/dash">Dashboard</Link></li>
            <li><Link to="/logout">Logout</Link></li>
          </React.Fragment>
        ) : (
          <React.Fragment>
            <li><Link to="/login">Login</Link></li>
            <li><Link to="/register">Register</Link></li>
          </React.Fragment>
        )}
      </ul>
    </nav>
  )
}

export default Nav;
