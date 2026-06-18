import { updateCartValue } from "./updateCartValue.js";

export const getCartProductFromLS = () => {
    let cartProducts = localStorage.getItem("cartProductLS");
    if (!cartProducts) {
        return [];
    }
    try {
        cartProducts = JSON.parse(cartProducts);
    } catch (error) {
        cartProducts = [];
    }

    updateCartValue(cartProducts);

    return cartProducts;
};