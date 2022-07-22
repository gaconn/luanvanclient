
import Form from 'react-bootstrap/Form'
import Container from 'react-bootstrap/esm/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import { BsTextCenter } from 'react-icons/bs'
const ContactComponent = () => {
    return (
        <div>
            
                {/* Contact Section Begin */}
                <section className="contact spad">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-3 col-md-3 col-sm-6 text-center">
                                <div className="contact__widget">
                                    <span className="icon_phone" />
                                    <h4>Phone</h4>
                                    <p>+01-3-8888-6868</p>
                                </div>
                            </div>
                            <div className="col-lg-3 col-md-3 col-sm-6 text-center">
                                <div className="contact__widget">
                                    <span className="icon_pin_alt" />
                                    <h4>Address</h4>
                                    <p>60-49 Road 11378 New York</p>
                                </div>
                            </div>
                            <div className="col-lg-3 col-md-3 col-sm-6 text-center">
                                <div className="contact__widget">
                                    <span className="icon_clock_alt" />
                                    <h4>Open time</h4>
                                    <p>10:00 am to 23:00 pm</p>
                                </div>
                            </div>
                            <div className="col-lg-3 col-md-3 col-sm-6 text-center">
                                <div className="contact__widget">
                                    <span className="icon_mail_alt" />
                                    <h4>Email</h4>
                                    <p>hello@colorlib.com</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                {/* Contact Section End */}
                {/* Map Begin */}
                <div className="map">
                    <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d49116.39176087041!2d-86.41867791216099!3d39.69977417971648!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x886ca48c841038a1%3A0x70cfba96bf847f0!2sPlainfield%2C%20IN%2C%20USA!5e0!3m2!1sen!2sbd!4v1586106673811!5m2!1sen!2sbd"
                        height={500}
                        style={{ border: 0 }}
                        allowFullScreen=""
                        aria-hidden="false"
                        tabIndex={0}
                    />
                    <div className="map-inside">
                        <i className="icon_pin" />
                        <div className="inside-widget">
                            <h4>New York</h4>
                            <ul>
                                <li>Phone: +12-345-6789</li>
                                <li>Add: 16 Creek Ave. Farmingdale, NY</li>
                            </ul>
                        </div>
                    </div>
                </div>
            
            <div  >
            <Container>
                <Row>
                    <Col></Col>
                    <Col xs={12} md={8}>
                        <div className="row">
                            <div className="col-lg-12">
                                <div className="contact__form__title">
                                    <h2>Leave Message</h2>
                                </div>
                            </div>
                        </div>
                        <Form >
                            <Row className="mb-3">
                                <Form.Group as={Col} controlId="formGridEmail">
                                    <Form.Label>Email</Form.Label>
                                    <Form.Control type="email" placeholder="Enter email" />
                                </Form.Group>

                                <Form.Group as={Col} controlId="formGridPassword">
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control type="password" placeholder="Password" />
                                </Form.Group>
                            </Row>
                            <Form.Group className="mb-3" controlId="formGridAddress1">
                                <Form.Label>Address</Form.Label>
                                <Form.Control placeholder="1234 Main St" />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                                <Form.Label>Note</Form.Label>
                                <Form.Control as="textarea" rows={3} />
                            </Form.Group>
                            <Button variant="primary" type="submit" className='site-btn'>
                                Submit
                            </Button>
                        </Form>
                    </Col>
                    <Col></Col>
                </Row>
            </Container>
            </div>
            

        </div>
    );
}

export default ContactComponent;