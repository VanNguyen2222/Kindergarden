import React from 'react';
import IMG from '../../constants/ImgUrl';
import './Footer.scss'
function Footer(props) {
    return (
        <div className='footer'>
            <div className='grid wide'>
                <div className='row'>
                    <div className='col c-12 m-6 l-6'>
                        <div className='footer-caption'>
                            <img src={IMG.LOGO} alt="logo" />
                            <p className='content'>
                            KINDERGARTEN was founded by the desire to create an active and immersed English environment for young people in a short time. Simple and effective teaching method, we understand well what you should do at each stage from beginner to advanced.
                            </p>
                            <ul className='list-info'>
                                <li className='item'>
                                    <a
                                        className='item-link'
                                        href='https://www.facebook.com/English-ABC-Kindergarten-107234845309736'
                                        target='_blank'
                                        rel='noopener noreferrer'
                                    >
                                        <i className="item-icon fab fa-facebook"></i>
                                    </a>
                                </li>
                                <li className='item'>
                                    <a
                                        className='item-link'
                                        href='https://www.instagram.com/daylavit/   '
                                        target='_blank'
                                        rel='noopener noreferrer'
                                    >
                                        <i className="item-icon fab fa-instagram"></i>
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className='col c-12 m-6 l-3'>
                        <div className='footer-caption'>
                            <h4 className='btn-font'>Quick Links</h4>
                            <ul className=''>
                                <li>
                                    Couses
                                </li>
                                <li>
                                    About
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className='col c-12 m-6 l-3'>
                    <div className='footer-caption'>
                            <h4 className='btn-font'>Quick Links</h4>
                            <ul className=''>
                                <li>
                                    Couses
                                </li>
                                <li>
                                    About
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Footer;