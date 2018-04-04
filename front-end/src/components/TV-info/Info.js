import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import '../../styling/info.css'
import Clock from '../Waiting/Countdown';
import Layout from '../Layout'
import { Grid, Row, Col, Image } from 'react-bootstrap';

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
            <div>
                <Grid className='Chat-pg'>
                 <Row>
                    <Col xs={8} md={6} lg={6}>
                <img className='Info-img' alt={showInfo.name} src={image.original} />
                <h3>Show:{" "}{showInfo.name}</h3>
                <h3>Episode:{" "}{epInfo.name}</h3>
                <p id="sum">{summary ? summary.replace(/<(?:.|\n)*?>/gm, '') : "No summary avilable"}</p>
                <Link to="/">Back</Link>
                </Col>
                <Col xs={10} md={6} lg={6}>
                <Layout roomName={showid} />
                </Col>
              </Row>
          </Grid>
            </div>
        )
    }

    renderWaitPage = () => {
        const {epInfo, image, showInfo, summary, network, airdate, airtime} = this.state;
        const deadline = (airdate).concat(" " + airtime);
        const summ= document.createElement("p");
        summ.innerHTML = summary;
        return (
            <div className='Wait-Page' >
                <img className='Wait-img' alt={showInfo.name} src={image.original} />
                <div className="Wait-Bottom">
                    Time Left: <Clock className='Countdown' deadline={deadline} name={showInfo.name} showid={showInfo.id} />
                </div>
                <Image rounded responsive className='Info-img' src={image.original} />
                <div className="Summary">
                    <div className="blurb">
                        <h1 className="Wait-title">Show:{" "}{showInfo.name}</h1>
                        <p> Season:{" "}{epInfo.season} Episode:{" "}{epInfo.number} </p>
                        <p> Network:{" "}{network.name} </p>
                        {/* Below regular expression from Stack Overflow: https://stackoverflow.com/a/822464 
                        This will remove any html elements within the summary string. i.e. <p> etc.*/}
                        <p> Summary:{" "}{summary ? summary.replace(/<(?:.|\n)*?>/gm, '') : "No summary avilable"}</p>
                        <p className='sum'> Summary:{" "}{summary ? summary.replace(/(<p[^>]+?>|<p>|<\/p>)/img, "") : "No summary avilable"}</p>
                    </div>
                </div>
                <div className="Wait-sum">
                </div>

            </div>
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