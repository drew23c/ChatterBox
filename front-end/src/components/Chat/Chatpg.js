import React, {Component} from 'react';
import {Switch, Route} from 'react-router-dom';
import {Room} from '../TV-info/Info';
import '../../styling/chatpg.css';
// import Layout from '../Layout'

import { Grid, Row, Col } from 'react-bootstrap';

class ChatPage extends Component {

    renderRoom = (props) => {
        const { showid} = props.match.params;
        return (
            <Grid className='Chat-pg'>
                   <Row>
                     <Col xs={8} md={6} lg={6}>
                        <Room showid={showid} /> 
                     </Col>
                 <Col xs={10} md={6} lg={6}>
                 {/* <Layout roomName={showid} /> */}
                     </Col>
                 </Row>
             </Grid>
        )
    }

    render() {
        return (
            <div>
                <Switch>
                    <Route path="/chat/:name/:showid" render={this.renderRoom} />
                </Switch>
            </div>
        )
    }
}

export default ChatPage; 
