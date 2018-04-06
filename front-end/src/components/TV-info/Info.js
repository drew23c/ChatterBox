import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import '../../styling/info.css'
import '../../styling/waitingpg.css'
import Clock from '../Waiting/Countdown';
import Layout from '../Layout'
import { Row, Grid, Col, Image, Button } from 'react-bootstrap';
// import { Grid } from 'semantic-ui-react';

export class Room extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showid: this.props.showid, 
            showInfo: {},
            image: {},
            epInfo: {},
            summary: "", 
            airdate: "", 
            airtime: "", 
            network: ""
        }
    }

    getShowInfo = () => {
        const {showid} = this.state;
        axios.get(`http://api.tvmaze.com/shows/${showid}?embed=nextepisode`)
        .then(res => {
            this.setState({
                showInfo: res.data,
                image: res.data.image,
                epInfo: res.data._embedded.nextepisode,
                summary: res.data._embedded.nextepisode.summary,
                airdate: res.data._embedded.nextepisode.airdate,
                airtime: res.data._embedded.nextepisode.airtime,
                network: res.data.network
            })
        })
        .catch(error => console.log(error));
    }

    componentDidMount = () => {
        this.getShowInfo();
    }

    renderChatroom = () => {
        const {showInfo, image, epInfo, summary, showid} = this.state;
        return (
                <Grid className='Chat-pg'>
                 <Row>
        
                    <Col xs={6} md={6} lg={6}  style={{backgroundColor: 'white'}} >
                    <Image className='Info-img' alt={showInfo.name} src={image.original} />
                   
                    <h3>Name:{" "}{showInfo.name}</h3>
                    <h3>Episode:{" "}{epInfo.name}</h3>
                    <h4>{summary ? summary.replace(/<(?:.|\n)*?>/gm, '') : "No summary available"}</h4>
                   
                    <Button bsStyle="default" bsSize="large" style={{'width':'150px'}}>

                         <Link  to="/">Back</Link>
                         </Button>
                   
                </Col>

                <Col xs={6} md={5} lg={4} className='LogNChat'>
                    <Layout roomName={showid} />
                </Col>

              </Row>
          </Grid>
        )
    }


    renderWaitPage = () => {
        const {epInfo, image, showInfo, summary, network, airdate, airtime} = this.state;
        const deadline = (airdate).concat(" " + airtime);

        var options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        const summ= document.createElement("p");
        summ.innerHTML = summary;
        return (
            <Grid className='Wait-Page'>
                <Row className="Wait-Bottom">
                <Col xs={18} md={12} lg={12}>
                    Time Left: <Clock className='Countdown' deadline={deadline} name={showInfo.name} showid={showInfo.id} />
                </Col>
                </Row>

            <Row style={{'backgroundColor': '#DDDBCB'}}>
            <Col xs={6} md={4} lg={4}>
                    <Image rounded responsive className='Info-img' src={image.original} />
                </Col>

            <Col className="Summary" xs={6} md={4} lg={4}  >   
                <h1>Show:{" "}{showInfo.name}</h1>
                <p> Season:{" "}{epInfo.season} Episode:{" "}{epInfo.number} </p>
                <p> Network:{" "}{network.name} </p>
                {/* Below regular expression from Stack Overflow: https://stackoverflow.com/a/822464 
                This will remove any html elements within the summary string. i.e. <p> etc.*/}
                <p> Summary:{" "}{summary ? summary.replace(/<(?:.|\n)*?>/gm, '') : "No summary available"}</p>
                    </Col>
                </Row>
            </Grid>
        )
    }

    render() {

        const { airtime} = this.state;
        const hour = new Date().getHours();
        const hourStr = hour < 10 ? hour.toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false}) : hour.toString();
        if ( hourStr === airtime.slice(0,2) ) {
            return <this.renderChatroom />
        } else {
            return <this.renderWaitPage />
        }
    }
}