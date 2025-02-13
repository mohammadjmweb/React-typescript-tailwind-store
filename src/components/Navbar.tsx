import React from "react";
import {Link} from 'react-router-dom'

const Navbar:React.FC=()=>{
    return(
        <nav className="w-full bg-black text-white h-16 flex items-center justify-between px-4 text-4xl" >
            <Link to='/'>Home</Link>
            <Link to='/cart'>Cart</Link>
        </nav>
    )
}

export default Navbar