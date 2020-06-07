import React, { Component } from "react";
import { Navbar, Nav, Modal, Button, Form, OverlayTrigger, Popover } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser, faBars, faBookOpen, faPlus, faMoneyBill } from '@fortawesome/free-solid-svg-icons'
import './header.css'
import axios from 'axios';


class Header extends Component {
    constructor(props) {
        super(props);

        this.state = {
            menuDown: false,
            showModal: false,
            image_file: null,
            image_preview: '',
            showBalance: false
        }
        this.description = React.createRef();
        this.price = React.createRef();
        this.title = React.createRef();
    }

    submitListing = () => {
        const title = this.title.current.value
        const email = this.props.userInfo.email
        const description = this.description.current.value
        const price = this.price.current.value
        const name = this.props.userInfo.name
        let reader = new FileReader();
        reader.readAsDataURL(this.state.image_file);
        let sample_img;
        reader.onloadend = function () {
            sample_img = reader.result;
            const listing = {
                title: title,
                email: email,
                description: description,
                price: price,
                completed: false,
                name: name,
                sample_img: sample_img
            }

            console.log(listing)
            axios.post('http://localhost:5000/listing/add', listing, {
            })
                .then(res => {
                    console.log(res.data)
                })
            alert('Listing added successfully!');
        }

        this.setState({ showModal: false });

    }

    goToListing = () => {

        this.props.history.push(
            {
                pathname: '/mylistings',
                state: {
                    name: this.props.userInfo.name,
                    email: this.props.userInfo.email,
                    balance: this.props.balance,
                }
            }
        );
    }
    render() {
        return (
            <Navbar bg="white" expand="lg" style={{ borderBottom: '3px solid #1d87ab' }} sticky="top">
                <h1 style={{ color: "#1d87ab", paddingLeft: 15, fontSize: 50 }}>crowdata</h1>
                <Navbar.Toggle aria-controls="basic-navbar-nav" onClick={() => this.setState({ menuDown: !this.state.menuDown })
                }>
                    <FontAwesomeIcon icon={faBars} size='2x' color="#1d87ab" className={this.state.menuDown ? 'icon-rotated-down' : 'icon-rotated-up'} />
                </Navbar.Toggle>
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ml-auto">
                        {typeof this.props.userInfo === 'undefined' ?
                            <div></div> :
                            <div style={{ margin: 5 }} >
                                <Nav.Link className='links' style={{ backgroundColor: '#1d87ab' }} onClick={() => this.setState({ showBalance: true })}>
                                    <h2 style={{ color: "white", paddingLeft: 15, paddingRight: 15 }}>balance <span><FontAwesomeIcon icon={faMoneyBill} size='1x' color="white" /></span></h2>
                                </Nav.Link>
                                <Modal show={this.state.showBalance} onHide={() => this.setState({ showBalance: false })}>
                                    <Modal.Header closeButton>
                                        <Modal.Title style={{ color: '#1d87ab', fontSize: 25 }}>Your balance</Modal.Title>
                                    </Modal.Header>

                                    <Modal.Body>
                                        <p>{'$' + this.props.userInfo.balance}</p>
                                    </Modal.Body>
                                </Modal>
                            </div>
                        }
                        {typeof this.props.userInfo === 'undefined' ?
                            <div></div> :
                            <div style={{ margin: 5 }} >
                                <Nav.Link className='links' style={{ backgroundColor: '#1d87ab' }} onClick={() => this.setState({ showModal: true })}>
                                    <h2 style={{ color: "white", paddingLeft: 15, paddingRight: 15 }}>add <span><FontAwesomeIcon icon={faPlus} size='1x' color="white" /></span></h2>
                                </Nav.Link>
                            </div>
                        }
                        {typeof this.props.userInfo === 'undefined' ?
                            <div style={{ margin: 5 }} >
                                <Nav.Link className='links' href="/login" style={{ backgroundColor: '#1d87ab' }}>
                                    <h2 style={{ color: "white", paddingLeft: 15, paddingRight: 15 }}>login <span><FontAwesomeIcon icon={faUser} size='1x' color="white" /></span></h2>
                                </Nav.Link>
                            </div>
                            :
                            <div style={{ margin: 5 }} >
                                <Nav.Link className='links' onClick={this.goToListing.bind(this)} style={{ backgroundColor: '#1d87ab' }}>
                                    <h2 style={{ color: "white", paddingLeft: 15, paddingRight: 15 }}>my listings <span><FontAwesomeIcon icon={faBookOpen} size='1x' color="white" /></span></h2>
                                </Nav.Link>
                            </div>
                        }
                    </Nav>
                    <Modal show={this.state.showModal} onHide={() => this.setState({ showModal: false })} size="lg">
                        <Modal.Header closeButton>
                            <Form.Group style={{ width: '100%' }}>
                                <Form.Label style={{ color: '#1d87ab', fontSize: 25 }}>Listing name</Form.Label>
                                <Form.Control ref={this.title} required size="lg" style={{ width: '100%' }} type='text' placeholder="Enter the name of your listing" />
                            </Form.Group>
                        </Modal.Header>
                        <Modal.Body>
                            <Form.Group style={{ width: '100%' }}>
                                <Form.Label style={{ color: '#1d87ab', fontSize: 25 }}>Description</Form.Label>
                                <Form.Control ref={this.description} required size="md" style={{ width: '100%' }} as="textarea" type='text' placeholder="Enter a description of the data you want." required />
                            </Form.Group>
                            <Form.Group>
                                <Form.Label style={{ color: '#1d87ab', fontSize: 25 }}>Price of listing</Form.Label>
                                <Form.Control ref={this.price} required size="md" min="0.01" step="0.01" type='number' placeholder="Enter the price of your listing." required />
                            </Form.Group>
                            <Form.Label style={{ color: '#1d87ab', fontSize: 25 }}>Select a sample data file</Form.Label>
                            <Form.Control type="file" onChange={(e) => {
                                let image_as_base64 = URL.createObjectURL(e.target.files[0])
                                let image_as_files = e.target.files[0];
                                console.log(image_as_files)
                                this.setState({
                                    image_preview: image_as_base64,
                                    image_file: image_as_files,
                                })
                            }} />
                            <img src={this.state.image_preview} />
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="primary" style={{ backgroundColor: '#1d87ab', fontSize: 20 }} onClick={this.submitListing.bind(this)}>List</Button>
                        </Modal.Footer>
                    </Modal>
                </Navbar.Collapse>
            </Navbar>
        );
    }
}

export default Header;
