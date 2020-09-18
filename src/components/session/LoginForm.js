import React from 'react';
import UserContext from '../../contexts/UserContext';

class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: ''
    }
  }

  update = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  loginUser = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('/users/token', {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(this.state)
      })
      if (!res.ok) {
        throw res;
      }
      const {token, user: {id}} = await res.json();
      this.props.login(token, id);

    }
    catch (e) {
      console.error(e)
    }
  }

  render() {
    const { email, password } = this.state;
    return (
      <form onSubmit={this.loginUser}>
        <h2>Log In</h2>
        <input
          type="email"
          value={email}
          onChange={this.update}
          name="email"
          placeholder="Enter Email"
        />
        <input
          type="password"
          value={password}
          onChange={this.update}
          name="password"
          placeholder="Enter Password"
        />
        <button type="submit">Submit</button>
      </form>
    );
  }
};

const LoginFormWithContext = (props) => (
  <UserContext.Consumer>
    {value => <LoginForm login={value.login} {...props}/>}
  </UserContext.Consumer>
)


export default LoginFormWithContext;
