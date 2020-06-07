import React, { Component } from 'react';
import axios from 'axios';
import Listing from './listing';

class OtherListings extends Component {
    constructor(props) {
        super(props);

        this.state = {
            entries: []
        }
    }

    async componentDidMount() {
        if (this.props.userInfo !== undefined) {
            axios.get('http://localhost:5000/listing')
                .then((res) => {
                    const data = res.data
                    let listing;
                    for (listing of data) {
                        if (listing.email !== this.props.userInfo.email && listing.completed === false) {
                            this.setState({ entries: [...this.state.entries, listing] })
                        }
                    }
                })
        }
    }
    render() {
        return (
            <div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <h1 style={{ color: '#1d87ab', margin: '0.5%' }}>Other's listings</h1>
                </div>
                <div>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        {this.state.entries.map(entry => <Listing userInfo={this.props.userInfo} entry={entry} style={{ margin: '10%' }}></Listing>)}
                    </div>
                </div>
            </div>
        );
    }
}

export default OtherListings;