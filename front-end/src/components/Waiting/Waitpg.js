import React, { Component } from 'react';
import Clock from './Countdown';
import '../../styling/waitingpg.css'
import { Grid, Row, Col, Image } from 'react-bootstrap';

class Wait extends Component {
    constructor(props) {
        super(props);
        this.state = {
            deadline: 'Mar 30, 2018 20:00:00',
        };
    }

    //Add a div with an image with the corresponding show as the background image.
    //Add info about the show
    //Choose font for Summary  
    render() {
        return (
            <Grid className='Wait-Page'>
                <Row className='Wait-Bottom'>
                   <Col md={12}>
                     <h1>{this.state.deadline}</h1>
                         <h1>Time Left: <Clock className='Countdown' deadline={this.state.deadline} /></h1>
                           </Col>
                        </Row>  

                 <Row>
                    <Col xs={12} md={6} lg={6} className="Summary">
                         <h1 className='title'> Title: "Name" </h1>
                         <p>Season: 3 Episode: 3</p>  
                         <p> Network: "name" </p> 
                         <p className='summ'> Summary: Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. </p> 
                         <Image src='http://images.amcnetworks.com/amc.com/wp-content/uploads/2017/09/the-walking-dead-season-8-key-art-rick-lincoln-daryl-reedus-1200x707.jpg' 
                        rounded responsive className='Wait-img'/>
                        </Col>
                            </Row>
                      </Grid>   
             );
         }
    }
export default Wait;
