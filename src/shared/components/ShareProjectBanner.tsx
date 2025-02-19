import { Button } from "@/components/ui/button";
import { Routes } from "@/config/Routes";
import Link from "next/link";
import React from "react";

export default function ShareProjectBanner() {
    return (
        <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white py-20">
            <div className="max-w-7xl mx-auto px-6 text-center">
                <h2 className="text-4xl font-bold mb-4">
                    Do you want to share your project with the world?
                </h2>
                <p className="text-lg mb-8">
                    Share your project with us and let the world know about your innovation.
                </p>
                <div className="flex justify-center gap-6">
                    <Link href={Routes.PROJECT_CREATE}>
                        <Button className="bg-white text-blue-600 font-semibold py-6 px-8 rounded-lg shadow-lg hover:bg-gray-100 transition duration-300">
                            Create Project
                        </Button>
                    </Link>

                    <Link href={Routes.PROJECT}>
                        <Button className="bg-white text-blue-600 font-semibold py-6 px-8 rounded-lg shadow-lg hover:bg-gray-100 transition duration-300">
                            Learn More
                        </Button>
                    </Link>
                </div>
            </div>
        </div>
    );
}
