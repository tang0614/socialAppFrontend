import React, { Component } from "react";
import Input from "./input";
import Select from "./select";
import Joi from "joi";
class Form extends Component {
  state = {
    data: {},
    error: {},
  };

  handleInplaceError = (name, value) => {
    const sch = { [name]: this.schema[name] };
    const obj = { [name]: value };
    const { error } = Joi.validate(obj, sch); // we want to abort early
    if (!error) return null;
    return error.details[0].message;
  };

  handleChange = (event) => {
    const error = { ...this.state.error };
    const data = { ...this.state.data };
    const value = event.currentTarget.value;
    const name = event.currentTarget.name;
    data[name] = value;

    const errorMessage = this.handleInplaceError(name, value);
    error[name] = errorMessage;

    this.setState({ data, error });
  };

  handleSubmit = (event) => {
    console.log("clicking submit button");
    event.preventDefault();
    const error = this.validate();

    this.setState({ error: error || {} });
    if (error) return;
    this.handleServer();
    console.log("handling server...");
  };

  validate = () => {
    const result = Joi.validate(this.state.data, this.schema, {
      abortEarly: false,
    });
    if (!result.error) return null;

    const error = {};
    for (let item of result.error.details) {
      error[item.path[0]] = item.message;
    }

    return error;
  };

  renderButton(label) {
    return (
      <button disabled={this.validate()} className="btn btn-primary">
        {label}
      </button>
    );
  }
  renderInput = (name, label, type) => {
    return (
      <Input
        name={name}
        label={label}
        type={type}
        handleChange={this.handleChange}
        value={this.state.data[name]}
        error={this.state.error[name]}
      />
    );
  };

  renderSelect = (name, label, options, getGenre) => {
    return (
      <Select
        name={name}
        label={label}
        handleChange={this.handleChange}
        options={options}
        value={getGenre}
        error={this.state.error[name]}
      />
    );
  };
}

export default Form;
