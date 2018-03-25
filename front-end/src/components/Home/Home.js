import React, {Component} from 'react';
import axios from 'axios';
import {Clock, TvGuide, Schedule} from "./Schedule";

class Home extends Component {
    render() {
      return (
        <div>
            <Schedule />
        </div>
      );
    }
  }
  
  export default Home;