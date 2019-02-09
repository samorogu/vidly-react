import React from "react";
import Joi from "joi-browser";
import Form from "../common/form";

class LoginForm extends Form {
  //username = React.createRef();

  // componentDidMount() {
  //   this.username.current.focus();
  // }
  state = {
    data: { username: "", password: "" },
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

  doSubmit = () => {
    //call the server
    console.log("submited");
  };

  render() {
    return (
      <div>
        <h1>Login</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("username", "Username")}
          {this.renderInput("password", "Password", "password")}
          {this.renderButton("Login")}
        </form>
      </div>
    );
  }
}

export default LoginForm;
