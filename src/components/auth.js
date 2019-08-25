import React, { Component } from 'react';
import { GoogleLogin } from 'react-google-login';
import {
    withRouter,
    Link
} from 'react-router-dom'

const responseGoogle = (response) => {
    console.log(response);
}



const redirect = (props) => {
    console.log("redirect")
    console.log(props)
    if (props.isAuthenticated) {
        props.history.push("/arena");
        return;
    }
    props.history.push("/auth");
}

class Auth extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        console.log(this.props);

        return (
            <div className="signin">
                <GoogleLogin
                    clientId="1098012249427-811i7d4t6f17837buv7dmmeqh7lfmqmb.apps.googleusercontent.com"
                    buttonText="Login with Google To Continue"
                    onSuccess={this.props.signIn}
                    theme="dark"
                    onFailure={responseGoogle}
                    cookiePolicy={'single_host_origin'}
                />

            </div>
        )
    }
}


const AuthDecorator = withRouter((props) => {
    if (props.match.path === "/auth" && !props.isAuthenticated)
        return (
            <div>
                <Auth signIn={() => props.history.push("/arena") && props.signIn()} />
            </div>
        )
    else
        return (
            <div>
                <Link className="locateme" onClick={() => redirect(props)} ><i className="fa fa-info-circle"></i>  Take Assessment</Link>
            </div>
        )
}
)

export default AuthDecorator;
