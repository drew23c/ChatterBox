import React from 'react';
import {Link} from 'react-router-dom';
import './landingpg.css';
import About from '../About/About';

const Landing = () => {
    return (
        <div id="landing">
            <h1>Welcome to ChatterBox!</h1>
            <p>Chat about your favorite TV shows!</p>
            <p>Connect with other fans!</p>
            <p>Be free to be a chatterbox!</p>
            <Link to="/main" id="enter"><p>Enter</p></Link>
            <About />
        </div>
    )
}

export default Landing;