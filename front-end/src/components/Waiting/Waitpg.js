import React, { Component } from 'react';
import Clock from './Countdown';
import '../../styling/waitingpg.css'

class Wait extends Component {
    constructor(props) {
        super(props);
        this.state = {
            deadline: (this.props.airdate).concat(" " + this.props.airtime),
            epInfo: this.props.epInfo,
            image: this.props.image,
            showInfo: this.props.showInfo,
            summary: this.props.summary,
            network: this.props.network
        };
    }

    //Add a div with an image with the corresponding show as the background image.
    //Add info about the show
    //Choose font for Summary  
    render() {
        const {deadline, epInfo, image, showInfo, summary, network} = this.state;
        return (
            <div className='Wait-Page' >
                <img className='Wait-img' src={image.original} />
                <div className="Summary">
                    <div className="blurb">
                        <h1 className="Wait-title">Show:{" "}{showInfo.name}</h1>
                        <p> Season:{""}{epInfo.season} Episode:{" "}{epInfo.number} </p>
                        <p> Network:{""}{network.name} </p>
                        <p> Summary:{summary ? summary.replace(/(<p[^>]+?>|<p>|<\/p>)/img, "") : "No summary avilable"}</p>
                    </div>
                </div>
                <div className="Wait-sum">
                </div>
                <div className="Wait-Bottom">
                    <div className="App-date">{deadline}</div>
                    Time Left: <Clock className='Countdown' deadline={deadline} />
                </div>
            </div>
        );
    }
}

export default Wait;
