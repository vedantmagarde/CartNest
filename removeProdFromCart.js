import { getCartProductFromLS } from "./getCartProducts.js";
import { showToast } from "./showToast.js";
import { updateCartProductTotal } from "./updateCartProductTotal.js";
import { updateCartValue } from "./updateCartValue.js";

export const removeProdFromCart = (id) => {
    let cartProducts = getCartProductFromLS();
    cartProducts = cartProducts.filter((curProd) => curProd.id !== id);

    localStorage.setItem("cartProductLS", JSON.stringify(cartProducts));

    let removeDiv = document.getElementById(`card${id}`);
    if (removeDiv) {
        removeDiv.remove();

        showToast("delete", id);
    }

    updateCartProductTotal();

    updateCartValue(cartProducts);
};