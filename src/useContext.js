import {useContext} from "react";
import CartContext from "./Components/cart/CartContext";

 export function useCart() {
    return useContext(CartContext);
}

