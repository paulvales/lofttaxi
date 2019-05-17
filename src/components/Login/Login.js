import React, { Component } from "react";
import { Redirect } from "react-router-dom";
// import { Form, Field } from "react-final-form";
import { connect } from "react-redux";
import { loginRequest, getIsAuthorized } from "../../modules/Auth";

import { Button, Input, Form } from "semantic-ui-react";
import Grid from "@material-ui/core/Grid";
import { Typography, Paper } from "@material-ui/core";
// import { input } from "../helpers/Fields";

import "./Login.css";

class Login extends Component {
  state = {
    username: "",
    password: "",
    errorName: false,
    errorPass: false,
    loadingForm: false
  };
  handleChange = (e, { name, value }) => {
    this.setState({ [name]: value });
  };
  validate = () => {
    const { username, password } = this.state;
    this.setState({ errorName: false, errorPass: false });
    if (username !== "test@test.com") {
      this.setState({ errorName: true });
    }
    if (password !== "123123") {
      this.setState({ errorPass: true });
    }
  };

  handleSend = () => {
    this.setState({ loadingForm: true });
    const { username, password, errorName, errorPass } = this.state;
    const { loginRequest } = this.props;
    this.validate();
    if (!errorName && !errorPass) loginRequest({ username, password });
    this.setState({ loadingForm: false });
  };

  render() {
    const { isAuthorized } = this.props;
    const {
      username,
      password,
      errorName,
      errorPass,
      loadingForm
    } = this.state;
    if (isAuthorized) {
      return <Redirect to="/map" />;
    }
    return (
      <Grid container alignItems="center" justify="center">
        <Grid item xs={3}>
          <Paper className="login-form">
            <Grid container spacing={24}>
              <Grid item xs={12}>
                <Typography component="h1" variant="h4" align="center">
                  Войти
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Form onSubmit={this.handleSend}>
                  <Form.Field required>
                    <Input
                      focus
                      placeholder="Имя пользователя"
                      name="username"
                      value={username}
                      onChange={this.handleChange}
                      error={errorName}
                    />
                  </Form.Field>
                  <Form.Field required>
                    <Input
                      placeholder="Пароль"
                      name="password"
                      type="password"
                      value={password}
                      onChange={this.handleChange}
                      error={errorPass}
                    />
                  </Form.Field>
                  <br />
                  <br />
                  <Button color="blue" type="submit" loading={loadingForm}>
                    Войти
                  </Button>
                </Form>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    );
  }
}

const mapStateToProps = state => ({ isAuthorized: getIsAuthorized(state) });
const mapDispatchToProps = { loginRequest };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);
