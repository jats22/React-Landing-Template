import React, { Component } from 'react';
import { GoogleLogin } from 'react-google-login';
import { CookiesProvider, useCookies } from 'react-cookie';
import { toast } from 'react-toastify';
import { Link, Redirect } from 'react-router-dom';

import Footer from "../footer";

function Login(props) {

    console.log(props);

    const [cookies, setCookie] = useCookies(['circuital_user_email', 'circuital_user_name']);

    const seen = cookies.circuital_user_email;

    console.log(seen)

    if (seen) {
        return <Redirect to={props.location.state.to} />
    }

    const login = (resp) => {
        const baseUrl = "https://asia-east2-ciruital-prod-254903.cloudfunctions.net/qmsapi/";
        const userName = cookies.circuital_user_name;
        const userEmail = cookies.circuital_user_email;
        const loginUrl = baseUrl + "user/login?userId=" + userEmail;

        fetch(loginUrl, {
            mode: 'cors',
            method: 'POST',
            body: JSON.stringify({
                userDetails: resp.profileObj,
            })
        }
        ).then((data) => {
            window.analytics.identify({
                "email": userEmail,
                "name": userName,
                "displayName": userName,
            })
            window.analytics.track("User Authenticated");
            console.log(data)
            
        }).catch(e => {
            window.analytics.track("User Authentication Failed.");
            console.log(e)
            toast.error("Ouch. We are having trouble logging you in.")
        })
    }

    return (
        <div>
            <main className="login-container">
                <section className="intro" style={{ background: 'rgba(243, 245, 251)', margin: '200px auto', borderRadius: '5px', gridTemplateColumns: '1fr' }}>
                    <h2 style={{
                        fontSize: '2em',
                        color: 'black',
                        marginRight: '20px',
                        borderRight: '1px solid #f6faf6',

                    }}>Get Closer to Your Dream Hardware Job.</h2>
                    <div style={{ textAlign: 'center' }}>
                        <GoogleLogin
                            clientId="881804489987-rcq59p85ff6lssk6knkf9a6i58t2unv0.apps.googleusercontent.com"
                            buttonText="Login with Google To Continue"
                            onSuccess={(resp) => {
                                console.log(resp); props.signIn(() => {
                                    setCookie('circuital_user_email', resp.profileObj.email, { path: '/' });
                                    setCookie('circuital_user_name', resp.profileObj.name, { path: '/' });
                                    login(resp);
                                    props.history.push(props.location.state.to)
                                })
                            }}
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

export default Login;