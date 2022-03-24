export const ReviewReducer = (state, { payload, type }) => {
    switch (type) {
        case "GET_REVIEW":
            return { ...state, review: payload };
        case "ADD_REVIEW":
            console.log(state);
            let newReview = state.review;
            newReview.push(payload);
            return { ...state, review: newReview };
        case "DELETE_REVIEW":
            console.log(state);
            let deletedReview = state.review;
            deletedReview = deletedReview.filter(
                (item) => item._id !== payload._id
            );

            return { ...state, Review: deletedReview };
        default:
            return state;
    }
};
