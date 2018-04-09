import React from 'react';
import { Link } from "react-router-dom";
import FaAngleDoubleLeft from 'react-icons/lib/fa/angle-double-left';
import FaAngleDoubleRight from 'react-icons/lib/fa/angle-double-right'

const TvGuide = ({hour, arr, dateInput, moreTime, lessTime, handleDateInput, handleReset, handleUserInput, userInput}) => {
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
        if (el.network_name !== null
            && el.network_name !== "Playboy TV"
            && (el.air_time.match(hourStr + ":") 
            || el.air_time.match(hourStr + ":3")) ) {
            return el;
        }
    }).sort( (a, b) => {
        return a.air_time > b.air_time;
    })

    return (
        <div>
            <table className='schedule-table'>
                <thead>
                    <tr>
                        <td id="title" colSpan="4">
                          {/* Buttons are diabled when user reaches midnight. */}

                        <FaAngleDoubleRight  className={hour === 23 ? "arrow" : ""} size={60}  
                            style={{float:'right', padding: '10px'}} disabled={hour === 23} onClick={moreTime}/>
                        
                        {/* Buttons are diabled when user reaches 0. */}
                        On Air:{" "}{schedHour1}{" - "}{schedHour2} 
                        
                        <FaAngleDoubleLeft  className={ (hour === new Date().getHours() && !dateInput) || (hour === 0)  ? "arrow" : ""} 
                            size={60} style={{float:'left', padding: '10px'}} disabled={ (hour === new Date().getHours() && !dateInput) || (hour === 0) } 
                            onClick={lessTime}/>
                     
                        </td>
                    </tr>
                    <tr>
                        <th>Hour</th>
                        <th>Show</th>
                        <th>Network</th>

                    </tr>
                </thead>
                <tbody className='schedule-table'>
                    {tv.map(el => 
                    <tr key={el.id}>
                     <td>{el.air_time.match(hour + ":00") ? schedHour1 :
                            schedHour1.replace(" ", el.air_time.slice(2).concat(" ")) }</td>
             
                 <td>{ dateInput ? el.name : <Link to={`/chat/${el.id}`}>{el.name}</Link>}</td>
                 <td>{el.network_name}</td>
                    </tr>)}
                
                    <tr>
                        <td colSpan="4" id="tablefoot"><p>{tv.length === 0 ? "No shows at this time" : ""}</p></td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}

export default TvGuide;