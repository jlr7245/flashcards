import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';

const Nav = (props) => {
  return (
    <nav>
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/flashcards">Flashcards</Link></li>
        <li><Link to="/keywords">Keywords</Link></li>
        <li><Link to="/quizzes">Quizzes</Link></li>
        {props.auth && <li><Link to="/dash">Dashboard</Link></li>}
        {props.auth && <li><Link to="/logout">Logout</Link></li>}
        {!props.auth && <li><Link to="/login">Login</Link></li>}
        {!props.auth && <li><Link to="/register">Register</Link></li>}
      </ul>
    </nav>
  )
}

export default Nav;
