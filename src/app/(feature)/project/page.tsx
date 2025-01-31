"use client";
import { useDispatch, useSelector } from "react-redux";
import { IProjectCardProps } from "@/lib/type/project/IProjectCardProps";
import { AppDispatch, RootState } from "@/lib/store";
import { fetchProjectsFromAPI } from "@/lib/features/project.slice";
import { useEffect } from "react";
import ProjectCard from "./_component/ProjectCard";
import Loading from "../../Loading";

export default function Page() {
    const dispatch = useDispatch<AppDispatch>();
    const { projects, projectLoading } = useSelector((state: RootState) => state.project);

    useEffect(() => {
        dispatch(fetchProjectsFromAPI());
    }, [dispatch]);


    if (projectLoading) {
        return <Loading />;
    }
    return (
        <section className="min-h-screen  text-gray-300 p-6 sm:p-12">
            <div className="max-w-7xl mx-auto">
                {/* Loading Spinner */}
                {projectLoading && (
                    <div className="flex justify-center items-center mb-8">
                        <Loading />
                    </div>
                )}
                {/* Projects Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {projects.length > 0 ? (
                        projects.map((project: IProjectCardProps) => (

                            <ProjectCard key={project.id} {...project} />

                        ))
                    ) : (
                        <div className="col-span-full text-center text-gray-800">
                            No projects found at the moment. Please check back later!
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
}
