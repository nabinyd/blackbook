import { Routes } from "@/config/Routes";
import Link from "next/link";

export default function Footer() {
    return (
        <div className="bg-gray-800 text-white py-16">
            <div className="max-w-7xl mx-auto px-6">
                {/* Footer Content */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-20">
                    {/* Company Information */}
                    <div>
                        <h3 className="text-2xl font-bold mb-4">About Blackbook</h3>
                        <p className="text-lg text-justify">
                            Blackbook is a platform for students, innovators, and creators to
                            showcase their projects and ideas to the world. Share, learn, and
                            collaborate with experts to take your innovation further.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="text-2xl font-bold mb-4">Quick Links</h3>
                        <ul>
                            <li>
                                <Link href={Routes.HOME} className="text-lg hover:text-yellow-400">
                                    Home
                                </Link>
                            </li>
                            <li>
                                <Link href={Routes.PROJECT} className="text-lg hover:text-yellow-400">
                                    Project
                                </Link>
                            </li>
                            <li>
                                <Link href={Routes.ABOUT} className="text-lg hover:text-yellow-400">
                                    About
                                </Link>
                            </li>
                            <li>
                                <Link href={Routes.CONTACT} className="text-lg hover:text-yellow-400">
                                    Contact
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Social Media Links */}
                    <div className="space-y-4 ">
                        <h3 className="text-2xl font-bold mb-4">Follow Us</h3>
                        <div className="flex flex-col">
                            <Link href="https://www.facebook.com">
                                <p className="text-lg hover:text-yellow-400 cursor-pointer">
                                    Facebook
                                </p>
                            </Link>
                            <Link href="https://www.twitter.com">
                                <p className="text-lg hover:text-yellow-400 cursor-pointer">
                                    Twitter
                                </p>
                            </Link>
                            <Link href="https://www.instagram.com">
                                <p className="text-lg hover:text-yellow-400 cursor-pointer">
                                    Instagram
                                </p>
                            </Link>
                            <Link href="https://www.linkedin.com">
                                <p className="text-lg hover:text-yellow-400 cursor-pointer">
                                    LinkedIn
                                </p>
                            </Link>
                        </div>
                    </div>

                    {/* Newsletter Subscription */}
                    <div>
                        <h3 className="text-2xl font-bold mb-4">Subscribe to Our Newsletter</h3>
                        <p className="text-lg mb-4">
                            Stay updated with the latest news, updates, and project showcases.
                            Subscribe to our newsletter today!
                        </p>
                        <div className="flex">
                            <input
                                type="email"
                                placeholder="Enter your email"
                                className="px-4 py-2 w-full rounded-l-lg focus:outline-none"
                            />
                            <button className="bg-yellow-500 text-white px-6 py-2 rounded-r-lg hover:bg-yellow-600 transition-all duration-300">
                                Subscribe
                            </button>
                        </div>
                    </div>
                </div>

                {/* Footer Bottom Section */}
                <div className="mt-12 text-center text-lg text-gray-400">
                    <p>© 2025 Blackbook. All Rights Reserved.</p>
                    {/* <p>Terms of Service | Privacy Policy</p>
                    <p>
                        Designed by{" "}
                        <Link
                            href="https://www.nabinyadav1.com.np"
                            target="_blank"
                            className="text-yellow-400 hover:text-yellow-300"
                        >
                            Nabin Yadav
                        </Link>
                    </p> */}
                </div>
            </div>
        </div>
    );
}
