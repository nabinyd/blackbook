import { Routes } from "@/config/Routes";
import Link from "next/link";

export default function NotFound() {
    return (
        <div className="h-screen flex flex-col items-center justify-center  text-white bg-gray-900">
            <h1 className="text-6xl font-extrabold mb-4">404</h1>
            <h2 className="text-2xl font-semibold mb-6">Page Not Found</h2>
            <p className="text-center text-gray-300 mb-8">Oops! The page you are looking for does not exist or has been moved.</p>
            <Link
                href={Routes.HOME}
                className="bg-indigo-600 text-white py-2 px-4 rounded shadow-lg hover:bg-indigo-500 transition-all"
            >
                Go Back to Home
            </Link>
        </div>
    );
}
