import React from "react";

const Input = ({ name, label, value, onChange }) => {
  return (
    <div className="form-group">
      <label htmlFor={name}>{label}</label>
      <input
        value={value} //props to set its value
        onChange={onChange} //update the state when the user types
        // autoFocus
        // ref={this.username}
        id={name}
        name={name}
        type="text"
        className="form-control"
      />
    </div>
  );
};

export default Input;
