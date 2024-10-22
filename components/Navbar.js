import Image from "next/image";
import React, { useRef } from "react";
import Link from "next/link";
import NavLogo from "../public/assets/GameOn.png";
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
        <div className="flex flex-col md:flex-row sticky top-0 bg-white justify-between items-center py-2 shadow-lg">

            <div className="logo ml-36 flex items-center text-sm font-semibold space-x-10">
                <Link href={"/"}>
                    <Image src={NavLogo} width={200} height={40} alt="Logo" style={{ width: "80px", height: "80px" }} />
                </Link>
                <Link href={"/"}>
                    <h1 className="text-orange-600">ONLINE<br />SPORTS<br />ACADEMY</h1>
                </Link>
            </div>
            <div className="nav mr-36">
                <ul className="flex items-center justify-end md:space-x-10 font-bold md:font-normal text-sm md:text-lg text-black">
                    <li className="hover:text-pink-500">
                        <Link href={"/"}>
                            Home
                        </Link>
                    </li>
                    <li className="hover:text-pink-500">
                        <Link href={"/RegisterComplaint"}>
                            Register Sport
                        </Link>
                    </li>
                    <li className="hover:text-pink-500">
                        <Link href={"/press"}>
                            Tutorials
                        </Link>
                    </li>
                    <li className="hover:text-pink-500">
                        <Link href={"/HeatMap"}>
                            Heat Map
                        </Link>
                    </li>
                    <li className="hover:text-pink-500">
                        <Link href={"/about"}>
                            About Us
                        </Link>
                    </li>
                    <li className="hover:text-pink-500 hidden">
                        <Link href={""}>
                            <select id="sport" name="sport" value="" onChange="" className="border rounded-md px-3 py-2 w-full focus:outline-none focus:border-blue-500">
                                <option value="">Select a sport</option>
                                <option value="cricket">Cricket</option>
                                <option value="football">Football</option>
                                <option value="kabaddi">Kabaddi</option>
                                <option value="badminton">Badminton</option>
                            </select>
                        </Link>
                    </li>
                </ul>
            </div>
            {/* Dropdown Menu */}
            {/* {dropdown && (
                <div onMouseOver={() => { setDropdown(true) }} onMouseLeave={() => { setDropdown(false) }} className="absolute top-7 right-10 bg-white shadow-lg border rounded-md px-5 w-32 py-4 cursor-pointer">
                    <ul>
                        <li className="py-1 text-black hover:text-pink-700 text-sm font-bold">
                            <Link href="/myaccount">My Account</Link>
                        </li>
                        <li className="py-1 text-black hover:text-pink-700 text-sm font-bold" onClick={logout}>
                            Logout
                        </li>
                    </ul>
                </div>
            )} */}
        </div>


    );
};

export default Navbar;
