import React, { Component } from 'react';

import {
  BrowserRouter as Router,
  Route,
  Redirect,
} from 'react-router-dom'

import Header from "./components/header";
import Main from "./components/main";
import Footer from "./components/footer";
import Nav from "./components/nav";

const PrivateRoute = ({ component: Component, isAuthenticated: IsAuthenticated, ...rest }) => (
  <Route {...rest} render={(props) => (
    IsAuthenticated === true
      ? <Component {...props} />
      : <Redirect to={{
        pathname: '/',
        state: { from: props.location, showAuth: true }
      }} />
  )} />
)

function Home(props) {
  console.log("home")
  console.log(props)
  return (
    <div className="container">
      <Header />
      <Main isAuthenticated={props.isAuthenticated} signIn={props.signIn} showAuth={props.location && props.location.state && props.location.state.showAuth} />
      <Footer />
    </div>
  )
}

const iconList = [
  "fa-graduation-cap",
  "fa-book-open",
  "fa-bolt",
  "fa-chalkboard-teacher",
]
const messageList = [
  "Selecting the best questions for you.",
  "Preparing curated questions",
  "Sit tight !",
  "Almost there ...",
]

function Loader() {

  // Start the changing images
  const [counter, setCounter] = React.useState(0);

  React.useEffect(() => {
    const interval = setInterval(() => {
      setCounter(counter => (counter < 3) ? counter + 1 : 0);
    }, 3000);

    return () => {
      clearInterval(interval);
    };
  }, []);


  return (
    <div className="loader">
      <div className="image">
        <i className={"fa " + iconList[counter || 0]}></i>
      </div>
      <span>
        <h2>
          {messageList[counter]}
        </h2>
      </span>
    </div>
  )
}
function Arena() {
  return (
    <div>
      <Nav />
      <div style={{ margin: 'auto', textAlign: 'center' }}>
        <Loader />
      </div>
    </div>
  )
}

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      isAuthenticated: false,
    }

    this.signIn = this.signIn.bind(this)
    this.signOut = this.signOut.bind(this)
  }

  signIn(next) {
    this.setState({
      isAuthenticated: true,
    })
  }

  signOut() {
    this.setState({
      isAuthenticated: false,
    })
  }

  render() {
    return (
      <Router basename={process.env.PUBLIC_URL} >
        <Route default exact path="/" render={(props) => <Home isAuthenticated={this.state.isAuthenticated} signIn={this.signIn} {...props} />} />
        <PrivateRoute exact path="/arena" component={Arena} isAuthenticated={this.state.isAuthenticated} />
      </Router>
    );
  }
}

export default App;
