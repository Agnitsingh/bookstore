import { useCart } from "../store/cart"
import { memo, useEffect } from "react";

function Confirm() {

    const { clearCart } = useCart()

    useEffect(() => clearCart(), [])

    return <div className="confirm">
        <img src="https://c.tenor.com/BSY1qTH8g-oAAAAC/tenor.gif" alt="Payment Confirmed" />
        <h2>Order Placed Successfully!!!</h2>
    </div >
}

export default memo(Confirm);