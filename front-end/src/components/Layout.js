import React, { Component } from 'react';
import io from 'socket.io-client'
import { USER_CONNECTED, LOGOUT } from '../Events'
import LoginForm from './LoginForm'
import ChatContainer from './Chat/ChatContainer'
import '../styling/chatstyles.css'


const socketUrl = "http://localhost:3231"
export default class Layout extends Component {
	
	constructor(props) {
	  super(props);
	
	  this.state = {
	  	socket:null,
	  	user:null
	  };
	}

	componentWillMount() {
		this.initSocket()
	}

	/*
	*	Create socket and connect to server.
	*/
	initSocket = ()=>{
		const socket = io(socketUrl)

		socket.on('connect', ()=>{
			console.log("Connected");
		})
		
		this.setState({socket})
	}

	/*
	* 	Sets the user property in state 
	*	@param user {id:number, name:string}
	*/	
	setUser = (user)=>{
		const { socket } = this.state
		socket.emit(USER_CONNECTED, user);
		this.setState({user})
	}

	/*
	*	Sets the user property in state to null.
	*/
	logout = ()=>{
		const { socket } = this.state
		socket.emit(LOGOUT)
		this.setState({user:null})

	}


	render() {
		const { socket, user } = this.state;
    const { roomName } = this.props;
		return (
			<div className="container">
				{
					!user ?	
            <LoginForm 
                socket={socket} 
                setUser={this.setUser} 
                roomName={roomName} />
					:
            <ChatContainer 
                socket={socket} 
                user={user} 
                logout={this.logout}
                roomName={roomName} />
				}
			</div>
		);
	}
}
