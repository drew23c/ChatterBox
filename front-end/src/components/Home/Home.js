import React, {Component} from 'react';
import {Schedule} from "./Schedule";
import '../../styling/homepg.css'
import Popular from './Popular';
import { Grid, Row, Col } from 'react-bootstrap';


class Home extends Component {
    render() {
      return (
        <div>

      <Grid>
        <Row className="show-grid colorFONT">
          <Col md={9} md={7}>
          <Schedule />
          </Col>
          <Col md={9} md={5}>
          <Popular />
          </Col>
        </Row>
         
    
          </Grid>
        </div>
      );
    }
  }
  
  export default Home;