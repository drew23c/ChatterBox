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
        <Col lg={12} md={12} xs={18}>
          <Schedule />
          </Col>
          </Row>
          <Row>
          <Col lg={12} md={12} xs={18}>
          <Popular />
          </Col>
        </Row>
          </Grid>
        </div>
      );
    }
  }
  
  export default Home;