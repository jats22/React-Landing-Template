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
import Arena from "./components/arena";
import HttpsRedirect from 'react-https-redirect';


const PrivateRoute = ({ component: Component, isAuthenticated: IsAuthenticated, ...rest }) => (
  <Route {...rest} render={(props) => (
    IsAuthenticated === true || !props.match.params.quizId
      ? <Component {...props} />
      : <Redirect to={{
        pathname: '/',
        state: { from: props.location.pathname, showAuth: true }
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
      <HttpsRedirect>
        <Router basename={process.env.PUBLIC_URL} >
          <Route default exact path="/" render={(props) => <Home isAuthenticated={this.state.isAuthenticated} signIn={this.signIn} {...props} />} />
          <PrivateRoute exact path="/arena" component={Arena} isAuthenticated={this.state.isAuthenticated} />
          {/* <PrivateRoute exact path="/" component={Arena} isAuthenticated={true} /> */}
        </Router>
      </HttpsRedirect>
    );
  }
}

export default App;
