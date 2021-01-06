import React, { Component } from "react";

class Select extends Component {
  state = {};

  render() {
    const { name, error, label, options, handleChange, value } = this.props;

    return (
      <div className="form-group">
        <label htmlFor={name}>{label}</label>
        <select
          name={name}
          id={name}
          onChange={handleChange}
          className="form-control"
        >
          <option value={""}>{value()}</option>
          {options.map((opt) => (
            <option key={opt._id} value={opt._id}>
              {opt.name}
            </option>
          ))}
        </select>
        {error && <div className="alert alert-danger">{error}</div>}
      </div>
    );
  }
}

export default Select;
