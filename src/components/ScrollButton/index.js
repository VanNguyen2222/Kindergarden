import React, { useEffect, useState } from 'react';

import './ScrollButton.scss'
function ScrollButton() {
    const [visible, setVisible] = useState(false)
    useEffect(() => {
        const toggleVisible = () => {
            if (window.pageYOffset >= 400)
                setVisible(true)
            else setVisible(false)
        }
        window.addEventListener('scroll', toggleVisible)
    }, [])
    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        })
    }
    return (
        <div 
            className={`btn-top ${visible?'active':''}`}
            onClick={scrollToTop}
        >
            <i className="fas fa-arrow-up icon"></i>
        </div>
    );
}

export default ScrollButton;