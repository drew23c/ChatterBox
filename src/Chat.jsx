import React from "react";
import io from "socket.io-client";
import './Style.css'

class Chat extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            username: '',
            message: '',
            messages: []
        };
        
        this.socket = io('localhost:8080');
        this.socket.emit('create', 'room1');
        //Received message event
        this.socket.on('RECEIVE_MESSAGE', function(data){
            addMessage(data);
        });

        const addMessage = data => {
            let mess = document.getElementById('messages');
            let {messages} = this.state
            console.log(data);
            this.setState({messages: [...messages, data]});
            console.log(messages);
            mess.value = " ";        
        
            //TIMEOUT TO REMOVE A MESSAGE
            setTimeout(function(){
                mess.innerHTML = " ";
            // this.setState({
            //     messages: messages.shift()
            //     });
            },60000);
        }
        //send message event
        this.sendMessage = ev => {
            let username = document.getElementById('username');
            ev.preventDefault();
            this.socket.emit('SEND_MESSAGE', {
                author: this.state.username,
                message: this.state.message
            })
            this.setState({message: ''});
            if(this.state.username !== ""){
                username.disabled = true;
            }
        }

        //broadcast online users
        const broadcast = data =>{
            console.log(data)
            this.setState({users: data.description})
        }
        this.socket.on('broadcast',function(data){
            broadcast(data);
        });

    }
    render(){
        return (
            <div className="container">
            <div className="users">{this.state.users}</div>
                <div className="row">
                    <div className="col-4">
                        <div className="card">
                            <div className="card-body">
                                <div className="card-title">Global Chat</div>
                                <hr/>
                                <div className="messages" id="messages">
                                    {this.state.messages.map(message => {
                                        return (
                                            <div>{message.author}: {message.message}</div>
                                        )
                                    })}
                                </div>

                            </div>
                            <div className="card-footer">
                                <input type="text" id="username" placeholder="Username" value={this.state.username} onChange={ev => this.setState({username: ev.target.value})} className="form-control"/>
                                <br/>
                                <input type="text" placeholder="Message" className="form-control" value={this.state.message} onChange={ev => this.setState({message: ev.target.value})}/>
                                <br/>
                                <button onClick={this.sendMessage} className="btn btn-primary form-control">Send</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Chat;