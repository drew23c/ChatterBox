import React, {Component} from 'react';
import axios from 'axios';
import '../../styling/homepg.css'
import TvGuide from './Guide';
import Clock from './Clock';

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
        // const userDate = document.getElementById('date').value;
        // axios.get(`http://api.tvmaze.com/schedule?date=${userDate}`)
        axios.get(`http://localhost:3100/shows/schedule`)        
        .then( res => {
            let apiArr = Object.keys(res.data).map(key => {
                return res.data[key];
            })
           
            console.log("res:", res);
            this.setState({
                arr: apiArr[0]
                // dateInput: userDate
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
        const {hour, dateInput} = this.state;
        if ( (hour === new Date().getHours() && !dateInput) || (hour === 0) ) {
            this.setState({
                hour: hour
            })
        } else {
            this.setState({
                hour: hour - 1
            });
        }
    }



    render() {
        const {date, arr, hour } = this.state;
        return (
            <div>
                {/* Today's date and time. */}
                <Clock date={date}/>

                {/* TV schedule for the US. Displays new episodes only (no reruns). 
                Displays shows in one hour blocks of time. */}
                <TvGuide 
                    hour={hour} 
                    arr={arr} 
                    moreTime={this.handleMoreTime}
                    lessTime={this.handleLessTime} 
                    handleDateInput={this.handleDateInput} 
                    handleReset={this.handleReset} 
                    handleUserInput={this.handleUserInput}
                     />

            </div>
        )
    }

}