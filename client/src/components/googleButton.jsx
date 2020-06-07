import React, { Component } from 'react'
import ReactDOM from 'react-dom';
import { GoogleLogin, GoogleLogout } from 'react-google-login';
import axios from 'axios';

const CLIENT_ID = '281859763334-53boibb0fpsslcs8kr176j2jc2meeim5.apps.googleusercontent.com';

class GoogleBtn extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isLogined: false,
            accessToken: '',
            balance: ''
        };

        this.login = this.login.bind(this);
        this.handleLoginFailure = this.handleLoginFailure.bind(this);
        this.logout = this.logout.bind(this);
        this.handleLogoutFailure = this.handleLogoutFailure.bind(this);

    }
    setBalance = (b) => {
        this.setState({ balance: b })
    }
    async login(response) {
        let profile = response.getBasicProfile();
        console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
        console.log('Name: ' + profile.getName());
        console.log('Image URL: ' + profile.getImageUrl());
        console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.
        this.setState({ isLogined: true });
        let b
        axios.get('http://localhost:5000/user').then((res) => {
            const data = res.data
            let found = false
            let user;
            let balance;
            for (user of data) {
                if (user.email === profile.getEmail()) {
                    balance = user.balance;
                    found = true;
                    break
                }
            }
            if (typeof balance === 'undefined') {
                b = 10;
            }
            else {
                b = balance
            }
            const summary = {
                username: profile.getId(),
                name: profile.getName(),
                email: profile.getEmail(),
                balance: 10,
            }
            if (!found) {
                axios.post('http://localhost:5000/user/add', summary).then(res => console.log(res.data))
            }
            this.props.history.push(
                {
                    pathname: '/',
                    state: {
                        name: profile.getName(),
                        email: profile.getEmail(),
                        balance: b
                    }
                }
            );
        });



    }

    logout(response) {

    }

    handleLoginFailure(response) {
    }

    handleLogoutFailure(response) {
    }

    render() {
        return (
            <div>
                {this.state.isLogined ?
                    <GoogleLogout
                        clientId={CLIENT_ID}
                        buttonText='Logout'
                        onLogoutSuccess={this.logout}
                        onFailure={this.handleLogoutFailure}
                    >
                    </GoogleLogout> : <GoogleLogin
                        clientId={CLIENT_ID}
                        buttonText='Login with Google'
                        onSuccess={this.login.bind(this)}
                        onFailure={this.handleLoginFailure}
                        cookiePolicy={'single_host_origin'}
                        responseType='code,token'
                    />
                }
            </div>
        )
    }
}

export default GoogleBtn;