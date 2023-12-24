import React from 'react';
import './HeaderInfo.scss'

function HeaderInfo(props) {
    return (
        <div className='header-info'>
            <div className='grid wide'>
                <div className='wrap'>
                    <ul className='list-info'>
                        <li className='item'>
                            <i className="item-icon fas fa-map-marker-alt"></i>
                            234 NGUYEN VAN LINH, DA NANG
                        </li>
                        <li className='item'>
                            <i className="item-icon fas fa-phone-alt"></i>
                            0966295224
                        </li>
                    </ul>
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
        </div>
    );
}

export default HeaderInfo;