export const productReducer = (state, action) => {
    switch (action.type) {
        case "GET":
            return { ...state, products: action.payload };
        case "ERROR":
            return {
                ...state,
                products: [],
                error: "Couldn't get the products"
            };
        case "SORT":
            return { ...state, sortBy: action.payload };
        case "INCLUDE_OUT_OF_STOCK":
            return { ...state, showInventoryAll: !state.showInventoryAll };
        case "FAST_DELIVERY":
            return {
                ...state,
                showFastDeliveryOnly: !state.showFastDeliveryOnly
            };
        case "SEARCH":
            return { ...state, search: action.payload };
        default:
            return state;
    }
};
