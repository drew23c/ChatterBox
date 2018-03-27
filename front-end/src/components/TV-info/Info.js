import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import '../../styling/info.css'

export class Room extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showid: this.props.showid, 
            showInfo: {},
            image: {},
            epInfo: {},
            summary: ""
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
                summary: res.data._embedded.nextepisode.summary
            })
        })
        .catch(error => console.log(error));
    }

    componentDidMount = () => {
        this.getShowInfo();
    }

    render() {
        console.log("show info:", this.state.showInfo);
        console.log("ep:", this.state.epInfo)
        const {showInfo, image, epInfo, summary} = this.state;
        //let summary = epInfo.summary.replace(/(<p[^>]+?>|<p>|<\/p>)/img, "");
        //document.getElementById("sum").innerHTML = summary ? (summary) : "No summary avilable"
        return (
            <div className='flex-container'>
                <img className='Info-img' src={image.original} />
                <h3>Show:{" "}{showInfo.name}</h3>
                <h3>Episode:{" "}{epInfo.name}</h3>
                <p id="sum">{summary ? summary.replace(/(<p[^>]+?>|<p>|<\/p>)/img, "") : "No summary avilable"}</p>
                <Link to="/">Back</Link>
            </div>
        )
    }
}