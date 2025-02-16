'use client'
import { useState } from "react";

export default function FAQ() {
    const [activeIndex, setActiveIndex] = useState<number | null>(null);


    const toggleAccordion = (index: number) => {
        setActiveIndex(activeIndex === index ? null : index);
    };

    const faqs = [
        {
            question: "How do I create a project?",
            answer:
                "To create a project, click on the 'Create Project' button on the homepage, fill in the necessary details about your project, and submit. ",
        },
        // {
        //     question: "Can I edit my project after submission?",
        //     answer:
        //         "Yes! You can edit your project details at any time. Just visit your project dashboard, and make the required changes.",
        // },
        {
            question: "How can I track my project status?",
            answer:
                "You can track the status of your project from your dashboard. The platform provides real-time updates and feedback on your submission.",
        },
        {
            question: "What if I need help with my project?",
            answer:
                "If you need assistance, feel free to contact our support team. You can reach us through the 'Contact Us' page or directly email us at blackbook.project.official@gmail.com",
        },
    ];

    return (
        <div className="bg-gray-50 py-32 h-full">
            <div className="max-w-7xl mx-auto px-6 text-center">
                <h2 className="text-3xl font-semibold text-gray-800 mb-8">
                    Frequently Asked Questions
                </h2>
                <div className="space-y-6">
                    {faqs.map((faq, index) => (
                        <div
                            key={index}
                            className="bg-white rounded-lg shadow-lg overflow-hidden"
                        >
                            <div
                                onClick={() => toggleAccordion(index)}
                                className="cursor-pointer px-6 py-4 flex justify-between items-center bg-blue-600 text-white hover:bg-blue-700 transition duration-300"
                            >
                                <h3 className="text-lg font-semibold">{faq.question}</h3>
                                <svg
                                    className={`w-5 h-5 transform transition-transform duration-300 ${activeIndex === index ? "rotate-180" : ""
                                        }`}
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M19 9l-7 7-7-7"
                                    />
                                </svg>
                            </div>
                            {activeIndex === index && (
                                <div className="px-6 py-4 bg-gray-50 text-gray-700">
                                    <p>{faq.answer}</p>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
