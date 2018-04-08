import React from 'react';
import GoMarkGithub from 'react-icons/lib/go/mark-github';
import IoSocialIcon from 'react-icons/lib/io/social-linkedin';
import './about.css';
import { Row, Grid, Col, Image } from 'react-bootstrap';


const team = [
    { name: "Andrew Caldwell", github: "https://github.com/drew23c", linkedin: "https://www.linkedin.com/in/caldwellandrew/", image: "/andrew.jpg" }, 
    { name: "Susana Han", github: "https://github.com/susanahan", linkedin: "https://www.linkedin.com/in/susana-han-4724b780/", image: "/susana.jpeg"},
    { name: "Chaltin Pagan", github: "https://github.com/ChaltinPagan", linkedin: "https://www.linkedin.com/in/chaltinpagan/", image: "/chaltin.jpeg"},    
    { name: "Eric Man", github: "https://github.com/ericman92", linkedin: "https://www.linkedin.com/in/eric-man/", image: "/eric.jpg" },
    { name: "Tasliym Twinamaani", github: "https://github.com/tmadiyna08", linkedin: "https://www.linkedin.com/in/ttwinamaani/", image: "/tasi.jpeg" }
];


const About = () => {
    return (
        <div id="about">
            <Grid>
                <Row className='row-team'>
                <h1>Meet the team</h1>

                    {team.map((el, i) =>
                     <Col xs={18} md={2} lg={2} className='team'>
                                       
                            <Image circle className='people' alt={el.image} src={el.image}/>
                           <p key={i}>{el.name}< br/>
                                <a href={el.github} target="_blank" ><GoMarkGithub /></a>
                                <a href={el.linkedin} target="_blank" ><IoSocialIcon /></a>
                            </p>
                            </Col>)}
                </Row>
            </Grid>

            <p id="c4q">C4Q Access Code 4.2 Full Stack Web Development Fellows</p>
        </div>
    )
}

export default About;