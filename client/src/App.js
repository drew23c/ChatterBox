import React, { Component } from 'react';
import { Link, Switch, Route } from "react-router-dom";
import ChatPage from "./components/Chat/Chatpg";
import Home from "./components/Home/Home";
import Wait from './components/Waiting/Waitpg'
import Landing from './components/Landing/Landing';
import './index.css';
import './styling/homepg.css'
import HomeIcon from 'react-icons/lib/fa/home'

class App extends Component {
  render() {
    return (
      <div>
          <nav className="navbar-default navbar-fixed-top navbarColor">
            <div className="container-fluid text">
             <img  className='navbar-header'alt='ChatterBox' src="logoCROP.png" width="200" height="50" />
              <ul className="nav navbar-nav">
                
               <li className="nav-item nav-itemColor">
                <Link  style={{color:'white'}} to="/"> <HomeIcon size={35}/> </Link>
                </li>
              
    
           </ul> 
         </div>
        </nav>
    <div className="mainbody">
    <Switch>
      <Route exact path="/" component={Landing} />
      <Route path="/schedule" component={Home} />
      <Route path="/chat" component={ChatPage} />
    </Switch>
    </div>

      </div>
    );
  }
}

export default App;