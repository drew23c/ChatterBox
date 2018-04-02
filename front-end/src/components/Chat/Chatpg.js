import React, {Component} from 'react';
import {Switch, Route} from 'react-router-dom';
import {Room} from '../TV-info/Info';
import '../../styling/chatpg.css';
import Layout from '../Layout'

class ChatPage extends Component {
    constructor() {
        super();
    }

    renderRoom = (props) => {
        const { showid} = props.match.params;
        return (
            <div>
            <Room showid={showid} />  
            {/* <Layout roomName={showid} /> */ }
            </div>
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
