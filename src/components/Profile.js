import React from 'react';
import UserContext from '../contexts/UserContext';

class Profile extends React.Component {
  constructor(props) {
    super(props);
    // TODO: Set up default state
    this.state = {
      user: {
        username: ''
      },
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
      const data = await res.json();
      return data.user;

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
    const {user, tweets} = this.state;
    // debugger;
    return (
      <div>
        <h1>{user.username}'s Profile Page</h1>
        <ul>
          {tweets.map((tweet) => {
            const { id, message } = tweet;
            return (
              <li key={id}>
                <p>{message}</p>
              </li>
          )})}
        </ul>
      </div>
    );
  }
};

const ProfileWithContext = (props) => (
  <UserContext.Consumer>
    {value => <Profile currentUserId={value.currentUserId} authToken={value.authToken} {...props}/>}
  </UserContext.Consumer>
)

export default ProfileWithContext;
