import React from "react";

const SearchBox = ({ value, onChange }) => {
  return (
    <input
      type="text"
      name="query"
      className="form-control my-3" //margin y
      placeholder="Search..."
      value={value}
      onChange={e => onChange(e.currentTarget.value)} //we raise an event with the value
    />
  );
};

export default SearchBox;
