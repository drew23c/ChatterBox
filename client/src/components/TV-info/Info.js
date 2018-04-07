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
            showInfo: [],
            image: "",
            epInfo: "",
            summary: "", 
            airdate: "", 
            airtime: "", 
            network: "",
            genSummary: "",
            name:"",
            season:""
        }
    }

    getShowInfo = () => {
    // //    let showID = this.props.match.params.showID;
    // let showID = this.state.showid.props.match.params.showID;
    
        const {showid} = this.state;
        console.log('hi:' ,showid)
        axios.get(`http://localhost:3100/shows/${showid}`)
        .then(res => {
            let apiArr = Object.keys(res.data).map(key => {
                return res.data[key];
            })
            
            this.setState({
                showInfo: apiArr[0][0],
                image: apiArr[0][0].img_url,
                epInfo: apiArr[0][0].ep_name,
                summary: apiArr[0][0].show_summary,
                airdate: apiArr[0][0].air_date,
                airtime: apiArr[0][0].air_time,
                network: apiArr[0][0].network_name,
                genSummary: apiArr[0][0].summary,
                name: apiArr[0][0].name,
                season: apiArr[0][0].season
            })
            console.log('showInfo: ',this.state.showInfo)
            console.log('image: ',this.state.showInfo.img_url)
            
            
        })
        .catch(error => console.log(error));
    }

    componentDidMount = () => {
        this.getShowInfo();
    }

    renderChatroom = () => {
        const {showInfo, image, season, epInfo, name, summary, showid, genSummary} = this.state;
        return (
                <Grid className='Chat-pg'>
                 <Row>
        
                    <Col xs={6} md={6} lg={6}  style={{backgroundColor: 'white'}} >
                    <Image className='Info-img' alt={name} src={image} />
                   
                    <h3>Name:{" "}{name}</h3>
                    <p> Season:{" "}{season}</p>
                    <h3>Episode:{" "}{epInfo}</h3>
                    <h4>{summary ? summary.replace(/<(?:.|\n)*?>/gm, '') : genSummary.replace(/<(?:.|\n)*?>/gm, '') }</h4>
                   
                    <Button bsStyle="default" bsSize="large" style={{'width':'150px'}} href="/schedule" >
                        Back
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
        const {epInfo, image, showInfo, season, name, summary, network, airdate, airtime, genSummary} = this.state;
        const deadline = (airdate).concat(" " + airtime);

        var options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        const summ= document.createElement("p");
        summ.innerHTML = summary;
        return (
            <Grid className='Wait-Page'>
                <Row className="Wait-Bottom">
                <Col xs={18} md={12} lg={12}>
                    Time Left: <Clock className='Countdown' deadline={deadline} name={name} showid={showInfo} />
                </Col>
                </Row>

            <Row style={{'backgroundColor': '#DDDBCB'}}>
            <Col xs={6} md={4} lg={4}>
                    <Image rounded responsive className='Info-img' src={image} />
                </Col>

            <Col className="Summary" xs={6} md={4} lg={4}  >   
                <h1>Show:{" "}{name}</h1>
                <p> Season:{" "}{season}</p>
                <p>Episode:{" "}{epInfo} </p>
                <p> Network:{" "}{network} </p>
                {/* Below regular expression from Stack Overflow: https://stackoverflow.com/a/822464 
                This will remove any html elements within the summary string. i.e. <p> etc.*/}
                <p> Summary:{" "}{summary ? summary.replace(/<(?:.|\n)*?>/gm, '') : genSummary.replace(/<(?:.|\n)*?>/gm, '') }</p>
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
            return (
            <div>
                <this.renderChatroom />
            </div>
            )
        } else {
            return (
            <div>
                <this.renderWaitPage />
            </div>)
        }
    }
}