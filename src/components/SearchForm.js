import React from "react";
import './style.css';

const SearchForm = (props) => {
  return (
    <form>
      <div className="form-group">
        <input
          onChange={props.handleInputChange}
          value={props.value}
          name="search"
          type="text"
          className="form-control"
          placeholder="Search For An Employee"
          id="search"
        />
      </div>
    </form>
  );
}

export default SearchForm;
