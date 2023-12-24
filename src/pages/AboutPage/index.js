import React from 'react';
import './component/About.css';
// import IMG from '../../constants/ImgUrl';
import Difficult from './component/Difficult';
import Instruction from './component/Instruction';

function AboutPage(props) {
    return (
       <div>
           <Difficult></Difficult>
           <Instruction></Instruction>
       </div>
    );
}

export default AboutPage;