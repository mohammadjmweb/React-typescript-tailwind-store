import React,{createContext,useContext,useState,useEffect} from "react";

interface Product{
    id:number;
    name:string;
    price:number;
    img:string   
}

interface CartItem{
    product: Product
    quantity:number
}

interface CartContextType{
    cartItems:CartItem[]
    addToCart:(product:Product)=>void
    removeFromCart:(id:number)=>void
    increaseQuantity:(id:number)=>void
    decreaseQuantity:(id:number)=>void
    clearCart:()=>void
    totalPrice:()=>number
}

const CartContext=createContext<CartContextType | undefined>(undefined)

export const useCart=()=>{
    const context=useContext(CartContext)
    if(!context){
        throw new Error('useCart must be used within a CartProvider')
    }
    return context
}

export const CartProvider:React.FC<{children:React.ReactNode}>=({children})=>{
    const [cartItems,setCartItems]=useState<CartItem[]>(()=>{
        const savedCart=localStorage.getItem('cartItems')
        return savedCart ? JSON.parse(savedCart) : []
    })

    const addToCart = (product:Product)=>{
        setCartItems(prevItems=>{
            const existingItem=prevItems.find(item => item.product.id === product.id)
            if(existingItem){
                return prevItems.map(item => item.product.id === product.id ? {...item,quantity:item.quantity + 1 } : item)
            }
            return [...prevItems,{product,quantity:1}]
        })
    }

    const removeFromCart=(id:number)=>{
        setCartItems(prevItems=>prevItems.filter(item=>item.product.id !== id))
    }

    const decreaseQuantity=(id:number)=>{
        setCartItems(prevItems=>prevItems.map(item=>item.product.id === id && item.quantity > 1 ? {...item,quantity:item.quantity - 1} : item))
    }

    const increaseQuantity = (id:number )=>{
        setCartItems(prevItems=>prevItems.map(item=>item.product.id === id ? {...item,quantity: item.quantity + 1} : item))
    }

    const clearCart = () =>{
        setCartItems([])
    }

    const totalPrice = () =>{
        return cartItems.reduce((total,item)=>total + item.product.price * item.quantity,0)
    }

    useEffect(()=>{
        localStorage.setItem('cartItems',JSON.stringify(cartItems))
    },[cartItems])


    return(
        <CartContext.Provider value={{cartItems,addToCart,removeFromCart,increaseQuantity,decreaseQuantity,clearCart,totalPrice}} >
            {children}
        </CartContext.Provider>
    )
}

