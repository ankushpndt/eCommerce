export const checkItem = (array, _id) => {
    console.log(!!array?.find((item) => item?.productId?._id === _id));
    return !!array?.find((item) => item?.productId?._id === _id);
};
