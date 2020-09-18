import React from 'react';
import UserContext from '../../contexts/UserContext';

class RegistrationForm extends React.Component {
  constructor(props) {
    super(props);
    // TODO: Set up default state
    this.state = {
      username: '',
      email: '',
      password: ''
    };
  }

  updateUsername = (e) => {
    this.setState({ username: e.target.value });
  }

  updateEmail = (e) => {
    this.setState({ email: e.target.value });
  }

  updatePassword = (e) => {
    this.setState({ password: e.target.value });
  }

  registerUser = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(this.state)
      })
      if (!res.ok) {
        throw res;
      }
      const { token, user:{id} } = await res.json();
      // console.log(data.token, data.user.id);
      this.props.updateContext(token, id);

    } catch (e) {
      console.error(e)
    }
  }

  render() {
    // TODO: Render registration form
    const { username, email, password } = this.state;
    return (
      <form onSubmit={this.registerUser}>
        <h2>Register</h2>
        <input
          type="text"
          value={username}
          onChange={this.updateUsername}
          name="username"
          placeholder="Enter Username"
        />
        <input
          type="email"
          value={email}
          onChange={this.updateEmail}
          name="email"
          placeholder="Enter Email"
        />
        <input
          type="password"
          value={password}
          onChange={this.updatePassword}
          name="password"
          placeholder="Enter Password"
        />
        <button type="submit">Submit</button>
      </form>

    );
  }
}


const RegistrationFormWithContext = (props) => (
<UserContext.Consumer>
  {value => <RegistrationForm updateContext={value.updateContext} {...props} />}
</UserContext.Consumer>
)



export default RegistrationFormWithContext;
