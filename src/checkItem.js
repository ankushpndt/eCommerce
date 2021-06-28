export const checkItem = (array, _id) => {
    return !!array.find((item) => item?.productId?._id === _id);
};
