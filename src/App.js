import React, { Component } from 'react';

import {
  BrowserRouter as Router,
  Route,
  Redirect,
} from 'react-router-dom'

import Header from "./components/header";
import Main from "./components/main";
import Footer from "./components/footer";


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
      <Main isAuthenticated={props.isAuthenticated} signIn={props.signIn} showAuth={props.location && props.location.state && props.location.state.showAuth}/>
      <Footer />
    </div>
  )
}

function Arena() {
  return (
    <div style={{ margin: '0px auto', textAlign: 'center' }}>
      <h1>This is the quiz placeholder</h1>
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
        <Route default exact path="/" render={(props) => <Home isAuthenticated={this.state.isAuthenticated} signIn={this.signIn} {...props} />}/>
        <PrivateRoute exact path="/arena" component={Arena} isAuthenticated={this.state.isAuthenticated} />
        {/* <Route exact path="/auth" component={(props) => <Home isAuthenticated={this.state.isAuthenticated} signIn={this.signIn} {...props} />} /> */}
      </Router>
    );
  }
}

export default App;
