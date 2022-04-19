import { CartWishlistReducer } from "./CartWishlistReducer";
//tests for cart and wishlist reducer
describe("cart and wishlist testing", () => {
    it("should add item in cart", () => {
        const initialState = {
            itemsInCart: [{}]
        };
        const action = {
            type: "ADD_ITEM",
            payload: [
                {
                    _id: "608c457a5b54f72e84a93405"
                }
            ]
        };
        const finalState = {
            itemsInCart: [
                {
                    _id: "608c457a5b54f72e84a93405"
                }
            ]
        };
        const reducedState = CartWishlistReducer(initialState, action);

        expect(reducedState).toEqual(finalState);
    });
    it("should delete item from cart", () => {
        const initialState = {
            itemsInCart: [
                {
                    productId: {
                        _id: "608c457a5b54f72e84a93405"
                    }
                }
            ]
        };
        const action = {
            type: "UPDATE_CART",
            payload: []
        };
        const finalState = { itemsInCart: [] };
        const reducedState = CartWishlistReducer(initialState, action);

        expect(reducedState).toEqual(finalState);
    });
    it("should update quantity of item in the cart", () => {
        const initialState = {
            itemsInCart: [
                {
                    productId: {
                        _id: "608c457a5b54f72e84a93405"
                    },
                    quantity: 1
                }
            ]
        };
        const action = {
            type: "UPDATE_CART",
            payload: [
                {
                    productId: {
                        _id: "608c457a5b54f72e84a93405"
                    },
                    quantity: 2
                }
            ]
        };
        const finalState = {
            itemsInCart: [
                {
                    productId: {
                        _id: "608c457a5b54f72e84a93405"
                    },
                    quantity: 2
                }
            ]
        };
        const reducedState = CartWishlistReducer(initialState, action);

        expect(reducedState).toEqual(finalState);
    });
    it("should add item in wishlist", () => {
        const initialState = {};
        const action = {
            type: "ADD_WISHLIST_ITEM",
            payload: {
                _id: "608c457a5b54f72e84a93405"
            }
        };
        const finalState = {
            wishlist: {
                _id: "608c457a5b54f72e84a93405"
            }
        };
        const reducedState = CartWishlistReducer(initialState, action);

        expect(reducedState).toEqual(finalState);
    });
    it("should delete item from wishlist", () => {
        const initialState = {
            wishlist: {
                _id: "608c457a5b54f72e84a93405"
            }
        };
        const action = {
            type: "REMOVE_WISHLIST_ITEM",
            payload: []
        };
        const finalState = { wishlist: [] };
        const reducedState = CartWishlistReducer(initialState, action);
        expect(reducedState).toEqual(finalState);
    });
});
