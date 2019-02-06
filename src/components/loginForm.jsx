import React, { Component } from "react";
import Joi from "joi-browser";
import Input from "../common/input";

class LoginForm extends Component {
  //username = React.createRef();

  // componentDidMount() {
  //   this.username.current.focus();
  // }
  state = {
    account: { username: "", password: "" },
    errors: {} //we include errors object
  };

  schema = {
    username: Joi.string()
      .required()
      .label("Username"),
    password: Joi.string()
      .required()
      .label("Password")
  };

  validate = () => {
    const options = { abortEarly: false };
    const { error } = Joi.validate(this.state.account, this.schema, options);
    //console.log(result);

    // const errors = {};

    // const { account } = this.state;

    // if (account.username.trim() === "")
    //   errors.username = "Username is requiered.";
    // if (account.password.trim() === "")
    //   errors.password = "Password is requiered.";

    // return Object.keys(errors).length === 0 ? null : errors;

    //now we are going to make the code with joi

    if (!error) return null;

    const errors = {};

    for (let item of error.details) errors[item.path[0]] = item.message;
    return errors;
  };

  handleSubmit = e => {
    e.preventDefault(); //let's stop this event

    const errors = this.validate();
    this.setState({ errors: errors || {} });

    if (errors) return;
    //call the server
    //const username = this.username.current.value;
    console.log("submited");
  };

  validateProperty = ({ name, value }) => {
    if (name === "username") {
      if (value.trim() === "") return "Username is required";
      //...
    }
    if (name === "password") {
      if (value.trim() === "") return "Password is required";
      //...
    }
  };

  handleChange = ({ currentTarget: input }) => {
    const errors = { ...this.state.errors };
    const errorMessage = this.validateProperty(input);
    if (errorMessage) errors[input.name] = errorMessage;
    else delete errors[input.name];

    const account = { ...this.state.account };
    account[input.name] = input.value;
    this.setState({ account, errors });
  };

  render() {
    const { account, errors } = this.state;
    return (
      <div>
        <h1>Login</h1>
        <form onSubmit={this.handleSubmit}>
          <Input
            name="username"
            value={account.username}
            label="Username"
            onChange={this.handleChange}
            error={errors.username}
          />
          <Input
            name="password"
            value={account.password}
            label="Password"
            onChange={this.handleChange}
            error={errors.password}
          />
          <button className="btn btn-primary">Login</button>
        </form>
      </div>
    );
  }
}

export default LoginForm;
