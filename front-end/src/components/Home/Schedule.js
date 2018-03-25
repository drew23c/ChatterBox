import React, {Component} from 'react';
import axios from 'axios';
import { Link, Switch, Route } from "react-router-dom";

export class Schedule extends Component {
    constructor() {
        super();
        this.state = {
            date: new Date(),
            dateInput: "",
            hour: new Date().getHours(), 
            arr: [], 
            userInput: ""
        }
    }

    // Handles date input by user. Gets US TV schedule for day specified.
    handleDateInput = () => {
        const {userInput} = this.state;
        axios.get(`http://api.tvmaze.com/schedule?date=${this.state.userInput}`)
        .then( res => {
            console.log("res:", res);
            this.setState({
                arr: res.data,
                dateInput: userInput
            })
        })
        .catch(error => console.log(error))
    }

    componentDidMount = () => {
        this.handleDateInput();
    }

    // Increase schedule time by 1 hour. Stops at midnight.
    handleMoreTime = () => {
        const {hour} = this.state;
        if (hour === 23) {
            this.setState({
                hour: hour
            })
        } else {
            this.setState({
                hour: hour + 1
            })
        }
        
    }

    // Decreases schedule time by 1 hour. Stops at mignight.
    handleLessTime = () => {
        const {hour} = this.state;
        if (hour === 0) {
            this.setState({
                hour: hour
            })
        } else {
            this.setState({
                hour: hour - 1
            });
        }
    }

    // Handles date input by user.
    handleUserInput = (e) => {
        this.setState({
            userInput: e.target.value
        })
    }

    // Resets the schedule to the current day.
    handleReset = (e) => {
        axios.get(`http://api.tvmaze.com/schedule`)
        .then( res => {
            console.log("res:", res);
            this.setState({
                arr: res.data,
                hour: new Date().getHours(),
                dateInput: "",
                userInput: ""
            })
        })
        .catch(error => console.log(error))
    }

    render() {
        const {date, arr, hour, dateInput, userInput} = this.state;
        return (
            <div>
                {/* Today's date and time. */}
                <Clock date={date}/>

                {/* TV schedule for the US. Displays new episodes only (no reruns). 
                Displays shows in one hour blocks of time. */}
                <TvGuide 
                    hour={hour} 
                    arr={arr} 
                    dateInput={dateInput}
                    moreTime={this.handleMoreTime}
                    lessTime={this.handleLessTime} 
                    handleDateInput={this.handleDateInput} 
                    handleReset={this.handleReset} 
                    handleUserInput={this.handleUserInput}
                    userInput={userInput} />

            </div>
        )
    }

}


export class Clock extends Component {
    constructor(props) {
        super(props);
        this.state = {
            date: this.props.date
        }
    }

    tick = () => {
        this.setState({
          date: new Date()
        });
    }

    componentDidMount() {
        this.timerID = setInterval(
          () => this.tick(),
          1000
        );
    }
    
    componentWillUnmount() {
        clearInterval(this.timerID);
    }

    render() {
        const {date} = this.state;
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        return (
            <div>
                <p>Today's Date:{" "}{date.toLocaleDateString('en-US', options)}</p>
                <p>Time Now:{" "}{date.toLocaleTimeString()}</p>
            </div>
        )
    }
}

export const TvGuide = ({hour, arr, dateInput, moreTime, lessTime, handleDateInput, handleReset, handleUserInput, userInput}) => {
    let hourStr = hour < 10 ? hour.toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false}) : hour.toString();
    
    // Re-write airtimes to reflect 12-hour clock.
    const schedHour1 = hour === 0 ? `12 AM` : 
        (hour <= 11 ? `${hour} AM` : 
        (hour === 12 ? `${hour} noon` : `${hour - 12} PM`) )
    const schedHour2 = hour + 1 === 24 ? `12 midnight` : 
        (hour + 1 <= 11 ? `${hour + 1} AM` : 
        (hour + 1 === 12 ? `${hour + 1} noon` :`${hour - 11} PM`) )

    let month = new Date().getMonth() + 1;
    let day = new Date().getDate();
    let year = new Date().getFullYear()
    let date = dateInput ? dateInput : `${year}-${(month < 10 ? `0` + month : month)}-${(day < 10 ? `0` + day : day)}`

    // Filters out Playboy TV network and any other show without a network name. 
    // Returns shows that match the specified hour range.
    // Sorts shows by airtime.
    let tv = arr.filter( (el, i, arr) => {
        if (el.show.network !== null
            && el.show.network.name !== "Playboy TV"
            && (el.airtime.match(hourStr + ":") 
            || el.airtime.match(hourStr + ":3")) ) {
            return el;
        }
    }).sort( (a, b) => {
        return a.airtime > b.airtime;
    })

    return (
        <div id="tvguide">
            <div id="tvcontrols">
                <input type="date" 
                    id="date" 
                    value={userInput} 
                    onChange={handleUserInput} 
                    placeholder="YYYY-MM-DD"/>
                <button onClick={handleDateInput} >Get Schedule</button>
                <button onClick={handleReset} id="reset">Reset</button>
                {" "}

                {/* Buttons are diabled when user reaches midnight. */}
                <button disabled={hour === 0} 
                    onClick={lessTime} >{"<"}</button>
                <button disabled={hour === 23} 
                    onClick={moreTime} >{">"}</button>
            </div>
            
            <table>
                <thead>
                    <tr>
                        <td id="title" colSpan="4">Schedule for:{" "}{date} <br /> 
                        On Air:{" "}{schedHour1}{" - "}{schedHour2} <br />
                        </td>
                    </tr>
                    <tr>
                        <th>Network</th>
                        <th>Show</th>
                        <th>Airtime</th>
                        <th>Runtime (minutes)</th>
                    </tr>
                </thead>
                <tbody>
                    {tv.map(el => 
                    <tr key={el.id}>
                        <td>{el.show.network.name}</td>
                <td><Link to={`/chat/${el.show.name}/${el.show.id}`}>{el.show.name}</Link></td>
                        <td>{el.airtime.match(hour + ":00") ? schedHour1 :
                            schedHour1.replace(" ", el.airtime.slice(2).concat(" ")) }</td>
                        <td>{el.runtime}</td>
                    </tr>)}
                
                    <tr>
                        <td colSpan="4" id="tablefoot"><p>{tv.length === 0 ? "No shows at this time" : ""}</p></td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}

export default {
    Clock, 
    Schedule
}; 