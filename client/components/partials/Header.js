import React from 'react';
import Nav from './Nav';

const Header = props => {
  return (
    <header>
      <div className="logo">Thundercats Flashcards!</div>
      <Nav auth={props.auth} />
    </header>
  );
}

export default Header;
