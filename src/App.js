import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { GoogleLogin } from 'react-google-login';

import Header from "./components/header";
import Main from "./components/main";
import Footer from "./components/footer";

function Home() {
  return (
    <div className="container">
      <Header />
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
function Auth() {
  return (
    <div>
      <GoogleLogin
        clientId="1098012249427-811i7d4t6f17837buv7dmmeqh7lfmqmb.apps.googleusercontent.com"
        buttonText="Login with Google"
        onSuccess={responseGoogle}
        onFailure={responseGoogle}
        cookiePolicy={'single_host_origin'}
      />
    </div>
  )
}

class App extends Component {
  componentWillMount(){
    console.log(process.env);
  }

  render() {
    return (
      <Router basename={process.env.PUBLIC_URL} >
        <Route default exact path="/" component={Home} />
        <Route exact path="/arena" component={Arena} />
        <Route exact path="/auth" component={Auth} />
      </Router>
    );
  }
}

export default App;
