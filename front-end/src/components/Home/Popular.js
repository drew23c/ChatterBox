import React, {Component} from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';

class Popular extends Component {
    constructor() {
        super();
        this.state = {
            popular: []
        }
    }

    // Get shows with a rating of 8 out of 10.
    // Uses the /schedule endpoint and will change daily.
    handlePopular = () => {
        axios.get('http://api.tvmaze.com/schedule')
        .then( res => {
            let pop = res.data.filter( el => {
                if (el.show.rating.average > 8) {
                    return el;
                }
            })
            console.log("pop:", pop)
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
                <h1>Popular Chat Rooms</h1>
                    {popular.map( (el, i) =>
                    <div id="pop-map">
                        <Link to={`/chat/${el.show.name}/${el.show.id}`}>
                            <img key={i} id="pop-img"src={el.show.image.medium} /></Link>
                    </div>)}
                    
            </div>
        )
    }
}

export default Popular;