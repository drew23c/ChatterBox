import React, { Component } from 'react';
import { Link, Switch, Route } from "react-router-dom";
import './styling/homepg.css'
import ChatPage from "./components/Chat/Chatpg";
import Home from "./components/Home/Home";
import Layout from './components/Layout'
import Wait from './components/Waiting/Waitpg'

class App extends Component {
  render() {
    return (
      <div>
           <nav className='navbar'>
        <Link to="/" className='icon'> Home </Link>
          {"  "}
          <Link to="/waiting" className='links'> Waiting </Link>
        </nav>
    <div className="mainbody">
    <Switch>
      <Route exact path="/" component={Home} />
      <Route path="/chat" component={ChatPage} />
      <Route path="/waiting" component={Wait} />

    </Switch>
    </div>

      </div>
    );
  }
}

export default App;