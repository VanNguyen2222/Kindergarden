import React, { Component } from 'react';
import './About.css';
import IMG from '../../../constants/ImgUrl';

class Difficult extends Component {
    render() {
        return (
            <section className="difficult">
              <h2>What difficulties are you facing when studying TOEIC Online?</h2>
              <div className="difficult-ctn">
                <div className="difficult-ctn-ig">
                  <img src= {IMG.vande} alt='logo' srcSet />
                </div>
                <div className="difficult-ctn-text">
                  <i className="fas fa-ban"><p>Are you in a state of loss of English root?</p></i>
                  <i className="fas fa-ban"><p>Do you lack vocabulary for the new TOEIC test?</p></i>
                  <i className="fas fa-ban"><p>You do not have a specific exam orientation?</p></i>
                  <i className="fas fa-ban"><p>You do not know the new TOEIC test format?</p></i>
                  <i className="fas fa-ban"><p>You have difficulty in the process of starting to learn TOEIC?</p></i>
                </div>
              </div>
            </section>
        );
    }
}

export default Difficult;