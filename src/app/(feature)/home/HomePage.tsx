import { Routes } from "@/config/Routes";
import Link from "next/link";

export default function HomePage() {
    return (
        <div className="h-screen flex flex-col items-center justify-center bg-gradient-to-r from-gray-100 to-gray-200">
            {/* Main Content */}
            <div className="relative z-10 text-center p-6 max-w-3xl">
                {/* Main Heading */}
                <h1 className="font-extrabold text-4xl md:text-5xl text-gray-800 leading-tight">
                    Welcome to{" "}
                    <span className="text-indigo-600">Blackbook</span> -
                    <span className="">
                        {" "}
                        Your ultimate project showcase
                    </span>
                </h1>
                {/* Subheading */}
                <h3 className="mt-6 text-lg sm:text-xl md:text-2xl font-medium text-gray-600">
                    A collection of <span className="text-indigo-500">Innovative Projects</span> by Aspiring Graduates
                </h3>

                {/* Call to Action */}
                <div className="mt-8">
                    <div className="p-3 mb-6 sm:text-xl md:text-2xl font-semibold text-gray-800">
                        <h1 className="text-green-600">Explore 500+ Projects</h1>
                    </div>
                    <Link
                        href={Routes.PROJECT}
                        className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-3 px-6 rounded-lg shadow-lg transition-transform transform hover:scale-105"
                    >
                        Explore Projects
                    </Link>
                </div>
            </div>
        </div>
    );
}
