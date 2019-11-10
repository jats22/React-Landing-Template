import React, { Component } from 'react';
import { GoogleLogin } from 'react-google-login';
import { Link } from 'react-router-dom';
import Footer from "../footer";

class Login extends Component {


    render() {

        console.log(this.props);

        return (
            <div>
                <main className="login-container">
                    <section className="intro" style={{ background: 'rgba(243, 245, 251)', margin: '200px auto' ,borderRadius: '5px',gridTemplateColumns: '1fr'}}>
                        <h2 style={{
                            fontSize: '2em',
                            color: 'black',
                            marginRight: '20px',
                            borderRight: '1px solid #f6faf6',
                            
                        }}>Get Closer to Your Dream Hardware Job.</h2>
                        <div style={{ textAlign: 'center' }}>
                            <GoogleLogin
                                onClick={ ()=>{ 
                                    window.analytics.track("User Clicked on Login With Google");
                                }}

                                clientId="881804489987-rcq59p85ff6lssk6knkf9a6i58t2unv0.apps.googleusercontent.com"
                                buttonText="Login with Google To Continue"
                                onSuccess={(resp) => { console.log(resp); this.props.signIn(() => this.props.history.replace(this.props.location.state.to, resp)); }}
                                theme="dark"
                                onFailure={(e) => console.log(e)}
                                cookiePolicy={'single_host_origin'}
                            />
                        </div>
                    </section>
                </main>
                {/* <Footer }} /> */}
            </div>
        )
    }
}

export default Login;