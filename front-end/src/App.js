import React, { Component } from 'react';
import { Link, Switch, Route } from "react-router-dom";

import Chat from "./components/Chat/Chat";
import Home from "./components/Home/Home";
import Layout from './components/Layout'
import Wait from './components/Waiting/Waitpg'

class App extends Component {
  render() {
    return (
      <div>
           <nav>
        <ul className="nav">
          <li> <Link to="/">Home</Link> </li>
          {"  "}
          <li> <Link to="/chat">Chat</Link> </li>
          {"  "}
          <li> <Link to="/waiting">Waiting Page</Link> </li>
        </ul>
    </nav>
    <Switch>
      <Route exact path="/" component={Home} />
      <Route path="/chat" component={Layout} />
      <Route path="/waiting" component={Wait} />

    </Switch>
        

      </div>
    );
  }
}

export default App;