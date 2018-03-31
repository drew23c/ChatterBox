import React from 'react';
import GoMarkGithub from 'react-icons/lib/go/mark-github';
import IoSocialIcon from 'react-icons/lib/io/social-linkedin';
import './about.css';

const team = [
    { name: "Andrew Caldwell", github: "https://github.com/drew23c", linkedin: "https://www.linkedin.com/in/caldwellandrew/" },
    { name: "Chaltin Pagan", github: "https://github.com/ChaltinPagan", linkedin: "https://www.linkedin.com/in/chaltinpagan/" },
    { name: "Susana Han", github: "https://github.com/susanahan", linkedin: "https://www.linkedin.com/in/susana-han-4724b780/" },
    { name: "Eric Man", github: "https://github.com/ericman92", linkedin: "https://www.linkedin.com/in/eric-man/" },
    { name: "Tasliym Twinamaani", github: "https://github.com/tmadiyna08", linkedin: "https://www.linkedin.com/in/ttwinamaani/" }
];


const About = () => {
    return (
        <div id="about">
            <h1>Proudly Coded By</h1>
            {team.map( (el,i) =>
            <p>{el.name}
                <a href={el.github}><GoMarkGithub /></a>
                <a href={el.linkedin}><IoSocialIcon /></a>
            </p>)}
            <p>C4Q Access Code 4.2 Full Stack Web Development Fellows</p>
        </div>
    )
}

export default About;