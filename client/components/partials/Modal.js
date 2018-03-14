import React, { Component } from 'react';
import { Link } from 'react-router-dom';

const Modal = (props) => {
  return (
    <div className="modal">
      {props.children}
    </div>
  );
}

export default Modal;

