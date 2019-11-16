import React, { Component } from 'react';

import {
  BrowserRouter as Router,
  Route,
  Redirect,
} from 'react-router-dom'

import { CookiesProvider, useCookies } from 'react-cookie';
import { withCookies, Cookies } from 'react-cookie';

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
    IsAuthenticated === true || !props.location.search
      ? <Component {...props} />
      : <Redirect to={{
        pathname: '/login',

        state: { to: props.location, showAuth: true }
      }} />
  )} />
)

function Home(props) {
  console.log("home")

  const [cookies, setCookie] = useCookies(['circuital_user_name']);

  const seen = cookies.circuital_user_name;
  
  console.log(seen)

  if(seen){
    return <Redirect to="/arena"/>
  }

  return (
    // <CookiesProvider>
      <div className="container">
        <Header />
        <Main isAuthenticated={props.isAuthenticated} signIn={props.signIn} showAuth={props.location && props.location.state && props.location.state.showAuth} />
        <Footer />
      </div>
    // </CookiesProvider>
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

  componentDidMount(){

    const { cookies } = this.props;

    this.setState({
      isAuthenticated : cookies.get('circuital_user_name') ? true : false,
    })
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
          <Route exact path="/login" render={(props) => <Login signIn={this.signIn} {...props} />} />
        </Router>
      </HttpsRedirect>
    );
  }
}

export default withCookies(App);
