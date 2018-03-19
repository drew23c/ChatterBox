import React, {Component} from "react";
import io from "socket.io-client";
import './Style.css'

class UsersOnline extends Component{
    constructor(){
        super()
        this.state={

        }
        this.socket = io('localhost:8080');

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
        return(
            <div className="users">{this.state.users}</div>
        )
    }
}
export default UsersOnline;