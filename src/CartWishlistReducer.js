export const CartWishlistReducer = () => {
    const reducer = (state, action) => {
        const { itemsInCart, wishlist } = state;

        switch (action.type) {
            case "GET":
                return { ...state, itemsInCart: action.payload };
            case "GET_FROM_WISHLIST":
                return { ...state, wishlist: action.payload };
            case "ADD_ITEM":
                return { ...state, itemsInCart: addItem(state, action) };
            case "UPDATE_CART":
                return {
                    ...state,
                    itemsInCart: action.payload
                };

            case "ADD_WISHLIST_ITEM":
                return { ...state, wishlist: addItemToWishlist(state, action) };
            case "REMOVE_WISHLIST_ITEM":
                return {
                    ...state,
                    wishlist: action.payload
                };
            default:
                return state;
        }
    };
};
