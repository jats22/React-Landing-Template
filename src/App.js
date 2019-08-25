import React, { Component } from 'react';
import { GoogleLogin } from 'react-google-login';
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  withRouter
} from 'react-router-dom'

import Header from "./components/header";
import Main from "./components/main";
import Footer from "./components/footer";




const fakeAuth = {
  isAuthenticated: false,
  authenticate(cb) {
    this.isAuthenticated = true
    setTimeout(cb, 100)
  },
  signout(cb) {
    this.isAuthenticated = false
    setTimeout(cb, 100)
  }
}

const Public = () => <h3>Public</h3>
const Protected = () => <h3>Protected</h3>

class Login extends React.Component {
  render() {


    return (
      <div>
        <p>You must log in to view the page</p>
        <button onClick={this.login}>Log in</button>
      </div>
    )
  }
}

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={(props) => (
    fakeAuth.isAuthenticated === true
      ? <Component {...props} />
      : <Redirect to={{
        pathname: '/auth',
        state: { from: props.location }
      }} />
  )} />
)

const login = () => {
  fakeAuth.authenticate(() => {
    this.setState(() => ({
      redirectToReferrer: true
    }))
  })
}
const AuthButton = withRouter(({ history }) => (
  fakeAuth.isAuthenticated ? (
    <p>
      Welcome! <button onClick={() => {
        fakeAuth.signout(() => history.push('/'))
      }}>Sign out</button>
    </p>
  ) : (
      <div>
        <p>You are not logged in.</p>
      </div>
    )
))

function Home() {
  return (
    <div className="container">
      <Header />
      <AuthButton />
      {!fakeAuth.isAuthenticated && <button onClick={login}>Log in</button>}
      <Main />
      <Footer />
    </div>
  )
}
const responseGoogle = (response) => {
  console.log(response);
}

function Arena() {
  return (
    <div>
      <Header />
      <Footer />
    </div>
  )
}

class Auth extends React.Component {

  state = {
    redirectToReferrer: false
  }
  login = () => {
    fakeAuth.authenticate(() => {
      this.setState(() => ({
        redirectToReferrer: true
      }))
    })
  }

  render = () => {

    const { from } = this.props.location.state || { from: { pathname: '/' } }
    const { redirectToReferrer } = this.state
    console.log(from);
    
    if (redirectToReferrer === true) {
      return <Redirect to={from} />
    }

    return (
      <div>
        <GoogleLogin
          clientId="1098012249427-811i7d4t6f17837buv7dmmeqh7lfmqmb.apps.googleusercontent.com"
          buttonText="Login with Google"
          onSuccess={this.login}
          onFailure={responseGoogle}
          cookiePolicy={'single_host_origin'}
        />
      </div>
    )
  }
}

class App extends Component {

  componentWillMount() {
    console.log(process.env);
  }

  render() {
    return (
      <Router basename={process.env.PUBLIC_URL} >
        <Route default exact path="/" component={Home} />
        <PrivateRoute exact path="/arena" component={Arena} />
        <Route exact path="/auth" component={Auth} />
      </Router>
    );
  }
}

export default App;
