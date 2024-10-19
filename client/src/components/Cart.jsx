import { Link } from "react-router-dom"
import { useCart } from "../store/cart"
import BookCard from "./BookCard"

export default function Cart({ role }) {
    const { getItems, getCount } = useCart()

    const items = getItems()
    const count = getCount()
    console.log(items)
    return <>
        <div className='cart'>
            <div className="cart-list">
                {
                    count > 0
                        ? items.map(book => {
                            return <BookCard inCart={true} key={book.id} book={book} role={role} />
                        })
                        : <span className="empty">No Items</span>
                }
            </div>


        </div>
        {count > 0 && <div className="checkout">
            <div className="sss">
                <div className="ssss">
                    <h3>Total Items</h3>
                    <p>{`${getCount()}`}</p>
                </div>
                <div className="ssss">
                    <h3>Total Amount</h3>
                    <p>{`${200 * count}`}</p>
                </div>
            </div>
            <div>
                <Link to="/confirm">Checkout</Link>
            </div>
        </div>}
    </>
}