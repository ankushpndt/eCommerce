import React from "react";
import { Carousel } from "../components/Carousel";
import cyberpunk from "../assets/cyber.jpg";
import gta from "../assets/gta.jpg";
import spiderman from "../assets/miles.jpg";
import "./LandingPage.css";
export const LandingPage = () => {
    return (
        <div className="landing__container">
            <Carousel />
            <div className="new__releases">
                <h3>New Releases</h3>
                <div className="new__releases__image">
                    <img className="landing__image" src={cyberpunk} alt="" />
                    <img className="landing__image" src={gta} alt="" />
                    <img className="landing__image" src={spiderman} alt="" />
                </div>
            </div>
        </div>
    );
};
