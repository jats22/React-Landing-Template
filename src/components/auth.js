import React, { Component } from 'react';
import { GoogleLogin } from 'react-google-login';
import {
    withRouter,
    Link
} from 'react-router-dom'

const responseGoogle = (response) => {
    console.log(response);
    // if(response.error == "popup_closed_by_user"){
    //     props.signIn();
    //     props.history.push("/arena")
    // }
}




class Auth extends Component {

    constructor(props) {
        super(props);

        this.state = {
            showLogin : false,
        }
    }

    componentDidUpdate(prevProps,prevState){
        // console.log(prevProps)
        // console.log(this.props)
        // if( (prevProps.match.path != this.props.match.path) 
        //         && !this.state.showLogin
        //         && this.props.match.path === "/auth" 
        //         && !this.props.isAuthenticated){
        //     this.setState({
        //         showLogin : true,
        //     })
        // }

    }


    render() {
        console.log(this.props);
        const { showAuth } = this.props;
        return (
            <div className="signin">
               
                { !this.props.isAuthenticated && showAuth && 
                <GoogleLogin
                    clientId="1098012249427-811i7d4t6f17837buv7dmmeqh7lfmqmb.apps.googleusercontent.com"
                    buttonText="Login with Google To Continue"
                    onSuccess={ () => { this.props.signIn(); this.props.history.push("/arena") }}
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
                    pathname: '/arena'}}>
                    <i className="fa fa-info-circle"></i>  Take Assessment
                    </Link>)
                }

            </div>
        )
    }
}


const AuthDecorator = withRouter((props) => <Auth {...props} />)

export default AuthDecorator;
