import React, { Component } from 'react';
import { VERIFY_USER } from '../Events'

export default class LoginForm extends Component {
	constructor(props) {
	  super(props);
	  this.state = {
	  	nickname:"",
		  error:"",
		  role:""
	  };
	}

	setUser = ({user, isUser})=>{

		if(isUser){
			this.setError("User name taken")
		}else{
			this.setError("")
			this.props.setUser(user)
		}
	}

	handleSubmit = (e)=>{
		e.preventDefault()
		const { socket, roomName } = this.props;
		const { nickname } = this.state;
		socket.emit(VERIFY_USER, nickname, roomName, this.setUser);
	}

	handleChange = (e)=>{	
		this.setState({nickname:e.target.value})
	}

	setError = (error)=>{
		this.setState({error})
	}
	handleRole = e =>{
		this.setState({role:e.target.value})
	}
	render() {	
		const { nickname, error } = this.state
		return (
			<div className='login-movement'>
			<div className="login">
				<form onSubmit={this.handleSubmit} className="login-form">

					<label htmlFor="nickname">
						<h2>Got a nickname?</h2>
					</label>
					<input
						ref={(input)=>{ this.textInput = input }} 
						type="text"
						id="nickname"
						value={nickname}
						onChange={this.handleChange}
						placeholder={'Enter Username'}
						/>
						<select onChange={this.handleRole}>
							<option value=""></option>
							<option value="admin">admin</option>
							<option value="user">user</option>
							<option value="guest">guest</option>
						</select>
						<div className="error">{error ? error:null}</div>

				</form>
			</div>
			</div>
			
		);
	}
}
