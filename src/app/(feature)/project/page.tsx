"use client";
import { useDispatch, useSelector } from "react-redux";
import { IProjectCardProps } from "@/lib/type/project/IProjectCardProps";
import { AppDispatch, RootState } from "@/lib/store";
import { fetchProjectsFromAPI } from "@/lib/features/project.slice";
import { useEffect, useState } from "react";
import ProjectCard from "./_component/ProjectCard";
import Loading from "../../Loading";

export default function Page() {
    const dispatch = useDispatch<AppDispatch>();
    const { projects, projectLoading } = useSelector((state: RootState) => state.project);

    // State to manage search query
    const [searchQuery, setSearchQuery] = useState("");

    // Filtered projects based on search query
    const filteredProjects = projects.filter((project: IProjectCardProps) =>
        project.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

    useEffect(() => {
        dispatch(fetchProjectsFromAPI());
    }, [dispatch]);

    if (projectLoading) {
        return <Loading />;
    }

    return (
        <section className="min-h-screen text-gray-300 p-3 sm:p-12">
            <div className="max-w-7xl mx-auto">
                {/* Search Bar */}
                <div className="mb-5 flex justify-end items-start">
                    <input
                        type="text"
                        placeholder="Search for projects..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="p-3 w-full sm:w-96 text-black rounded-md border border-gray-600 focus:outline-none"
                    />
                </div>

                {/* Loading Spinner */}
                {projectLoading && (
                    <div className="flex justify-center items-center mb-8">
                        <Loading />
                    </div>
                )}

                {/* Projects Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filteredProjects.length > 0 ? (
                        filteredProjects.map((project: IProjectCardProps) => (
                            <ProjectCard key={project.id} {...project} />
                        ))
                    ) : (
                        <div className="col-span-full text-center text-gray-800">
                            No projects found.
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
}
