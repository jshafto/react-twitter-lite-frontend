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

  update = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

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
      this.props.login(token, id);

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
          onChange={this.update}
          name="username"
          placeholder="Enter Username"
        />
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
}


const RegistrationFormWithContext = (props) => (
<UserContext.Consumer>
  {value => <RegistrationForm login={value.login} {...props} />}
</UserContext.Consumer>
)



export default RegistrationFormWithContext;
