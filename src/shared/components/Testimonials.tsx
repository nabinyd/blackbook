import Image from "next/image";
import React from "react";

export default function Testimonials() {
    const testimonials = [
        {
            name: "John Doe",
            position: "Student",
            message:
                "Blackbook Management System has been a game-changer for submitting and managing my final year projects. It&quots easy to use and has made everything so much smoother. Highly recommend!",
            image: "https://randomuser.me/api/portraits/men/1.jpg", // Placeholder image
        },
        {
            name: "Jane Smith",
            position: "Faculty Member",
            message:
                "As a faculty member, the platform has made project feedback more efficient. It allows me to track student progress and offer timely suggestions.",
            image: "https://randomuser.me/api/portraits/women/2.jpg", // Placeholder image
        },
        {
            name: "Mark Wilson",
            position: "Student",
            message:
                "The real-time tracking feature is amazing. I can easily see where my project stands, and the feedback system is incredibly helpful!",
            image: "https://randomuser.me/api/portraits/men/3.jpg", // Placeholder image
        },
    ];

    return (
        <div className="bg-gray-50 py-20">
            <div className="max-w-7xl mx-auto px-6 text-center">
                <h2 className="text-3xl font-semibold text-gray-800 mb-12">
                    What Our Users Are Saying
                </h2>

                {/* Testimonial Carousel */}
                <div className=" flex gap-6 overflow-x-auto scrollbar-hide">
                    {testimonials.map((testimonial, index) => (
                        <div
                            key={index}
                            className="bg-white p-8 rounded-xl shadow-xl hover:shadow-2xl transition-shadow duration-300 border border-gray-400"
                        >
                            <div className="flex items-center justify-center mb-4">
                                <Image
                                    className="w-16 h-16 rounded-full object-cover border-4 border-blue-600"
                                    src={testimonial.image}
                                    alt={testimonial.name}
                                    width={64}
                                    height={64}
                                />
                                <div className="ml-4">
                                    <h3 className="text-xl font-semibold text-gray-800">
                                        {testimonial.name}
                                    </h3>
                                    <p className="text-gray-600">{testimonial.position}</p>
                                </div>
                            </div>
                            <p className="text-lg text-gray-700 italic">&quot {testimonial.message} &quot</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
