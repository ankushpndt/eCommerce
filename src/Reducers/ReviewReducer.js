export const ReviewReducer = (state, { type, payload }) => {
    switch (type) {
        case "GET_REVIEW":
            return { ...state, review: payload };
        case "ADD_REVIEW":
            return { ...state, review: payload };
        case "DELETE_REVIEW":
            let deletedReview = state.review;
            deletedReview = deletedReview.filter(
                (item) => item._id !== payload._id
            );

            return { ...state, review: deletedReview };
        default:
            return state;
    }
};
