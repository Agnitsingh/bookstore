import { Plus, Minus } from "lucide-react"
import { useCart } from "../store/cart"
import { memo } from "react"

const AddToCardButton = memo(({ item }) => {

    const { addItem, getCount, deleteItem } = useCart()
    const count = getCount(item)

    return <>
    <div className="add-to-cart">
        <button onClick={() => addItem(item)}><Plus /></button>
        <span>{count}</span>
        <button onClick={() => deleteItem(item)}><Minus /></button>
    </div>
    </>
})

export default AddToCardButton;