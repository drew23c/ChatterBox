import React from 'react';
import {Link} from 'react-router-dom';
import './landingpg.css';
import About from '../About/About';
import { Grid, Row, Col, Image } from 'react-bootstrap';
import {Jumbotron, Carousel} from 'react-bootstrap'

const Landing = () => {
    return (
        <Grid id="landing">
            <Row>
                <Col xs={18} md={12} lg={12}>
                <Carousel className='carousel'>
                    <Carousel.Item>
                        <img width={500} height={500} alt="fans" src="/remote.jpg" />
                        <Carousel.Caption>
                        <h3>Tune in to your favorite show</h3>
                        <Link to="/schedule" id="enter"><p>JOIN THE CHATTER</p></Link>

                        </Carousel.Caption>

                    </Carousel.Item>

                    <Carousel.Item>
                     <img width={500} height={500} alt="chats" src="/smile.png" />
                        <Carousel.Caption>
                        <h3>Connect with other televison fanatics </h3>
                        <Link to="/schedule" id="enter"><p>JOIN THE CHATTER</p></Link>

                        </Carousel.Caption>
                    </Carousel.Item>
                    
                    <Carousel.Item>
                    <img width={500} height={500} alt="chatter" src="/laughing.jpeg" />
                        <Carousel.Caption>
                        <h3>Be free to join the chat!</h3>
                        <Link to="/schedule" id="enter"><p>JOIN THE CHATTER</p></Link>

                        </Carousel.Caption>
                        
                    </Carousel.Item>

                </Carousel>

                    <About />
                </Col>
            </Row>
        </Grid>
    )
}

export default Landing;