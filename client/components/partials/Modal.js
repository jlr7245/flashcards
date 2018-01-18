import React, { Component } from 'react';
import { Link } from 'react-router-dom';

const Modal = (props) => {
  return (
    <div className="modal">
      <h1>Modal</h1>
      {props.children}
    </div>
  );
}

export default Modal;

