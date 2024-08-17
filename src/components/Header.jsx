import Image from "next/image";
import React from "react";
import logo from "/public/logo.png";
import { MenuItem } from "./MenuItem";
import Link from "next/link";
// Image

export default function Header() {
  return (
    <div className="bg-blue-600 flex justify-around items-center px-8 py-4">
      {/* Logo */}
      <Link href="/">
        <Image src={logo} alt="Astral Paints logo" width={120} height={40} />
      </Link>

      {/* Menu Items */}
      <div className="flex space-x-8 text-white font-medium">
        <MenuItem title="About" address="/" />
        <MenuItem title="Category" address="/" />
        <MenuItem title="Services" address="/" />
        <MenuItem title="Colours" address="/" />
        <MenuItem title="Downloads" address="/" />
        <MenuItem title="Become a Dealer" address="/" />
        <MenuItem title="Blogs" address="/" />
        <MenuItem title="Contacts" address="/" />
      </div>

      {/* Button */}
      <button className="px-6 py-2 bg-white text-blue-600 font-medium rounded-full shadow-md hover:bg-blue-700 hover:text-white transition-all duration-300 ease-in-out transform hover:scale-105">
        Enquire Now
      </button>
    </div>
  );
}
