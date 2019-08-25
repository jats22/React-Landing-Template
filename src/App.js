import React, { Component } from 'react';

import {
  BrowserRouter as Router,
  Route,
  Redirect,
  withRouter
} from 'react-router-dom'

import Header from "./components/header";
import Main from "./components/main";
import Footer from "./components/footer";




export const fakeAuth = {
  isAuthenticated: true,
  authenticate(cb) {
    this.isAuthenticated = true
    setTimeout(cb, 100)
  },
  signout(cb) {
    this.isAuthenticated = false
    setTimeout(cb, 100)
  }
}

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={(props) => (
    fakeAuth.isAuthenticated === true
      ? <Component {...props} />
      : <Redirect to={{
        pathname: '/auth',
        state: { from: props.location , showAuth : true }
      }} />
  )} />
)

function Home(props) {
  return (
    <div className="container">
      <Header />
      <Main isAuthenticated={props.isAuthenticated} signIn={props.signIn} />
      <Footer />
    </div>
  )
}

function Arena() {
  return (
    <div>
      <Header />
      <Footer />
    </div>
  )
}

class App extends Component {

  constructor(props){
    super(props);

    this.state = {
      isAuthenticated : false,
    }
  }

  signIn(){
    this.setState({
        isAuthenticated : true,
    })
  }

  signOut() {
    this.setState({
      isAuthenticated : false,
    })
  }

  render() {
    const { isAuthenticated,signIn } = this.state; 
    return (
      <Router basename={process.env.PUBLIC_URL} >
        <Route default exact path="/" component={()=><Home isAuthenticated={isAuthenticated} signIn={signIn} /> }/>
        <PrivateRoute exact path="/arena" component={Arena}/>
        <Route exact path="/auth" component={Home} />
      </Router>
    );
  }
}

export default App;
