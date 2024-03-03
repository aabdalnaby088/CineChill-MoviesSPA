import React from "react";
import Slider from "react-slick";

import SliderItem from "../SliderItem/SliderItem";



export default function SimpleSlider({ data }) {



    var settings = {
        infinite: true,
        speed: 300,
        slidesToShow: 4,
        slidesToScroll: 2,
        arrows: true,
        autoplay: true,
        autoplaySpeed: 2000,
        responsive: [
            {
                breakpoint: 1024, // Tablet breakpoint
                settings: {
                    arrows: false,
                    slidesToShow: 3,
                    slidesToScroll: 3,
                },
            },
            {
                breakpoint: 768, // Mobile breakpoint
                settings: {
                    arrows: false,
                    slidesToShow: 2,
                    slidesToScroll: 2,
                },
            },
        ],
    };

    return (
        <>
            <div className="container my-5">
                <Slider {...settings}>
                    {data.map((item, index) => (
                        <SliderItem key={index} media={item} />
                    ))}
                </Slider>
            </div>
        </>
    );
}
