import React, { useState } from "react";
import StarIcon from "@mui/icons-material/Star";
import "./Rating.css";
import { v4 } from "uuid";
export const Rating = ({ rating, setRating }) => {
    const [hover, setHover] = useState(0);

    return (
        <div
            className="rating__container"
            style={{ justifyContent: "flex-start", marginTop: "0" }}
        >
            {[...Array(5)].map((item, i) => {
                const ratingValue = i + 1;

                let color =
                    ratingValue <= (hover || rating) ? "#ffc107" : "#e4e5e9";
                return (
                    <div className="rating" key={v4()}>
                        <label>
                            <input
                                type="radio"
                                name="rating"
                                // value={ratingValue}
                                className="rating__btn"
                            />
                            <StarIcon
                                className="star"
                                sx={{
                                    fontSize: "1.8rem",
                                    cursor: "pointer",
                                    color: { color }
                                }}
                                onClick={() => setRating(ratingValue)}
                                onMouseEnter={() => setHover(ratingValue)}
                                onMouseLeave={() => setHover(rating)}
                            />
                        </label>
                    </div>
                );
            })}
        </div>
    );
};
