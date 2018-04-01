import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import '../../styling/info.css'
import Clock from '../Waiting/Countdown';
import Layout from '../Layout'

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
            <div className='flex-container'>
                <img className='Info-img' src={image.original} />
                <h3>Show:{" "}{showInfo.name}</h3>
                <h3>Episode:{" "}{epInfo.name}</h3>
                <p id="sum">{summary ? summary.replace(/(<p[^>]+?>|<p>|<\/p>)/img, "") : "No summary avilable"}</p>
                <Link to="/">Back</Link>
                <Layout roomName={showid} />
            </div>
        )
    }

    renderWaitPage = () => {
        //const {airdate, airtime, epInfo, image, showInfo, summary, network} = this.state;
        // return (
        //     <Wait 
        //     airdate={airdate}
        //     airtime={airtime} 
        //     epInfo={epInfo} 
        //     image={image}
        //     showInfo={showInfo} 
        //     summary={summary}
        //     network={network}/>
        // )
        const {epInfo, image, showInfo, summary, network, airdate, airtime} = this.state;
        const deadline = (airdate).concat(" " + airtime);
        var options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        return (
            <div className='Wait-Page' >
                <img className='Wait-img' src={image.original} />
                <div className="Summary">
                    <div className="blurb">
                        <h1 className="Wait-title">Show:{" "}{showInfo.name}</h1>
                        <p> Season:{" "}{epInfo.season} Episode:{" "}{epInfo.number} </p>
                        <p> Network:{" "}{network.name} </p>
                        <p> Summary:{" "}{summary ? summary.replace(/(<p[^>]+?>|<p>|<\/p>)/img, "") : "No summary avilable"}</p>
                    </div>
                </div>
                <div className="Wait-sum">
                </div>
                <div className="Wait-Bottom">
                    {/* <div className="App-date">{new Date(deadline).toLocaleDateString('en-US', options)}</div> */}
                    Time Left: <Clock className='Countdown' deadline={deadline} name={showInfo.name} showid={showInfo.id}/>
                </div>
            </div>
        )
    }

    render() {
        const {airdate, airtime} = this.state;
        const deadline = (airdate).concat(" " + airtime);
        var options = {hour12: false}
        //Date.parse(deadline) - Date.parse(new Date()) < 0
        if ( (new Date(airdate).toUTCString().slice(0, 16) === new Date().toUTCString().slice(0, 16)) 
            && airtime === new Date("2018-04-01 19:00").toLocaleTimeString('en-US', options).slice(0, 5) ) {
            return <this.renderChatroom />
        } else {
            return <this.renderWaitPage />
        }
    }
}