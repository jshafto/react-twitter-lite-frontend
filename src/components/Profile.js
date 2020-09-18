import React from 'react';
import UserContext from '../contexts/UserContext';

class Profile extends React.Component {
  constructor(props) {
    super(props);
    // TODO: Set up default state
    this.state = {
      user: {},
      tweets: []
    }
  }


  fetchTweets= async () => {
    try {
      const userId = this.props.match.params.userId;

      const res = await fetch(`/users/${userId}/tweets`, {
        headers: {
          "Authorization": this.props.authToken
        }
      })
      if (!res.ok) {
        throw res;
      }
      const data = await res.json();
      return data.tweets;
    }
    catch (e) {
      console.error(e);
    }
  }


  fetchUser = async () => {
    try {
      const userId = this.props.match.params.userId;
      const res = await fetch(`/users/${userId}/`, {
        headers: {
          "Authorization": this.props.authToken
        }
      })
      if (!res.ok) {
        throw res;
      }
      return res.json();

    } catch (e) {
      console.error(e);
    }
  }


  async componentDidMount() {
    const user = await this.fetchUser();
    const tweets = await this.fetchTweets();
    this.setState(
      { user, tweets },
      () => console.log(this.state),
    );

  }

  render() {
    return (
      <h1>Profile Page</h1>
    );
  }
};

const ProfileWithContext = (props) => (
  <UserContext.Consumer>
    {value => <Profile currentUserId={value.currentUserId} authToken={value.authToken} {...props}/>}
  </UserContext.Consumer>
)

export default ProfileWithContext;
