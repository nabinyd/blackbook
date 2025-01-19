"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Routes } from "@/config/Routes";
import { AppDispatch, RootState } from "@/lib/store";
import Image from "next/image";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { handleLogout } from "@/lib/features/auth.slice";

const links = [
    { href: "/project", label: "Project" },
    { href: "/final-year-project", label: "FinalyearProject" },
    { href: "/about", label: "About" },
    { href: "/contact", label: "Contact" },
];

export default function Navbar() {
    const dispatch = useDispatch<AppDispatch>();
    const { isAuthenticated } = useSelector((state: RootState) => state.auth);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    const handleLogoutAction = async () => {
        try {
            dispatch(handleLogout());
            // dispatch(logout());
        } catch (error) {
            console.error("Failed to logout:", error);
        }
    };

    return (
        <nav className="bg-gray-800 text-white flex justify-between items-center px-6 py-4">
            {/* Logo */}
            <div className="flex justify-between items-center w-full">
                <Link href={Routes.HOME}>
                    <Image src="/logo/svgexport-62.svg" alt="logo" width={100} height={50} />
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
                {isAuthenticated ? (
                    <div className="flex items-center space-x-4">
                        <Link href={Routes.DASHBOARD}>
                            <Button>Dashboard</Button>
                        </Link>


                        <Button onClick={handleLogoutAction}>Log out</Button>
                    </div>

                ) : (
                    <div className="flex items-center space-x-4">
                        <Link href={Routes.LOGIN}>
                            <Button>Log in</Button>
                        </Link>
                        <Link href={Routes.SIGNUP}>
                            <Button>Sign up</Button>
                        </Link>
                    </div>
                )}
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
                        {isAuthenticated ? (
                            <div>
                                <Link href={Routes.DASHBOARD}>
                                    <Button className="bg-blue-800 hover:bg-blue-600 w-full">Dashboard</Button>
                                </Link>
                                <Link href={Routes.LOGOUT}>
                                    <Button className="bg-red-800 hover:bg-red-600 w-full">Log out</Button>
                                </Link>
                            </div>
                        ) : (
                            <div>
                                <Link href={Routes.LOGIN}>
                                    <Button className="bg-blue-800 hover:bg-blue-600 w-full">Log in</Button>
                                </Link>
                                <Link href={Routes.SIGNUP}>
                                    <Button className="bg-green-800 hover:bg-green-600 w-full">Sign up</Button>
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </nav>
    );
}
