import { createContext, useContext, useEffect, useReducer } from "react";
import { getReview } from "../utils/ApiCalls";
import { ReviewReducer } from "../Reducers/ReviewReducer";
import { useAuth } from "./authContext";

export const reviewContext = createContext();

export const ReviewProvider = ({ children }) => {
    const { userId, token } = useAuth();

    useEffect(() => {
        token && getReview(dispatch, userId);
    }, [dispatch, token]);
    const [state, dispatch] = useReducer(ReviewReducer, { review: [] });
    return (
        <reviewContext.Provider
            value={{ review: state.review, reviewDispatch: dispatch }}
        >
            {children}
        </reviewContext.Provider>
    );
};

export const useReview = () => useContext(reviewContext);
