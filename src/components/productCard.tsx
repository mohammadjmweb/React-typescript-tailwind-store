import React, { useEffect } from "react";
import { useCart } from "../CartContext";

interface Product{
    id:number;
    name:string;
    price:number;
    img:string;
}

interface ProductCardProps{
    product:Product
}

const ProductCard:React.FC<ProductCardProps>=({product})=>{
    const {cartItems,addToCart,removeFromCart}=useCart()
    const inCart=cartItems.some(item=>item.product.id===product.id)
    const handleButtonClick=()=>{
        if(inCart){
            removeFromCart(product.id)
        }else{
            addToCart(product)
        }
    }

    useEffect(()=>{
        localStorage.setItem('cartItems',JSON.stringify(cartItems))
    },[cartItems])
    return(
        <div className="border-2 border-blue-900 p-2 m-2 text-center rounded-xl flex flex-col h-full justify-between">
            <img src={product.img} alt={product.name} className="w-full mb-1" />
            <h2 className="my-1" >{product.name}</h2>
            <p className="my-1" >Price: ${product.price}</p>
            <button className={`text-white p-1 w-full rounded-xl cursor-pointer ${inCart ? 'bg-red-500' : 'bg-blue-500'}`} onClick={handleButtonClick}>{inCart ? 'Remove from Cart' : 'Add to Cart'}</button>
        </div>
    )
}

export default ProductCard