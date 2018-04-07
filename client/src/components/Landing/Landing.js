import React from 'react';
import {Link} from 'react-router-dom';
import './landingpg.css';
import About from '../About/About';
import { Grid, Row, Col, Image } from 'react-bootstrap';


const Landing = () => {
    return (
        <Grid id="landing">
            <Row>
                <Col xs={18} md={12} lg={12}>
                    <h1>Welcome to ChatterBox!</h1>
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