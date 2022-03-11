const addItem = (state, action) => {
    let newItemsInCart = [...state.itemsInCart];

    const productInCart = state.itemsInCart.some((product) => {
        product?._id === action.payload?._id;
    });

    if (productInCart) {
        newItemsInCart = newItemsInCart.map((product) => {
            if (product._id === action.payload._id) {
                //existing product
                let productWithIncreased = { ...product };

                productWithIncreased.quantity =
                    productWithIncreased.quantity + 1;

                return productWithIncreased;
            }

            return product; //new product
        });
        return newItemsInCart;
    } else {
        return [...action.payload];
    }
};

// const addItemToWishlist = (state, action) => {
//     return [...action.payload];
// };
export const CartWishlistReducer = (state, action) => {
    console.log(action.payload);
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
            // return { ...state, wishlist: addItemToWishlist(state, action) };
            return { ...state, wishlist: action.payload };
        case "REMOVE_WISHLIST_ITEM":
            return {
                ...state,
                wishlist: action.payload
            };
        default:
            return state;
    }
};
