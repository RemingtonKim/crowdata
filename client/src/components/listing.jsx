import React, { Component } from 'react';
import { Card, Modal, Form, Button } from 'react-bootstrap';
import './listing.css'
import axios from 'axios'
class Listing extends Component {
    constructor(props) {
        super(props)

        this.state = {
            showModal: false,
            image_preview: [],
            image_file: [],
        }
    }
    answer() {
        let file;
        for (file of this.state.image_file) {
            this.sendToDB(file);
        }
        this.setState({ showModal: false })
    }
    sendToDB(file) {
        const r = this.props.entry
        const id = this.props.entry._id
        const userInfo = this.props.userInfo
        let reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = function () {
            let data = reader.result;
            r.images = [data];
            axios.post('http://localhost:5000/listing/update/' + id, r, {
            })
                .then(res => {
                    console.log(res.data)
                });

            axios.get('http://localhost:5000/user')
                .then((res) => {
                    const data = res.data
                    let user;
                    for (user of data) {
                        //buyer
                        if (user.email === r.email) {
                            axios.post('http://localhost:5000/user/update/' + user._id, { balance: user.balance - r.price }).then(res => {
                                console.log(res.data)
                            });
                        }
                        //sender
                        else if (user.email === userInfo.email) {
                            axios.post('http://localhost:5000/user/update/' + user._id, { balance: user.balance + r.price }).then(res => {
                                console.log(res.data)
                            });
                        }
                    }
                })
        }
    }
    render() {
        return (
            <Card style={{ width: '50%', backgroundColor: '#1d87ab', margin: '3%' }} onClick={() => this.setState({ showModal: true })} className='listing-card'>
                <Card.Body>
                    <Card.Title style={{ color: 'white', fontWeight: 'bold', fontSize: 30 }}>{this.props.entry.title}</Card.Title>
                    <Card.Text style={{ color: 'white', fontSize: 20 }}>{this.props.entry.description}</Card.Text>
                    <Card.Text style={{ color: 'white', fontSize: 20 }}>{'$' + this.props.entry.price}</Card.Text>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }} >
                        <Card.Img src={this.props.entry.sample_img} style={{ width: "50%" }} />
                    </div>
                    <div onClick={e => e.stopPropagation()}>
                        <Modal show={this.state.showModal} onHide={() => this.setState({ showModal: false })} size="lg">
                            <Modal.Header closeButton style={{ color: '#1d87ab', fontSize: 35, fontWeight: 'bold' }}>
                                <div>
                                    <div>
                                        {this.props.entry.title}
                                    </div>
                                    <div>
                                        <h2 style={{ color: '#1d87ab', fontSize: 15 }}>{'Listed by: ' + this.props.entry.name}</h2>
                                    </div>
                                </div>
                            </Modal.Header>
                            <Modal.Body>
                                <h2 style={{ color: '#1d87ab', fontSize: 25 }}>{this.props.entry.description}</h2>
                                <br></br>
                                <h2 style={{ color: '#1d87ab', fontSize: 20, fontStyle: 'italic' }}>Sample upload posted by lister:</h2>
                                <img style={{ width: '50%', margin: '10%' }} src={this.props.entry.sample_img} />
                                <div style={{ alignItems: 'left', display: 'flex', justifyContent: 'left' }}>
                                    <Form.Label style={{ color: '#1d87ab', fontSize: 20 }}>Choose your files to upload</Form.Label>
                                </div>
                                <Form.Control type="file" multiple onChange={(e) => {
                                    let image_as_base64 = []
                                    let file;
                                    for (file of e.target.files) {
                                        image_as_base64 = [...image_as_base64, URL.createObjectURL(file)]
                                    }
                                    console.log(image_as_base64)
                                    let image_as_files = e.target.files;
                                    this.setState({
                                        image_preview: [...this.state.image_preview, ...image_as_base64],
                                        image_file: [...this.state.image_file, ...image_as_files]
                                    })
                                }} />
                                {this.state.image_preview.map(preview => <img src={preview} />)}
                            </Modal.Body>
                            <Modal.Footer>
                                <Button variant="primary" style={{ backgroundColor: '#1d87ab', fontSize: 20 }} onClick={this.answer.bind(this)}>Answer</Button>
                            </Modal.Footer>
                        </Modal>
                    </div>
                </Card.Body>
            </Card>
        );
    }
}

export default Listing;