import './App.css'
import './index.css'
import React from 'react'
import { BrowserRouter as Router,Route,Routes } from 'react-router-dom'
import { CartProvider } from './CartContext'
import Navbar from './components/Navbar'
import ProductCard from './components/productCard'
import Cart from './components/Cart'

const products=[
  {
      id:1,
      name:"Xiaomi POCO X6 5G",
      price: 399.99,
      img: "https://ph-test-11.slatic.net/p/2df7fe5fd4a82ab88e44737394b6ac8a.png"
  },
  {
      id:2,
      name:"Xiaomi 13T PRO 5G",
      price: 439.99,
      img:"https://thesouqexpress.com/wp-content/uploads/2023/10/1_1-100-2.jpg"
  },
  {
      id:3,
      name:"Xiaomi Redmi K70 ULTRA",
      price: 359.99,
      img:"https://th.bing.com/th/id/OIP.r596ek8BXECl8z2RgeFIvAHaHa?rs=1&pid=ImgDetMain.jpg"
  },
  {
      id:4,
      name:"Xiaomi Redmi NOTE 13",
      price: 299.99,
      img:"https://media-cdn.bnn.in.th/363003/Xiaomi--Redmi-Note-13-Arctic-White-5G---1-square_medium.jpg"
  }
]
const App: React.FC=()=>{
  return (
      <CartProvider>
        <Router>
          <Navbar/>
          <Routes>
            <Route path='/' element={
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2 m-4'>
                  {products.map(product=>(
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
            } />
            <Route path='/cart' element={<Cart/>}/>
          </Routes>
        </Router>
      </CartProvider>
  )
}

export default App
