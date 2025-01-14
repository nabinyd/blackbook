"use client";

import { Button } from "@/components/ui/button";
import { Routes } from "@/config/Routes";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const links = [
    { href: "/project", label: "Project" },
    { href: "/final-year-project", label: "FinalyearProject" },
    { href: "/about", label: "About" },
    { href: "/contact", label: "Contact" },
];

export default function Navbar() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    return (
        <nav className="bg-gray-800 text-white flex justify-between items-center px-6 py-4">
            {/* Logo */}
            <div className="flex justify-between items-center w-full">
                <Link href={Routes.HOME}>
                    <Image src="/logo/svgexport-62.svg" alt="logo" width={100} height={50}/>
                </Link>
            </div>

            {/* Desktop Links */}
            <div className="hidden md:flex justify-between items-center w-full space-x-6">
                <ul className="flex space-x-6">
                    {links.map(({ href, label }) => (
                        <li key={`${href}${label}`}>
                            <Link href={href} className="hover:text-yellow-400 transition-all">
                                {label}
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>

            {/* Mobile Hamburger Icon */}
            <div className="md:hidden flex items-center">
                <button
                    onClick={toggleMobileMenu}
                    className="text-white focus:outline-none z-50"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        className="w-8 h-8"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M4 6h16M4 12h16M4 18h16"
                        />
                    </svg>
                </button>
            </div>

            {/* Desktop Buttons */}
            <div className="hidden md:flex items-center space-x-4">
                <Link href={Routes.LOGIN}>
                    <Button className="bg-blue-800 hover:bg-blue-600">Log in</Button>
                </Link>
                <Link href={Routes.SIGNUP}>
                    <Button className="bg-yellow-500 hover:bg-yellow-400">Sign Up</Button>
                </Link>
            </div>

            {/* Mobile Menu */}
            {isMobileMenuOpen && (
                <div className="md:hidden absolute top-0 left-0 w-full bg-gray-800 text-white p-6">
                    <ul className="space-y-6">
                        {links.map(({ href, label }) => (
                            <li key={`${href}${label}`}>
                                <Link
                                    href={href}
                                    className="block text-lg py-2 px-4 hover:text-yellow-400"
                                    onClick={toggleMobileMenu} // Close menu on click
                                >
                                    {label}
                                </Link>
                            </li>
                        ))}
                    </ul>
                    <div className="mt-6">
                        <Link href={Routes.LOGIN}>
                            <Button className="bg-blue-800 w-full py-3">Log in</Button>
                        </Link>
                        <Link href={Routes.SIGNUP}>
                            <Button className="bg-yellow-500 w-full py-3">Sign Up</Button>
                        </Link>
                    </div>
                </div>
            )}
        </nav>
    );
}
