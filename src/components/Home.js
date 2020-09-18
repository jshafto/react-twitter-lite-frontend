import React from 'react';
import UserContext from '../contexts/UserContext';

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state={
      tweets: [],
      tweetInput: ''
    }
  }

  static contextType = UserContext;

  fetchTweets = async () => {
    try{
      const res = await fetch(`/tweets`, {
        header: {
          "Authorization": this.context.authToken
        }
      });
      if(!res.ok) {
        throw res;
      }
      const obj = await res.json();
      return obj.tweets;
    } catch (e) {
      console.error (e);
      return [];
    }

  }

  async componentDidMount() {
    const tweets = await this.fetchTweets();
    this.setState({tweets});
  }

  update = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  createTweet = async (e) => {
    e.preventDefault();
    // const {tweetInput} = e.target;
    // console.log(this.state.tweetInput)
    try {
      const newTweet = {
        message: this.state.tweetInput,
        userId: this.props.currentUserId
      }
      const res = await fetch("/tweets", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": this.props.authToken
        },
        body: JSON.stringify(newTweet)
      })
      if (!res.ok) {
        throw res;
      }

      const tweets = await this.fetchTweets();
      this.setState({tweets, tweetInput: ''});


    } catch (e) {
      console.error(e)
    }

  }

  render() {
    return (
      <div>
        <h1>Home Page</h1>
        <button onClick={this.context.logout}>Logout</button>
        <form onSubmit={this.createTweet}>
          <h3>Compose a new tweet</h3>
          <input
            type="text"
            value={this.state.tweetInput}
            onChange={this.update}
            name="tweetInput"
            placeholder="What's on your mind?"
          />
          <button type="submit">Submit</button>
        </form>
        <ul>
          {this.state.tweets.map((tweet) => {
            const { id, message, user: { username }} = tweet;
            return (
              <li key={id}>
                <h3>{username}</h3>
                <p>{message}</p>
              </li>
          )})}
        </ul>
      </div>
    );
  }

};

const HomeWithContext = (props) => (
  <UserContext.Consumer>
    {value => <Home currentUserId={value.currentUserId} authToken={value.authToken} {...props}/>}
  </UserContext.Consumer>
)

export default HomeWithContext;
