import { Plus, Minus } from "lucide-react"
import { useCart } from "../store/cart"
import { memo } from "react"

const AddToCardButton = memo(({ item }) => {

    const { addItem } = useCart()

    return <>
    <div className="add-to-cart2">
        <button onClick={() => addItem(item)}>Add to Cart</button>
    </div>
    </>
})

export default AddToCardButton;