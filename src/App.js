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
import QMS from './components/qms/questions';
import QMSList from './components/qms/question-list';
import Login from './components/common/login';

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
    next();
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
          <PrivateRoute exact path="/arena" isAuthenticated={this.state.isAuthenticated} component={Arena} />
          <Route exact path="/qms/question/:questionId" component={QMS} />
          <Route exact path="/qms/questions" component={QMSList} />
          <Route exact path="/login" render={(props) => <Login signIn={this.signIn} {...props}/>}/>
        </Router>
      </HttpsRedirect>
    );
  }
}

export default App;
