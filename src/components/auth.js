import React, { Component } from 'react';
import { GoogleLogin } from 'react-google-login';
import {
    withRouter,
    Link
} from 'react-router-dom'

const responseGoogle = (response) => {
    console.log(response);
}

class Auth extends Component {

    constructor(props) {
        super(props);

        this.state = {
            showLogin : false,
        }
    }


    render() {
        console.log(this.props);
        const { showAuth } = this.props;
        return (
            <div className="signin">
               
                { !this.props.isAuthenticated && showAuth && 
                <GoogleLogin
                    clientId="881804489987-rcq59p85ff6lssk6knkf9a6i58t2unv0.apps.googleusercontent.com"
                    buttonText="Login with Google To Continue"
                    onSuccess={ (resp) => { console.log(resp);this.props.signIn(()=> this.props.history.replace("/arena?quizId=33103eea76083afe55b7",resp)); }}
                    theme="dark"
                    onFailure={responseGoogle}
                    cookiePolicy={'single_host_origin'}
                /> }
                
                { !this.props.isAuthenticated && !showAuth ? 
                (<Link className="locateme"  to={{
                    pathname: '/',
                    state: {showAuth: true }}}>
                    <i className="fa fa-info-circle"></i>  Take Assessment
                    </Link>)
                    :
                ( this.props.isAuthenticated && !showAuth && <Link className="locateme"  to={{
                    pathname: '/arena',
                    search: 'quizId=33103eea76083afe55b7'
                    }}>
                    <i className="fa fa-info-circle"></i>  Take Assessment
                    </Link>)
                }

            </div>
        )
    }
}


const AuthDecorator = withRouter((props) => <Auth {...props} />)

export default AuthDecorator;
