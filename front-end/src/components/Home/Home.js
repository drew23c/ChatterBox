import React, {Component} from 'react';
import {Schedule} from "./Schedule";
import '../../styling/homepg.css'
import Popular from './Popular';


class Home extends Component {
    render() {
      return (
        <div className='flex-containerHome'>
            <div className='flex-schedule'>
            <Schedule />
            </div>
            <div className="flex-popular">
                <Popular />
            </div>
        </div>
      );
    }
  }
  
  export default Home;