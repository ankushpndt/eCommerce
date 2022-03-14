export const AddressReducer = (state, { type, payload }) => {
    switch (type) {
        case "GET_ADDRESS":
            return { ...state, address: payload };
        case "ADD_ADDRESS":
            let newAddress = state.address;
            newAddress.push(payload);
            return { ...state, address: newAddress };

        case "UPDATE_ADDRESS":
            let updatedAddress = state.address;
            updatedAddress = updatedAddress.filter(
                (item) => item._id !== payload._id
            );
            updatedAddress.push(payload);
            return { ...state, address: updatedAddress };
        case "DELETE_ADDRESS":
            let deletedAddress = state.address;
            deletedAddress = deletedAddress.filter(
                (item) => item._id !== payload._id
            );

            return { ...state, address: deletedAddress };
    }
};
