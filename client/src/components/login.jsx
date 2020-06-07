import React, { Component } from 'react';
import GoogleBtn from './googleButton';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHome } from '@fortawesome/free-solid-svg-icons'
import { Button } from 'react-bootstrap';

class Login extends Component {
    state = {}
    render() {
        return (
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#1d87ab', height: '100%', width: '100%', position: 'fixed', top: 0, left: 0 }}>
                <div>
                    <div style={{ display: 'inline', margin: 10 }}>
                        <h1 style={{ fontSize: 75, color: 'white' }}>Welcome to Crowdata! Login to begin.</h1>

                    </div>
                    <div style={{ display: 'inline', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 5 }}>
                        <GoogleBtn history={this.props.history}></GoogleBtn>
                    </div>
                    <div style={{ display: 'inline', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: 10 }}>
                        <Button variant='light' style={{ margin: 25 }} onClick={() => this.props.history.push('/')}>
                            <FontAwesomeIcon icon={faHome} size='4x' color="#1d87ab" />
                        </Button>
                    </div>
                </div>

            </div >
        );
    }
}

export default Login;