import React from "react";
import { Carousel } from "../components/Carousel";
import cyberpunk from "../assets/cyber.jpg";
import gta from "../assets/gta.jpg";
import spiderman from "../assets/miles.jpg";
import "./LandingPage.css";
import { Link } from "react-router-dom";
export const LandingPage = () => {
    return (
        <div className="landing__container">
            <Carousel />
            <div className="new__releases">
                <h3>New Releases</h3>
                <div className="new__releases__image">
                    <Link to="/product/608c457a5b54f72e84a93407">
                        <img
                            className="landing__image"
                            src={cyberpunk}
                            alt="cyberpunk"
                        />
                    </Link>
                    <Link to="/product/608c457a5b54f72e84a93405">
                        <img className="landing__image" src={gta} alt="gta" />
                    </Link>
                    <Link to="/product/608c457a5b54f72e84a93406">
                        <img
                            className="landing__image"
                            src={spiderman}
                            alt="spiderman"
                        />
                    </Link>
                </div>
            </div>
        </div>
    );
};
