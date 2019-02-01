import React, { Component } from "react";
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

  validate = () => {
    const errors = {};

    const { account } = this.state;

    if (account.username.trim() === "")
      errors.username = "Username is requiered.";
    if (account.password.trim() === "")
      errors.password = "Password is requiered.";

    return Object.keys(errors).length === 0 ? null : errors;
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

  handleChange = ({ currentTarget: input }) => {
    const account = { ...this.state.account };
    account[input.name] = input.value;
    this.setState({ account });
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
