import { atom, useAtom } from "jotai"

const cartAtom = atom({})
const countAtom = atom(0)

const authAtom = atom(false)

export function useAuth() {
    const [auth, setAuth] = useAtom(authAtom)

    return {
        isLoggedIn: () => auth,
        login: () => setAuth(true),
        logout: () => setAuth(false)
    }
}

export function useCart() {
    const [cart, setCart] = useAtom(cartAtom)
    const [count, setCount] = useAtom(countAtom)

    return {
        getCount: (item) => {
            if (!item) return count;
            return cart[item.id] ? cart[item.id].count : 0;
        },

        getItems: () => Object.values(cart),
        addItem: (item) => {
            console.log("addItem: ", item)
            const cnt = cart[item.id] ? cart[item.id].count : 0;
            setCount(count + 1)
            setCart({...cart, [item.id]: {...item, count: cnt + 1}})
        },
        deleteItem: (item) => {
            const cnt = cart[item.id] ? cart[item.id].count : 0;
            if (cnt != 0) setCount(count - 1)
            if (cnt != 0) setCart({...cart, [item.id]: {...item, count: cnt - 1}})
        },

        clearCart: () => {
            setCart({})
            setCount(0)
        }
    }
}
