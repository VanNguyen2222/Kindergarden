import React from 'react';
import './TeacherCard.scss'
function TeacherCard({name, photoURL}) {
    return (
        <div className='wrap-teacher'>
            <div className='teacher-img' >
                <img className='img' src={photoURL} alt={name} />
                <div className='socials'>
                    <ul>
                        <li>
                            <a
                                className='item-link'
                                href='https://www.facebook.com/vitt.boil/'
                                target='_blank'
                                rel='noopener noreferrer'
                            >
                                <i className="item-icon fab fa-facebook"></i>
                            </a>
                        </li>
                        <li>
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
            <div className='teacher-info'>
                <h3 className=''>
                    {name}
                </h3>
            </div>
        </div>
    );
}

export default TeacherCard;