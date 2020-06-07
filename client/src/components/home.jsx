import React, { Component } from 'react';
import Header from './header';
import About from './about';
import OtherListings from './otherListings';

class Home extends Component {
    constructor(props) {
        super(props)

    }


    render() {
        return (
            <div>
                <Header userInfo={this.props.location.state} history={this.props.history}></Header>
                <About></About>
                {typeof this.props.location.state === 'undefined' ?
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <h1 style={{ color: '#1d87ab', margin: '0.5%' }}>Sign in to Crowdata to start!</h1>
                    </div>
                    : <OtherListings userInfo={this.props.location.state} ></OtherListings>
                }
            </div>
        );
    }
}

export default Home;