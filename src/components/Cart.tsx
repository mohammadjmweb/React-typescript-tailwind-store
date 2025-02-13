import React from "react";
import { useCart } from "../CartContext";

const Cart:React.FC=()=>{
    const {cartItems,increaseQuantity,decreaseQuantity,removeFromCart,clearCart}=useCart()
    const totalPrice=cartItems.reduce((total,item)=>total + item.product.price * item.quantity,0)


    return(
        <div className="mt-2 mb-12" >
            <h2 className="text-4xl text-center my-2" >Shopping Cart</h2>
            {cartItems.length === 0 ? (
                <p className="text-3xl text-center my-12" >Your cart is empty.</p>
            ) : (
                cartItems.map(item=>{
                    const itemTotalPrice=item.product.price * item.quantity
                
                    return(
                        <React.Fragment>
                            <div className="flex items-center justify-between px-4 text-lg" key={item.product.id}>
                                <h3>{item.product.name}</h3>
                                <img className="w-[30%] hidden md:block" src={item.product.img} alt={item.product.name} />
                                <p>Price: ${item.product.price}</p>
                                <div className="flex items-center justify-between w-[10%] border-2 border-blue-900 px-2 py-1 rounded-xl mx-2">
                                    <button className="font-bold text-2xl " onClick={()=>decreaseQuantity(item.product.id)}>-</button>
                                    <p>{item.quantity}</p>
                                    <button className="font-bold text-2xl " onClick={()=>increaseQuantity(item.product.id)}>+</button>
                                </div>
                                <p className="mr-2" >Total: ${itemTotalPrice}</p>
                                <button className="text-red-500 font-bold " onClick={()=>removeFromCart(item.product.id)}>Remove</button>
                            </div>
                            <hr className="border-2 border-blue-900 my-2" />
                        </React.Fragment>
                    )
                })
            )}

            {cartItems.length > 0 && (
                <div className="flex justify-between p-4 text-2xl">
                    <h3 className="  " >Total Price:${totalPrice}</h3>
                    <button className="bg-red-500 text-white p-2 rounded-xl cursor-pointer " onClick={clearCart}>Clear Carts</button>
                </div>
            )}
            
        </div>
    )
}
export default Cart