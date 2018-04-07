import React, { Component } from 'react';

class Clock extends Component {
    constructor(props) {
        super(props);
        this.state = {
            hours: 0,
            minutes: 0,
            seconds: 0,
        };
    }

    componentWillMount() {
        setInterval(() => this.getTimeUntil(this.props.deadline), 1000);
    }

    leading0(num) {
        return num < 10 ? '0' + num : num;
    }

    getTimeUntil(deadline) {
        const time = Date.parse(deadline) - Date.parse(new Date());

        if (time < 0) {
            this.setState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

        } else {
            const seconds = Math.floor((time / 1000) % 60);
            const minutes = Math.floor((time / 1000 / 60) % 60);
            const hours = Math.floor((time / (1000 * 60 * 60)) % 24);

            this.setState({ hours, minutes, seconds });
        }

    }

    render() {
        return (
            <div className='timer'>
                
                <div className="hour">
                    <span class="number">{this.leading0(this.state.hours)}</span>:
                    <span class="number">{this.leading0(this.state.minutes)}</span>:
                    <span class="number">{this.leading0(this.state.seconds)}</span>
                </div>
            </div>
        );
    }
}
export default Clock;
