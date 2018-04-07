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
                    <h1 class='display-3'>Welcome to ChatterBox!</h1>
                <Carousel>
  <Carousel.Item>
    <img width={500} height={200} alt="500x200" src="/shows1.png" />
  </Carousel.Item>
  <Carousel.Item>
    <img width={500} height={200} alt="500x200" src="/fans1.png" />
  </Carousel.Item>
  <Carousel.Item>
    <img width={500} height={500} alt="500x200" src="/chatter1.png" />
  </Carousel.Item>
</Carousel>


                    <p>Chat about your favorite TV shows!</p>
                    <p>Connect with other fans!</p>
                    <p>Be free to be a chatterbox!</p>
                    <Link to="/schedule" id="enter"><p>Enter</p></Link>
                    <About />
                </Col>
            </Row>
        </Grid>
    )
}

export default Landing;