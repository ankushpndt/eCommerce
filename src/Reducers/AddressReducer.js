export const AddressReducer = (state, action) => {
    switch (action.type) {
        case "GET_ADDRESS":
            return { ...state, address: action.payload };
        case "ADD_ADDRESS":
            console.log(state, action.payload);
            return { ...state, address: action.payload };
        case "UPDATE_ADDRESS":
            return { ...state, address: action.payload };
        case "DELETE_ADDRESS":
            return { ...state, address: action.payload };
    }
};
