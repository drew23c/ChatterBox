import React, {Component} from 'react';
import {Schedule} from "./Schedule";
import '../../styling/homepg.css'

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