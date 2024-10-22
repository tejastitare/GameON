import Image from "next/image";
import React, { useRef } from "react";
import Link from "next/link";
import NavLogo from "../public/assets/nav.png";
import { AiOutlineShoppingCart, AiFillMinusCircle, AiFillPlusCircle, AiFillShopping } from "react-icons/ai";
import { MdAccountCircle } from "react-icons/md";
import { useState } from "react";

import { IoIosCloseCircle } from "react-icons/io";


const Navbar = ({ logout, user, cart, addToCart, removeFromCart, clearCart, subTotal }) => {
    const [dropdown, setDropdown] = useState(false)

    // console.log(cart, addToCart, removeFromCart, clearCart, subTotal)

    const ref = useRef();
    const togglesideCart = () => {
        if (ref.current.classList.contains("translate-x-full")) {
            ref.current.classList.remove("translate-x-full");
            ref.current.classList.add("translate-x-0");
        } else {
            ref.current.classList.remove("translate-x-0");
            ref.current.classList.add("translate-x-full");
        }
    };

    return (
        <div style={{ backgroundColor: '#30424c' }} className="flex flex-col md:flex-row sticky justify-center md:justify-start items-center lg:py-6 shadow-lg sticky z-10 sm:p-5">
            <div className="h-full flex cart  items-center absolute right-0 text-3xl md:text-3xl text-pink-500 hover:text-pink-600 cursor-pointer lg:mb-2 md:mb-0 md:mr-2">
                <div className="icon">
                    {user.value && <MdAccountCircle onMouseEnter={() => { setDropdown(true) }} onMouseLeave={() => { setDropdown(false) }} />}
                </div>
                {!user.value && <Link href={"/login"}>
                    <button style={{ backgroundColor: '#eb8c55' }} className=" px-2 py-1 rounded-md text-sm text-white font-bold">Login</button>
                </Link>}
                {!user.value && <Link href={"/login"}>
                    <button className="px-2 rounded-md text-3xl font-semibold text-white ">/</button>
                </Link>}
                {!user.value && <Link href={"/signup"}>
                    <button style={{ backgroundColor: '#eb8c55' }} className=" px-2 py-1 rounded-md text-sm text-white font-bold ">Register</button>
                </Link>}
            </div>
            {dropdown && <div onMouseEnter={() => { setDropdown(true) }} onMouseLeave={() => { setDropdown(false) }} className="absolute top-8 right-4 bg-gray-50 shadow-lg border rounded-md px-5 w-28 py-4 cursor-pointer">
                <ul>
                    <li className="py-1 text-black hover:text-pink-700 text-sm font-bold"><Link href="/myaccount">My Account</Link></li>
                    <li className="py-1 text-black hover:text-pink-700 text-sm font-bold" onClick={logout}>Logout</li>
                </ul>
            </div>}
        </div>
    );
};

export default Navbar;
