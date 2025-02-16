'use client'
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { AppDispatch, RootState } from '@/lib/store';
import ProjectCard from './ProjectCard';
import { fetchlatestProjects } from '@/lib/features/project.slice';
import Loading from '@/app/Loading';
import Link from 'next/link';
import { Routes } from '@/config/Routes';
import { Button } from '@/components/ui/button';

export default function LatestProject() {
    const { latestProjects, latestProjectsLoading } = useSelector((state: RootState) => state.project);
    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
        dispatch(fetchlatestProjects());
    }, [dispatch]);

    if (latestProjectsLoading) {
        return <Loading />;
    }

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
                    {
                        latestProjects.slice(3).map((project) => (
                            <ProjectCard key={project.id} {...project} />
                        ))}

                </div>

                {/* Call to Action */}
                <div className="mt-12 text-center">
                    <Link href={Routes.PROJECT}>
                        <Button className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition-colors duration-300">
                            View All Projects
                        </Button>
                    </Link>
                </div>
            </div>
        </div>
    );
}
