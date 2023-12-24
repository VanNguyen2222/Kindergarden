import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick-theme.css';
import 'slick-carousel/slick/slick.css';
import './SlideReponsive.scss';

function SampleNextArrow(props) {
    const { className, style, onClick } = props;
    return (
        <div
            className={className}
            style={{ ...style, display: "block" }}
            onClick={onClick}
        />
    );
}

function SamplePrevArrow(props) {
    const { className, style, onClick } = props;
    return (
        <div
            className={className}
            style={{ ...style, display: "block" }}
            onClick={onClick}
        />
    );
}

function SlideReponsive({ children, number }) {
    const settings = {
        arrows: true,
        dots: true,
        infinite: true,
        slidesToShow: number>=3?3:2, //number of item
        slidesToScroll: 1,
        initialSlide: 0,
        autoplay: true,
        pauseOnHover: true,
        speed: 500,
        autoplaySpeed: 5000,
        cssEase: "linear",
        nextArrow: <SampleNextArrow />,
        prevArrow: <SamplePrevArrow />,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: number>=2?2:1,
                    slidesToScroll: 1
                }
            },
            {
                breakpoint: 800,
                settings: {
                    slidesToShow: number>=2?2:1,
                    slidesToScroll: 1,
                    arrows: false
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: number>=2?2:1,
                    slidesToScroll: 1,
                    arrows: false
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    arrows: false
                }
            }
        ]
    }
    return (
        <Slider {...settings}>
            {children.map((item,index) => (
                <div key={index}>
                    {item}
                </div>
            ))}
        </Slider>
    );
}

export default SlideReponsive;