import React, { Component } from 'react';
import { Image } from 'react-bootstrap'
class About extends Component {
    state = {}
    render() {
        return (
            <div style={{ borderBottom: '3px solid #1d87ab', backgroundColor: '#1d87ab' }}>
                <div >
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <Image src={require('../imgs/logo.png')}></Image>

                    </div>
                    <h1 style={{ textAlign: 'center', fontSize: 35, color: 'white', marginLeft: '2%', marginRight: '2%' }}>
                        The platform to collect data for machine and deep learning while eliminating middlemen through crowdsourcing.
                    </h1>
                    <br></br>
                    <h1 style={{ textAlign: 'center', fontSize: 35, color: 'white' }}>
                        You make the listing.

                    </h1>
                    <br></br>
                    <h1 style={{ textAlign: 'center', fontSize: 35, color: 'white' }}>
                        You set the price.
                    </h1>
                    <br></br>
                    <h1 style={{ textAlign: 'center', fontSize: 35, color: 'white' }}>
                        You get the data.
                    </h1>
                    <br></br>

                </div>

            </div>
        );
    }
}

export default About;