import React, { Component, useReducer } from 'react';
import axios from 'axios';
import './header.css'
import { Navbar, Nav, Card, Badge, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHome, faBars, faClock, faCheck } from '@fortawesome/free-solid-svg-icons'

class MyListings extends Component {
    constructor(props) {
        super(props);

        this.state = {
            entries: []
        }
    }
    async componentDidMount() {
        axios.get('http://localhost:5000/listing')
            .then((res) => {
                const data = res.data
                let listing;
                for (listing of data) {
                    if (listing.email === this.props.location.state.email) {
                        this.setState({ entries: [...this.state.entries, listing] })
                    }
                }
            })
    }

    goHome() {
        this.props.history.push(
            {
                pathname: '/',
                state: {
                    name: this.props.location.state.name,
                    email: this.props.location.state.email,
                    balance: this.props.location.state.balance,
                }
            }
        );
    }
    render() {

        return (
            <div >
                <Navbar bg="white" expand="lg" style={{ borderBottom: '3px solid #1d87ab' }} sticky="top">
                    <h1 style={{ color: "#1d87ab", paddingLeft: 15, fontSize: 50 }}>crowdata</h1>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" onClick={() => this.setState({ menuDown: !this.state.menuDown })
                    }>
                        <FontAwesomeIcon icon={faBars} size='2x' color="#1d87ab" className={this.state.menuDown ? 'icon-rotated-down' : 'icon-rotated-up'} />
                    </Navbar.Toggle>
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="ml-auto">
                            <div style={{ margin: 5 }} >
                                <Nav.Link className='links' style={{ backgroundColor: '#1d87ab' }} onClick={this.goHome.bind(this)}>
                                    <h2 style={{ color: "white", paddingLeft: 15, paddingRight: 15 }}>home <span><FontAwesomeIcon icon={faHome} size='1x' color="white" /></span></h2>
                                </Nav.Link>
                            </div>
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <h1 style={{ margin: 20, marginBottom: 75, fontSize: 50, color: '#1d87ab' }}>Your listings</h1>
                </div>
                <div>
                    {this.state.entries.map((entry) => {
                        return (
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', margin: 10 }}>
                                <Card style={{ width: '50%', backgroundColor: '#1d87ab' }}>
                                    <Card.Body>
                                        <Card.Title style={{ color: 'white', fontWeight: 'bold', fontSize: 30 }}>{entry.title}</Card.Title>
                                        <Card.Text style={{ color: 'white', fontSize: 20 }}>{entry.description}</Card.Text>
                                        <Card.Text style={{ color: 'white', fontSize: 20 }}>{'$' + entry.price}</Card.Text>
                                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }} >
                                            <Card.Img src={entry.sample_img} style={{ width: "50%" }} />
                                        </div>
                                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                            {entry.images.length > 0 ?
                                                <div>
                                                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                                        <FontAwesomeIcon icon={faCheck} size='4x' color="#00ab14" style={{ margin: 10 }} />
                                                    </div>
                                                    <a href={entry.images[0]} download>
                                                        <Badge size="lg" style={{ backgroundColor: '#00ab14' }}>
                                                            <h5 style={{ color: 'white' }}>Download your data</h5>
                                                        </Badge>
                                                    </a>
                                                </div>
                                                :
                                                <div>
                                                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                                        <FontAwesomeIcon icon={faClock} size='4x' color="#cfcb08" style={{ margin: 10 }} />
                                                    </div>
                                                    <Badge size="lg" style={{ backgroundColor: "#cfcb08" }}>
                                                        <h5 style={{ color: '#1d87ab' }}>Your listing is pending</h5>
                                                    </Badge>
                                                </div>
                                            }
                                        </div>
                                        <div style={{ display: 'flex', alignItems: 'right', justifyContent: 'right' }}>
                                            <Button style={{ backgroundColor: 'red' }} onClick={() => {
                                                entry.completed = true
                                                axios.post('http://localhost:5000/listing/update/' + entry._id, entry, {
                                                })
                                                    .then(res => {
                                                        console.log(res.data)
                                                    });
                                            }
                                            }>
                                                <h1 style={{ fontSize: 20 }}>Finish listing</h1>
                                            </Button>
                                        </div>

                                    </Card.Body>
                                </Card>
                            </div>
                        );
                    })}

                </div>
            </div >
        );
    }
}

export default MyListings;