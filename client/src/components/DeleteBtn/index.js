import React from "react";
import "./style.css";

const DeleteBtn = props => (
  <button className={`delete-btn btn btn-${props.btntype} btn-sm`} {...props}>
    {props.children}
  </button>
);

export default DeleteBtn;
