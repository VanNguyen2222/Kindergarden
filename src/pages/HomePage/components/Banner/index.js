import React from 'react';
import './Banner.scss'
import IMG from './../../../../constants/ImgUrl'
function Banner(props) {
    return (
        <div className='banner' style={{ backgroundImage: `url(${IMG.BANNER})` }}>
                <div className='hero-caption'>
                    <h1 className='title btn-font'>
                        Quality
                        <br />
                        Learning
                        <span className='title--yellow btn-font'>
                            For everyone
                        </span>
                    </h1>
                </div>
        </div>
    );
}

export default Banner;