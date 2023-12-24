import React, { Component } from 'react';
import './About.css';
import IMG from '../../../constants/ImgUrl';


class Instruction extends Component {
    render() {
        return (
            <section className="instruction">
              <h2>ABC has everything you need
                for effective TOEIC test</h2>
              <div className="instruction-flex">
                <div className="wow animate__backOutUp frame">
                  <div className="frame-ig">
                    <img src={IMG.icon1} alt='logo' />
                  </div>
                  <p>The learning path helps you to increase your score quickly</p>
                </div>
                <div className="wow animate__animated animate__backOutUp frame">
                  <div className="frame-ig">
                    <img src={IMG.icon2} alt='logo'/>
                  </div>
                  <p>600 Essential TOEIC Vocabulary</p>
                </div>
                <div className="wow animate__animated animate__backOutUp frame">
                  <div className="frame-ig">
                    <img src={IMG.icon3} alt='logo'/>
                  </div>
                  <p>50 important grammar topics</p>
                </div>
                <div className="wow animate__animated animate__backOutUp frame">
                  <div className="frame-ig">
                    <img src={IMG.icon4} alt='logo' />
                  </div>
                  <p>Tips for taking the TOEIC test</p>
                </div>
                <div className="wow animate__animated animate__backOutUp frame">
                  <div className="frame-ig">
                    <img src={IMG.icon5} alt='logo' />
                  </div>
                  <p>Support learners enthusiastically</p>
                </div>
                <div className="wow animate__animated animate__backOutUp frame">
                  <div className="frame-ig">
                    <img src={IMG.icon6} alt='logo' />
                  </div>
                  <p>Study hard and get rewarded</p>
                </div>
                <div className="wow animate__animated animate__backOutUp frame">
                  <div className="frame-ig">
                    <img src={IMG.icon7} alt='logo' />
                  </div>
                  <p>Policy for adding school days</p>
                </div>
              </div>
              <p id="course" />
            </section>
        );
    }
}

export default Instruction;