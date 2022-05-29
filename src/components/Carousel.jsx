import React, { useState } from "react";
import { carouselData } from "../utils/CarouselData";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import "./Carousel.css";
import { useNavigate } from "react-router-dom";
export const Carousel = () => {
    const [current, setCurrent] = useState(0);
    const carouselLength = carouselData.length;
    if (!Array.isArray(carouselData) || carouselData.length < 0) return null;
    const nextSlide = () => {
        setCurrent(current === carouselLength - 1 ? 0 : current + 1);
    };
    const prevSlide = () => {
        setCurrent(current === 0 ? carouselLength - 1 : current - 1);
    };

    const navigate = useNavigate();
    return (
        <div className="slider">
            <ArrowBackIosIcon className="left__arrow" onClick={prevSlide} />
            {carouselData.map((imageItem, index) => (
                <div
                    className={index === current ? "slide active" : "slide"}
                    key={index}
                    onClick={() => navigate(`/product/${imageItem?.productId}`)}
                >
                    {index === current && (
                        <img src={imageItem.image} className="image" />
                    )}
                </div>
            ))}
            <ArrowForwardIosIcon className="right__arrow" onClick={nextSlide} />
        </div>
    );
};
