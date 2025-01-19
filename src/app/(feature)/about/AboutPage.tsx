import Image from "next/image";
import { ArrowRight, Star, Users, Lightbulb, BookOpen, Link as LinkIcon } from "lucide-react";

export default function AboutPage() {
    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black py-16">
            {/* Hero Section */}
            <div className="container mx-auto px-4 sm:px-6">
                <section className="text-center mb-20">
                    <h1 className="text-4xl sm:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-blue-600 mb-6">
                        Welcome to Blackbook
                    </h1>
                    <div className="max-w-3xl mx-auto">
                        <p className="text-lg text-gray-300 leading-relaxed">
                            A global archive for final year projects, hackathon creations, and remarkable works
                            from academic and professional events.
                        </p>
                    </div>
                </section>

                {/* Who We Are Section */}
                <section className="mb-20">
                    <div className="grid md:grid-cols-2 gap-12 items-center">
                        <div className="space-y-6">
                            <h2 className="text-3xl font-bold text-blue-500">Who We Are</h2>
                            <div className="space-y-4">
                                <p className="text-gray-300 leading-relaxed">
                                    Blackbook is a dedicated platform that highlights innovation and creativity.
                                    It began as a vision to create a centralized hub for showcasing exceptional projects.
                                </p>
                                <p className="text-gray-300 leading-relaxed">
                                    Our mission is to enable individuals to share their work with the world,
                                    inspire others, and build a global community passionate about knowledge and creativity.
                                </p>
                            </div>
                        </div>
                        <div className="relative h-[400px] rounded-xl overflow-hidden shadow-2xl transform hover:scale-105 transition-transform duration-300">
                            <Image
                                src="/images/project-plan.png"
                                alt="Blackbook Community"
                                fill
                                className="object-cover"
                            />
                        </div>
                    </div>
                </section>

                {/* Our Mission Section */}
                <section className="mb-20">
                    <h2 className="text-3xl font-bold text-blue-500 text-center mb-12">Our Mission</h2>
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {[
                            {
                                icon: <Star className="w-6 h-6" />,
                                title: "Showcase Innovation",
                                description: "A platform for students to showcase their innovative projects."
                            },
                            {
                                icon: <Lightbulb className="w-6 h-6" />,
                                title: "Inspire Learning",
                                description: "Inspiring, motivating, and elevating the standards of project-based learning."
                            },
                            {
                                icon: <LinkIcon className="w-6 h-6" />,
                                title: "Bridge Gaps",
                                description: "Bridging the gap between academia and industry."
                            },
                            {
                                icon: <Users className="w-6 h-6" />,
                                title: "Connect Talent",
                                description: "Connecting students with potential employers for internships and job opportunities."
                            },
                            {
                                icon: <BookOpen className="w-6 h-6" />,
                                title: "Transform Ideas",
                                description: "Transforming ideas from hackathons, project expos, and beyond into real-world impact."
                            }
                        ].map((item, index) => (
                            <div
                                key={index}
                                className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-6 hover:bg-gray-700/50 transition-all duration-300"
                            >
                                <div className="text-blue-400 mb-4">{item.icon}</div>
                                <h3 className="text-xl font-semibold text-white mb-2">{item.title}</h3>
                                <p className="text-gray-300">{item.description}</p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Join Us Banner */}
                <section className="text-center bg-gradient-to-r from-blue-600 to-blue-800 rounded-2xl p-12">
                    <h2 className="text-3xl font-bold text-white mb-4">Join Our Community</h2>
                    <p className="text-lg text-gray-100 mb-8 max-w-2xl mx-auto">
                        Be part of a growing community of innovators, creators, and problem solvers.
                        Share your projects and discover inspiring work from others.
                    </p>
                    <button className="bg-white text-blue-600 px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition-colors duration-300 flex items-center gap-2 mx-auto">
                        Get Started
                        <ArrowRight className="w-5 h-5" />
                    </button>
                </section>
            </div>
        </div>
    );
}