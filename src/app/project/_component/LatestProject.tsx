'use client'
import React from 'react';

export default function LatestProject() {
    const projects = [
        {
            id: 1,
            title: 'AI-Powered Health Monitoring System',
            description: 'A system to monitor health parameters using AI and IoT.',
            date: 'Jan 1, 2025',
            status: 'Approved',
        },
        {
            id: 2,
            title: 'E-Learning Platform',
            description: 'An interactive platform for online education.',
            date: 'Dec 25, 2024',
            status: 'Pending',
        },
        {
            id: 3,
            title: 'Automated Hydroponic System',
            description: 'A smart system to grow plants without soil.',
            date: 'Dec 20, 2024',
            status: 'Approved',
        },
    ];

    return (
        <div className="p-8 bg-gray-100 min-h-screen">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <h1 className="text-4xl font-bold text-gray-800 mb-6 text-center">
                    Latest Projects
                </h1>
                <p className="text-lg text-gray-600 mb-10 text-center">
                    Explore the most recent projects submitted by our talented students.
                </p>

                {/* Project Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {projects.map((project) => (
                        <div
                            key={project.id}
                            className="bg-white shadow-md rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300"
                        >
                            <div className="p-6">
                                {/* Title */}
                                <h2 className="text-xl font-semibold text-gray-800 mb-2">
                                    {project.title}
                                </h2>
                                {/* Description */}
                                <p className="text-gray-600 mb-4">
                                    {project.description}
                                </p>
                                {/* Date */}
                                <p className="text-sm text-gray-500 mb-2">
                                    Submitted on: {project.date}
                                </p>
                                {/* Status */}
                                <span
                                    className={`inline-block px-3 py-1 text-sm font-medium rounded-full ${project.status === 'Approved'
                                            ? 'bg-green-100 text-green-600'
                                            : 'bg-yellow-100 text-yellow-600'
                                        }`}
                                >
                                    {project.status}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Call to Action */}
                <div className="mt-12 text-center">
                    <button className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition-colors duration-300">
                        View All Projects
                    </button>
                </div>
            </div>
        </div>
    );
}
