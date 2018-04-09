import React from 'react';
import {Link} from 'react-router-dom';
import './landingpg.css';
import About from '../About/About';
import { Grid, Row, Col, Image } from 'react-bootstrap';
import {Jumbotron, Carousel} from 'react-bootstrap'


const Info = () => (
    <div className='LandingContainer'>
      <h1>From the die-hard fanatics to the merely outspoken, 
          ChatterBox is the central haven for all those passionate 
          about great television. Enter a live chat designated for 
          your favorite television shows - as they’re airing - and 
          feel free to speak your mind with other outspoken fans 
          from all over the country! Don’t get lost in the fray with 
          other social media sites. ChatterBox is designed to prioritize 
          your interests and allows you the space to speak your mind. 
    </h1>
<h1><em>Join the chatter with ChatterBox!</em></h1>
    </div>
  );
  

const Landing = () => {
    return (
        <Grid id="landing">
            <Row>
                <Col xs={18} md={12} lg={12}>
                <Carousel className='carousel'>
                    <Carousel.Item>
                        <img width={500} height={500} alt="fans" src="/connect.png" />
                        <Carousel.Caption>
                       
                        <h3>Tune in to your favorite show</h3> <br /> <br /> <br /> <br /> <br /> 
                        <Link to="/schedule" id="enter"><p >JOIN THE CHATTER</p></Link>

                        </Carousel.Caption>

                    </Carousel.Item>

                    <Carousel.Item>
                     <img width={500} height={500} alt="chats" src="/fans (1).png" />
                        <Carousel.Caption>
                        <h3>Connect with other television fanatics </h3> <br /> <br /> <br />  <br /> <br /> 
                        <Link to="/schedule" id="enter"><p >JOIN THE CHATTER</p></Link>

                        </Carousel.Caption>
                    </Carousel.Item>
                    
                    <Carousel.Item>
                    <img width={500} height={500} alt="chatter" src="/remote1.png" />
                        <Carousel.Caption>
                        <h3> Join the chat!</h3> <br /> <br /> <br />  <br /> <br /> 
                        <Link to="/schedule" id="enter"><p >JOIN THE CHATTER</p></Link>

                        </Carousel.Caption>
                        
                    </Carousel.Item>

                </Carousel>
                    <Info />
                    <About />
                </Col>
            </Row>
        </Grid>
    )
}

export default Landing;