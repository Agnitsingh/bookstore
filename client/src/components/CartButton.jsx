import { ShoppingCart } from "lucide-react";
import { useCart } from "../store/cart";

export default function CartButton() {
    const { getCount } = useCart()

    const count = getCount()
    return (
        <div className="cart-btn">
            <span>{count}</span>
            <ShoppingCart />
        </div>
    )
}