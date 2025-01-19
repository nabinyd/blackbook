import { Routes } from "@/config/Routes";
import Link from "next/link";

export default function CTA() {
    return (
        <div className="bg-gradient-to-r from-green-400 to-blue-500 py-20">
            <div className="max-w-7xl mx-auto px-6 text-center text-white">
                {/* Heading */}
                <h2 className="text-4xl font-bold mb-4">
                    Ready to Share Your Innovation with the World?
                </h2>
                <p className="text-lg mb-8">
                    Whether you&aposre working on your final year project, a research paper,
                    or any innovation, Blackbook is the perfect platform to showcase your
                    work to the world. Create, share, and get feedback from experts.
                </p>

                {/* CTA Button */}
                <div className="flex justify-center">
                    <Link
                        href={Routes.PROJECT_CREATE}
                        className="bg-yellow-500 hover:bg-yellow-600 text-white text-lg py-3 px-8 rounded-full font-semibold shadow-lg transition-all duration-300 transform hover:scale-105"
                    >
                        Create Your Project Now
                    </Link>
                </div>

                {/* Secondary CTA */}
                <div className="mt-12 text-lg">
                    <p>Not ready to create a project yet? No worries!</p>
                    <p>
                        <Link
                            href={Routes.ABOUT}
                            className="text-yellow-300 hover:text-yellow-400 font-semibold"
                        >
                            Learn more about Blackbook.
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}
