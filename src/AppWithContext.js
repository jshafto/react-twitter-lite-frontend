import React from 'react';
import UserContext from './contexts/UserContext';
import App from './App';
import Cookies from 'js-cookie';


class AppWithContext extends React.Component {
  constructor() {
    super();
    let authToken = Cookies.get('token'); // get the cookie with the name of 'token'

    let currentUserId = null;
    if (authToken) {
      try {
        const payload = authToken.split(".")[1]; // payload of a JWT is after the first period in the token string
        const decodedPayload = atob(payload); // payload needs to be decoded using the built-in function `atob`
        const payloadObj = JSON.parse(decodedPayload); // convert the decoded payload into a POJO from a JSON string
        const { data: { id } } = payloadObj;
        /* payloadObj will look like:
        payloadObj = {
          data: { id: ..., email: ... }
        }
        */
        currentUserId = id; // set currentUserId equal to the payload's user id
      } catch (e) {
        // if there is an error parsing the token, then remove the 'token' cookie
        authToken = null;
        Cookies.remove('token');
      }
    }
    this.state = {
      authToken: authToken || null,
      currentUserId: currentUserId,
      login: this.login,
      logout: this.logout
    };
  }

  login = (authToken, currentUserId) =>{
    this.setState({authToken, currentUserId}, () => console.log(this.state))
  }

  logout = () => {
    this.setState({ authToken: null, currentUserId: null }, () => {
      console.log(this.state);
      Cookies.remove('token');
    });
  }


  render() {
    // console.log(this.state)
    return (
      <UserContext.Provider value={this.state}>
        <App currentUserId={this.state.currentUserId}/>
      </UserContext.Provider>
    );
  }
}

export default AppWithContext;
