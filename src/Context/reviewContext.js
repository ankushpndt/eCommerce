import { createContext, useContext, useEffect, useReducer } from "react";
import { getReview } from "../utils/ApiCalls";
import { ReviewReducer } from "../Reducers/ReviewReducer";
import { useAuth } from "./authContext";

export const reviewContext = createContext();

export const ReviewProvider = ({ children }) => {
    const { userId } = useAuth();

    useEffect(() => {
        getReview(dispatch, userId);
    }, [dispatch]);
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
