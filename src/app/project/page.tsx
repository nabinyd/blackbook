"use client";
import { useDispatch, useSelector } from "react-redux";
import { IProjectCardProps } from "@/lib/type/IProjectCardProps";
import { AppDispatch, RootState } from "@/lib/store";
import { fetchProjectsFromAPI } from "@/lib/features/project.slice";
import { useEffect } from "react";
import ProjectCard from "./_component/ProjectCard";
import Loading from "../Loading";

export default function Page() {
    const dispatch = useDispatch<AppDispatch>();
    const { projects, loading, error } = useSelector((state: RootState) => state.project);

    useEffect(() => {
        dispatch(fetchProjectsFromAPI());
    }, [dispatch]);

    return (
        <section className="min-h-screen  text-gray-300 p-6 sm:p-12">
            <div className="max-w-7xl mx-auto">
                {/* Loading Spinner */}
                {loading && (
                    <div className="flex justify-center items-center mb-8">
                        <Loading />
                    </div>
                )}

                {/* Error Handling */}
                {error && (
                    <div className="bg-red-600 text-white text-center p-4 rounded-md mb-8">
                        <strong>Error:</strong> {error}
                    </div>
                )}

                {/* Projects Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {projects.length > 0 ? (
                        projects.map((project: IProjectCardProps) => (
                            <ProjectCard key={project.id} {...project} />
                        ))
                    ) : (
                        <div className="col-span-full text-center text-gray-400">
                            No projects found at the moment. Please check back later!
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
}
