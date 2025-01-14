
import Image from "next/image";

export default function AboutPage() {
    return (
        <div className="bg-dark-jet text-gray-100 py-12">
            <div className="container mx-auto px-6">
                {/* Hero Section */}
                <section className="mb-12">
                    <h2 className="text-3xl font-semibold text-blue-600 text-center mb-8">About Blackbook</h2>
                    <p className="text-lg text-gray-300 text-center">
                        Blackbook is a global archive for final year projects, hackathon creations, and remarkable works from academic and professional events.
                        A platform to share, discover, and celebrate ideas, inspiring a community of creators worldwide.
                    </p>
                </section>

                {/* About Us Section */}
                <section className="flex flex-col sm:flex-row items-center sm:space-x-12 mb-12">
                    <div className="sm:w-1/2 mb-8 sm:mb-0">
                        <h2 className="text-3xl font-semibold text-blue-600 mb-4">Who We Are</h2>
                        <p className="text-lg text-gray-300 text-justify">
                            Blackbook is a dedicated platform that highlights innovation and creativity.
                            It began as a vision to create a centralized hub for showcasing exceptional projects, including final year bachelor projects, hackathon creations, and groundbreaking ideas from academic and professional events.
                            Our mission is to enable individuals to share their work with the world, inspire others, and build a global community passionate about knowledge and creativity.
                        </p>
                    </div>
                    <div className="sm:w-1/2 flex justify-center">
                        <Image
                            src="/images/project-plan.png"
                            alt="Blackbook Community"
                            className="rounded-lg shadow-xl"
                            width={400}
                            height={300}
                        />
                    </div>
                </section>


                {/* Our Mission */}
                <section className="text-center mb-12">
                    <h2 className="text-3xl font-semibold text-blue-600 mb-6">Our Mission</h2>
                    <div className="space-y-4">
                        {[
                            "A platform for students to showcase their innovative projects.",
                            "Inspiring, motivating, and elevating the standards of project-based learning.",
                            "Bridging the gap between academia and industry.",
                            "Connecting students with potential employers for internships and job opportunities.",
                            "Transforming ideas from hackathons, project expos, and beyond into real-world impact.",
                        ].map((point, index) => (
                            <div
                                key={index}
                                className="p-4 border border-gray-700 bg-neutral-900 rounded-md shadow-md hover:bg-blue-600 hover:text-white transition-all duration-300 transform hover:scale-105"
                            >
                                {point}
                            </div>
                        ))}
                    </div>
                </section>
            </div>
        </div>
    );
}
