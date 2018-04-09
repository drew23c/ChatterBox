import React, {Component} from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';
import { Carousel } from 'react-bootstrap';
import '../../styling/homepg.css'

class Popular extends Component {
    constructor() {
        super();
        this.state = {
            popular: []
        }
    }

    // Get shows with a rating of 7 out of 10 and that are currently on the air or will air today.
    // Filters out shows that have already aired.
    // Uses the /schedule endpoint and will change daily.
    handlePopular = () => {
        axios.get('http://localhost:3100/shows/schedule')
        .then( res => {

        let hour = new Date().getHours();
        let hourStr = hour < 10 ? hour.toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false}) : hour.toString();
        
           let apiArr = Object.keys(res.data).map(key => {
                return res.data[key];
            })


            let pop = apiArr[0].filter( (el) => {
                    if (el.rating > 7  && (hourStr <= el.air_time.slice(0,2))) {
                        return el;
                    }
                })
             this.setState({
                    popular: pop
                })
        })
        .catch( err => console.log(err))
    }

    componentDidMount = () => {
        this.handlePopular();
    }

    render() {
        const {popular} = this.state;
        return ( 
            <div id="popular">
                <h1 className='popular-title'>Popular Chat Rooms</h1>
                    <Carousel>
                    {popular.map( (el, i) =>
                    <div id="pop-map"key={i}>
                        <Carousel.Item>
                        <Link to={`/chat/${el.id}`}>
                            <img key={i} id="pop-img" alt={el.name} src={el.img_url} />
                        </Link>
                        </Carousel.Item>
                    </div>)}
                    </Carousel>
            </div>
        )
    }
}

export default Popular;