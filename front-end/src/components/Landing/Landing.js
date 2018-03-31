import React from 'react';
import {Link} from 'react-router-dom';
import './landingpg.css';

const Landing = () => {
    return (
        <div id="landing">
            <h1>Welcome to ChatterBox!</h1>
            <p>Chat about your favorite TV shows!</p>
            <p>Connect with other fans!</p>
            <p>Be free to be a chatterbox!</p>
            {/* <Link to="/tv-guide" id="enter"><p>Enter</p></Link> */}
        </div>
    )
}

export default Landing;