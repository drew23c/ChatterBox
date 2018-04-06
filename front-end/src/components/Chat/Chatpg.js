import React, {Component} from 'react';
import {Switch, Route} from 'react-router-dom';
import {Room} from '../TV-info/Info';
import '../../styling/chatpg.css';

import { Grid, Row, Col } from 'react-bootstrap';

class ChatPage extends Component {

    renderRoom = (props) => {
        const { showid} = props.match.params;
        return (
            <Grid className='Chat-pg'>
                   <Row>
                     <Col xs={18} md={12} lg={12}>
                        <Room showid={showid} /> 
                     </Col>
                 </Row>
             </Grid>
        )
    }

    render() {
        return (
            <div>
                <Switch>
                    <Route path="/chat/:showid" render={this.renderRoom} />
                </Switch>
            </div>
        )
    }
}

export default ChatPage; 
